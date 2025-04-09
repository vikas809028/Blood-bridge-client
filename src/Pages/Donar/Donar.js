import React from "react";
import Layout from "../../Component/shared/Layout/Layout";
import { Link } from "react-router-dom";

const Donor = () => {
  return (
    <Layout>
      {/* Custom styles and animations */}
      <style>
        {`
          @keyframes fadeInUp {
            0% { opacity: 0; transform: translateY(20px); }
            100% { opacity: 1; transform: translateY(0); }
          }
          @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.02); }
          }
          .fade-in-up {
            animation: fadeInUp 0.8s ease forwards;
          }
          .fade-in-delay-1 { animation-delay: 0.2s; }
          .fade-in-delay-2 { animation-delay: 0.4s; }
          .fade-in-delay-3 { animation-delay: 0.6s; }
          .pulse-hover:hover {
            animation: pulse 2s infinite;
          }
          .gradient-text {
            background: linear-gradient(90deg, #ef4444, #dc2626);
            -webkit-background-clip: text;
            background-clip: text;
            color: transparent;
          }
          .blood-drop {
            position: relative;
          }
          .blood-drop::after {
            content: "🩸";
            position: absolute;
            right: -20px;
            top: -10px;
            font-size: 1.2rem;
          }
        `}
      </style>

      {/* Hero Section */}
      <div className="min-h-screen bg-gradient-to-b from-red-50 to-white">
        <div className="max-w-6xl px-4 py-10 mx-auto">
          <div className="p-8 mx-auto text-center bg-white rounded-2xl shadow-xl transform transition-all duration-500 hover:shadow-2xl fade-in-up">
            <div className="relative inline-block mb-6">
              <h2 className="text-4xl py-4 text-center font-extrabold gradient-text">
                Join the Blood Bridge <span className="blood-drop text-red-600">Community</span>
              </h2>
             
            </div>
            
            <p className="max-w-2xl mx-auto mb-8 text-xl italic font-medium text-gray-700 fade-in-delay-1">
              "A single donation can light up multiple lives. Be someone's hero today."
            </p>

            <div className="p-8 mb-8 bg-gradient-to-r from-red-50 to-red-100 rounded-xl border-l-4 border-red-500 shadow-inner fade-in-delay-2">
              <h3 className="mb-6 text-3xl font-bold text-red-800">
                Why Donate Blood?
              </h3>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="flex items-start p-4 transition-all duration-300 bg-white rounded-lg shadow-md hover:shadow-lg hover:translate-y-1">
                  <div className="p-3 mr-4 text-white bg-red-500 rounded-full">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800">Save Lives</h4>
                    <p className="text-gray-600">One donation can help up to 3 people in need</p>
                  </div>
                </div>
                <div className="flex items-start p-4 transition-all duration-300 bg-white rounded-lg shadow-md hover:shadow-lg hover:translate-y-1">
                  <div className="p-3 mr-4 text-white bg-red-500 rounded-full">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800">Health Benefits</h4>
                    <p className="text-gray-600">Reduces iron overload and improves cardiovascular health</p>
                  </div>
                </div>
                <div className="flex items-start p-4 transition-all duration-300 bg-white rounded-lg shadow-md hover:shadow-lg hover:translate-y-1">
                  <div className="p-3 mr-4 text-white bg-red-500 rounded-full">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800">Community Impact</h4>
                    <p className="text-gray-600">Strengthens community bonds and inspires others</p>
                  </div>
                </div>
                <div className="flex items-start p-4 transition-all duration-300 bg-white rounded-lg shadow-md hover:shadow-lg hover:translate-y-1">
                  <div className="p-3 mr-4 text-white bg-red-500 rounded-full">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800">Quick Process</h4>
                    <p className="text-gray-600">Only takes about 10 minutes to donate</p>
                  </div>
                </div>
              </div>
            </div>

            <Link
              to="/donate"
              className="inline-block px-8 py-3 text-lg font-bold text-white transition-all duration-300 transform bg-red-600 rounded-lg shadow-lg hover:bg-red-700 hover:scale-105 hover:shadow-xl pulse-hover fade-in-delay-3"
            >
              Become a Donor Now
            </Link>
          </div>

          {/* Testimonials Section */}
          <div className="max-w-4xl p-10 mx-auto mt-16 text-left bg-white rounded-2xl shadow-xl fade-in-up fade-in-delay-1">
            <div className="mb-8 text-center">
              <h3 className="text-3xl font-bold text-red-800">Stories That Inspire</h3>
              <div className="w-20 h-1 mx-auto mt-2 bg-red-500 rounded-full"></div>
            </div>
            <div className="grid gap-8 md:grid-cols-2">
              <div className="p-6 transition-all duration-300 bg-red-50 rounded-xl hover:shadow-md">
                <div className="flex items-center mb-4">
                  <div className="flex items-center justify-center w-12 h-12 mr-4 text-xl font-bold text-white bg-red-600 rounded-full">AA</div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Ashutosh Anand</h4>
                    <p className="text-sm text-gray-600">Regular Donor</p>
                  </div>
                </div>
                <blockquote className="pl-2 text-gray-700 border-l-4 border-red-500">
                  "Donating through Blood Bridge was seamless. The staff was professional and made me feel comfortable throughout the process. Knowing my blood helped save lives gives me immense satisfaction."
                </blockquote>
              </div>
              <div className="p-6 transition-all duration-300 bg-red-50 rounded-xl hover:shadow-md">
                <div className="flex items-center mb-4">
                  <div className="flex items-center justify-center w-12 h-12 mr-4 text-xl font-bold text-white bg-red-600 rounded-full">VT</div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Vikas Tiwari</h4>
                    <p className="text-sm text-gray-600">First-time Donor</p>
                  </div>
                </div>
                <blockquote className="pl-2 text-gray-700 border-l-4 border-red-500">
                  "I was nervous about donating for the first time, but the team at Blood Bridge made it so easy. The platform helped me find a nearby center and schedule my appointment. I'll definitely donate again!"
                </blockquote>
              </div>
            </div>
          </div>

         
        </div>
      </div>
    </Layout>
  );
};

export default Donor;