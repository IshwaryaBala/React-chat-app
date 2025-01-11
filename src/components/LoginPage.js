import React from "react";
import { Formik, Form } from "formik";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import contactusBg from "../assets/contactusBg.png";
import reactchatapp from "../assets/reactchatapp.png";

const LoginPage = () => {
  const navigate = useNavigate();

  const handleGoogleLoginSuccess = (response) => {
    console.log("Google Login Success:", response);
    // Show toast notification
    toast.success("Successfully logged in!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    // Redirect to home page
    navigate("/home");
  };

  const handleGoogleLoginFailure = (error) => {
    console.error("Google Login Failed:", error);
  };

  return (
    <GoogleOAuthProvider clientId="286050748498-dp0jgub2qrnklblnje5lclbt88v7294n.apps.googleusercontent.com">
      <div className="flex h-screen justify-center bg-white">
        {/* Left side with Form */}
        <div
          className="flex items-center justify-center w-[40rem] h-[30rem] p-5 m-[5rem] rounded-lg"
          style={{
            backgroundImage: `url(${contactusBg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="flex flex-col items-center justify-around">
            <Formik>
              <Form
                className="w-[30rem] max-w-md space-y-4"
                autoComplete="off"
                role="presentation"
              >
                <h1 className="text-4xl font-bold flex justify-around">
                  Welcome back!
                </h1>
                <img src={reactchatapp} />

                {/* Sign in with Google Button */}
                <GoogleLogin
                  onSuccess={handleGoogleLoginSuccess}
                  onError={handleGoogleLoginFailure}
                  className="w-[30rem] gap-2 flex items-center justify-around border border-gray-300 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white"
                >
                  Sign in with Google
                </GoogleLogin>
              </Form>
            </Formik>
          </div>
        </div>
        <ToastContainer />
      </div>
    </GoogleOAuthProvider>
  );
};

export default LoginPage;
