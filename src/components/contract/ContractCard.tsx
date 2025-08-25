import { useState } from "react";
import type { Contract } from "../../types/Contract";
import ContractForm from "./ContractForm";
import FormDetails from "../FormDetails";
import { deleteContract } from "../../apiCalls";

interface Props {
  contract: Contract;
  setContracts: React.Dispatch<React.SetStateAction<Contract[]>>;
}

const ContractCard = ({ contract, setContracts }: Props) => {
  const [isEditingContract, setIsEditingContract] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const handleUpdate = async (updated: Contract) => {};

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

  return (
    <div>
      {isEditingContract ? (
        <ContractForm />
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
