import EmployeeList from "./components/employee/EmployeeList";
import { Route, Routes } from "react-router-dom";
import "./global.css";
import EmployeePage from "./components/employee/EmployeePage";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<EmployeeList />} />
        <Route path="/employees/:id" element={<EmployeePage />} />
      </Routes>
    </>
  );
};

export default App;
