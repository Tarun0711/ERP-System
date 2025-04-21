import React, { useEffect, useState } from "react";
import axios from "axios";

function OrderDetails({ orderId }) {
  const [orderDetails, setOrderDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await axios.get(
          `https://erp-backend-o5i3.onrender.com/api/account-fianance/sales/${orderId}`
        );
        setOrderDetails(response.data);
      } catch (error) {
        setError("Error fetching order details.");
        console.error("Error fetching order details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [orderId]);

  if (loading) {
    return <div>Loading order details...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="mt-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Order Details</h2>
      <p>Total Amount: {orderDetails.totalAmount}</p>
      <p>Status: {orderDetails.status}</p>
      <h3 className="font-semibold mt-4">Line Items:</h3>
      <ul>
        {orderDetails.lineItems.map((item) => (
          <li key={item._id}>
            {item.product} - Quantity: {item.quantity} - Price: ${item.price} -
            Total: ${item.total}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default OrderDetails;
