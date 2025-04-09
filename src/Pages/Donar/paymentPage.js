import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import Layout from "../../Component/shared/Layout/Layout";
import { useDispatch, useSelector } from "react-redux";
import { getRazorPayId } from "../../Redux/features/payment/paymentActions";

const Payment = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  
  // Safely extract state with defaults
  const { 
    quantity = 1, 
    hospitalId = null,
    bloodGroup = null,
    hospitalName = "Unknown Hospital",
    price = 1 
  } = location.state || {};

  const [loading, setLoading] = useState(false);
  const [razorpayKey, setRazorpayKey] = useState(null);

  // Calculate amount with proper validation
  const amount = Math.max(0, quantity) * price;
 
  useEffect(() => {
    const fetchRazorpayKey = async () => {
      try {
        const data = await dispatch(getRazorPayId());
        setRazorpayKey(data.payload);
      } catch (error) {
        console.error("Error fetching Razorpay key:", error);
        toast.error("Failed to initialize payment gateway");
      }
    };

    fetchRazorpayKey();
  }, [dispatch]);

  const handlePayment = async () => {
    try {
      // Validate all required fields
      if (!quantity || quantity <= 0 || !hospitalId || !bloodGroup || !user?._id) {
        toast.error("Invalid purchase details. Please check your order.");
        return;
      }
  
      if (!razorpayKey) {
        toast.error("Payment gateway not ready. Please try again.");
        return;
      }
  
      setLoading(true);
  
      // Create payment order
      const { data } = await axios.post("http://localhost:8001/api/v1/payment/create-order", {
        amount,
        quantity,
        hospitalId,
        bloodGroup,
        userId: user._id
      });
  
      if (!data?.success || !data?.order?.id) {
        throw new Error("Invalid order response from server");
      }
  
      // Razorpay expects amount in paise
      const amountInPaise = amount * 100;
  
      // Check if Razorpay library is loaded
      if (!window.Razorpay) {
        toast.error("Payment processor not loaded. Please refresh and try again.");
        return;
      }
  
      const options = {
        key: razorpayKey,
        amount: amountInPaise, 
        currency: "INR",
        name: "LifeBlood Network",
        description: `Payment for ${quantity} units of ${bloodGroup} blood`,
        order_id: data.order.id,
        handler: async (response) => {
          try {
            const verifyResponse = await axios.post(
              "http://localhost:8001/api/v1/payment/verify-payment",
              {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                amount: amount,
                quantity,
                hospitalId,
                bloodGroup,
                recipientId: user._id
              }
            );
  
            if (verifyResponse.data.success) {
              toast.success("Payment successful! Blood has been allocated.");
              navigate("/hos-analytics");
            } else {
              toast.error("Payment verification failed. Contact support.");
            }
          } catch (error) {
            console.error("Verification error:", error);
            toast.error("Payment verification failed. Please contact support.");
          }
        },
        prefill: {
          name: user?.name || "",
          email: user?.email || "",
          contact: user?.phone || "",
        },
        theme: { 
          color: "#e11d48",
          backdrop_color: "#0f172a"
        },
        modal: {
          ondismiss: () => {
            toast.info("You can complete payment later");
            setLoading(false);
          }
        }
      };
  
      const rzp1 = new window.Razorpay(options);
      rzp1.on('payment.failed', (response) => {
        toast.error(`Payment failed: ${response.error.description}`);
        setLoading(false);
      });
      rzp1.open();
    } catch (error) {
      console.error("Payment error:", error);
      toast.error("Payment processing failed! Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!quantity || quantity <= 0 || !hospitalId || !bloodGroup || !user?._id) {
      toast.error("Invalid purchase details. Redirecting...");
      navigate("/purchase");
    }
  }, [quantity, hospitalId, bloodGroup, navigate, user]);

  return (
    <Layout>
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fadeIn { animation: fadeIn 0.6s ease-out forwards; }
          .pulse-hover:hover {
            animation: pulse 2s infinite;
          }
          @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.02); }
          }
          .blood-drop {
            position: relative;
          }
          .blood-drop::after {
            content: "💉";
            position: absolute;
            right: -30px;
            top: -5px;
            font-size: 1.5rem;
          }
        `}
      </style>

      <div className="min-h-screen bg-gradient-to-b from-red-50 to-white">
        <div className="container px-4 py-12 mx-auto">
          <div className="max-w-md mx-auto bg-white rounded-xl shadow-2xl overflow-hidden animate-fadeIn">
            {/* Header */}
            <div className="bg-gradient-to-r from-red-600 to-red-700 p-6 text-center">
              <h1 className="text-2xl font-bold text-white blood-drop">
                Complete Your Purchase
              </h1>
              <p className="mt-2 text-red-100">
                Secure payment for your blood request
              </p>
            </div>

            {/* Order Summary */}
            <div className="p-6 space-y-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center pb-4 border-b border-gray-200">
                  <span className="text-gray-600">Hospital:</span>
                  <span className="font-medium">{hospitalName}</span>
                </div>

                <div className="flex justify-between items-center pb-4 border-b border-gray-200">
                  <span className="text-gray-600">Blood Group:</span>
                  <span className="font-bold text-red-600">{bloodGroup}</span>
                </div>

                <div className="flex justify-between items-center pb-4 border-b border-gray-200">
                  <span className="text-gray-600">Quantity:</span>
                  <span className="font-medium">{quantity} units</span>
                </div>

                <div className="flex justify-between items-center pb-4 border-b border-gray-200">
                  <span className="text-gray-600">Price per unit:</span>
                  <span className="font-medium">₹{price}</span>
                </div>

                <div className="flex justify-between items-center pt-2">
                  <span className="text-lg font-semibold">Total Amount:</span>
                  <span className="text-2xl font-bold text-red-600">₹{amount}</span>
                </div>
              </div>

              {/* Payment Button */}
              <button
                onClick={handlePayment}
                disabled={loading || !razorpayKey}
                className={`w-full py-3 px-6 rounded-lg text-white font-bold transition-all ${
                  loading || !razorpayKey
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-red-600 hover:bg-red-700 pulse-hover shadow-lg"
                }`}
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </div>
                ) : (
                  "Proceed to Payment"
                )}
              </button>

              {/* Security Info */}
              <div className="flex items-center justify-center text-sm text-gray-500 mt-4">
                <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                </svg>
                Secure payment powered by Razorpay
              </div>
            </div>
          </div>

          {/* Need Help Section */}
          <div className="max-w-md mx-auto mt-6 p-4 bg-blue-50 rounded-lg text-center">
            <p className="text-blue-800">
              Need help? Call our support at <span className="font-semibold">1800-123-4567</span>
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Payment;