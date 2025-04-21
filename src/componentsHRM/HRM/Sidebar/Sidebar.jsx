import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTachometerAlt,
  faUsers,
  faBriefcase,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { PiArrowElbowDownRight } from "react-icons/pi";
import { PiOptionBold } from "react-icons/pi";
import { SiPerforce } from "react-icons/si";
import { TbClearAll } from "react-icons/tb";
import { IoIosGitCompare } from "react-icons/io";
import { LuComponent } from "react-icons/lu";
import { TbDeviceComputerCamera } from "react-icons/tb";
import { FaUsers } from "react-icons/fa";
const Sidebar = () => {
  const navigate = useNavigate();
  const [activeItem, setActiveItem] = useState("/hrm/dashboard");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isPerformanceDropdownOpen, setIsPerformanceDropdownOpen] =
    useState(false);
  const [learningAndDevelopment, setLearningAndDevelopment] = useState(false);
  const [compensationAndBenefits, setCompensationAndBenefits] = useState(false);
  const [employeeManagement, setEmployeeManagement] = useState(false);
  const [complianceAndRiskManagement, setComplianceAndRiskManagement] =
    useState(false);
  const [exitManagement, setExitManagement] = useState(false);
  const handleClick = (item) => {
    setActiveItem(item);
    navigate(item);
  };

  return (
    <aside className="bg-white w-64 min-h-screen fixed top-16 z-10 ">
      <ul className="py-4">
        {/* Dashboard */}
        <li
          className={`px-6 py-3 hover:bg-gray-100 flex items-center cursor-pointer rounded-l-lg ${
            activeItem === "/hrm/dashboard" ? "bg-gray-100 rounded-l-lg" : ""
          }`}
          onClick={() => handleClick("/hrm/dashboard")}
        >
          <LuComponent size={24} className="mr-3" />
          <span className="text-sm font-semibold">Dashboard</span>
        </li>

        {/* Employee Database */}
        <li
          className={`px-6 py-3 hover:bg-gray-100 flex items-center cursor-pointer rounded-l-lg ${
            activeItem === "/hrm/employee-database"
              ? "bg-gray-100 rounded-l-lg"
              : ""
          }`}
          onClick={() => handleClick("/hrm/employee-database")}
        >
          <FaUsers size={24} className="mr-3" />
          <span className="text-sm font-semibold">Employee Database</span>
        </li>

        {/* Recruitment & Onboarding */}
        <li
          className={`px-6 py-3 hover:bg-gray-100 flex items-center cursor-pointer rounded-l-lg`}
          onMouseEnter={() => setIsDropdownOpen(true)}
          onMouseLeave={() => setIsDropdownOpen(false)}
        >
          <div className="flex items-center">
            <PiOptionBold size={24} className="mr-3" />
            <span className="text-sm font-semibold">
              Recruitment & Onboarding
            </span>
          </div>
        </li>

        {/* Recruitment Dropdown Menu */}
        <ul
          className={`ml-8 transition-all duration-200 ease-in-out ${
            isDropdownOpen
              ? "max-h-40 opacity-100"
              : "max-h-0 opacity-0 overflow-hidden"
          }`}
          onMouseEnter={() => setIsDropdownOpen(true)}
          onMouseLeave={() => setIsDropdownOpen(false)}
        >
          <li
            className={`px-6 py-2 hover:bg-gray-100 flex items-center cursor-pointer rounded-l-lg ${
              activeItem === "/hrm/new-hire" ? "bg-gray-100 rounded-l-lg" : ""
            }`}
            onClick={() => handleClick("/hrm/new-hire")}
          >
            <PiArrowElbowDownRight size={36} className="mr-3" />
            <span className="text-sm">Job Posting & Applicant Tracking</span>
          </li>
          <li
            className={`px-6 py-2 hover:bg-gray-100 flex items-center cursor-pointer rounded-l-lg ${
              activeItem === "/hrm/documentation"
                ? "bg-gray-100 rounded-l-lg"
                : ""
            }`}
            onClick={() => handleClick("/hrm/documentation")}
          >
            <PiArrowElbowDownRight size={24} className="mr-3" />
            <span className="text-sm">Interview Scheduling</span>
          </li>
          <li
            className={`px-6 py-2 hover:bg-gray-100 flex items-center cursor-pointer rounded-l-lg ${
              activeItem === "/hrm/orientation"
                ? "bg-gray-100 rounded-l-lg"
                : ""
            }`}
            onClick={() => handleClick("/hrm/orientation")}
          >
            <PiArrowElbowDownRight size={24} className="mr-3" />
            <span className="text-sm">Onboarding Process</span>
          </li>
        </ul>

        {/* Performance Management */}
        <li
          className={`px-6 py-3 hover:bg-gray-100 flex items-center cursor-pointer rounded-l-lg`}
          onMouseEnter={() => setIsPerformanceDropdownOpen(true)}
          onMouseLeave={() => setIsPerformanceDropdownOpen(false)}
        >
          <div className="flex items-center">
            <SiPerforce size={24} className="mr-3" />
            <span className="text-sm font-semibold">
              Performance Management
            </span>
          </div>
        </li>

        {/* Performance Management Dropdown Menu */}
        <ul
          className={`ml-8 transition-all duration-200 ease-in-out ${
            isPerformanceDropdownOpen
              ? "max-h-40 opacity-100"
              : "max-h-0 opacity-0 overflow-hidden"
          }`}
          onMouseEnter={() => setIsPerformanceDropdownOpen(true)}
          onMouseLeave={() => setIsPerformanceDropdownOpen(false)}
        >
          <li
            className={`px-6 py-2 hover:bg-gray-100 flex items-center cursor-pointer rounded-l-lg ${
              activeItem === "/hrm/goal-setting"
                ? "bg-gray-100 rounded-l-lg"
                : ""
            }`}
            onClick={() => handleClick("/hrm/goal-setting")}
          >
            <PiArrowElbowDownRight size={24} className="mr-3" />
            <span className="text-sm">Goal Setting</span>
          </li>
          {/* <li
            className={`px-6 py-2 hover:bg-gray-100 flex items-center cursor-pointer rounded-l-lg ${
              activeItem === "/hrm/performance-reviews"
                ? "bg-gray-100 rounded-l-lg"
                : ""
            }`}
            onClick={() => handleClick("/hrm/performance-reviews")}
          >
            <PiArrowElbowDownRight size={24} className="mr-3" />
            <span className="text-sm">Performance Reviews</span>
          </li> */}
          {/* <li
            className={`px-6 py-2 hover:bg-gray-100 flex items-center cursor-pointer rounded-l-lg ${
              activeItem === "/hrm/360-feedback"
                ? "bg-gray-100 rounded-l-lg"
                : ""
            }`}
            onClick={() => handleClick("/hrm/360-feedback")}
          >
            <PiArrowElbowDownRight size={24} className="mr-3" />
            <span className="text-sm">360 Degree Feedback</span>
          </li> */}
        </ul>

        {/* Learning And Development */}
        {/* <li
          className={`px-6 py-3 hover:bg-gray-100 flex items-center cursor-pointer rounded-l-lg`}
          onMouseEnter={() => setLearningAndDevelopment(true)}
          onMouseLeave={() => setLearningAndDevelopment(false)}
        >
          <div className="flex items-center">
            <TbClearAll size={24} className="mr-3" />
            <span className="text-sm font-semibold">
              Learning And Development
            </span>
          </div>
        </li> */}
        {/* Learning And Development Dropdown Menu */}

        {/* <ul
          className={`ml-8 transition-all duration-200 ease-in-out ${
            learningAndDevelopment
              ? "max-h-40 opacity-100"
              : "max-h-0 opacity-0 overflow-hidden"
          }`}
          onMouseEnter={() => setLearningAndDevelopment(true)}
          onMouseLeave={() => setLearningAndDevelopment(false)}
        >
          <li
            className={`px-6 py-2 hover:bg-gray-100 flex items-center cursor-pointer rounded-l-lg ${
              activeItem === "/hrm/skill-gap-analysis"
                ? "bg-gray-100 rounded-l-lg"
                : ""
            }`}
            onClick={() => handleClick("/hrm/skill-gap-analysis")}
          >
            <PiArrowElbowDownRight size={24} className="mr-3" />
            <span className="text-sm">Skill Gap Analysis</span>
          </li>
          <li
            className={`px-6 py-2 hover:bg-gray-100 flex items-center cursor-pointer rounded-l-lg ${
              activeItem === "/hrm/training-management"
                ? "bg-gray-100 rounded-l-lg"
                : ""
            }`}
            onClick={() => handleClick("/hrm/training-management")}
          >
            <PiArrowElbowDownRight size={24} className="mr-3" />
            <span className="text-sm">Training Management</span>
          </li>
          <li
            className={`px-6 py-2 hover:bg-gray-100 flex items-center cursor-pointer rounded-l-lg ${
              activeItem === "/hrm/career-management"
                ? "bg-gray-100 rounded-l-lg"
                : ""
            }`}
            onClick={() => handleClick("/hrm/career-management")}
          >
            <PiArrowElbowDownRight size={24} className="mr-3" />
            <span className="text-sm">Career Management</span>
          </li>
        </ul> */}
        {/* Compensation And Benefits */}
        <li
          className={`px-6 py-3 hover:bg-gray-100 flex items-center cursor-pointer rounded-l-lg`}
          onMouseEnter={() => setCompensationAndBenefits(true)}
          onMouseLeave={() => setCompensationAndBenefits(false)}
        >
          <div className="flex items-center">
            <IoIosGitCompare size={24} className="mr-3" />
            <span className="text-sm font-semibold">
              Compensation And Benefits
            </span>
          </div>
        </li>
        {/* Compensation And Benefits Dropdown Menu */}
        <ul
          className={`ml-8 transition-all duration-200 ease-in-out ${
            compensationAndBenefits
              ? "max-h-40 opacity-100"
              : "max-h-0 opacity-0 overflow-hidden"
          }`}
          onMouseEnter={() => setCompensationAndBenefits(true)}
          onMouseLeave={() => setCompensationAndBenefits(false)}
        >
          {/* <li
            className={`px-6 py-2 hover:bg-gray-100 flex items-center cursor-pointer rounded-l-lg ${
              activeItem === "/hrm/payroll-management"
                ? "bg-gray-100 rounded-l-lg"
                : ""
            }`}
            onClick={() => handleClick("/hrm/payroll-management")}
          >
            <PiArrowElbowDownRight size={24} className="mr-3" />
            <span className="text-sm">Payroll Management</span>
          </li> */}
          <li
            className={`px-6 py-2 hover:bg-gray-100 flex items-center cursor-pointer rounded-l-lg ${
              activeItem === "/hrm/benefits-administration"
                ? "bg-gray-100 rounded-l-lg"
                : ""
            }`}
            onClick={() => handleClick("/hrm/benefits-administration")}
          >
            <PiArrowElbowDownRight size={24} className="mr-3" />
            <span className="text-sm">Benefits Administration</span>
          </li>
          {/* <li
            className={`px-6 py-2 hover:bg-gray-100 flex items-center cursor-pointer rounded-l-lg ${
              activeItem === "/hrm/compensation-analysis"
                ? "bg-gray-100 rounded-l-lg"
                : ""
            }`}
            onClick={() => handleClick("/hrm/compensation-analysis")}
          >
            <PiArrowElbowDownRight size={24} className="mr-3" />
            <span className="text-sm">Compensation Analysis</span>
          </li> */}
        </ul>
        {/* Compilance And Risk Management */}
        <li
          className={`px-6 py-3 hover:bg-gray-100 flex items-center cursor-pointer rounded-l-lg`}
          onMouseEnter={() => setComplianceAndRiskManagement(true)}
          onMouseLeave={() => setComplianceAndRiskManagement(false)}
        >
          <div className="flex items-center">
            <FontAwesomeIcon icon={faBriefcase} className="mr-3" />
            <span className="text-sm font-semibold">
              Compilance And Risk Management
            </span>
          </div>
        </li>
        {/* Compilance And Risk Management Dropdown Menu */}
        <ul
          className={`ml-8 transition-all duration-200 ease-in-out ${
            complianceAndRiskManagement
              ? "max-h-40 opacity-100"
              : "max-h-0 opacity-0 overflow-hidden"
          }`}
          onMouseEnter={() => setComplianceAndRiskManagement(true)}
          onMouseLeave={() => setComplianceAndRiskManagement(false)}
        >
          <li
            className={`px-6 py-2 hover:bg-gray-100 flex items-center cursor-pointer rounded-l-lg ${
              activeItem === "/hrm/hr-compilance"
                ? "bg-gray-100 rounded-l-lg"
                : ""
            }`}
            onClick={() => handleClick("/hrm/hr-compilance")}
          >
            <PiArrowElbowDownRight size={24} className="mr-3" />
            <span className="text-sm">HR Compilance</span>
          </li>
          <li
            className={`px-6 py-2 hover:bg-gray-100 flex items-center cursor-pointer rounded-l-lg ${
              activeItem === "/hrm/policy-management"
                ? "bg-gray-100 rounded-l-lg"
                : ""
            }`}
            onClick={() => handleClick("/hrm/policy-management")}
          >
            <PiArrowElbowDownRight size={24} className="mr-3" />
            <span className="text-sm">Policy Management</span>
          </li>
          <li
            className={`px-6 py-2 hover:bg-gray-100 flex items-center cursor-pointer rounded-l-lg ${
              activeItem === "/hrm/compensation-anaysis"
                ? "bg-gray-100 rounded-l-lg"
                : ""
            }`}
            onClick={() => handleClick("/hrm/compensation-anaysis")}
          >
            <TbDeviceComputerCamera size={24} className="mr-3" />
            <span className="text-sm">Compensation Analysis</span>
          </li>
        </ul>
      </ul>
    </aside>
  );
};

export default Sidebar;