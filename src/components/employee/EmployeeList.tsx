import { useEffect, useState } from "react";

import { createEmployee, getAllEmployees } from "../../apiCalls";
import type { Employee, EmployeeInput } from "../../types/Employee";
import EmployeeCard from "./EmployeeCard";
import Header from "../Header";
import EmployeeForm from "./EmployeeForm";

const EmployeeList = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [isAdding, setIsAdding] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [fetchError, setFetchError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const employeesData = await getAllEmployees();
        setEmployees(employeesData);
      } catch (err) {
        setFetchError(err instanceof Error ? err : new Error("Unknown error"));
      } finally {
        setIsLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  const handleClick = () => {
    setIsAdding(!isAdding);
  };

  const handleAdd = async (employee: EmployeeInput) => {
    const newEmployee = await createEmployee(employee);
    setEmployees((currEmployees) => [newEmployee, ...currEmployees]);
    setIsAdding(false);
  };

  if (isLoading) {
    return <p>Loading employees</p>;
  }

  if (fetchError) {
    return <p>Employees could not be loaded</p>;
  }

  return (
    <>
      <Header title="All Employees" />
      <div className="w-[95vw] max-w-[950px] mx-auto flex flex-col items-center">
        <div className="w-full flex justify-end my-3">
          {isAdding ? (
            <EmployeeForm
              onSubmit={handleAdd}
              submitText="Add"
              isShowing={setIsAdding}
            />
          ) : (
            <button
              onClick={handleClick}
              className="px-4 py-2 text-white text-sm font-medium rounded bg-green-600 hover:bg-green-700"
            >
              Add Employee
            </button>
          )}
        </div>
        <ul className="flex flex-col items-center w-full">
          {employees.map((employee) => (
            <EmployeeCard
              key={employee.id}
              employee={employee}
              setEmployees={setEmployees}
            />
          ))}
        </ul>
      </div>
    </>
  );
};

export default EmployeeList;
