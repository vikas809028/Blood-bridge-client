import moment from "moment";
import React, { useEffect, useState } from "react";
import Layout from "../../Component/shared/Layout/Layout";
import API from "../../Services/API";
import { useSelector } from "react-redux";

const Donation = () => {
  const { user } = useSelector((state) => state.auth);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const getDonars = async () => {
    try {
      setLoading(true);
      if (user && user._id) {
        const { data } = await API.post("/donor/get-record", {
          id: user?._id,
        });
        if (data?.success) {
          setData(data.data);
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?._id) {
      getDonars();
    }
  }, [user]);

  if (!user) {
    return <Layout>Loading user data...</Layout>;
  }

  return (
    <Layout>
      {/* Custom styles */}
      <style>
        {`
          @keyframes fadeInUp {
            0% { opacity: 0; transform: translateY(20px); }
            100% { opacity: 1; transform: translateY(0); }
          }
          .animate-fadeInUp {
            animation: fadeInUp 0.6s ease-out both;
          }
          .blood-badge {
            display: inline-block;
            padding: 2px 8px;
            border-radius: 12px;
            font-weight: 600;
            text-transform: uppercase;
            font-size: 0.75rem;
            letter-spacing: 0.05em;
          }
          .pulse {
            animation: pulse 2s infinite;
          }
          @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
          }
          .gradient-text {
            background: linear-gradient(90deg, #ef4444, #dc2626);
            -webkit-background-clip: text;
            background-clip: text;
            color: transparent;
          }
          .hover-grow {
            transition: transform 0.3s ease;
          }
          .hover-grow:hover {
            transform: scale(1.01);
          }
        `}
      </style>

      <div className="container px-4 mx-auto mt-10 animate-fadeInUp">
        <div className="flex flex-col items-center mb-8 text-center">
          <h1 className="mb-2 text-3xl font-bold gradient-text pulse">
            Your Donation History
          </h1>
          <p className="max-w-2xl text-gray-600">
            Every drop counts! Here's your journey of saving lives through blood donation.
          </p>
          <div className="w-24 h-1 mt-4 bg-gradient-to-r from-red-400 to-red-600 rounded-full"></div>
        </div>
        
        {loading ? (
          <div className="flex flex-col items-center justify-center py-16 space-y-4">
            <div className="w-12 h-12 border-4 border-red-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-gray-600">Loading your donation records...</p>
          </div>
        ) : (
          <div className="overflow-hidden transition-all duration-500 bg-white rounded-xl shadow-lg hover:shadow-xl hover-grow">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gradient-to-r from-red-50 to-red-100">
                <tr>
                  <th className="px-6 py-4 text-xs font-medium tracking-wider text-left text-red-700 uppercase">Blood Group</th>
                  <th className="px-6 py-4 text-xs font-medium tracking-wider text-left text-red-700 uppercase">Organization</th>
                  <th className="px-6 py-4 text-xs font-medium tracking-wider text-left text-red-700 uppercase">Quantity</th>
                  <th className="px-6 py-4 text-xs font-medium tracking-wider text-left text-red-700 uppercase">Date & Time</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {data?.length > 0 ? (
                  data.map((record, index) => (
                    <tr
                      key={record._id}
                      className={`transition duration-150 ease-in-out hover:bg-red-50 animate-fadeInUp`}
                      style={{ animationDelay: `${index * 0.05}s` }}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`blood-badge ${
                          record.bloodGroup === 'O+' ? 'bg-red-100 text-red-800' :
                          record.bloodGroup === 'A+' ? 'bg-blue-100 text-blue-800' :
                          record.bloodGroup === 'B+' ? 'bg-green-100 text-green-800' :
                          record.bloodGroup === 'AB+' ? 'bg-purple-100 text-purple-800' :
                          record.bloodGroup === 'O-' ? 'bg-orange-100 text-orange-800' :
                          record.bloodGroup === 'A-' ? 'bg-indigo-100 text-indigo-800' :
                          record.bloodGroup === 'B-' ? 'bg-teal-100 text-teal-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {record.bloodGroup}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">
                        {record.organisation?.organisationName || "N/A"}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">
                        <span className="font-semibold text-red-600">{record.quantity} ml</span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        <div className="flex items-center">
                          <svg className="w-4 h-4 mr-2 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                          </svg>
                          {moment(record.createdAt).format("DD MMM YYYY, hh:mm A")}
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="px-6 py-12 text-center">
                      <div className="flex flex-col items-center justify-center">
                        <svg className="w-16 h-16 mb-4 text-red-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                        <h3 className="mb-2 text-lg font-medium text-gray-700">No donation records found</h3>
                        <p className="text-gray-500">Your future donations will appear here</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {data?.length > 0 && (
          <div className="flex items-center justify-between px-4 py-3 mt-4 text-sm text-gray-600 bg-gray-50 rounded-b-lg">
            <div>
              Showing <span className="font-medium">{data.length}</span> donation records
            </div>
            <div className="flex items-center">
              <svg className="w-4 h-4 mr-1 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"></path>
              </svg>
              Last updated: {moment().format("DD MMM YYYY, hh:mm A")}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Donation;