import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Team from "./pages/Team";

import Meeting from "./pages/Meeting";
import Recording from "./pages/Recording";
import FileUpload from "./pages/FileUpload";
import SpeakerMatching from "./pages/SpeakerMatching";
import MeetingResult from "./pages/MeetingResult";

import Todo from "./pages/Todo";
import TodoSprint from "./pages/TodoSprint";
import TodoMatching from "./pages/TodoMatching";

import Feedback from "./pages/Feedback";
import WeeklyFeedback from "./pages/WeeklyFeedback";

import ErrorPage from "./pages/ErrorPage";
import LoadingPage from "./pages/LoadingPage";

import Landing from "./pages/Landing";
import TeamOnboarding from "./pages/TeamOnboarding";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />

        <Route path="/team" element={<Team />} />

        <Route path="/meeting" element={<Meeting />} />
        <Route path="/recording" element={<Recording />} />
        <Route path="/file-upload" element={<FileUpload />} />
        <Route path="/speaker-matching" element={<SpeakerMatching />} />
        <Route path="/meeting/result" element={<MeetingResult />} />

        <Route path="/todo" element={<Todo />} />
        <Route path="/todo/sprint" element={<TodoSprint />} />
        <Route path="/todo/matching" element={<TodoMatching />} />

        <Route path="/feedback" element={<Feedback />} />
        <Route path="/weekly-feedback" element={<WeeklyFeedback />} />

        <Route path="/error" element={<ErrorPage />} />   
        <Route path="/loading" element={<LoadingPage />} />
        <Route path="*" element={<ErrorPage />} />

        <Route path="/login" element={<Landing />} />
        <Route path="/team-onboarding" element={<TeamOnboarding />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;