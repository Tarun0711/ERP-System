import React from "react";
import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import Dashboard from "./Screens/CRM/Dashboard";
import Home from "./Screens/CRM/Home";
import Leads from "./Screens/CRM/Leads";
import Contacts from "./Screens/CRM/Contacts";
import Accounts from "./Screens/CRM/Accounts";
import Deals from "./Screens/CRM/Deals";
import Task from "./Screens/CRM/Task";
import Calls from "./Screens/CRM/Calls";
import Reports from "./Screens/CRM/Reports";
import AddLead from "./Screens/CRM/AddLead";
import LeadsHome from "./Screens/CRM/LeadsHome";
import DealForm from "./Screens/CRM/CreateDeal";
import DealsHome from "./Screens/CRM/DealsHome";
import TaskHome from "./Screens/CRM/TaskHome";
import TaskForm from "./Screens/CRM/AddTask";
import MeetingHome from "./Screens/CRM/MeetingHome";
import Meeting from "./Screens/CRM/Meeting";
import MeetingForm from "./Screens/CRM/CreateMeeting";
import CallHome from "./Screens/CRM/CallHome";
import ScheduleCallForm from "./Screens/CRM/CreateCall";
import ContactsHome from "./Screens/CRM/ContactsHome";
import AddContact from "./Screens/CRM/CreateContact";
import InventoryDashBoard from "./Screens/Inventory/InventoryDashBoard";
import InventoryHome from "./Screens/Inventory/InventoryHome";
import InventoryItems from "./Screens/Inventory/InventoryItems";
import SKUManagement from "./Screens/Inventory/SKUManagement";
import WarehouseLayout from "./Screens/Inventory/WareHouseLayout";
import BinManagement from "./Screens/Inventory/BinManagement";
import ReceivingAndPutaway from "./Screens/Inventory/ReceiveAndPutaway";
import PurchaseOrdersPage from "./Screens/Inventory/PurchaseOrder";
import SalesOrdersPage from "./Screens/Inventory/SalesOrder";
import SalesReturnsPage from "./Screens/Inventory/BackOrder";
import ReplenishmentAndProcurement from "./Screens/Inventory/ReplenishmentAndProcurement";
import CycleCounting from "./Screens/Inventory/CycleCount";
import AuditTrails from "./Screens/Inventory/AuditTrails";
import ReportingAndAnalytics from "./Screens/Inventory/ReportingAndAnalytics";
import CentralizedControl from "./Screens/Inventory/CentralizedControl";
import StockTransfer from "./Screens/Inventory/StocksTransfer";
import LandingPage from "./Screens/LandingPage";

import Homepage from "./componentsHRM/HRM/Home/Homepage";
import AccountHome from "./componentsHRM/AccountFinance/Home/AccountHome";
import Login from "./componentsHRM/Auth/Login";
import SignUp from "./componentsHRM/Auth/SignUp";
import PhoneLogin from "./componentsHRM/Auth/PhoneLogin";
import AddingMulti from "./componentsHRM/Auth/Multifactor/AddingMulti";
import LiveChat from "./Components/LiveChat";

const Layout = () => {
  const location = useLocation();

  return <></>;
};

function App() {
  return (
    <div className="w-full">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="inventory" element={<InventoryDashBoard />}>
          <Route index element={<InventoryHome />} />
          <Route path="stock-management" element={<InventoryItems />} />
          <Route path="sku-management" element={<SKUManagement />} />
          <Route path="warehouse/layout" element={<WarehouseLayout />} />
          <Route path="warehouse/bin-management" element={<BinManagement />} />
          <Route
            path="warehouse/receiving-putaway"
            element={<ReceivingAndPutaway />}
          />
          <Route
            path="order/purchase-orders"
            element={<PurchaseOrdersPage />}
          />
          <Route path="order/sales-orders" element={<SalesOrdersPage />} />
          <Route
            path="order/backorders-preorders"
            element={<SalesReturnsPage />}
          />
          <Route path="auditing/cycle-counting" element={<CycleCounting />} />
          <Route path="auditing/audit-trails" element={<AuditTrails />} />
          <Route
            path="auditing/reporting-analytics"
            element={<ReportingAndAnalytics />}
          />
          <Route
            path="multi-location/centralized-control"
            element={<CentralizedControl />}
          />
          <Route
            path="multi-location/stock-transfers"
            element={<StockTransfer />}
          />

          <Route path="stock-management" element={<InventoryItems/>}/>
          {/* <Route path="sku-management" element={<SKUManagement/>}/> */}
          <Route path="warehouse/layout" element={<WarehouseLayout/>}/>
          <Route path="warehouse/bin-management" element={<BinManagement/>}/>
          <Route path="warehouse/receiving-putaway" element={<ReceivingAndPutaway/>}/>
          <Route path="order/purchase-orders" element={<PurchaseOrdersPage/>}/>
          <Route path="order/sales-orders" element={<SalesOrdersPage/>  }/>
          <Route path="order/backorders-preorders" element={<SalesReturnsPage/>}/>
          <Route path="auditing/cycle-counting" element={<CycleCounting/>}/>
          <Route path="auditing/audit-trails" element={<AuditTrails/>}/>
          <Route path="auditing/reporting-analytics" element={<ReportingAndAnalytics/>}/>
          <Route path="multi-location/centralized-control" element={<CentralizedControl/>}/>
          <Route path="multi-location/stock-transfers" element={<StockTransfer/>}/>

          {/* <Route path="procurement/reorder-point" element={<ReplenishmentAndProcurement/>}/> */}
          <Route path="*" element={<Navigate to="/inventory" replace />} />
        </Route>
        <Route path="/CRM" element={<Dashboard />}>
          <Route index element={<Home />} />
          <Route path="leads" element={<Leads />}>
            <Route index element={<LeadsHome />} />
            <Route path="add-leads" element={<AddLead />} />
          </Route>
          <Route path="contact" element={<Contacts />}>
            <Route index element={<ContactsHome />} />
            <Route path="add-contact" element={<AddContact />} />
          </Route>
          <Route path="accounts" element={<Accounts />} />
          <Route path="deals" element={<Deals />}>
            <Route index element={<DealsHome />} />
            <Route path="create-deal" element={<DealForm />} />
          </Route>
          <Route path="tasks" element={<Task />}>
            <Route index element={<TaskHome />} />
            <Route path="create-task" element={<TaskForm />} />
          </Route>
          <Route path="meetings" element={<Meeting />}>
            <Route index element={<MeetingHome />} />
            <Route path="create-meeting" element={<MeetingForm />} />
          </Route>
          <Route path="calls" element={<Calls />}>
            <Route index element={<CallHome />} />
            <Route path="create-call" element={<ScheduleCallForm />} />
          </Route>
          <Route path="chats" element={<LiveChat />} />
          {/* <Route path="reports" element={<Reports />} /> */}
          <Route path="*" element={<Navigate to="/CRM" replace />} />
        </Route>
        {/* <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/ad" element={<AddingMulti />} />
        <Route path="/mfa" element={<PhoneLogin />} />*/}
        <Route path="/hrm/*" element={<Homepage />} />
        <Route path="/sales/*" element={<AccountHome />} /> 
      </Routes>
    </div>
  );
}

export default App;
