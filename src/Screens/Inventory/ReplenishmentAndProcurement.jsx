import React, { useState, useEffect } from "react";

const ReplenishmentAndProcurement = () => {
  // Sample data for products
  const [products, setProducts] = useState([
    {
      productName: "Product A",
      currentStock: 30,
      averageDemand: 5, // daily average
      leadTime: 7, // days
      safetyStock: 10, // extra buffer stock
      reorderPoint: 0,
      autoOrder: false, // triggers purchase order
    },
    {
      productName: "Product B",
      currentStock: 50,
      averageDemand: 10,
      leadTime: 5,
      safetyStock: 20,
      reorderPoint: 0,
      autoOrder: false,
    },
    {
      productName: "Product C",
      currentStock: 15,
      averageDemand: 4,
      leadTime: 3,
      safetyStock: 5,
      reorderPoint: 0,
      autoOrder: false,
    },
  ]);

  // Function to calculate the reorder point
  const calculateReorderPoint = (averageDemand, leadTime, safetyStock) => {
    return averageDemand * leadTime + safetyStock;
  };

  // Update reorder points for each product
  useEffect(() => {
    const updatedProducts = products.map((product) => ({
      ...product,
      reorderPoint: calculateReorderPoint(
        product.averageDemand,
        product.leadTime,
        product.safetyStock
      ),
      autoOrder: product.currentStock <= calculateReorderPoint(
        product.averageDemand,
        product.leadTime,
        product.safetyStock
      )
    }));
    setProducts(updatedProducts);
  }, [products]);

  // Handle generating a purchase order
  const handleGeneratePurchaseOrder = (productName) => {
    alert(`Purchase Order for ${productName} has been generated.`);
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-semibold mb-6">
        Replenishment and Procurement
      </h1>

      <table className="min-w-full table-auto">
        <thead>
          <tr className="bg-gray-200 text-left text-sm text-gray-700">
            <th className="px-4 py-2">Product Name</th>
            <th className="px-4 py-2">Current Stock</th>
            <th className="px-4 py-2">Average Demand (Daily)</th>
            <th className="px-4 py-2">Lead Time (Days)</th>
            <th className="px-4 py-2">Safety Stock</th>
            <th className="px-4 py-2">Reorder Point</th>
            <th className="px-4 py-2">Auto Order</th>
            <th className="px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={index} className="border-t hover:bg-gray-100 text-sm">
              <td className="px-4 py-2">{product.productName}</td>
              <td className="px-4 py-2">{product.currentStock}</td>
              <td className="px-4 py-2">{product.averageDemand}</td>
              <td className="px-4 py-2">{product.leadTime}</td>
              <td className="px-4 py-2">{product.safetyStock}</td>
              <td className="px-4 py-2">{product.reorderPoint}</td>
              <td className="px-4 py-2">
                {product.autoOrder ? (
                  <span className="text-green-500">YES</span>
                ) : (
                  <span className="text-red-500">NO</span>
                )}
              </td>
              <td className="px-4 py-2">
                {product.autoOrder && (
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                    onClick={() => handleGeneratePurchaseOrder(product.productName)}
                  >
                    Generate PO
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReplenishmentAndProcurement;
