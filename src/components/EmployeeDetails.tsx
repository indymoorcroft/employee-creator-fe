import { useEffect, useState } from "react";
import type { Employee } from "../types/Employee";
import { updateEmployee } from "../apiCalls";
import { formatValue } from "../utils";

interface Props {
  employee: Employee | null;
  setEmployee: React.Dispatch<React.SetStateAction<Employee | null>>;
}

const EmployeeDetails = ({ employee, setEmployee }: Props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<Employee | null>(employee);

  useEffect(() => {
    setFormData(employee);
  }, [employee]);

  if (!employee) return <p>No employee found</p>;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!formData) return;
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    if (!formData) return;
    const updated = await updateEmployee(employee.id, formData);
    setEmployee(updated);
    setIsEditing(false);
  };

  return (
    <div className="p-6 border border-gray-400 rounded-lg shadow-md w-[95vw] bg-white">
      {isEditing ? (
        <div className="space-y-4">
          {["firstName", "lastName", "email", "mobileNumber", "address"].map(
            (field) => (
              <div key={field}>
                <label className="block text-sm font-semibold text-gray-700 capitalize">
                  {field.replace(/([A-Z])/g, " $1")}
                </label>
                <input
                  className="w-full border p-2 rounded min-h-[40px] bg-amber-100"
                  name={field}
                  value={formatValue(formData?.[field as keyof Employee] ?? "")}
                  onChange={handleChange}
                />
              </div>
            )
          )}
          <div className="flex gap-2">
            <button
              onClick={handleSave}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Save
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {["firstName", "lastName", "email", "mobileNumber", "address"].map(
            (field) => (
              <div key={field}>
                <p className="block text-sm font-semibold text-gray-700 capitalize">
                  {field.replace(/([A-Z])/g, " $1")}
                </p>
                <p className="w-full border p-2 rounded min-h-[40px]">
                  {formatValue(employee[field as keyof Employee])}
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
