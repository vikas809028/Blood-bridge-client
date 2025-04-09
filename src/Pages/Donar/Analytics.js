import React, { useEffect, useState } from "react";
import API from "../../Services/API";
import Layout from "../../Component/shared/Layout/Layout";

const HospitalBloodStock = () => {
  const [bloodStock, setBloodStock] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedBloodGroup, setSelectedBloodGroup] = useState(null);

  useEffect(() => {
    const fetchHospitalBloodStock = async () => {
      try {
        const { data } = await API.get("/donor/hospitals-blooddata");
        if (data?.success) {
          setBloodStock(data.data);
        }
      } catch (error) {
        console.error("Error fetching hospital blood stock:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchHospitalBloodStock();
  }, []);

  // Calculate total blood units across all hospitals
  const totalBloodUnits = bloodStock.reduce((total, hospital) => {
    return total + Object.values(hospital.bloodGroups).reduce((sum, group) => sum + group.available, 0);
  }, 0);

  // Get all unique blood groups from all hospitals
  const allBloodGroups = Array.from(
    new Set(bloodStock.flatMap(hospital => Object.keys(hospital.bloodGroups)))
  ).sort();

  // Filter hospitals by selected blood group
  const filteredHospitals = selectedBloodGroup
    ? bloodStock.filter(hospital => 
        hospital.bloodGroups[selectedBloodGroup]?.available > 0)
    : bloodStock;

  return (
    <Layout>
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fadeIn { animation: fadeIn 0.6s ease-out forwards; }
          .animate-delay-1 { animation-delay: 0.2s; }
          .animate-delay-2 { animation-delay: 0.4s; }
          .pulse {
            animation: pulse 2s infinite;
          }
          @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.02); }
          }
          .blood-drop {
            position: relative;
          }
          .blood-drop::after {
            content: "💧";
            position: absolute;
            right: -25px;
            top: -5px;
            font-size: 1.5rem;
          }
        `}
      </style>

      <div className="min-h-screen bg-gradient-to-b from-red-50 to-white">
        <div className="container px-4 py-12 mx-auto">
          {/* Header Section */}
          <div className="text-center mb-12 animate-fadeIn">
            <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-800 mb-4 blood-drop">
              Blood Availability Dashboard
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Real-time blood stock levels across partner hospitals
            </p>
          </div>

          {/* Summary Cards */}
          {!isLoading && bloodStock.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 animate-fadeIn animate-delay-1">
              <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-red-500 hover:shadow-xl transition-all">
                <h3 className="text-gray-500 font-medium">Total Hospitals</h3>
                <p className="text-3xl font-bold text-red-600">{bloodStock.length}</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-red-500 hover:shadow-xl transition-all">
                <h3 className="text-gray-500 font-medium">Total Blood Units</h3>
                <p className="text-3xl font-bold text-red-600">{totalBloodUnits}</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-red-500 hover:shadow-xl transition-all">
                <h3 className="text-gray-500 font-medium">Blood Groups Tracked</h3>
                <p className="text-3xl font-bold text-red-600">{allBloodGroups.length}</p>
              </div>
            </div>
          )}

          {/* Blood Group Filter */}
          {allBloodGroups.length > 0 && (
            <div className="mb-8 animate-fadeIn animate-delay-2">
              <div className="flex flex-wrap items-center justify-center gap-3 mb-4">
                <button
                  onClick={() => setSelectedBloodGroup(null)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    !selectedBloodGroup
                      ? "bg-red-600 text-white shadow-md"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  All Groups
                </button>
                {allBloodGroups.map(group => (
                  <button
                    key={group}
                    onClick={() => setSelectedBloodGroup(group)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      selectedBloodGroup === group
                        ? "bg-red-600 text-white shadow-md"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                  >
                    {group}
                  </button>
                ))}
              </div>
              {selectedBloodGroup && (
                <p className="text-center text-gray-600">
                  Showing hospitals with available <span className="font-bold text-red-600">{selectedBloodGroup}</span> blood
                </p>
              )}
            </div>
          )}

          {/* Loading State */}
          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <div className="w-12 h-12 border-4 border-red-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
            /* Hospital Cards */
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredHospitals.length === 0 ? (
                <div className="col-span-full text-center py-12">
                  <svg
                    className="mx-auto h-16 w-16 text-gray-400"
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
                  <h3 className="mt-4 text-lg font-medium text-gray-900">
                    No matching hospitals found
                  </h3>
                  <p className="mt-1 text-gray-500">
                    {selectedBloodGroup
                      ? `No hospitals currently have ${selectedBloodGroup} blood in stock`
                      : "No hospital data available"}
                  </p>
                </div>
              ) : (
                filteredHospitals.map((hospital, index) => (
                  <div
                    key={hospital.hospitalId}
                    className={`bg-white border border-gray-200 rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:transform hover:-translate-y-1 animate-fadeIn`}
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    {/* Hospital Header */}
                    <div className="bg-gradient-to-r from-red-600 to-red-700 p-4 text-center">
                      <h3 className="text-xl font-bold text-white flex items-center justify-center">
                        <svg
                          className="w-6 h-6 mr-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                          />
                        </svg>
                        {hospital.hospitalName}
                      </h3>
                    </div>

                    {/* Blood Group Availability */}
                    <div className="p-4">
                      <div className="grid grid-cols-2 gap-3">
                        {Object.entries(hospital.bloodGroups)
                          .sort(([a], [b]) => a.localeCompare(b))
                          .map(([bloodGroup, groupData]) => (
                            <div
                              key={bloodGroup}
                              className={`p-3 rounded-lg transition-all ${
                                groupData.available > 0
                                  ? "bg-green-50 hover:bg-green-100"
                                  : "bg-gray-100 hover:bg-gray-200"
                              } ${
                                selectedBloodGroup === bloodGroup
                                  ? "ring-2 ring-red-500"
                                  : ""
                              }`}
                              onClick={() => setSelectedBloodGroup(bloodGroup)}
                            >
                              <div className="flex justify-between items-center">
                                <span
                                  className={`font-bold ${
                                    groupData.available > 0
                                      ? "text-gray-800"
                                      : "text-gray-500"
                                  }`}
                                >
                                  {bloodGroup}
                                </span>
                                <span
                                  className={`text-sm font-bold ${
                                    groupData.available > 0
                                      ? "text-green-600"
                                      : "text-red-500"
                                  }`}
                                >
                                  {groupData.available} unit
                                  {groupData.available !== 1 ? "s" : ""}
                                </span>
                              </div>
                              {groupData.available > 0 && (
                                <div className="mt-1 h-2 bg-green-200 rounded-full overflow-hidden">
                                  <div
                                    className="h-full bg-green-500"
                                    style={{
                                      width: `${Math.min(
                                        100,
                                        (groupData.available / 50) * 100
                                      )}%`,
                                    }}
                                  ></div>
                                </div>
                              )}
                            </div>
                          ))}
                      </div>
                    </div>

                    {/* Hospital Contact Info (if available) */}
                    {hospital.contactInfo && (
                      <div className="px-4 py-3 bg-gray-50 border-t border-gray-200 text-sm text-gray-600">
                        <div className="flex items-center">
                          <svg
                            className="w-4 h-4 mr-2 text-gray-500"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                            />
                          </svg>
                          {hospital.contactInfo}
                        </div>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default HospitalBloodStock;