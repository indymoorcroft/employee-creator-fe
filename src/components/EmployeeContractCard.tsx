import type { Contract } from "../types/Contract";

interface Props {
  contract: Contract;
  setContracts: React.Dispatch<React.SetStateAction<Contract[]>>;
}

const EmployeeContractCard = ({ contract, setContracts }: Props) => {
  return <div>{contract.hoursPerWeek}</div>;
};

export default EmployeeContractCard;
