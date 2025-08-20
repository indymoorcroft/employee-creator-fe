import axios from "axios";
import type { Employee } from "./types/Employee";

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

export const deleteEmployeeById = async (id: string) => {
  await employeeApi.delete(`/employees/${id}`);
};
