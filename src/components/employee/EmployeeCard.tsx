import { useState } from "react";
import type { Employee } from "../../types/Employee";
import { Link } from "react-router-dom";
import { deleteEmployee } from "../../apiCalls";

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
      await deleteEmployee(id);
      setEmployees((currEmployees) =>
        currEmployees.filter((employee) => employee.id !== +id)
      );
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
    <div className="flex items-center justify-center">
      {error ? (
        <p>There was an error</p> // Add Error Component
      ) : (
        <li className="list-none bg-white border rounded-xl shadow-md p-4 mb-4 hover:shadow-lg transition w-[95vw] max-w-[950px]">
          <div className="flex justify-between">
            <div className="mb-2 flex flex-col space-y-1">
              <p className="text-lg font-semibold text-gray-800">
                {employee.firstName} {employee.lastName}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-medium">Email:</span> {employee.email}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-medium">Mobile:</span>{" "}
                {employee.mobileNumber}
              </p>
            </div>

            <div className="flex items-center">
              <Link
                to={`/employees/${employee.id}`}
                className="px-3 py-1 text-white text-sm font-medium rounded bg-blue-600 hover:bg-blue-700 mr-2"
              >
                View
              </Link>
              <button
                name={employee.id.toString()}
                onClick={handleClick}
                disabled={isDeleting}
                className={`px-3 py-1 rounded text-sm font-medium text-white transition 
            ${
              isDeleting
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-red-500 hover:bg-red-600"
            }`}
              >
                {isDeleting ? "Removing..." : "Remove"}
              </button>
            </div>
          </div>
        </li>
      )}
    </div>
  );
};

export default EmployeeCard;
