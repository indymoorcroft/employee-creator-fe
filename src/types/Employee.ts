export type Employee = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  mobileNumber: string;
  address: string;
  createdAt: Date;
  updatedAt: Date;
};

export type EmployeeInput = Omit<Employee, "id" | "createdAt" | "updatedAt">;
