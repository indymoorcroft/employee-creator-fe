import axios from "axios";
import type { Employee, EmployeeInput } from "./types/Employee";
import type { Contract } from "./types/Contract";
import { createErrorMessage } from "./utils";

const employeeApi = axios.create({
  baseURL: "http://localhost:9000",
});

export const getAllEmployees = async (): Promise<Employee[]> => {
  const { data } = await employeeApi.get("/employees");
  return data;
};

export const getEmployeeById = async (
  id: string | undefined
): Promise<Employee> => {
  const { data } = await employeeApi.get(`/employees/${id}`);
  return data;
};

export const getContractsById = async (
  id: string | undefined
): Promise<Contract[]> => {
  const { data } = await employeeApi.get(`/employees/${id}/contracts`);
  return data;
};

export const createEmployee = async (
  employee: EmployeeInput
): Promise<Employee> => {
  try {
    const { data } = await employeeApi.post("/employees", employee);
    return data;
  } catch (err: any) {
    if (err.response && err.response.data) {
      throw new Error(createErrorMessage(err.response.data.validation_errors));
    } else {
      throw new Error("Unknown error creating employee");
    }
  }
};

export const updateEmployee = async (
  id: number,
  updatedEmployee: EmployeeInput
): Promise<Employee> => {
  try {
    const { data } = await employeeApi.patch(
      `/employees/${id}`,
      updatedEmployee
    );
    return data;
  } catch (err: any) {
    if (err.response && err.response.data) {
      throw new Error(createErrorMessage(err.response.data.validation_errors));
    } else {
      throw new Error("Unknown error updating employee");
    }
  }
};

export const deleteEmployeeById = async (id: string) => {
  await employeeApi.delete(`/employees/${id}`);
};
