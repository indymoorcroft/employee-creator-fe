import { useState } from "react";
import type { Employee } from "../types/Employee";
import { Link } from "react-router-dom";
import { deleteEmployeeById } from "../apiCalls";

interface Props {
  employee: Employee;
  setEmployees: any;
}

const EmployeeCard = ({ employee, setEmployees }: Props) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const { name } = event.currentTarget;
    const deleteEmployee = async () => {
      try {
        setIsDeleting(true);
        await deleteEmployeeById(name);
        setEmployees((currEmployees: Employee[]) => {
          return currEmployees.filter((employee) => {
            return employee.id !== +name;
          });
        });
        setIsDeleting(false);
      } catch (err) {
        setIsDeleting(false);
        if (err instanceof Error) {
          setError(err);
        } else {
          setError(new Error("Unknown error"));
        }
      }
    };

    deleteEmployee();
  };

  if (isDeleting) {
    return <p>deleting comment...</p>;
  }

  return (
    <div>
      <p>
        {employee.firstName} {employee.lastName}
      </p>
      <p>{employee.email}</p>
      <p>{employee.mobileNumber}</p>
      <Link to={`/employees/${employee.id}`}>View</Link>
      <div></div>
      <button
        name={employee.id.toString()}
        onClick={handleClick}
        disabled={isDeleting}
      >
        Remove
      </button>
    </div>
  );
};

export default EmployeeCard;
