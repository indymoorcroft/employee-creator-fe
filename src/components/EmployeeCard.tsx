import { useState } from "react";
import type { Employee } from "../types/Employee";
import { Link } from "react-router-dom";
import { deleteEmployeeById } from "../apiCalls";

interface Props {
  employee: Employee;
  setEmployees: any;
}

const EmployeeCard = ({ employee, setEmployees }: Props) => {
  const [isDeleting, setIsDeleting] = useState<Boolean>(false);
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
