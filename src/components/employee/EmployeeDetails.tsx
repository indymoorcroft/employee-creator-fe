import { useState } from "react";
import type { Employee, EmployeeInput } from "../../types/Employee";
import { updateEmployee } from "../../apiCalls";
import EmployeeForm from "./EmployeeForm";
import FormDetails from "../FormDetails";

interface Props {
  employee: Employee | null;
  setEmployee: React.Dispatch<React.SetStateAction<Employee | null>>;
}

const EmployeeDetails = ({ employee, setEmployee }: Props) => {
  const [isEditingEmployee, setIsEditingEmployee] = useState<boolean>(false);

  if (!employee) return <p>No employee found</p>;

  const handleSave = async (formData: EmployeeInput) => {
    if (!formData) return;
    const updated = await updateEmployee(employee.id, formData);
    setEmployee(updated);
    setIsEditingEmployee(false);
  };

  return (
    <div>
      {isEditingEmployee ? (
        <div className="space-y-4">
          <EmployeeForm
            initialValues={employee}
            onSubmit={handleSave}
            submitText="Save"
            isShowing={setIsEditingEmployee}
          />
        </div>
      ) : (
        <FormDetails
          info={employee}
          fields={["firstName", "lastName", "email", "mobileNumber", "address"]}
          setIsEditing={setIsEditingEmployee}
        />
      )}
    </div>
  );
};

export default EmployeeDetails;
