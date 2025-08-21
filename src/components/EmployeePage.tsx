import { useEffect, useState } from "react";
import type { Employee } from "../types/Employee";
import { useParams } from "react-router-dom";
import { getEmployeeById } from "../apiCalls";
import Header from "./Header";
import EmployeeDetails from "./EmployeeDetails";
import EmployeeContractList from "./EmployeeContractList";

const EmployeePage = () => {
  const [employee, setEmployee] = useState<Employee>();
  const [isLoading, setIsLoading] = useState<Boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const { id } = useParams();

  useEffect(() => {
    const fetchEmployeeById = async () => {
      try {
        setIsLoading(true);
        const employeeData = await getEmployeeById(id);
        setEmployee(employeeData);
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Unknown error"));
      } finally {
        setIsLoading(false);
      }
    };

    fetchEmployeeById();
  }, []);

  if (isLoading) {
    return <p>Loading employee</p>;
  }

  return (
    <div>
      {error ? (
        <p>There was an error</p> // Add Error Component
      ) : (
        <>
          <Header title={employee?.firstName + " " + employee?.lastName} />
          <EmployeeDetails />
          <EmployeeContractList />
        </>
      )}
    </div>
  );
};

export default EmployeePage;
