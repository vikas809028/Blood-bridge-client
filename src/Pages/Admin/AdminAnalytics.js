import React, { useState, useEffect } from "react";
import API from "./../../Services/API";
import moment from "moment";
import Layout from "../../Component/shared/Layout/Layout";
import { useSelector } from "react-redux";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts";

const AdminAnalytics = () => {
  const { user } = useSelector((state) => state.auth);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [timeFilter, setTimeFilter] = useState("all"); // "day", "week", "month", "all"

  const colorPalette = [
    "#FF6B6B", "#4ECDC4", "#45B7D1", "#FFA07A", 
    "#98D8C8", "#F06292", "#7986CB", "#9575CD"
  ];

  // Fetch blood group analytics data
  const getBloodGroupData = async () => {
    try {
      setLoading(true);
      const { data } = await API.get("/admin/get-analytics");
      if (data?.success) {
        setData(data?.bloodGroupData);
      }
    } catch (error) {
      console.error("Error fetching analytics:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getBloodGroupData();
  }, [timeFilter]);

  // Prepare data for charts
  const chartData = data?.map(item => ({
    name: item.bloodGroup,
    totalIn: item.totalIn,
    totalOut: item.totalOut,
    available: item.availableBlood
  }));

  const pieData = data?.map(item => ({
    name: item.bloodGroup,
    value: item.availableBlood,
    color: colorPalette[data.indexOf(item) % colorPalette.length]
  }));

  // Calculate totals
  const totalAvailable = data?.reduce((sum, item) => sum + item.availableBlood, 0) || 0;
  const totalIn = data?.reduce((sum, item) => sum + item.totalIn, 0) || 0;
  const totalOut = data?.reduce((sum, item) => sum + item.totalOut, 0) || 0;

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 p-4 md:p-8">
        {/* Dashboard Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Blood Bank Analytics Dashboard
          </h1>
          <p className="text-gray-600">
            Insights and statistics about blood inventory
          </p>
          <div className="flex justify-center mt-4 space-x-2">
            {["day", "week", "month", "all"].map((filter) => (
              <button
                key={filter}
                onClick={() => setTimeFilter(filter)}
                className={`px-4 py-2 rounded-full text-sm font-medium ${
                  timeFilter === filter
                    ? "bg-red-600 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                {filter.charAt(0).toUpperCase() + filter.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="w-12 h-12 border-4 border-red-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <>
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-green-500">
                <h3 className="text-gray-500 font-medium">Total Blood Available</h3>
                <p className="text-3xl font-bold text-green-600">{totalAvailable} ml</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-blue-500">
                <h3 className="text-gray-500 font-medium">Total Blood Received</h3>
                <p className="text-3xl font-bold text-blue-600">{totalIn} ml</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-red-500">
                <h3 className="text-gray-500 font-medium">Total Blood Distributed</h3>
                <p className="text-3xl font-bold text-red-600">{totalOut} ml</p>
              </div>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              <div className="bg-white p-6 rounded-xl shadow-md">
                <h3 className="text-lg font-semibold mb-4 text-gray-800">
                  Blood Inventory Flow
                </h3>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={chartData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="totalIn" fill="#3B82F6" name="Blood In" />
                      <Bar dataKey="totalOut" fill="#EF4444" name="Blood Out" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-md">
                <h3 className="text-lg font-semibold mb-4 text-gray-800">
                  Current Stock Distribution
                </h3>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        nameKey="name"
                        label={({ name, percent }) => 
                          `${name} ${(percent * 100).toFixed(0)}%`
                        }
                      >
                        {pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* Blood Group Cards */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4 text-gray-800">
                Detailed Blood Group Analytics
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {data?.map((record, i) => (
                  <div
                    key={i}
                    className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105"
                  >
                    <div 
                      className="h-3"
                      style={{ backgroundColor: colorPalette[i % colorPalette.length] }}
                    ></div>
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="text-lg font-bold text-gray-800">
                          {record.bloodGroup}
                        </h4>
                        <span className="px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">
                          {((record.availableBlood / totalAvailable) * 100).toFixed(1)}%
                        </span>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Available:</span>
                          <span className="font-medium">{record.availableBlood} ml</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Received:</span>
                          <span className="font-medium text-blue-600">{record.totalIn} ml</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Distributed:</span>
                          <span className="font-medium text-red-600">{record.totalOut} ml</span>
                        </div>
                        <div className="pt-2">
                          <div className="h-2 bg-gray-200 rounded-full">
                            <div
                              className="h-2 rounded-full"
                              style={{
                                backgroundColor: colorPalette[i % colorPalette.length],
                                width: `${(record.availableBlood / (record.totalIn || 1)) * 100}%`
                              }}
                            ></div>
                          </div>
                          <div className="text-xs text-gray-500 mt-1 text-right">
                            Utilization: {((record.totalOut / (record.totalIn || 1)) * 100).toFixed(1)}%
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </>
        )}
      </div>
    </Layout>
  );
};

export default AdminAnalytics;