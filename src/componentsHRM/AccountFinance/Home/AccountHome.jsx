import React from "react";
import Sidebar from "../Sidebar/Sidebar";
import { Routes, Route } from "react-router-dom";
import SalesDashboard from "../Dashboard/SalesDashboard";
import EditSalesOrder from "../Sales/EditSalesOrder";
import OrderDetails from "../Sales/OrderDetails";
import ExpenseTable from "../Expenses/Expense";
import PurchaseOrder from "../PurchaseOrder/PurchaseOrder";
import FinancialReporting from "../FinancialReporting/FinancialReporting";
import AccountDashboard from "../Dashboard/AccountDashboard";
import Navbar from "../../../Components/Navbar";

function AccountHome() {
  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      <Navbar/>
      <div className="flex">
        <Sidebar />
        <div className="flex-grow ml-72 p-4 bg-gray-100 h-[calc(100vh-4rem)]">
          <Routes>
            <Route path="dashboard" element={<AccountDashboard />} />
            <Route path="sales-management" element={<SalesDashboard />} />
            <Route path="/edit/:id" element={<EditSalesOrder />} />
            <Route path="/details/:id" element={<OrderDetails />} />
            <Route path="expenses" element={<ExpenseTable />} />
            <Route path="purchase-order" element={<PurchaseOrder />} />
            <Route
              path="financial-reporting"
              element={<FinancialReporting />}
            />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default AccountHome;
