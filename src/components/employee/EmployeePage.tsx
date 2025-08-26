import { useEffect, useState } from "react";
import type { Employee } from "../../types/Employee";
import { useParams } from "react-router-dom";
import {
  createContract,
  getContractsById,
  getEmployeeById,
} from "../../apiCalls";
import Header from "../Header";
import EmployeeDetails from "./EmployeeDetails";
import type { Contract, ContractInput } from "../../types/Contract";
import ContractCard from "../contract/ContractCard";
import ContractForm from "../contract/ContractForm";

const EmployeePage = () => {
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [contracts, setContracts] = useState<Contract[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isAdding, setIsAdding] = useState<boolean>(false);
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

  const handleClick = () => {
    setIsAdding(!isAdding);
  };

  const handleAdd = async (contract: ContractInput) => {
    if (id) {
      const newContract = await createContract(id, contract);
      setContracts((currContracts) => [newContract, ...currContracts]);
      setIsAdding(false);
    }
  };

  if (isLoading) {
    return <p>Loading employee</p>;
  }

  return (
    <div>
      {error ? (
        <p>There was an error</p> // Add Error Component
      ) : (
        <>
          <Header
            title={employee?.firstName + " " + employee?.lastName}
            backButton={true}
          />
          <section className="flex items-center justify-center mt-6">
            <div>
              <h2 className="text-xl font-semibold border-b-2 border-gray-300 pb-1 mb-4 w-[50vw] max-w-[300px]">
                Personal details:
              </h2>
              <EmployeeDetails employee={employee} setEmployee={setEmployee} />
            </div>
          </section>
          <section className="flex items-center justify-center mt-6">
            <div>
              <div className="w-[95vw] max-w-[950px] mx-auto">
                <h2 className="text-xl font-semibold border-b-2 border-gray-300 pb-1 mb-4 w-[50vw] max-w-[300px]">
                  Contract details:
                </h2>
                <div className="w-full flex justify-end">
                  {isAdding ? (
                    <ContractForm
                      onSubmit={handleAdd}
                      submitText="Add"
                      isShowing={setIsAdding}
                    />
                  ) : (
                    <button
                      onClick={handleClick}
                      className="px-4 py-2 text-white text-sm font-medium rounded bg-green-600 hover:bg-green-700"
                    >
                      Add Contract
                    </button>
                  )}
                </div>
              </div>
              {contracts.length > 0 ? (
                <div>
                  {contracts.map((contract) => {
                    return (
                      <ContractCard
                        key={contract.id}
                        contract={contract}
                        setContracts={setContracts}
                      />
                    );
                  })}
                </div>
              ) : (
                <p className="my-4">No contracts found</p>
              )}
            </div>
          </section>
        </>
      )}
    </div>
  );
};

export default EmployeePage;
