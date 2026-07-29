import { BrowserRouter, Routes, Route } from "react-router-dom";

import SubmissionPage from "./pages/SubmissionPage";
import DashboardPage from "./pages/DashboardPage";
import WallPage from "./pages/WallPage";
import WidgetPage from "./pages/WidgetPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SubmissionPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/wall" element={<WallPage />} />
        <Route path="/widget" element={<WidgetPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;