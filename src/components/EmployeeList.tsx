import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

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
    return <p>Loading employees</p>;
  }

  if (isError) {
    return <p>Employees could not be loaded</p>;
  }

  return (
    <>
      <section>
        <h2>Employees</h2>
        <Link to={"/employees/new"}>Add Employee</Link>
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
