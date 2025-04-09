import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Layout from "../../Component/shared/Layout/Layout";
import API from "../../Services/API";
import { Droplet } from "lucide-react";

const Purchase = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    bloodGroup: "",
    quantity: "",
    email: "",
    selectedHospital: "",
  });

  const [hospitalsData, setHospitalsData] = useState([]);

  useEffect(() => {
    const fetchHospitalsWithBloodData = async () => {
      try {
        const { data } = await API.get("/donor/hospitals-blooddata");
        if (data?.success) {
          setHospitalsData(data?.data || []);
        } else {
          toast.error("Failed to fetch hospital blood data");
        }
      } catch (error) {
        console.error("API error:", error);
        toast.error("Something went wrong while fetching hospital data");
      }
    };
    fetchHospitalsWithBloodData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "quantity" ? Math.max(0, Number(value)) : value,
    }));
  };

  const handlePurchaseSubmit = (e) => {
    e.preventDefault();
    const { bloodGroup, quantity, email, selectedHospital } = formData;

    if (!bloodGroup || !quantity || !email || !selectedHospital) {
      toast.error("Please fill out all fields.");
      return;
    }

    const selectedHospitalData = hospitalsData.find(
      (h) => h.hospitalId === selectedHospital
    );

    if (!selectedHospitalData) {
      toast.error("Selected hospital not found");
      return;
    }

    const groupData = selectedHospitalData.bloodGroups[bloodGroup];
    if (!groupData || groupData.available < quantity) {
      toast.error(
        `Only ${groupData?.available || 0}ml of ${bloodGroup} is available at ${selectedHospitalData.hospitalName}`
      );
      return;
    }

    navigate("/payment", {
      state: {
        ...formData,
        hospitalName: selectedHospitalData.hospitalName,
        hospitalId: selectedHospitalData.hospitalId,
        price: quantity * 100,
      },
    });
  };

  return (
    <Layout>
      {/* Animation Styles */}
      <style>
        {`
          @keyframes fadeInUp {
            0% {
              opacity: 0;
              transform: translateY(20px);
            }
            100% {
              opacity: 1;
              transform: translateY(0);
            }
          }
          .fade-in-up {
            animation: fadeInUp 0.7s ease forwards;
          }
        `}
      </style>

      <div className="container px-4 mx-auto mt-10 fade-in-up">
        <div className="max-w-md p-6 mx-auto bg-white rounded-lg shadow-xl transition-transform duration-500 hover:scale-[1.02]">
          <h2 className="flex items-center justify-center gap-2 mb-6 text-xl font-bold text-center text-red-700">
            <Droplet className="w-6 h-6 text-red-700 animate-pulse" /> Purchase Blood
          </h2>
          <form onSubmit={handlePurchaseSubmit} className="space-y-4">
            {/* Blood Group */}
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Blood Group
              </label>
              <select
                name="bloodGroup"
                value={formData.bloodGroup}
                onChange={handleChange}
                className="w-full p-2 transition border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <option value="">Select Blood Group</option>
                {["O+", "O-", "AB+", "AB-", "A+", "A-", "B+", "B-"].map((bg) => (
                  <option key={bg} value={bg}>
                    {bg}
                  </option>
                ))}
              </select>
            </div>

            {/* Quantity */}
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Quantity (ML)
              </label>
              <input
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                min="1"
                className="w-full p-2 transition border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-2 transition border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>

            {/* Hospital Dropdown */}
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Select Hospital
              </label>
              <select
                name="selectedHospital"
                value={formData.selectedHospital}
                onChange={handleChange}
                className="w-full p-2 transition border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <option value="">Select Hospital</option>
                {hospitalsData.map((hospital) => (
                  <option key={hospital.hospitalId} value={hospital.hospitalId}>
                    {hospital.hospitalName}
                  </option>
                ))}
              </select>
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="w-full p-2 text-white transition bg-red-700 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                Proceed to Payment
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Purchase;
