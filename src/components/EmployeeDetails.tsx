import type { Employee } from "../types/Employee";

interface Props {
  employee: Employee | null;
  setEmployee: React.Dispatch<React.SetStateAction<Employee | null>>;
}

const EmployeeDetails = ({ employee, setEmployee }: Props) => {
  return <div>{employee?.firstName}</div>;
};

export default EmployeeDetails;
