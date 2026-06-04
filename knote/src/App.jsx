import { BrowserRouter, Routes, Route } from "react-router-dom";

import Landing from "./pages/Landing";

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

import Feedback from "./pages/MeetingFeedback";
import WeeklyFeedback from "./pages/WeeklyFeedback";

import ErrorPage from "./pages/ErrorPage";
import LoadingPage from "./pages/LoadingPage";

import TeamOnboarding from "./pages/TeamOnboarding";
import MyPage from "./pages/MyPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 랜딩 / 로그인 화면 */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Landing />} />

        {/* 메인 대시보드 */}
        <Route path="/dashboard" element={<Dashboard />} />

        {/* 팀 */}
        <Route path="/team" element={<Team />} />

        {/* 회의 */}
        <Route path="/meeting" element={<Meeting />} />
        <Route path="/recording" element={<Recording />} />
        <Route path="/file-upload" element={<FileUpload />} />
        <Route path="/speaker-matching" element={<SpeakerMatching />} />
        <Route path="/meeting/result" element={<MeetingResult />} />

        {/* 투두 */}
        <Route path="/todo" element={<Todo />} />
        <Route path="/todo/sprint" element={<TodoSprint />} />
        <Route path="/todo/matching" element={<TodoMatching />} />

        {/* 피드백 */}
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/weekly-feedback" element={<WeeklyFeedback />} />

        <Route path="/error" element={<ErrorPage />} />   
        <Route path="/loading" element={<LoadingPage />} />
        <Route path="*" element={<ErrorPage />} />

        <Route path="/login" element={<Landing />} />
        <Route path="/team-onboarding" element={<TeamOnboarding />} />

        <Route path="/mypage" element={<MyPage />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;