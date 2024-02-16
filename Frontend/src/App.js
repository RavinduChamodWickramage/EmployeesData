import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import EmployeeEnter from "./Components/EmployeeEnter";
import EmployeeDisplay from "./Components/EmployeeDisplay";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<EmployeeEnter />} />
        <Route path="/display" element={<EmployeeDisplay />} />
      </Routes>
    </Router>
  );
}

export default App;
