import EmployeeList from "./components/EmployeeList";
import { Route, Routes } from "react-router-dom";
import "./global.css";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<EmployeeList />} />
      </Routes>
    </>
  );
};

export default App;
