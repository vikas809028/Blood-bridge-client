import React from "react";
import Form from "../../Component/shared/form/Form";
import { useSelector } from "react-redux";
import AuthLayout from "../../Component/shared/Layout/AuthLayout";

const Login = () => {
  const { loading, error } = useSelector((state) => state.auth);

  return (
    <div className="h-screen">
      {error && <span>{alert(error)}</span>}

      {loading ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80">
          <div className="loader"></div>
        </div>
      ) : (
        <AuthLayout>
          <div className="relative h-full">
            {/* Static Banner Section with fade-in */}
            <div className="fixed top-0 left-0 hidden w-2/3 h-screen md:block animate-fade-in">
              <img
                src="./assets/images/banner-1.jpg"
                alt="loginImage"
                className="object-cover w-full h-full"
              />
            </div>

            {/* Scrollable Form Section with slide-in animation */}
            <div className="w-full h-screen overflow-y-auto md:w-1/3 md:ml-[66.666667%] bg-gray-100 animate-slide-in">
              <div className="flex items-center justify-center min-h-screen p-6">
                <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg transform transition-all duration-500 hover:scale-[1.02] animate-fade-up">
                  <Form
                    formTitle={"Login"}
                    submitBtn={"Login"}
                    formType={"login"}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Custom animations */}
          <style jsx="true">{`
            @keyframes fade-in {
              from {
                opacity: 0;
              }
              to {
                opacity: 1;
              }
            }

            @keyframes slide-in {
              from {
                transform: translateX(50px);
                opacity: 0;
              }
              to {
                transform: translateX(0);
                opacity: 1;
              }
            }

            @keyframes fade-up {
              from {
                transform: translateY(20px);
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

            .animate-slide-in {
              animation: slide-in 0.8s ease-out forwards;
            }

            .animate-fade-up {
              animation: fade-up 0.8s ease-out forwards;
            }

            .loader {
              width: 48px;
              height: 48px;
              border: 5px solid #f3f3f3;
              border-top: 5px solid #e53e3e;
              border-radius: 50%;
              animation: spin 1s linear infinite;
            }

            @keyframes spin {
              0% {
                transform: rotate(0deg);
              }
              100% {
                transform: rotate(360deg);
              }
            }
          `}</style>
        </AuthLayout>
      )}
    </div>
  );
};

export default Login;
