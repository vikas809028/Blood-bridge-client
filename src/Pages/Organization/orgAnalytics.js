import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import API from '../../Services/API';
import Layout from '../../Component/shared/Layout/Layout';
import { useNavigate } from 'react-router-dom';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { FiDroplet, FiTrendingUp, FiTrendingDown, FiDatabase } from 'react-icons/fi';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const OrganizationAnalytics = () => {
  const { user } = useSelector((state) => state.auth);
  const [bloodData, setBloodData] = useState([]);
  const [orgName, setOrgName] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const getAnalytics = async () => {
    try {
      setLoading(true);
      const res = await API.post('/organisation/get-analytics', {
        id: user._id,
      });
      if (res.data.success) {
        setBloodData(res.data.data || []);
        setOrgName(res.data.organizationName || '');
      }
    } catch (error) {
      console.error('Error fetching analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAnalytics();
  }, [user]);

  // Calculate totals
  const totalReceived = bloodData.reduce((sum, item) => sum + item.totalReceived, 0);
  const totalGiven = bloodData.reduce((sum, item) => sum + item.totalGiven, 0);
  const totalAvailable = bloodData.reduce((sum, item) => sum + item.available, 0);

  const chartData = {
    labels: bloodData.map(item => item.bloodGroup),
    datasets: [
      {
        label: 'Received',
        data: bloodData.map(item => item.totalReceived),
        backgroundColor: 'rgba(59, 130, 246, 0.7)',
        borderRadius: 4,
      },
      {
        label: 'Distributed',
        data: bloodData.map(item => item.totalGiven),
        backgroundColor: 'rgba(239, 68, 68, 0.7)',
        borderRadius: 4,
      },
      {
        label: 'Available',
        data: bloodData.map(item => item.available),
        backgroundColor: 'rgba(16, 185, 129, 0.7)',
        borderRadius: 4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          boxWidth: 12,
          padding: 20,
          usePointStyle: true,
          pointStyle: 'circle',
        }
      },
      title: {
        display: true,
        text: 'Blood Inventory Analytics',
        font: {
          size: 16,
          weight: 'bold'
        },
        padding: {
          top: 10,
          bottom: 20
        }
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleFont: {
          size: 14,
          weight: 'bold'
        },
        bodyFont: {
          size: 12
        },
        padding: 12,
        usePointStyle: true,
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          drawBorder: false,
          color: 'rgba(0, 0, 0, 0.05)',
        },
        ticks: {
          stepSize: 10
        },
        title: {
          display: true,
          text: 'Quantity (units)',
          font: {
            weight: 'bold'
          }
        },
      },
      x: {
        grid: {
          display: false,
          drawBorder: false,
        }
      }
    },
  };

  const getBloodGroupColor = (bloodGroup) => {
    const colors = {
      'O+': 'bg-red-100 text-red-800',
      'O-': 'bg-red-200 text-red-900',
      'A+': 'bg-blue-100 text-blue-800',
      'A-': 'bg-blue-200 text-blue-900',
      'B+': 'bg-green-100 text-green-800',
      'B-': 'bg-green-200 text-green-900',
      'AB+': 'bg-purple-100 text-purple-800',
      'AB-': 'bg-purple-200 text-purple-900',
    };
    return colors[bloodGroup] || 'bg-gray-100 text-gray-800';
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
              Analytics for <span className="text-blue-600">{orgName || 'your organization'}</span>
            </h1>
            <p className="text-gray-600 mt-2">
              Overview of blood inventory and distribution
            </p>
          </div>
          
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : bloodData.length === 0 ? (
          <div className="bg-white rounded-xl shadow p-8 text-center">
            <div className="text-gray-500 mb-4">
              <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900">No analytics data available</h3>
            <p className="mt-1 text-sm text-gray-500">Analytics will appear here once your organization has donation and distribution records.</p>
          </div>
        ) : (
          <div className="space-y-8">
            <div className="bg-white p-6 rounded-xl shadow">
              <h2 className="text-xl font-semibold mb-4">Blood Inventory Summary</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
                  <div className="flex items-center">
                    <div className="p-3 rounded-full bg-blue-100 text-blue-600 mr-4">
                      <FiTrendingUp size={20} />
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-blue-800">Total Received</h3>
                      <p className="text-2xl font-bold text-blue-600">
                        {totalReceived} units
                      </p>
                    </div>
                  </div>
                </div>
                <div className="bg-red-50 p-6 rounded-lg border border-red-100">
                  <div className="flex items-center">
                    <div className="p-3 rounded-full bg-red-100 text-red-600 mr-4">
                      <FiTrendingDown size={20} />
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-red-800">Total Distributed</h3>
                      <p className="text-2xl font-bold text-red-600">
                        {totalGiven} units
                      </p>
                    </div>
                  </div>
                </div>
                <div className="bg-green-50 p-6 rounded-lg border border-green-100">
                  <div className="flex items-center">
                    <div className="p-3 rounded-full bg-green-100 text-green-600 mr-4">
                      <FiDatabase size={20} />
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-green-800">Current Inventory</h3>
                      <p className="text-2xl font-bold text-green-600">
                        {totalAvailable} units
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow">
              <h2 className="text-xl font-semibold mb-6">Blood Group Analytics</h2>
              <div className="w-full" style={{ height: '400px' }}>
                <Bar data={chartData} options={chartOptions} />
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow">
              <h2 className="text-xl font-semibold mb-6">Detailed Inventory</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Blood Group</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Received</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Distributed</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Available</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {bloodData.map((item, index) => (
                      <tr key={index} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getBloodGroupColor(item.bloodGroup)}`}>
                            {item.bloodGroup}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {item.totalReceived}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {item.totalGiven}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                          {item.available}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default OrganizationAnalytics;