import React, { useEffect, useState } from "react";
import Layout from "../../Component/shared/Layout/Layout";
import API from "../../Services/API";
import { useSelector } from "react-redux";
import Spinner from "../../Component/shared/Spinner";

const BloodAvailability = () => {
  const { user } = useSelector((state) => state.auth);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getBloodAvailability = async () => {
    if (!user?._id) return;

    try {
      setLoading(true);
      setError(null);
      
      const response = await API.post("/hospital/blood-availability", {
        id: user._id
      });
      
      if (response.data?.success) {
        setData(response.data.data);
      } else {
        setError("Failed to fetch blood availability data.");
      }
    } catch (error) {
      setError("Error fetching blood availability. Please try again.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getBloodAvailability();
  }, [user?._id]);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          Blood Inventory - {data?.hospitalName || "Hospital"}
        </h1>

        {/* Show Loading Spinner or Error Message */}
        {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          )  : error ? (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6">
            {error}
          </div>
        ) : (
          // Only show the data if available
          <div className="bg-white rounded-lg shadow overflow-hidden">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-medium text-blue-800">Total Blood Received</h3>
                <p className="text-2xl font-bold text-blue-600">
                  {data?.availability?.reduce((sum, item) => sum + item.totalReceived, 0)} ml
                </p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <h3 className="font-medium text-purple-800">Total Blood Distributed</h3>
                <p className="text-2xl font-bold text-purple-600">
                  {data?.availability?.reduce((sum, item) => sum + item.totalGiven, 0)} ml
                </p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="font-medium text-green-800">Current Inventory</h3>
                <p className="text-2xl font-bold text-green-600">
                  {data?.availability?.reduce((sum, item) => sum + item.available, 0)} ml
                </p>
              </div>
            </div>

            {/* Blood Availability Table */}
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Blood Group
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Received (ml)
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Distributed (ml)
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Available (ml)
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {data?.availability?.map((item) => (
                    <tr key={item.bloodGroup} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 rounded-full text-sm font-semibold ${
                          item.available <= 0 ? 'bg-red-100 text-red-800' : 
                          item.available < 5 ? 'bg-yellow-100 text-yellow-800' : 
                          'bg-green-100 text-green-800'
                        }`}>
                          {item.bloodGroup}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                        {item.totalReceived}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                        {item.totalGiven}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap font-medium">
                        {item.available}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {item.available <= 0 ? (
                          <span className="text-red-600">Critical</span>
                        ) : item.available < 5 ? (
                          <span className="text-yellow-600">Low</span>
                        ) : (
                          <span className="text-green-600">Adequate</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default BloodAvailability;
