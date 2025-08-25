import { useState } from "react";
import type { Contract } from "../../types/Contract";
import ContractForm from "./ContractForm";
import FormDetails from "../FormDetails";

interface Props {
  contract: Contract;
  setContracts: React.Dispatch<React.SetStateAction<Contract[]>>;
}

const ContractCard = ({ contract, setContracts }: Props) => {
  const [isEditingContract, setIsEditingContract] = useState<boolean>(false);

  const handleUpdate = async (updated: Contract) => {};

  const handleDelete = async () => {};

  return (
    <div>
      {isEditingContract ? (
        <ContractForm />
      ) : (
        <FormDetails
          info={contract}
          fields={[
            "startDate",
            "endDate",
            "contractType",
            "employmentType",
            "hoursPerWeek",
          ]}
          setIsEditing={setIsEditingContract}
        />
      )}
    </div>
  );
};

export default ContractCard;
