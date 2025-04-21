import React from "react";
import { Routes, Route } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import Dashboard from "../Dashboard/Dashboard";
import Jobposting from "../Recruitment/Jobposting";
import InterviewSchedul from "../Recruitment/InterviewSchedul";
import Onboarding from "../Recruitment/Onboarding";
import AddEmployee from "../EmployeeDatabase/AddEmployee";
import EmployeeDatabase from "../EmployeeDatabase/EmployeeDatabase";
import Navbar from "../../../Components/Navbar";
import BenefitsAdministration from "../CompensationBenefits/BenefitsAdministration";
import CompensationAnalysis from "../CompensationBenefits/CompensationAnalysis";
import PayrollManagement from "../CompensationBenefits/PayrollManagement";
import CompensationAnaysis from "../CompilanceRisk/CompensationAnaysis";
import HRCompliance from "../CompilanceRisk/HRCompliance";
import PolicyManagement from "../CompilanceRisk/PolicyManagement";
import CareerManagement from "../LearningDevelopment/CareerManagement";
import SkillGap from "../LearningDevelopment/SkillGap";
import TrainingManagement from "../LearningDevelopment/TrainingManagement";
import GoalSetting from "../Performance/GoalSetting";
import PerformanceFeedback from "../Performance/PerformanceFeedback";
import PerformanceReview from "../Performance/PerformanceReview";

const Homepage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex flex-grow">
        <Sidebar />
        <div className="flex flex-col w-full bg-gray-100 h-[calc(100vh-4rem)] overflow-auto">
          <div className="ml-72">
            <Routes>
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="employee-database" element={<EmployeeDatabase />} />
              <Route path="new-hire" element={<Jobposting />} />
              <Route path="documentation" element={<InterviewSchedul />} />
              <Route path="orientation" element={<Onboarding />} />
              <Route path="add-employee" element={<AddEmployee />} />
              <Route
                path="benefits-administration"
                element={<BenefitsAdministration />}
              />
              <Route
                path="compensation-analysis"
                element={<CompensationAnalysis />}
              />
              <Route
                path="payroll-management"
                element={<PayrollManagement />}
              />
              <Route
                path="compensation-anaysis"
                element={<CompensationAnaysis />}
              />
              <Route path="hr-compilance" element={<HRCompliance />} />
              <Route path="policy-management" element={<PolicyManagement />} />
              <Route path="career-management" element={<CareerManagement />} />
              <Route path="skill-gap-analysis" element={<SkillGap />} />
              <Route
                path="training-management"
                element={<TrainingManagement />}
              />
              <Route path="goal-setting" element={<GoalSetting />} />
              <Route path="360-feedback" element={<PerformanceFeedback />} />
              <Route
                path="performance-reviews"
                element={<PerformanceReview />}
              />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
