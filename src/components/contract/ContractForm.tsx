import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import type { ContractInput } from "../../types/Contract";

interface Props {
  initialValues?: ContractInput;
  onSubmit: (contract: ContractInput) => void;
  submitText?: string;
  isShowing: React.Dispatch<React.SetStateAction<boolean>>;
}

interface ContractFormState {
  startDate: Date | null;
  endDate: Date | null;
  contractType: string;
  employmentType: string;
  hoursPerWeek: number;
}

const ContractForm = ({
  initialValues,
  onSubmit,
  submitText,
  isShowing,
}: Props) => {
  const [formData, setFormData] = useState<ContractFormState>({
    startDate: initialValues?.startDate
      ? new Date(initialValues.startDate)
      : new Date(),
    endDate: initialValues?.endDate ? new Date(initialValues.endDate) : null,
    contractType: initialValues?.contractType ?? "PERMANENT",
    employmentType: initialValues?.employmentType ?? "FULL_TIME",
    hoursPerWeek: initialValues?.hoursPerWeek ?? 0,
  });

  const [formError, setFormError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload: ContractInput = {
        startDate: formData.startDate
          ? formData.startDate.toISOString().split("T")[0]
          : "",
        endDate: formData.endDate
          ? formData.endDate.toISOString().split("T")[0]
          : null,
        contractType: formData.contractType,
        employmentType: formData.employmentType,
        hoursPerWeek: formData.hoursPerWeek,
      };

      await onSubmit(payload);
      setFormError(null);
    } catch (err) {
      setFormError(err instanceof Error ? err.message : "Unknown error");
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="space-y-4 p-6 border border-gray-400 rounded-lg shadow-md bg-white w-[95vw] max-w-[950px]"
      >
        <p className="text-md italic text-gray-500">
          Fill in the form to add a new contract:
        </p>
        <div>
          <label className="block text-sm font-semibold text-gray-700 capitalize">
            Start Date
          </label>
          <DatePicker
            className="w-full border p-2 rounded min-h-[40px]"
            selected={formData.startDate}
            onChange={(date: Date | null) =>
              setFormData((prev) => ({
                ...prev,
                startDate: date ?? new Date(),
              }))
            }
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 capitalize">
            End Date
          </label>
          <DatePicker
            className="w-full border p-2 rounded min-h-[40px]"
            selected={formData.endDate}
            onChange={(date: Date | null) =>
              setFormData((prev) => ({
                ...prev,
                endDate: date ?? new Date(),
              }))
            }
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 capitalize">
            Contract Type
          </label>
          <select
            className="w-full border p-2 rounded min-h-[40px]"
            name="contractType"
            value={formData.contractType ?? ""}
            onChange={handleChange}
          >
            <option value="PERMANENT">Permanent</option>
            <option value="CONTRACT">Contract</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 capitalize">
            Employment Type
          </label>
          <select
            className="w-full border p-2 rounded min-h-[40px]"
            name="employmentType"
            value={formData.employmentType ?? ""}
            onChange={handleChange}
          >
            <option value="FULL_TIME">Full Time</option>
            <option value="PART_TIME">Part Time</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 capitalize">
            Hours Per Week
          </label>
          <input
            className="w-full border p-2 rounded min-h-[40px]"
            name="hoursPerWeek"
            value={formData.hoursPerWeek ?? ""}
            onChange={handleChange}
          />
        </div>

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
      {formError && (
        <p className="text-red-600 bg-red-50 p-2 rounded mb-3">{formError}</p>
      )}
    </div>
  );
};

export default ContractForm;
