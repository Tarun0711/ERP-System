import React, { useState } from "react";
import img from "../Images/LoginImage.png"; // Ensure the image path is correct
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Importing eye icons from react-icons
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation

function SignUp() {
  const [email, setEmail] = useState(""); // State for email
  const [password, setPassword] = useState(""); // State for password
  const [confirmPassword, setConfirmPassword] = useState(""); // State for confirm password
  const [showPassword, setShowPassword] = useState(false); // Manage password visibility
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // Manage confirm password visibility
  const [message, setMessage] = useState(""); // For validation messages
  const navigate = useNavigate(); // Initialize navigate

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  // Handle Sign Up button click
  const handleSignUp = () => {
    // Validate inputs
    if (!email || !password || !confirmPassword) {
      setMessage("Please fill in all fields.");
      return;
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    // Navigate to PhoneLogin component, passing email and password
    navigate("/mfa", { state: { email, password, confirmPassword } });
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
            Welcome User, Sign Up
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
                  placeholder="Enter your email address"
                  autoComplete="off"
                  value={email} // Bind state
                  onChange={(e) => setEmail(e.target.value)} // Update state
                />
              </div>
            </div>

            {/* Password Section */}
            <div className="mb-4 relative w-[63%]">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="password"
              >
                Create Your Password
              </label>
              <div className="relative flex items-center">
                <input
                  className="bg-gray-50 border w-full rounded py-2 px-3 text-gray-700"
                  id="password"
                  type={showPassword ? "text" : "password"} // Toggle visibility
                  placeholder="*******************"
                  value={password} // Bind state
                  onChange={(e) => setPassword(e.target.value)} // Update state
                />
                <div
                  className="absolute right-3 cursor-pointer"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? (
                    <FaEyeSlash size={20} />
                  ) : (
                    <FaEye size={20} />
                  )}
                </div>
              </div>
            </div>

            {/* Confirm Password Section */}
            <div className="mb-4 relative w-[63%]">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="confirmPassword"
              >
                Re-enter Your Password
              </label>
              <div className="relative flex items-center">
                <input
                  className="bg-gray-50 border w-full rounded py-2 px-3 text-gray-700"
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"} // Toggle visibility
                  placeholder="*******************"
                  value={confirmPassword} // Bind state
                  onChange={(e) => setConfirmPassword(e.target.value)} // Update state
                />
                <div
                  className="absolute right-3 cursor-pointer"
                  onClick={toggleConfirmPasswordVisibility}
                >
                  {showConfirmPassword ? (
                    <FaEyeSlash size={20} />
                  ) : (
                    <FaEye size={20} />
                  )}
                </div>
              </div>
            </div>

            {/* Display validation message */}
            {message && <p className="mt-4 text-red-500">{message}</p>}

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
            </div>

            {/* Sign Up Button */}
            <div className="w-[63%] justify-center flex items-center">
              <button
                className="bg-cyan-500 text-white font-semibold py-2 px-4 rounded w-full"
                type="button"
                onClick={handleSignUp} // Add onClick handler
              >
                Sign Up
              </button>
            </div>
          </form>

          {/* Other Options */}
          <div className="mt-6 text-center w-[63%]">
            <p className="text-gray-600">You can also continue with Google</p>
            <p className="text-gray-600 mt-2">New User? Sign Up now</p>
          </div>
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

export default SignUp;
