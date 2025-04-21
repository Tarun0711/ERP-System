import React, { useState } from "react";
import axios from "axios";

const Verify2fa = () => {
  const [token, setToken] = useState("");
  const [message, setMessage] = useState("");

  const verify2FA = async () => {
    try {
      const res = await axios.post(
        "https://erp-backend-o5i3.onrender.com/api/v1/user/verify2FA",
        {
          token,
          userId: "USER_ID",
        }
      );
      setMessage(res.data.message);
    } catch (err) {
      setMessage("Invalid token, please try again.");
    }
  };

  return (
    <div>
      <h2>Verify 2FA</h2>
      <input
        type="text"
        placeholder="Enter 2FA token"
        value={token}
        onChange={(e) => setToken(e.target.value)}
      />
      <button onClick={verify2FA}>Verify</button>
      <p>{message}</p>
    </div>
  );
};

export default Verify2fa;
