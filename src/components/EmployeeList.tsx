import { useEffect, useState } from "react";

import { createEmployee, getAllEmployees } from "../apiCalls";
import type { Employee, EmployeeInput } from "../types/Employee";
import EmployeeCard from "./EmployeeCard";
import Header from "./Header";
import EmployeeForm from "./EmployeeForm";

const EmployeeList = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [isAdding, setIsAdding] = useState<Boolean>(false);
  const [isLoading, setIsLoading] = useState<Boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const employeesData = await getAllEmployees();
        setEmployees(employeesData);
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Unknown error"));
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
    try {
      const newEmployee = await createEmployee(employee);
      setEmployees((currEmployees) => [newEmployee, ...currEmployees]);
      setIsAdding(false);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Unknown error"));
    }
  };

  if (isLoading) {
    return <p>Loading employees</p>;
  }

  if (error) {
    return <p>Employees could not be loaded</p>;
  }

  return (
    <>
      <section>
        <Header title="All Employees" />
        {isAdding ? (
          <EmployeeForm
            onSubmit={handleAdd}
            submitText="Add"
            isShowing={setIsAdding}
          />
        ) : (
          <>
            <button onClick={handleClick}>Add Employee</button>
          </>
        )}
        <ul>
          {employees.map((employee) => {
            return (
              <EmployeeCard
                key={employee.id}
                employee={employee}
                setEmployees={setEmployees}
              />
            );
          })}
        </ul>
      </section>
    </>
  );
};

export default EmployeeList;
