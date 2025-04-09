import React from "react";
import Layout from "../../Component/shared/Layout/Layout";
import { useSelector } from "react-redux";
import { FiUsers, FiDroplet, FiActivity, FiClock, FiAward } from "react-icons/fi";
import { motion } from "framer-motion";

const AdminHome = () => {
  const { user } = useSelector((state) => state.auth);


  const stats = [
    { title: "Total Donors", value: "1,248", icon: <FiUsers className="text-2xl" />, change: "+12% this month" },
    { title: "Blood Units Available", value: "356", icon: <FiDroplet className="text-2xl" />, trend: "critical" },
    { title: "Active Requests", value: "42", icon: <FiActivity className="text-2xl" /> },
    { title: "Recent Donations", value: "87", icon: <FiClock className="text-2xl" />, change: "+5% this week" },
  ];

  const recentActivities = [
    { id: 1, action: "New donor registered", time: "2 minutes ago", user: "John Doe" },
    { id: 2, action: "Blood request fulfilled", time: "15 minutes ago", units: "2 units O+" },
    { id: 3, action: "New hospital joined", time: "1 hour ago", name: "City General Hospital" },
    { id: 4, action: "Campaign created", time: "3 hours ago", title: "Summer Blood Drive" },
  ];

  return (
    <Layout>
      <div className="px-4 py-8 mx-auto max-w-7xl">
        {/* Welcome Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10 text-center"
        >
          <h1 className="text-4xl font-bold text-gray-800">
            Welcome back, <span className="text-blue-600">{user?.name}</span>
          </h1>
          <p className="mt-2 text-lg text-gray-600">
            Here's what's happening with Blood Bridge today
          </p>
        </motion.div>

       

        {/* Mission Statement */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="p-8 mb-10 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl"
        >
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center justify-center p-4 mb-4 bg-white rounded-full shadow-sm">
              <FiAward className="text-3xl text-blue-600" />
            </div>
            <h2 className="mb-4 text-2xl font-bold text-gray-800">Our Mission at Blood Bridge</h2>
            <p className="mb-4 text-gray-700">
              Founded by Gungun Saluja, Ashutosh Anand, Vikas Tiwari, and Dhruv Kumar, Blood Bridge is committed
              to creating a seamless connection between blood donors and those in urgent need. Every donation
              represents a lifeline - a chance to save lives and strengthen our community.
            </p>
            <p className="text-gray-700">
              As an administrator, you play a vital role in maintaining this lifesaving network. Thank you for your
              dedication to this noble cause.
            </p>
          </div>
        </motion.div>


         {/* Statistics Cards */}
         <div className="grid grid-cols-1 gap-6 mb-10 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`p-6 rounded-xl shadow-sm border ${stat.trend === "critical" ? "bg-red-50 border-red-100" : "bg-white border-gray-100"}`}
              whileHover={{ y: -5 }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                  <p className="mt-1 text-3xl font-semibold text-gray-800">{stat.value}</p>
                  {stat.change && (
                    <p className="mt-1 text-xs font-medium text-green-500">{stat.change}</p>
                  )}
                </div>
                <div className={`p-3 rounded-full ${stat.trend === "critical" ? "bg-red-100 text-red-600" : "bg-blue-100 text-blue-600"}`}>
                  {stat.icon}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        
       
      </div>
    </Layout>
  );
};

export default AdminHome;