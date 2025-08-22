import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { getAllEmployees } from "../apiCalls";
import type { Employee } from "../types/Employee";
import EmployeeCard from "./EmployeeCard";
import Header from "./Header";

const EmployeeList = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [isLoading, setIsLoading] = useState<Boolean>(true);
  const [isError, setIsError] = useState<Boolean>(false);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const employeesData = await getAllEmployees();
        setIsLoading(false);
        setEmployees(employeesData);
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
        <Header title="All Employees" />
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
