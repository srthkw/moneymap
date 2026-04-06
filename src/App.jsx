import { AppContext } from "./context/AppContext";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import InsightsPage from "./pages/InsightsPage";

function App() {

  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />,
      <Route path="/insights" element={<InsightsPage />} />
    </Routes>
  );
}

export default App;