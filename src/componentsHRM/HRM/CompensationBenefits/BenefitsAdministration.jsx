import React, { useEffect, useState } from "react";
import axios from "axios";

const BenefitsAdministration = () => {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [payroll, setPayroll] = useState({
    salary: "",
    disbursementDate: "",
    status: "Pending",
  });
  const [benefits, setBenefits] = useState({
    healthInsurance: {
      provider: "",
      policyNumber: "",
      coverage: "",
      startDate: "",
      endDate: "",
    },
    retirementPlan: {
      provider: "",
      planDetails: "",
      startDate: "",
    },
    additionalBenefits: [],
  });
  const [compensationAnalysis, setCompensationAnalysis] = useState({
    marketSalaryRange: { min: "", max: "" },
    companySalary: "",
    notes: "",
    isCompetitive: false,
  });
  const [compensations, setCompensations] = useState([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get(
          "https://erp-backend-o5i3.onrender.com/api/employee/getEmployee"
        );
        setEmployees(response.data);
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };

    const fetchCompensations = async () => {
      try {
        const response = await axios.get(
          "https://erp-backend-o5i3.onrender.com/compensation-and-benefits/get-compensation-benefits"
        );
        setCompensations(response.data);
      } catch (error) {
        console.error("Error fetching compensation benefits:", error);
      }
    };

    fetchEmployees();
    fetchCompensations();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const compensationData = {
      employee: selectedEmployee,
      payroll,
      benefits,
      compensationAnalysis,
    };

    try {
      const response = await axios.post(
        "https://erp-backend-o5i3.onrender.com/compensation-and-benefits/create-compensation-benefits",
        compensationData
      );
      console.log("Compensation Benefits saved:", response.data);
      setShowForm(false); // Hide the form after submission
      // Optionally, reset the form here
    } catch (error) {
      console.error("Error saving compensation benefits:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Benefits Administration</h2>

      {/* Toggle Button to Add Compensation */}
      <button
        className="bg-cyan-500 text-white px-4 py-2 rounded mb-4 float-right"
        onClick={() => setShowForm(!showForm)}
      >
        {showForm ? "Cancel" : "Add Compensation Benefits"}
      </button>

      {/* Compensation Form */}
      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="border p-4 rounded shadow-md bg-white mb-4"
        >
          <h3 className="text-xl font-semibold mb-2">
            Add Compensation Benefits
          </h3>

          {/* Employee Selection */}
          <div className="mb-4">
            <label htmlFor="employee" className="block">
              Select Employee:
            </label>
            <select
              id="employee"
              value={selectedEmployee}
              onChange={(e) => setSelectedEmployee(e.target.value)}
              required
              className="border rounded px-2 py-1 w-full"
            >
              <option value="">Select an employee</option>
              {employees.map((employee) => (
                <option key={employee._id} value={employee._id}>
                  {employee.firstName} {employee.lastName} - {employee.position}
                </option>
              ))}
            </select>
          </div>
          <div className="flex gap-4 w-full">
            {/* Payroll Section */}
            <div className="flex flex-col w-full">
              <h4 className="text-lg font-semibold mb-2">
                Payroll Information
              </h4>
              <div className="mb-4">
                <label htmlFor="salary" className="block">
                  Salary:
                </label>
                <input
                  type="number"
                  id="salary"
                  value={payroll.salary}
                  onChange={(e) =>
                    setPayroll({ ...payroll, salary: e.target.value })
                  }
                  required
                  className="border rounded px-2 py-1 w-full"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="disbursementDate" className="block">
                  Disbursement Date:
                </label>
                <input
                  type="date"
                  id="disbursementDate"
                  value={payroll.disbursementDate}
                  onChange={(e) =>
                    setPayroll({ ...payroll, disbursementDate: e.target.value })
                  }
                  required
                  className="border rounded px-2 py-1 w-full"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="status" className="block">
                  Status:
                </label>
                <select
                  id="status"
                  value={payroll.status}
                  onChange={(e) =>
                    setPayroll({ ...payroll, status: e.target.value })
                  }
                  className="border rounded px-2 py-1 w-full"
                >
                  <option value="Pending">Pending</option>
                  <option value="Completed">Completed</option>
                  <option value="Failed">Failed</option>
                </select>
              </div>
            </div>

            {/* Benefits Section */}
            <div className="flex flex-col w-full">
              <h4 className="text-lg font-semibold mb-2">
                Benefits Information
              </h4>
              {/* Health Insurance */}
              <h5 className="font-semibold">Health Insurance</h5>
              <div className="mb-4">
                <label htmlFor="healthProvider" className="block">
                  Provider:
                </label>
                <input
                  type="text"
                  id="healthProvider"
                  value={benefits.healthInsurance.provider}
                  onChange={(e) =>
                    setBenefits({
                      ...benefits,
                      healthInsurance: {
                        ...benefits.healthInsurance,
                        provider: e.target.value,
                      },
                    })
                  }
                  className="border rounded px-2 py-1 w-full"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="healthPolicyNumber" className="block">
                  Policy Number:
                </label>
                <input
                  type="text"
                  id="healthPolicyNumber"
                  value={benefits.healthInsurance.policyNumber}
                  onChange={(e) =>
                    setBenefits({
                      ...benefits,
                      healthInsurance: {
                        ...benefits.healthInsurance,
                        policyNumber: e.target.value,
                      },
                    })
                  }
                  className="border rounded px-2 py-1 w-full"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="healthCoverage" className="block">
                  Coverage:
                </label>
                <input
                  type="text"
                  id="healthCoverage"
                  value={benefits.healthInsurance.coverage}
                  onChange={(e) =>
                    setBenefits({
                      ...benefits,
                      healthInsurance: {
                        ...benefits.healthInsurance,
                        coverage: e.target.value,
                      },
                    })
                  }
                  className="border rounded px-2 py-1 w-full"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="healthStartDate" className="block">
                  Start Date:
                </label>
                <input
                  type="date"
                  id="healthStartDate"
                  value={benefits.healthInsurance.startDate}
                  onChange={(e) =>
                    setBenefits({
                      ...benefits,
                      healthInsurance: {
                        ...benefits.healthInsurance,
                        startDate: e.target.value,
                      },
                    })
                  }
                  className="border rounded px-2 py-1 w-full"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="healthEndDate" className="block">
                  End Date:
                </label>
                <input
                  type="date"
                  id="healthEndDate"
                  value={benefits.healthInsurance.endDate}
                  onChange={(e) =>
                    setBenefits({
                      ...benefits,
                      healthInsurance: {
                        ...benefits.healthInsurance,
                        endDate: e.target.value,
                      },
                    })
                  }
                  className="border rounded px-2 py-1 w-full"
                />
              </div>
            </div>

            {/* Retirement Plan */}
            <div className="flex flex-col w-full">
              <h5 className="font-semibold">Retirement Plan</h5>
              <div className="mb-4">
                <label htmlFor="retirementProvider" className="block">
                  Provider:
                </label>
                <input
                  type="text"
                  id="retirementProvider"
                  value={benefits.retirementPlan.provider}
                  onChange={(e) =>
                    setBenefits({
                      ...benefits,
                      retirementPlan: {
                        ...benefits.retirementPlan,
                        provider: e.target.value,
                      },
                    })
                  }
                  className="border rounded px-2 py-1 w-full"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="planDetails" className="block">
                  Plan Details:
                </label>
                <input
                  type="text"
                  id="planDetails"
                  value={benefits.retirementPlan.planDetails}
                  onChange={(e) =>
                    setBenefits({
                      ...benefits,
                      retirementPlan: {
                        ...benefits.retirementPlan,
                        planDetails: e.target.value,
                      },
                    })
                  }
                  className="border rounded px-2 py-1 w-full"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="retirementStartDate" className="block">
                  Start Date:
                </label>
                <input
                  type="date"
                  id="retirementStartDate"
                  value={benefits.retirementPlan.startDate}
                  onChange={(e) =>
                    setBenefits({
                      ...benefits,
                      retirementPlan: {
                        ...benefits.retirementPlan,
                        startDate: e.target.value,
                      },
                    })
                  }
                  className="border rounded px-2 py-1 w-full"
                />
              </div>
            </div>

            {/* Compensation Analysis */}
            <div className="flex flex-col w-full">
              <h4 className="text-lg font-semibold mb-2">
                Compensation Analysis
              </h4>
              <div className="mb-4">
                <label htmlFor="marketSalaryRangeMin" className="block">
                  Market Salary Range (Min):
                </label>
                <input
                  type="number"
                  id="marketSalaryRangeMin"
                  value={compensationAnalysis.marketSalaryRange.min}
                  onChange={(e) =>
                    setCompensationAnalysis({
                      ...compensationAnalysis,
                      marketSalaryRange: {
                        ...compensationAnalysis.marketSalaryRange,
                        min: e.target.value,
                      },
                    })
                  }
                  className="border rounded px-2 py-1 w-full"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="marketSalaryRangeMax" className="block">
                  Market Salary Range (Max):
                </label>
                <input
                  type="number"
                  id="marketSalaryRangeMax"
                  value={compensationAnalysis.marketSalaryRange.max}
                  onChange={(e) =>
                    setCompensationAnalysis({
                      ...compensationAnalysis,
                      marketSalaryRange: {
                        ...compensationAnalysis.marketSalaryRange,
                        max: e.target.value,
                      },
                    })
                  }
                  className="border rounded px-2 py-1 w-full"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="companySalary" className="block">
                  Company Salary:
                </label>
                <input
                  type="number"
                  id="companySalary"
                  value={compensationAnalysis.companySalary}
                  onChange={(e) =>
                    setCompensationAnalysis({
                      ...compensationAnalysis,
                      companySalary: e.target.value,
                    })
                  }
                  className="border rounded px-2 py-1 w-full"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="notes" className="block">
                  Notes:
                </label>
                <textarea
                  id="notes"
                  value={compensationAnalysis.notes}
                  onChange={(e) =>
                    setCompensationAnalysis({
                      ...compensationAnalysis,
                      notes: e.target.value,
                    })
                  }
                  className="border rounded px-2 py-1 w-full"
                  rows="3"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="isCompetitive" className="block">
                  Is Salary Competitive?
                </label>
                <input
                  type="checkbox"
                  id="isCompetitive"
                  checked={compensationAnalysis.isCompetitive}
                  onChange={() =>
                    setCompensationAnalysis({
                      ...compensationAnalysis,
                      isCompetitive: !compensationAnalysis.isCompetitive,
                    })
                  }
                  className="mr-2"
                />
                <span>Yes</span>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center items-center w-full">
            <button
              type="submit"
              className="bg-cyan-500 text-white px-4 py-2 rounded"
            >
              Submit
            </button>
          </div>
        </form>
      )}

      {/* Compensation Table */}
      {!showForm && (
        <div>
          <table className="min-w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 p-2">Employee</th>
                <th className="border border-gray-300 p-2">Salary</th>
                <th className="border border-gray-300 p-2">
                  Disbursement Date
                </th>
                <th className="border border-gray-300 p-2">Status</th>
                <th className="border border-gray-300 p-2">Health Insurance</th>
                <th className="border border-gray-300 p-2">Retirement Plan</th>
                <th className="border border-gray-300 p-2">Company Salary</th>
                <th className="border border-gray-300 p-2">Competitive</th>
                <th className="border border-gray-300 p-2">Notes</th>
              </tr>
            </thead>
            <tbody>
              {compensations.map((compensation) => (
                <tr key={compensation._id}>
                  <td className="border border-gray-300 p-2">
                    {compensation.employee?.firstName}{" "}
                    {compensation.employee?.lastName}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {compensation.payroll.salary}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {new Date(
                      compensation.payroll.disbursementDate
                    ).toLocaleDateString()}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {compensation.payroll.status}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {compensation.benefits.healthInsurance?.provider}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {compensation.benefits.retirementPlan?.provider}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {compensation.compensationAnalysis.companySalary}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {compensation.compensationAnalysis.isCompetitive
                      ? "Yes"
                      : "No"}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {compensation.compensationAnalysis.notes}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default BenefitsAdministration;
