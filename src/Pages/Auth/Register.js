import React from "react";
import Form from "../../Component/shared/form/Form";
import { useSelector } from "react-redux";
import Spinner from "../../Component/shared/Spinner";
import AuthLayout from "../../Component/shared/Layout/AuthLayout";

const Register = () => {
  const { loading, error } = useSelector((state) => state.auth);

  return (
    <>
      {error && <span>{alert(error)}</span>}
      {loading ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80">
          <div className="w-12 h-12 border-t-4 border-red-600 rounded-full loader animate-spin"></div>
        </div>
      ) : (
        <AuthLayout>
          <div className="relative h-full">
            {/* Static Banner Section */}
            <div className="fixed top-0 left-0 hidden w-2/3 h-screen md:block animate-fade-in">
              <img
                src="./assets/images/banner-2.jpg"
                alt="Blood donation illustration"
                loading="lazy"
                className="object-fill w-full h-full rounded-lg shadow-lg"
              />
            </div>

            {/* Scrollable Form Section */}
            <div className="w-full h-screen overflow-y-auto md:w-1/3 md:ml-[66.666667%] bg-gray-100">
              <div className="flex items-center justify-center min-h-screen p-6">
                <div className="w-full max-w-md p-8 transition duration-700 ease-in-out transform bg-white rounded-lg shadow-xl animate-slide-up fade-in">
                  <Form
                    formTitle="Register"
                    submitBtn="Register"
                    formType="register"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Custom Animations */}
          <style jsx="true">{`
            @keyframes fade-in {
              from {
                opacity: 0;
              }
              to {
                opacity: 1;
              }
            }

            @keyframes slide-up {
              from {
                transform: translateY(30px);
                opacity: 0;
              }
              to {
                transform: translateY(0);
                opacity: 1;
              }
            }

            .animate-fade-in {
              animation: fade-in 1s ease-out forwards;
            }

            .animate-slide-up {
              animation: slide-up 0.8s ease-out forwards;
            }

            .fade-in {
              opacity: 0;
              animation: fade-in 0.8s ease-out forwards;
            }
          `}</style>
        </AuthLayout>
      )}
    </>
  );
};

export default Register;
