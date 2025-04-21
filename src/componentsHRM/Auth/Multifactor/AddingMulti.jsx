import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddingMulti = () => {
  const [qrCode, setQrCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [otp, setOtp] = useState(""); // To store OTP input by the user
  const [isVerified, setIsVerified] = useState(false);
  const navigate = useNavigate(); // Use the hook for navigation

  // Function to enable 2FA and display the QR code
  const enable2FA = async () => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      setError("Token not found. Please log in again.");
      return;
    }

    setIsLoading(true);
    setError("");
    setMessage("");

    try {
      const res = await axios.post(
        "https://erp-backend-o5i3.onrender.com/api/v1/user/enable2fa",
        {}, // Empty body for POST
        {
          headers: {
            Authorization: `Bearer ${token}`, // Ensure Bearer is prefixed
          },
        }
      );

      setQrCode(res.data.qrCode); // Display QR code to the user
      setMessage(
        "2FA Enabled! Please scan the QR code and enter the OTP below."
      );
    } catch (err) {
      console.error("Error enabling 2FA", err);
      setError("Failed to enable 2FA. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const verifyOTP = async () => {
    setError("");
    setMessage("");
    setIsLoading(true);

    try {
      const jwtToken = localStorage.getItem("authToken"); // JWT token from localStorage
      if (!jwtToken) {
        setError("Authentication token not found. Please login again.");
        setIsLoading(false);
        return;
      }

      const res = await axios.post(
        "https://erp-backend-o5i3.onrender.com/api/v1/user/verify2fa",
        { token: otp }, // Pass the OTP here
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`, // Include the JWT token in headers
          },
        }
      );
      if (res.data.message === "2FA token verified successfully") {
        setIsVerified(true);
        setMessage("2FA setup is complete and verified!");
        navigate("/Landing");
      } else {
        setError("Invalid OTP. Please try again.");
      }
    } catch (err) {
      console.error("Error verifying OTP", err);
      setError("Failed to verify OTP. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          {isVerified
            ? "2FA Setup Complete"
            : "Enable Two-Factor Authentication"}
        </h2>

        {/* Enable 2FA Button */}
        {!isVerified && (
          <>
            <div className="flex justify-center mb-6">
              <button
                className={`bg-cyan-500 text-white font-bold py-2 px-6 rounded transition-all duration-300 ease-in-out ${
                  isLoading
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-cyan-600"
                }`}
                onClick={enable2FA}
                disabled={isLoading || qrCode}
              >
                {isLoading && !qrCode ? "Enabling..." : "Enable 2FA"}
              </button>
            </div>

            {/* Display QR Code */}
            {qrCode && (
              <div className="flex flex-col items-center mb-6">
                <p className="text-gray-600 mb-3">
                  Scan the QR code with your Google Authenticator app:
                </p>
                <img
                  className="border border-gray-300 shadow-sm mb-4"
                  src={qrCode}
                  alt="QR Code for Google Authenticator"
                  width="200"
                  height="200"
                />
              </div>
            )}

            {/* OTP Input and Verify Button */}
            {qrCode && (
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Enter OTP from Authenticator
                </label>
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="bg-gray-50 border border-gray-300 rounded w-full py-2 px-3 mb-4"
                  placeholder="Enter OTP"
                />
                <div className="flex justify-center">
                  <button
                    className={`bg-green-500 text-white font-bold py-2 px-6 rounded transition-all duration-300 ease-in-out ${
                      isLoading
                        ? "opacity-50 cursor-not-allowed"
                        : "hover:bg-green-600"
                    }`}
                    onClick={verifyOTP}
                    disabled={isLoading || !otp}
                  >
                    {isLoading && otp ? "Verifying..." : "Verify OTP"}
                  </button>
                </div>
              </div>
            )}
          </>
        )}
        {/* Message display */}
        {message && (
          <p className="text-green-600 font-semibold text-center mt-4">
            {message}
          </p>
        )}
        {error && (
          <p className="text-red-600 font-semibold text-center mt-4">{error}</p>
        )}
      </div>
    </div>
  );
};

export default AddingMulti;
