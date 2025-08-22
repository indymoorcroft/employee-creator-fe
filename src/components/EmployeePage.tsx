import { useEffect, useState } from "react";
import type { Employee } from "../types/Employee";
import { useParams } from "react-router-dom";
import { getContractsById, getEmployeeById } from "../apiCalls";
import Header from "./Header";
import EmployeeDetails from "./EmployeeDetails";
import type { Contract } from "../types/Contract";
import EmployeeContractCard from "./EmployeeContractCard";

const EmployeePage = () => {
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [contracts, setContracts] = useState<Contract[]>([]);
  const [isLoading, setIsLoading] = useState<Boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const { id } = useParams();

  useEffect(() => {
    const fetchEmployeeAndContractsById = async () => {
      try {
        setIsLoading(true);
        const employeeData = await getEmployeeById(id);
        const contractData = await getContractsById(id);
        setEmployee(employeeData);
        setContracts(contractData);
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Unknown error"));
      } finally {
        setIsLoading(false);
      }
    };

    fetchEmployeeAndContractsById();
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
          <section className="flex items-center justify-center mt-6">
            <EmployeeDetails employee={employee} setEmployee={setEmployee} />
          </section>
          <section>
            {contracts.map((contract) => {
              return (
                <EmployeeContractCard
                  key={contract.id}
                  contract={contract}
                  setContracts={setContracts}
                />
              );
            })}
          </section>
        </>
      )}
    </div>
  );
};

export default EmployeePage;
