import { useState } from "react";
import type { Employee, EmployeeInput } from "../types/Employee";
import { updateEmployee } from "../apiCalls";
import EmployeeForm from "./EmployeeForm";

interface Props {
  employee: Employee | null;
  setEmployee: React.Dispatch<React.SetStateAction<Employee | null>>;
}

const EmployeeDetails = ({ employee, setEmployee }: Props) => {
  const [isEditing, setIsEditing] = useState<Boolean>(false);

  if (!employee) return <p>No employee found</p>;

  const handleSave = async (formData: EmployeeInput) => {
    if (!formData) return;
    const updated = await updateEmployee(employee.id, formData);
    setEmployee(updated);
    setIsEditing(false);
  };

  return (
    <div>
      {isEditing ? (
        <div className="space-y-4">
          <EmployeeForm
            initialValues={employee}
            onSubmit={handleSave}
            submitText="Save"
            isShowing={setIsEditing}
          />
        </div>
      ) : (
        <div className="space-y-4 p-6 border border-gray-400 rounded-lg shadow-md w-[95vw] max-w-[950px] bg-white">
          {["firstName", "lastName", "email", "mobileNumber", "address"].map(
            (field) => (
              <div key={field}>
                <p className="block text-sm font-semibold text-gray-700 capitalize">
                  {field.replace(/([A-Z])/g, " $1")}
                </p>
                <p className="w-full border p-2 rounded min-h-[40px]">
                  {employee[field as keyof EmployeeInput]}
                </p>
              </div>
            )
          )}
          <div className="flex gap-2.5">
            <button
              onClick={() => setIsEditing(true)}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Edit
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeDetails;
