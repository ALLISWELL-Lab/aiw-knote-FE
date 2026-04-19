import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Team from "./pages/Team";
import Meeting from "./pages/Meeting";
import MeetingResult from "./pages/MeetingResult";
import Todo from "./pages/Todo";
import Feedback from "./pages/Feedback";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/team" element={<Team />} />
        <Route path="/meeting" element={<Meeting />} />
        <Route path="/meeting/result" element={<MeetingResult />} />
        <Route path="/todo" element={<Todo />} />
        <Route path="/feedback" element={<Feedback />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;