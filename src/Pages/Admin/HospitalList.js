import React, { useEffect, useState } from "react";
import Layout from "../../Component/shared/Layout/Layout";
import moment from "moment";
import API from "../../Services/API";
import { FiTrash2, FiEdit2, FiPhone, FiMail, FiCalendar, FiHome, FiSearch, FiPlus } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { Tooltip } from "react-tooltip";

const HospitalList = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterOption, setFilterOption] = useState("all");
  const [sortOption, setSortOption] = useState("newest");

  const getHospitals = async () => {
    try {
      setIsLoading(true);
      const { data } = await API.get("/admin/hospital-list");
      if (data?.success) {
        setData(data?.hospitalData);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getHospitals();
  }, []);

  const handleDelete = async (id) => {
    try {
      let answer = window.confirm("Are you sure you want to delete this hospital? This action cannot be undone.");
      if (!answer) return;
      const { data } = await API.delete(`/admin/delete-user/${id}`);
      alert(data?.message);
      getHospitals(); // Refresh data without full page reload
    } catch (error) {
      console.log(error);
      alert("Failed to delete hospital. Please try again.");
    }
  };

  // Filter and sort logic
  const filteredData = data
    .filter((hospital) => {
      const matchesSearch = hospital.hospitalName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          hospital.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          hospital.phone.toLowerCase().includes(searchTerm.toLowerCase());
      
      if (filterOption === "recent") {
        return matchesSearch && moment().diff(moment(hospital.createdAt), 'days') <= 7;
      }
      return matchesSearch;
    })
    .sort((a, b) => {
      if (sortOption === "newest") {
        return new Date(b.createdAt) - new Date(a.createdAt);
      } else {
        return new Date(a.createdAt) - new Date(b.createdAt);
      }
    });

  // Statistics
  const totalHospitals = data.length;
  const recentHospitals = data.filter(h => moment().diff(moment(h.createdAt), 'days') <= 7).length;

  return (
    <Layout>
      <div className="p-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Hospital Management</h1>
              <p className="text-gray-600 mt-1">Manage all registered hospitals in the system</p>
            </div>
            <button 
              className="mt-4 md:mt-0 flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              onClick={() => alert("Add new hospital functionality would go here")}
            >
              <FiPlus className="mr-2" /> Add Hospital
            </button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-white p-4 rounded-xl shadow border-l-4 border-blue-500"
            >
              <h3 className="text-gray-500 text-sm">Total Hospitals</h3>
              <p className="text-2xl font-bold text-gray-800">{totalHospitals}</p>
            </motion.div>
            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-white p-4 rounded-xl shadow border-l-4 border-green-500"
            >
              <h3 className="text-gray-500 text-sm">New This Week</h3>
              <p className="text-2xl font-bold text-gray-800">{recentHospitals}</p>
            </motion.div>
            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-white p-4 rounded-xl shadow border-l-4 border-purple-500"
            >
              <h3 className="text-gray-500 text-sm">Active Today</h3>
              <p className="text-2xl font-bold text-gray-800">{Math.floor(totalHospitals * 0.7)}</p>
            </motion.div>
          </div>

          {/* Search and Filter Bar */}
          <div className="mt-6 bg-white p-4 rounded-xl shadow">
            <div className="flex flex-col md:flex-row md:items-center md:space-x-4 space-y-4 md:space-y-0">
              <div className="relative flex-grow">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiSearch className="text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search hospitals by name, email or phone..."
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <div className="flex space-x-2">
                <select 
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={filterOption}
                  onChange={(e) => setFilterOption(e.target.value)}
                >
                  <option value="all">All Hospitals</option>
                  <option value="recent">Added Last 7 Days</option>
                </select>
                
                <select 
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                </select>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Main Table */}
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-xl shadow-md overflow-hidden"
          >
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gradient-to-r from-blue-600 to-blue-500">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">
                      <div className="flex items-center">
                        <FiHome className="mr-2" /> Hospital Name
                      </div>
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">
                      <div className="flex items-center">
                        <FiMail className="mr-2" /> Email
                      </div>
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">
                      <div className="flex items-center">
                        <FiPhone className="mr-2" /> Phone
                      </div>
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">
                      <div className="flex items-center">
                        <FiCalendar className="mr-2" /> Registration Date
                      </div>
                    </th>
                    <th className="px-6 py-4 text-right text-xs font-medium text-white uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <AnimatePresence>
                    {filteredData.length > 0 ? (
                      filteredData.map((record, index) => (
                        <motion.tr
                          key={record._id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.05 }}
                          className="hover:bg-blue-50 transition-colors duration-150"
                        >
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                <FiHome className="h-5 w-5 text-blue-600" />
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">
                                  {record.hospitalName}
                                </div>
                                <div className="text-xs text-gray-500">
                                  ID: {record._id.substring(18, 24).toUpperCase()}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{record.email}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              <a 
                                href={`tel:${record.phone}`}
                                className="hover:text-blue-600 hover:underline"
                              >
                                {record.phone}
                              </a>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {moment(record.createdAt).format("DD MMM YYYY")}
                              <div className="text-xs text-gray-500">
                                {moment(record.createdAt).fromNow()}
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <div className="flex justify-end space-x-2">
                              <motion.button
                                data-tooltip-id="edit-tooltip"
                                data-tooltip-content="Edit Hospital"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => alert("Edit functionality would go here")}
                                className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-xs font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
                              >
                                <FiEdit2 className="mr-1" /> Edit
                              </motion.button>
                              <motion.button
                                data-tooltip-id="delete-tooltip"
                                data-tooltip-content="Delete Hospital"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => handleDelete(record._id)}
                                className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all duration-200"
                              >
                                <FiTrash2 className="mr-1" /> Delete
                              </motion.button>
                            </div>
                          </td>
                        </motion.tr>
                      ))
                    ) : (
                      <motion.tr
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                      >
                        <td colSpan="5" className="px-6 py-12 text-center">
                          <div className="flex flex-col items-center justify-center">
                            <svg
                              className="mx-auto h-12 w-12 text-gray-400"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1}
                                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            </svg>
                            <h3 className="mt-2 text-lg font-medium text-gray-900">
                              No hospitals found
                            </h3>
                            <p className="mt-1 text-sm text-gray-500">
                              {searchTerm ? "Try a different search term" : "No hospitals available in the system"}
                            </p>
                          </div>
                        </td>
                      </motion.tr>
                    )}
                  </AnimatePresence>
                </tbody>
              </table>
            </div>
          </motion.div>
        )}
        
        <Tooltip id="delete-tooltip" />
      </div>
    </Layout>
  );
};

export default HospitalList;