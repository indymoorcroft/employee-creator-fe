export type Contract = {
  id: number;
  employeeId: number;
  startDate: string;
  endDate: string | null;
  contractType: string;
  employmentType: string;
  hoursPerWeek: number;
  createdAt: Date;
  updatedAt: Date;
};
