import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import API from '../../Services/API';
import Layout from '../../Component/shared/Layout/Layout';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';

const OrganizationConsumers = () => {
  const { user } = useSelector((state) => state.auth);
  const [data, setData] = useState([]);
  const [orgName, setOrgName] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const getConsumers = async () => {
    try {
      setLoading(true);
      const res = await API.post('/organisation/get-consumer', {
        id: user._id,
      });
      if (res.data.success) {
        setData(res.data.data);
        setOrgName(res.data.organisationName || '');
      }
    } catch (error) {
      console.error('Error fetching consumers:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getConsumers();
  }, [user]);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Consumers from <span className="text-blue-600">{orgName || 'your organization'}</span>
          </h1>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : data.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <div className="text-gray-500 mb-4">
              <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900">No consumer records found</h3>
            <p className="mt-1 text-sm text-gray-500">Hospitals that received blood from your organization will appear here.</p>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hospital</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Blood Group</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {data.map((record, index) => (
                    record.bloodGroups.map((bloodGroup, bloodIndex) => (
                      <tr key={`${index}-${bloodIndex}`} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                              <span className="text-green-600 font-medium">
                                {record.hospitalName?.charAt(0) || 'H'}
                              </span>
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{record.hospitalName || 'Hospital'}</div>
                              <div className="text-sm text-gray-500">{record.email}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            bloodGroup.bloodGroup === 'O-' || bloodGroup.bloodGroup === 'AB-' ? 
                            'bg-purple-100 text-purple-800' : 'bg-red-100 text-red-800'
                          }`}>
                            {bloodGroup.bloodGroup}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {bloodGroup.quantity} ml
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {moment(bloodGroup.receivedAt).format('MMM D, YYYY h:mm A')}
                        </td>
                      </tr>
                    ))
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

export default OrganizationConsumers;
