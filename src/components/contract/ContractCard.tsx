import { useState } from "react";
import type { Contract, ContractInput } from "../../types/Contract";
import ContractForm from "./ContractForm";
import FormDetails from "../FormDetails";
import { deleteContract, updateContract } from "../../apiCalls";

interface Props {
  contract: Contract;
  setContracts: React.Dispatch<React.SetStateAction<Contract[]>>;
}

const ContractCard = ({ contract, setContracts }: Props) => {
  const [isEditingContract, setIsEditingContract] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      await deleteContract(contract.id);
      setContracts((currContracts) =>
        currContracts.filter((c) => c.id !== contract.id)
      );
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Unknown error"));
    } finally {
      setIsDeleting(false);
    }
  };

  const handleUpdate = async (updatedContract: ContractInput) => {
    const newContract = await updateContract(contract.id, updatedContract);
    setContracts((currContracts) =>
      currContracts.map((c) => (c.id === newContract.id ? newContract : c))
    );
    setIsEditingContract(false);
  };

  return (
    <div className="my-1">
      {error && <p>{error.message}</p>}
      {isEditingContract ? (
        <ContractForm
          initialValues={contract}
          onSubmit={handleUpdate}
          submitText="Update"
          isShowing={setIsEditingContract}
        />
      ) : (
        <>
          <FormDetails
            info={contract}
            fields={[
              "startDate",
              "endDate",
              "contractType",
              "employmentType",
              "hoursPerWeek",
            ]}
            onClick={handleDelete}
            setIsEditing={setIsEditingContract}
          />
          <div>{isDeleting && <p>Deleting contract...</p>}</div>
        </>
      )}
    </div>
  );
};

export default ContractCard;
