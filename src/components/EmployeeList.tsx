import { useEffect, useState } from "react";
import { getAllEmployees } from "../apiCalls";
import type { Employee } from "../types/Employee";
import EmployeeCard from "./EmployeeCard";

const EmployeeList = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const employeeData = await getAllEmployees();
        setIsLoading(false);
        setEmployees(employeeData);
      } catch (error) {
        setIsError(true);
        setIsLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  if (isLoading) {
    return <p>Loading comments</p>;
  }

  if (isError) {
    return <p>Employees could not be loaded</p>;
  }

  return (
    <>
      <section>
        <h2>Employees</h2>
        <ul>
          {employees.map((employee) => {
            return <EmployeeCard key={employee.id} employee={employee} />;
          })}
        </ul>
      </section>
    </>
  );
};

export default EmployeeList;
