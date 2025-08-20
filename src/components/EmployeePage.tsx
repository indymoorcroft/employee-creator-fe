import { useEffect, useState } from "react";
import type { Employee } from "../types/Employee";
import { useParams } from "react-router-dom";
import { getEmployeeById } from "../apiCalls";

const EmployeePage = () => {
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [isLoading, setIsLoading] = useState<Boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const { id } = useParams();

  useEffect(() => {
    const fetchEmployeeById = async () => {
      try {
        const employeeData = await getEmployeeById(id);
        setIsLoading(false);
        setEmployee(employeeData);
      } catch (err) {
        setIsLoading(false);
        if (err instanceof Error) {
          setError(err);
        } else {
          setError(new Error("Unknown error"));
        }
      }
    };

    fetchEmployeeById();
  }, []);

  if (isLoading) {
    return <p>Loading employee</p>;
  }

  return <div>{employee?.firstName}</div>;
};

export default EmployeePage;
