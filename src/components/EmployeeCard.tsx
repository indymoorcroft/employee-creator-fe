import { useState } from "react";
import type { Employee } from "../types/Employee";
import { Link } from "react-router-dom";
import { deleteEmployeeById } from "../apiCalls";

interface Props {
  employee: Employee;
  setEmployees: React.Dispatch<React.SetStateAction<Employee[]>>;
}

const EmployeeCard = ({ employee, setEmployees }: Props) => {
  const [isDeleting, setIsDeleting] = useState<Boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const handleClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
    const id = event.currentTarget.name;
    try {
      setIsDeleting(true);
      await deleteEmployeeById(id);
      setEmployees((currEmployees) =>
        currEmployees.filter((employee) => employee.id !== +id)
      );
      setIsDeleting(false);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Unknown error"));
    } finally {
      setIsDeleting(false);
    }
  };

  if (isDeleting) {
    return <p>deleting employee...</p>;
  }

  return (
    <div>
      {error ? (
        <p>There was an error</p> // Add Error Component
      ) : (
        <li>
          <p>
            {employee.firstName} {employee.lastName}
          </p>
          <p>Email: {employee.email}</p>
          <p>Mobile Number: {employee.mobileNumber}</p>
          <Link to={`/employees/${employee.id}`}>View</Link>
          <div></div>
          <button
            name={employee.id.toString()}
            onClick={handleClick}
            disabled={isDeleting}
          >
            Remove
          </button>
        </li>
      )}
    </div>
  );
};

export default EmployeeCard;
