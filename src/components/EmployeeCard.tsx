import type { Employee } from "../types/Employee";

interface Props {
  employee: Employee;
}

const EmployeeCard = ({ employee }: Props) => {
  return (
    <div>
      <p>
        {employee.firstName} {employee.lastName}
      </p>
      <p>{employee.email}</p>
      <p>{employee.mobileNumber}</p>
    </div>
  );
};

export default EmployeeCard;
