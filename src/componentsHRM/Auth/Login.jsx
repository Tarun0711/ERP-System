import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import img from "../Images/LoginImage.png"; // Make sure the image path is correct

function Login() {
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate(); // Use the hook for navigation

  // Handle Login
  const handleLogin = async () => {
    try {
      const res = await axios.post("https://erp-backend-o5i3.onrender.com/api/v1/user/login", {
        identifier: email,
        password,
        role,
      });

      if (res.data.success) {
        console.log("Login Response:", res.data); // Check if token is present
        const token = res.data.token;

        if (token) {
          // Store the token in localStorage
          localStorage.setItem("authToken", token);

          // Navigate to the 2FA page after successful login
          navigate("/ad");
        } else {
          setMessage("No token received. Please try again.");
        }
      } else {
        setMessage("Login failed. Please check your credentials.");
      }
    } catch (err) {
      console.error(err);
      setMessage("Error during login. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex w-4/5 h-4/5 overflow-hidden">
        <div className="w-1/2 flex flex-col justify-center bg-white p-10">
          <div className="flex flex-row">
            <div className="h-10 w-10 bg-gray-500 rounded-full"></div>
            <p className="mb-10 text-center flex ml-5 text-3xl">Company Name</p>
          </div>
          <h2 className="text-xl font-semibold mb-6 text-gray-800">
            Welcome User, Sign In
          </h2>

          <form>
            <div className="flex gap-4">
              <div className="mb-4 w-[65%]">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  className="bg-gray-50 border rounded w-full py-2 px-3 border-gray-700"
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  autoComplete="off"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                className="bg-gray-50 border w-[63%] rounded py-2 px-3 text-gray-700"
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="flex items-center justify-between mb-6 w-[63%]">
              <div className="flex items-center">
                <input
                  className="mr-2 leading-tight"
                  type="checkbox"
                  id="rememberMe"
                />
                <label className="text-sm text-gray-600" htmlFor="rememberMe">
                  Remember me
                </label>
              </div>
              <a
                className="inline-block align-baseline font-semibold text-sm text-blue-500"
                href="#"
              >
                Forgot password?
              </a>
            </div>

            {/* Sign In Button */}
            <div className="w-[63%] justify-center flex items-center">
              <button
                className="bg-cyan-500 text-white font-semibold py-2 px-4 rounded w-full"
                type="button"
                onClick={handleLogin} // Call handleLogin function
              >
                Sign In
              </button>
            </div>

            {/* Display login message */}
            {message && <p className="mt-4 text-red-500">{message}</p>}
          </form>
        </div>

        {/* Right Side - Image */}
        <div
          className="w-1/2 bg-cover bg-center"
          style={{ backgroundImage: `url(${img})` }}
        ></div>
      </div>
    </div>
  );
}

export default Login;
