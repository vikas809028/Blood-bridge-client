import React, { useEffect, useState } from "react";
import Layout from "../../Component/shared/Layout/Layout";
import moment from "moment";
import API from "../../Services/API";
import { FiTrash2, FiEdit, FiEye, FiSearch } from "react-icons/fi";
import { FaHandsHelping } from "react-icons/fa";
import { useToast } from "react-toastify";
import toast from "react-hot-toast";

const OrgList = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  const getOrgs = async () => {
    try {
      setLoading(true);
      const { data } = await API.get("/admin/org-list");
      if (data?.success) {
        setData(data?.orgData);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getOrgs();
  }, []);


  const handleDelete = async (id) => {
    try {
      const confirm = window.confirm(
        "Are you sure you want to delete this organization?"
      );
      if (!confirm) return;

      const { data } = await API.delete(`/admin/delete-user/${id}`);
      toast.success(data?.message);
      getOrgs(); // Refresh data
    } catch (error) {
      console.log(error);
      // toast.error("Failed to delete organization");
    }
  };

  const filteredData = data.filter(
    (org) =>
      org.organisationName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      org.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      org.phone.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Layout>
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fadeIn { animation: fadeIn 0.4s ease forwards; }
          .animate-delay-1 { animation-delay: 0.1s; }
          .animate-delay-2 { animation-delay: 0.2s; }
          .animate-delay-3 { animation-delay: 0.3s; }
          .hover-scale:hover { transform: scale(1.02); }
        `}
      </style>

      <div className="min-h-screen p-4 bg-gray-50">
        {/* Header Section */}
        <div className="mb-8 animate-fadeIn">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="flex items-center mb-4 md:mb-0">
              <FaHandsHelping className="text-3xl text-red-600 mr-3" />
              <h1 className="text-2xl font-bold text-gray-800">
                Organizations
              </h1>
            </div>

            <div className="relative w-full md:w-64">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <FiSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search organizations..."
                className="w-full py-2 pl-10 pr-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>

        

        {/* Organization Table */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="w-12 h-12 border-4 border-red-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-md overflow-hidden animate-fadeIn">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Organization
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Contact
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Created
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredData.length > 0 ? (
                    filteredData.map((record, index) => (
                      <tr
                        key={record._id}
                        className="transition-all hover:bg-gray-50"
                        style={{
                          animation: `fadeIn 0.4s ease ${
                            index * 50
                          }ms forwards`,
                          opacity: 0,
                        }}
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10 rounded-full bg-red-100 flex items-center justify-center">
                              <FaHandsHelping className="text-red-600" />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                {record.organisationName}
                              </div>
                              <div className="text-sm text-gray-500">
                                {record.email}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {record.phone || "N/A"}
                          </div>
                          <div className="text-sm text-gray-500">
                            {record.address || "No address"}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {moment(record.createdAt).format("MMM D, YYYY")}
                          </div>
                          <div className="text-sm text-gray-500">
                            {moment(record.createdAt).fromNow()}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              moment(record.updatedAt).isAfter(
                                moment().subtract(7, "days")
                              )
                                ? "bg-green-100 text-green-800"
                                : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {moment(record.updatedAt).isAfter(
                              moment().subtract(7, "days")
                            )
                              ? "Active"
                              : "Inactive"}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex justify-end space-x-2">
                          
                            <button
                              className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-full transition-colors"
                              onClick={() => handleDelete(record._id)}
                            >
                              <FiTrash2 />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="px-6 py-12 text-center">
                        <div className="flex flex-col items-center justify-center">
                          <FaHandsHelping className="text-4xl text-gray-400 mb-4" />
                          <h3 className="text-lg font-medium text-gray-900">
                            No organizations found
                          </h3>
                          <p className="text-gray-500">
                            {searchTerm
                              ? "Try a different search term"
                              : "No organizations registered yet"}
                          </p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default OrgList;
