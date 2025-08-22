import { useState, useEffect } from "react";
import type { Employee, EmployeeInput } from "../types/Employee";

interface Props {
  initialValues?: Employee;
  onSubmit: (employee: Employee | EmployeeInput) => void;
  submitText?: string;
  isShowing: React.Dispatch<React.SetStateAction<Boolean>>;
}

const EmployeeForm = ({
  initialValues,
  onSubmit,
  submitText,
  isShowing,
}: Props) => {
  const [formData, setFormData] = useState<Employee | EmployeeInput>(
    initialValues ?? {
      firstName: "",
      lastName: "",
      email: "",
      mobileNumber: "",
      address: "",
    }
  );

  useEffect(() => {
    if (initialValues) {
      setFormData(initialValues);
    }
  }, [initialValues]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 p-6 border rounded-lg shadow-md bg-white"
    >
      {["firstName", "lastName", "email", "mobileNumber", "address"].map(
        (field) => (
          <div key={field}>
            <label className="block text-sm font-semibold text-gray-700 capitalize">
              {field.replace(/([A-Z])/g, " $1")}
            </label>
            <input
              className="w-full border p-2 rounded min-h-[40px]"
              name={field}
              value={formData[field as keyof EmployeeInput] ?? ""}
              onChange={handleChange}
            />
          </div>
        )
      )}
      <div className="flex gap-2">
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          {submitText ?? "Save"}
        </button>
        <button
          onClick={() => isShowing(false)}
          className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default EmployeeForm;
