import React, { useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom"; // Import useNavigate
import img from "../Images/LoginImage.png"; // Ensure the image path is correct

function PhoneLogin() {
  const [role, setRole] = useState("");
  const [contactNumber, setPhoneNumber] = useState("");
  const [showOtpFields, setShowOtpFields] = useState(false);
  const [otp, setOtp] = useState(Array(4).fill(""));
  const [message, setMessage] = useState(""); // For displaying success/error messages
  const location = useLocation();
  const navigate = useNavigate(); // Initialize navigate
  const { email, password, confirmPassword } = location.state || {}; // Get these from location

  // Handle OTP input field changes
  const handleOtpChange = (index, value) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
  };

  // Handle sending OTP
  const handleSendOtp = async () => {
    if (!contactNumber) {
      setMessage("Please enter your phone number.");
      return;
    }

    try {
      const res = await axios.post(
        "https://erp-backend-o5i3.onrender.com/api/v1/user/sendotp",
        {
          contactNumber, // Send the phone number
        }
      );

      if (res.data.success) {
        setShowOtpFields(true); // Show OTP fields when OTP is sent
        setMessage("OTP sent successfully!");
      } else {
        setMessage("Failed to send OTP.");
      }
    } catch (err) {
      console.error(err);
      setMessage("Error sending OTP.");
    }
  };

  // Handle sign-up submission
  const handleSignUp = async () => {
    // Join OTP array into a single string
    const fullOtp = otp.join("");

    if (
      !role ||
      !contactNumber ||
      !fullOtp ||
      !email ||
      !password ||
      !confirmPassword
    ) {
      setMessage("Please fill all fields and enter the OTP.");
      return;
    }

    try {
      const res = await axios.post("https://erp-backend-o5i3.onrender.com/api/v1/user/signup", {
        contactNumber,
        email,
        password,
        role,
        otp: fullOtp, // Sending the complete OTP as a string
      });
      if (res.data.success) {
        navigate("/"); // Navigate to login page on success
      } else {
        setMessage("Failed to sign up. Please try again.");
      }
    } catch (err) {
      console.error(err);
      setMessage("Error signing up. Please try again.");
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
            Multi-Factor Authentication for security
          </h2>

          {/* Form for phone number and role */}
          <form>
            <div className="flex gap-4">
              <div className="mb-4 w-[65%]">
                <label
                  className="block text-gray-700 text-sm font-semibold mb-2"
                  htmlFor="phoneNumber"
                >
                  Phone Number
                </label>
                <input
                  className="bg-gray-50 border rounded w-full py-2 px-3 border-gray-700"
                  id="phoneNumber"
                  type="number"
                  placeholder="Enter your phone number"
                  value={contactNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </div>
              <div className="mb-4 w-[35%]">
                <label
                  className="block text-gray-700 text-sm font-semibold mb-2"
                  htmlFor="role"
                >
                  Role
                </label>
                <select
                  className="bg-gray-50 border rounded w-full py-2 px-3 text-gray-700"
                  id="role"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                >
                  <option value="">Select your role</option>
                  <option value="Administrator">Administrator</option>
                  <option value="HR">HR</option>
                  <option value="Manager">Manager</option>
                  <option value="Employee">Employee</option>
                </select>
              </div>
            </div>

            <div className="w-[63%] justify-center flex items-center">
              <button
                className=" bg-cyan-500 text-white font-semibold py-2 px-4 rounded w-full"
                type="button"
                onClick={handleSendOtp}
              >
                Send OTP
              </button>
            </div>
          </form>

          {/* Display message */}
          {message && <p className="mt-4 text-red-500">{message}</p>}

          {/* OTP Input Fields */}
          {showOtpFields && (
            <div className="mt-6 w-full">
              <p className="text-l font-semibold mb-3">Enter OTP</p>
              <div className="mb-4 flex justify-start gap-2">
                {otp.map((value, index) => (
                  <input
                    key={index}
                    type="text"
                    maxLength="1"
                    className="bg-white border rounded w-10 h-10 text-center text-gray-700 text-xl border-black"
                    value={value}
                    onChange={(e) =>
                      handleOtpChange(index, e.target.value.slice(0, 1))
                    }
                  />
                ))}
              </div>

              {/* Sign In Button */}
              <div className="w-[63%] justify-center flex items-center">
                <button
                  className="bg-cyan-500 text-white font-semibold py-2 px-4 rounded w-full"
                  type="button"
                  onClick={handleSignUp} // Trigger the sign-up function
                >
                  Sign Up
                </button>
              </div>
            </div>
          )}
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

export default PhoneLogin;
