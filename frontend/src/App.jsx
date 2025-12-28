import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import CampaignDetail from "./pages/CampaignDetail";

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/campaign/:id" element={<CampaignDetail />} />
    </Routes>
  </BrowserRouter>
);

export default App;
