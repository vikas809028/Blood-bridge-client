import React, { useEffect, useState } from "react";
import Layout from "../../Component/shared/Layout/Layout";
import API from "../../Services/API";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";


const OrganizationDonation = () => {
  const { user } = useSelector((state) => state.auth);
  const [data, setData] = useState([]);
  const [selectedOrg, setSelectedOrg] = useState(null);
  const [selectedBloodGroup, setSelectedBloodGroup] = useState("");
  const [availableQty, setAvailableQty] = useState(0);
  const [requestedQty, setRequestedQty] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState({
    totalOrganizations: 0,
    totalBloodGroups: 0,
    totalAvailable: 0
  });

  const getBloodGroupData = async () => {
    try {
      setLoading(true);
      const res = await API.get("/hospital/get-bloodgroup-data");
      setData(res.data.data);
      
      // Calculate statistics
      const orgs = new Set();
      let bloodGroups = 0;
      let totalAvailable = 0;
      
      res.data.data.forEach(org => {
        orgs.add(org.organisationId);
        org.bloodData.forEach(blood => {
          bloodGroups++;
          totalAvailable += blood.quantity;
        });
      });
      
      setStats({
        totalOrganizations: orgs.size,
        totalBloodGroups: bloodGroups,
        totalAvailable
      });
    } catch (error) {
      toast.error("Failed to fetch blood group data");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getBloodGroupData();
   
  }, []);

  const handlePurchaseClick = (org, blood) => {
    setSelectedOrg(org);
    setSelectedBloodGroup(blood.bloodGroup);
    setAvailableQty(blood.quantity);
    setRequestedQty("");
    setShowModal(true);
  };

  const handleConfirmPurchase = async () => {
    const qty = parseInt(requestedQty);
    if (!qty || qty <= 0) {
      toast.error("Please enter a valid quantity");
      return;
    }
    if (qty > availableQty) {
      toast.error("Requested quantity exceeds available stock");
      return;
    }
  
    try {
      setLoading(true);
      // Create order first
      const orderRes = await API.post("/payment/create-order", {
        amount: qty * 100, // The amount passed here is in paise
        hospitalId: user?._id,
        organisationId: selectedOrg.organisationId,
        bloodGroup: selectedBloodGroup,
        quantity: qty,
      });
  
      if (!orderRes.data.order?.id) {
        throw new Error("Failed to create payment order");
      }
  
      const orderId = orderRes.data.order.id;
      const razorpayKey = orderRes.data.razorpayKey;
  
      const options = {
        key: razorpayKey, // Use the razorpayKey from the response
        amount: orderRes.data.order.amount, // This is in paise
        currency: "INR",
        name: "Blood Bank System",
        description: `Purchase of ${qty}mL ${selectedBloodGroup} blood`,
        order_id: orderId, // The order ID from the response
        handler: async (response) => {
          try {
            const verifyRes = await API.post("/payment/verify-payment-hospital", {
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
              hospitalId: user?._id,
              organisationId: selectedOrg.organisationId,
              bloodGroup: selectedBloodGroup,
              quantity: qty,
            });
  
            if (verifyRes.data.success) {
              toast.success("Payment successful! Blood request placed.");
              setShowModal(false);
              getBloodGroupData(); // Refresh data
            } else {
              toast.error("Payment verification failed");
            }
          } catch (error) {
            console.error("Payment verification error:", error);
            toast.error("Payment verification failed");
          }
        },
        prefill: {
          name: user?.name || "",
          email: user?.email || "",
          contact: user?.phone || "",
        },
        theme: {
          color: "#F37254",
        },
        modal: {
          ondismiss: () => {
            toast.info("Payment window closed");
          },
        },
      };
  
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Purchase error:", error);
      toast.error("Failed to initiate purchase");
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <Layout>
      <div className="container px-4 mx-auto py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl shadow-lg p-6 text-white transform transition-all hover:scale-[1.02]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Organizations</p>
                <h3 className="text-3xl font-bold">{stats.totalOrganizations}</h3>
              </div>
              <div className="p-3 bg-blue-400 bg-opacity-30 rounded-full">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl shadow-lg p-6 text-white transform transition-all hover:scale-[1.02]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Blood Groups Available</p>
                <h3 className="text-3xl font-bold">{stats.totalBloodGroups}</h3>
              </div>
              <div className="p-3 bg-purple-400 bg-opacity-30 rounded-full">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-xl shadow-lg p-6 text-white transform transition-all hover:scale-[1.02]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Total Blood Available</p>
                <h3 className="text-3xl font-bold">{stats.totalAvailable} mL</h3>
              </div>
              <div className="p-3 bg-red-400 bg-opacity-30 rounded-full">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Blood Availability Table */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg">
          <div className="px-6 py-4 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
            <h3 className="text-xl font-semibold text-gray-800">Available Blood Inventory</h3>
            <p className="text-sm text-gray-500">Select an organization to request blood</p>
          </div>
          
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : data.length === 0 ? (
            <div className="p-8 text-center">
              <svg className="w-16 h-16 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <h4 className="mt-4 text-lg font-medium text-gray-900">No blood inventory available</h4>
              <p className="mt-1 text-sm text-gray-500">Check back later or contact organizations directly</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Organization</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Blood Group</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Available (mL)</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {data.map((org, index) =>
                    org.bloodData.map((blood, subIndex) => (
                      <tr 
                        key={`${org.organisationId}-${blood.bloodGroup}`}
                        className="transition-colors duration-150 hover:bg-gray-50"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                              <span className="text-blue-600 font-medium">
                                {org.organisationName.charAt(0)}
                              </span>
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{org.organisationName}</div>
                              <div className="text-xs text-gray-500">ID: {org.organisationId.slice(-6)}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            blood.quantity > 10 ? 'bg-green-100 text-green-800' : 
                            blood.quantity > 5 ? 'bg-yellow-100 text-yellow-800' : 
                            'bg-red-100 text-red-800'
                          }`}>
                            {blood.bloodGroup}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {blood.quantity} mL
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button
                            onClick={() => handlePurchaseClick(org, blood)}
                            disabled={loading}
                            className="flex items-center space-x-1 text-blue-600 hover:text-blue-800 transition-colors disabled:opacity-50"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                            <span>Request</span>
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Purchase Modal */}
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden transform transition-all">
              <div className="px-6 py-4 bg-gradient-to-r from-blue-500 to-blue-600">
                <h3 className="text-lg font-medium text-white">Request Blood</h3>
              </div>
              
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Organization</label>
                  <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                    <p className="font-medium text-gray-900">{selectedOrg?.organisationName}</p>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Blood Group</label>
                  <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                    <p className="font-medium text-gray-900">{selectedBloodGroup}</p>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Available Quantity</label>
                  <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                    <p className="font-medium text-gray-900">{availableQty} mL</p>
                  </div>
                </div>
                
                <div>
                  <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1">
                    Request Quantity (mL) @ ₹1/mL
                  </label>
                  <input
                    type="number"
                    id="quantity"
                    min="1"
                    max={availableQty}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={requestedQty}
                    onChange={(e) => setRequestedQty(e.target.value)}
                    disabled={loading}
                  />
                  {requestedQty && (
                    <p className="mt-1 text-sm text-gray-600">
                      Total Amount: ₹{parseInt(requestedQty) || 0}
                    </p>
                  )}
                </div>
              </div>
              
              <div className="px-6 py-4 border-t border-gray-200 flex justify-end space-x-3">
                <button
                  type="button"
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors"
                  onClick={() => setShowModal(false)}
                  disabled={loading}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors disabled:opacity-70"
                  onClick={handleConfirmPurchase}
                  disabled={loading}
                >
                  {loading ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </span>
                  ) : (
                    "Proceed to Payment"
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default OrganizationDonation;