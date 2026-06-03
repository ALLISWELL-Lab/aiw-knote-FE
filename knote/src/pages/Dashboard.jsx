import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import api from "../api";

const monthNames = [
  "JANUARY",
  "FEBRUARY",
  "MARCH",
  "APRIL",
  "MAY",
  "JUNE",
  "JULY",
  "AUGUST",
  "SEPTEMBER",
  "OCTOBER",
  "NOVEMBER",
  "DECEMBER",
];

const PROJECT_OPTIONS = [
  {
    id: "capstone-a",
    name: "캡스톤디자인과창업프로젝트 A",
  },
  {
    id: "capstone-b",
    name: "캡스톤디자인과창업프로젝트 B",
  },
];

const DEFAULT_DASHBOARD_TODOS = [
  {
    id: 1,
    task: "회의 분석 결과 페이지 스크린샷 정리",
    assignee: "임이랑",
    dueDate: "2026-06-05",
    status: "진행 중",
    checked: true,
  },
  {
    id: 2,
    task: "백엔드 API 응답 형식 확인",
    assignee: "정서윤",
    dueDate: "2026-06-06",
    status: "진행 중",
    checked: false,
  },
  {
    id: 3,
    task: "회의 업로드 API 연동 점검",
    assignee: "강민지",
    dueDate: "2026-06-05",
    status: "진행 중",
    checked: false,
  },
  {
    id: 4,
    task: "발표용 시연 흐름 정리",
    assignee: "공통",
    dueDate: "2026-06-07",
    status: "진행 중",
    checked: false,
  },
];

function getTodayKey() {
  const today = new Date();
  return formatDateKey(today);
}

function formatDateKey(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function getDday(dueDate) {
  if (!dueDate) return "D-?";

  const today = new Date();
  const target = new Date(dueDate);

  today.setHours(0, 0, 0, 0);
  target.setHours(0, 0, 0, 0);

  const diff = Math.ceil((target - today) / (1000 * 60 * 60 * 24));

  if (diff === 0) return "D-DAY";
  if (diff > 0) return `D-${diff}`;
  return `D+${Math.abs(diff)}`;
}

function normalizeTodos(rawTodos) {
  if (!Array.isArray(rawTodos) || rawTodos.length === 0) {
    return DEFAULT_DASHBOARD_TODOS;
  }

  return rawTodos.map((todo, index) => ({
    id: todo.id || index + 1,
    task: todo.task || todo.content || todo.title || "회의 기반 TODO",
    assignee: todo.assignee || todo.member || todo.owner || "미배정",
    dueDate: todo.dueDate || todo.deadline || "2026-06-05",
    status: todo.status || "진행 중",
    checked: todo.checked || false,
  }));
}

function TodoRow({ todo, onToggle }) {
  return (
    <label className="flex items-start gap-[10px] min-h-[42px] text-[13px] text-black cursor-pointer py-[6px]">
      <input
        type="checkbox"
        checked={todo.checked}
        onChange={() => onToggle(todo.id)}
        className="w-[13px] h-[13px] mt-[3px] accent-[#4A8DFF] shrink-0"
      />

      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-[8px]">
          <span
            className={`leading-[18px] ${
              todo.checked ? "line-through text-gray-400" : "text-black"
            }`}
          >
            {todo.assignee} · {todo.task}
          </span>

          <span className="text-[11px] font-semibold text-[#4A8DFF] whitespace-nowrap">
            {getDday(todo.dueDate)}
          </span>
        </div>

        <div className="mt-[3px] flex items-center gap-[6px]">
          <span className="h-[18px] px-[6px] bg-[#EAF1FC] border border-[#C9DEFA] rounded-full text-[10px] text-black flex items-center">
            {todo.status}
          </span>
          <span className="text-[10px] text-gray-500">
            마감 {todo.dueDate}
          </span>
        </div>
      </div>
    </label>
  );
}

function getCalendarDays(displayDate, todayRef) {
  const year = displayDate.getFullYear();
  const month = displayDate.getMonth();
  const ref = todayRef || displayDate;

  const firstDate = new Date(year, month, 1);
  const firstDay = firstDate.getDay();
  const mondayStartIndex = firstDay === 0 ? 6 : firstDay - 1;

  const startDate = new Date(year, month, 1 - mondayStartIndex);

  return Array.from({ length: 42 }, (_, index) => {
    const current = new Date(startDate);
    current.setDate(startDate.getDate() + index);

    return {
      date: current,
      key: formatDateKey(current),
      day: current.getDate(),
      isCurrentMonth: current.getMonth() === month,
      isToday:
        current.getFullYear() === ref.getFullYear() &&
        current.getMonth() === ref.getMonth() &&
        current.getDate() === ref.getDate(),
    };
  });
}

function formatScheduleDate(dateKey) {
  const [year, month, day] = dateKey.split("-");

  return `${year}/${month}/${day}`;
}

function CalendarCell({
  item,
  active = false,
  muted = false,
  selected = false,
  hasSchedules = false,
  onClick,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative h-[44px] flex items-center justify-center text-[14px] transition ${
        selected
          ? "bg-[#ADDCFF] text-black font-semibold"
          : active
          ? "bg-[#4A8DFF] text-white font-semibold"
          : muted
          ? "text-gray-400 hover:bg-[#F8FBFF]"
          : "text-black hover:bg-[#EAF1FC]"
      }`}
    >
      {item.day}

      {hasSchedules && (
        <span
          className={`absolute bottom-[5px] w-[5px] h-[5px] rounded-full ${
            active && !selected ? "bg-white" : "bg-[#4A8DFF]"
          }`}
        />
      )}
    </button>
  );
}

function NoticeWriteModal({ onClose }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const formatNoticeDate = () => {
    const now = new Date();

    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    const hour = String(now.getHours()).padStart(2, "0");
    const minute = String(now.getMinutes()).padStart(2, "0");

    return `${year}. ${month}. ${day} ${hour}:${minute}`;
  };

  const handleSubmit = () => {
    if (!title.trim() || !content.trim()) {
      alert("공지 제목과 내용을 모두 입력해 주세요.");
      return;
    }

    const newNotice = {
      id: Date.now(),
      title: title.trim(),
      content: content.trim(),
      createdAt: formatNoticeDate(),
      read: false,
    };

    const previousNotices = JSON.parse(
      localStorage.getItem("knoteNotices") || "[]"
    );

    const updatedNotices = [newNotice, ...previousNotices];

    localStorage.setItem("knoteNotices", JSON.stringify(updatedNotices));
    window.dispatchEvent(new Event("knote-notice-updated"));

    setTitle("");
    setContent("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/20 flex items-center justify-center">
      <div className="w-[430px] bg-white border border-[#C9DEFA] shadow-[0_8px_28px_rgba(0,0,0,0.18)]">
        <div className="h-[46px] border-b border-[#C9DEFA] bg-[#EAF1FC] flex items-center justify-between px-[18px]">
          <span className="text-[15px] font-semibold text-black">
            공지 작성
          </span>
          <button
            type="button"
            onClick={onClose}
            className="text-[18px] text-black leading-none"
          >
            ×
          </button>
        </div>

        <div className="px-[20px] py-[18px]">
          <label className="block text-[13px] font-semibold text-black mb-[8px]">
            제목
          </label>
          <input
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="공지 제목을 입력하세요"
            className="w-full h-[36px] border border-[#C9DEFA] bg-white px-[10px] text-[13px] text-black outline-none mb-[16px]"
          />

          <label className="block text-[13px] font-semibold text-black mb-[8px]">
            내용
          </label>
          <textarea
            value={content}
            onChange={(event) => setContent(event.target.value)}
            placeholder="팀원에게 공유할 공지 내용을 입력하세요"
            className="w-full h-[120px] border border-[#C9DEFA] bg-white px-[10px] py-[9px] text-[13px] text-black outline-none resize-none"
          />
        </div>

        <div className="h-[54px] border-t border-[#C9DEFA] bg-[#EAF1FC] flex items-center justify-end gap-[10px] px-[18px]">
          <button
            type="button"
            onClick={onClose}
            className="w-[56px] h-[28px] bg-white border border-[#C9DEFA] text-[13px] text-black"
          >
            취소
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="w-[56px] h-[28px] bg-[#4A8DFF] text-white text-[13px]"
          >
            등록
          </button>
        </div>
      </div>
    </div>
  );
}

function PermissionModal({ onClose }) {
  return (
    <div className="fixed inset-0 z-50 bg-black/20 flex items-center justify-center">
      <div className="w-[320px] bg-white border border-[#C9DEFA] shadow-[0_8px_24px_rgba(0,0,0,0.18)]">
        <div className="h-[44px] border-b border-[#C9DEFA] bg-[#EAF1FC] flex items-center px-[18px] text-[15px] font-semibold text-black">
          권한 안내
        </div>

        <div className="px-[20px] py-[26px] text-[14px] text-black text-center">
          팀장 전용 권한입니다.
        </div>

        <div className="h-[52px] border-t border-[#C9DEFA] bg-[#EAF1FC] flex items-center justify-center">
          <button
            type="button"
            onClick={onClose}
            className="w-[64px] h-[28px] bg-[#4A8DFF] text-white text-[13px]"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
}

function ScheduleModal({
  selectedDate,
  schedule,
  onClose,
  onSave,
  onDelete,
}) {
  const [title, setTitle] = useState(schedule?.title || "");
  const [time, setTime] = useState(schedule?.time || "10:00");

  const handleSave = () => {
    if (!title.trim()) {
      alert("일정 내용을 입력해 주세요.");
      return;
    }

    onSave({
      id: schedule?.id || Date.now(),
      title: title.trim(),
      time,
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/20 flex items-center justify-center">
      <div className="w-[390px] bg-white border border-[#C9DEFA] shadow-[0_8px_28px_rgba(0,0,0,0.18)]">
        <div className="h-[46px] border-b border-[#C9DEFA] bg-[#EAF1FC] flex items-center justify-between px-[18px]">
          <span className="text-[15px] font-semibold text-black">
            일정 {schedule ? "수정" : "등록"}
          </span>
          <button
            type="button"
            onClick={onClose}
            className="text-[18px] text-black leading-none"
          >
            ×
          </button>
        </div>

        <div className="px-[20px] py-[18px]">
          <p className="text-[13px] font-semibold text-black mb-[14px]">
            {formatScheduleDate(selectedDate)}
          </p>

          <label className="block text-[13px] font-semibold text-black mb-[8px]">
            시간
          </label>
          <input
            type="time"
            value={time}
            onChange={(event) => setTime(event.target.value)}
            className="w-full h-[36px] border border-[#C9DEFA] bg-white px-[10px] text-[13px] text-black outline-none mb-[16px]"
          />

          <label className="block text-[13px] font-semibold text-black mb-[8px]">
            일정 내용
          </label>
          <input
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="일정 내용을 입력하세요"
            className="w-full h-[36px] border border-[#C9DEFA] bg-white px-[10px] text-[13px] text-black outline-none"
          />
        </div>

        <div className="h-[54px] border-t border-[#C9DEFA] bg-[#EAF1FC] flex items-center justify-between px-[18px]">
          {schedule ? (
            <button
              type="button"
              onClick={() => onDelete(schedule.id)}
              className="w-[56px] h-[28px] bg-white border border-[#E43D3D] text-[13px] text-[#E43D3D]"
            >
              삭제
            </button>
          ) : (
            <div />
          )}

          <div className="flex items-center gap-[10px]">
            <button
              type="button"
              onClick={onClose}
              className="w-[56px] h-[28px] bg-white border border-[#C9DEFA] text-[13px] text-black"
            >
              취소
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="w-[56px] h-[28px] bg-[#4A8DFF] text-white text-[13px]"
            >
              저장
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Dashboard() {
  const today = new Date();
  const [calendarDate, setCalendarDate] = useState(
    new Date(today.getFullYear(), today.getMonth(), 1)
  );

  const [selectedDateKey, setSelectedDateKey] = useState(getTodayKey());
  const calendarDays = getCalendarDays(calendarDate, today);

  const handlePrevMonth = () =>
    setCalendarDate((d) => new Date(d.getFullYear(), d.getMonth() - 1, 1));

  const handleNextMonth = () =>
    setCalendarDate((d) => new Date(d.getFullYear(), d.getMonth() + 1, 1));

  const [isProjectDropdownOpen, setIsProjectDropdownOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(PROJECT_OPTIONS[1]);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState("전체");
  const [showNoticeModal, setShowNoticeModal] = useState(false);
  const [showPermissionModal, setShowPermissionModal] = useState(false);

  const [teamMembers, setTeamMembers] = useState(["전체"]);
  const [projectName, setProjectName] = useState(
    `PROJECT: ${PROJECT_OPTIONS[1].name}`
  );
  const [isTeamLeader] = useState(true);

  const [todos, setTodos] = useState(() => {
    const matchedTodos = JSON.parse(
      localStorage.getItem("knoteMatchedTodos") || "[]"
    );

    const sprintTodos = JSON.parse(
      localStorage.getItem("knoteSprintTodos") || "[]"
    );

    return normalizeTodos(
      matchedTodos.length > 0 ? matchedTodos : sprintTodos
    );
  });

  const [schedules, setSchedules] = useState(() => {
    const savedSchedules = JSON.parse(
      localStorage.getItem("knoteSchedules") || "{}"
    );

    if (Object.keys(savedSchedules).length > 0) {
      return savedSchedules;
    }

    return {
      [getTodayKey()]: [
        {
          id: 1,
          time: "10:00",
          title: "회의(디스코드)",
        },
        {
          id: 2,
          time: "18:00",
          title: "피그마 포스터 작업 완료하기",
        },
      ],
    };
  });

  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [editingSchedule, setEditingSchedule] = useState(null);

  const [personalNote, setPersonalNote] = useState(() => {
    return (
      localStorage.getItem("knotePersonalNote") ||
      "오늘 회의 핵심 정리하기...\n업로드 플로우 점검\nAPI 응답 구조 확인"
    );
  });
  const [isNoteSaved, setIsNoteSaved] = useState(false);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const myInfoRes = await api.get("/members/me");
        const teamId = myInfoRes.data.teamId || 1;

        const membersRes = await api.get(`/teams/${teamId}/members`);

        if (membersRes.data && Array.isArray(membersRes.data)) {
          const realNames = membersRes.data.map((member) => member.name);
          setTeamMembers([...realNames, "전체"]);
        }

        await api.get(`/teams/${teamId}`);
      } catch (error) {
        console.error("대시보드 실시간 연동 중 에러 발생:", error);
        setTeamMembers(["정서윤", "임이랑", "강민지", "전체"]);
      }
    };

    fetchDashboardData();
  }, []);

  useEffect(() => {
    localStorage.setItem("knoteSchedules", JSON.stringify(schedules));
  }, [schedules]);

  useEffect(() => {
    localStorage.setItem("knoteDashboardTodos", JSON.stringify(todos));
  }, [todos]);

  const isLoading = teamMembers.length <= 1;

  if (isLoading) {
    return (
      <Layout>
        <div className="w-[980px] mx-auto animate-pulse text-gray-300 mt-[40px]">
          <div className="w-full flex justify-between mb-[18px]">
            <div className="w-[80px] h-[20px] bg-gray-200 rounded" />
            <div className="w-[400px] h-[30px] bg-gray-200 rounded" />
          </div>
          <div className="h-px bg-gray-200 w-full mb-[38px]" />

          <div className="w-full flex justify-between gap-[40px]">
            <div className="flex flex-col gap-[28px] flex-1">
              <div className="w-[320px] h-[34px] bg-gray-200 rounded" />
              <div className="w-[320px] h-[220px] bg-gray-100 rounded" />
              <div className="w-[320px] h-[165px] bg-gray-100 rounded" />
            </div>

            <div className="w-[400px] flex-col flex-shrink-0">
              <div className="w-full h-[34px] bg-gray-200 rounded mb-[24px]" />
              <div className="w-full h-[300px] bg-gray-100 rounded" />
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  const filteredTodos =
    selectedMember === "전체"
      ? todos
      : todos.filter((todo) => todo.assignee === selectedMember);

  const selectedDateSchedules = schedules[selectedDateKey] || [];

  const handleNoticeClick = () => {
    if (isTeamLeader) {
      setShowNoticeModal(true);
      return;
    }

    setShowPermissionModal(true);
  };

  const handlePersonalNoteSave = () => {
    localStorage.setItem("knotePersonalNote", personalNote);
    setIsNoteSaved(true);

    setTimeout(() => {
      setIsNoteSaved(false);
    }, 1200);
  };

  const handleProjectSelect = (project) => {
    setSelectedProject(project);
    setProjectName(`PROJECT: ${project.name}`);
    setIsProjectDropdownOpen(false);
  };

  const handleToggleTodo = (todoId) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === todoId ? { ...todo, checked: !todo.checked } : todo
      )
    );
  };

  const handleDateClick = (dateKey) => {
    setSelectedDateKey(dateKey);
  };

  const handleOpenScheduleCreate = () => {
    setEditingSchedule(null);
    setShowScheduleModal(true);
  };

  const handleOpenScheduleEdit = (schedule) => {
    setEditingSchedule(schedule);
    setShowScheduleModal(true);
  };

  const handleSaveSchedule = (schedule) => {
    setSchedules((prev) => {
      const currentSchedules = prev[selectedDateKey] || [];
      const isEditing = currentSchedules.some((item) => item.id === schedule.id);

      const nextSchedules = isEditing
        ? currentSchedules.map((item) =>
            item.id === schedule.id ? schedule : item
          )
        : [...currentSchedules, schedule];

      return {
        ...prev,
        [selectedDateKey]: nextSchedules.sort((a, b) =>
          a.time.localeCompare(b.time)
        ),
      };
    });

    setShowScheduleModal(false);
    setEditingSchedule(null);
  };

  const handleDeleteSchedule = (scheduleId) => {
    setSchedules((prev) => {
      const currentSchedules = prev[selectedDateKey] || [];
      const nextSchedules = currentSchedules.filter(
        (item) => item.id !== scheduleId
      );

      return {
        ...prev,
        [selectedDateKey]: nextSchedules,
      };
    });

    setShowScheduleModal(false);
    setEditingSchedule(null);
  };

  return (
    <Layout>
      <div className="w-[980px] mx-auto text-black">
        <div className="w-full flex items-start justify-between mb-[18px]">
          <div className="flex items-center gap-[10px] text-[14px]">
            <Link to="/" className="font-semibold hover:underline">
              ⌂ Home
            </Link>
          </div>

          <div className="w-[400px] flex flex-col flex-shrink-0">
            <div className="flex items-center justify-between text-[13px] mb-[6px]">
              <span>프로젝트 진행률</span>
              <span className="font-semibold">49.9%</span>
            </div>
            <div className="w-full h-[9px] bg-[#C9DEFA]">
              <div className="h-full bg-[#4A8DFF]" style={{ width: "49.9%" }} />
            </div>
          </div>
        </div>
      </div>

      <div className="h-px bg-[#C9DEFA] w-full mb-[38px]" />

      <div className="w-[980px] mx-auto text-black">
        <div className="w-full flex justify-between items-start gap-[40px]">
          <div className="flex flex-col gap-[28px] flex-1">
            <div className="flex items-center gap-[12px] w-full h-[34px]">
              <div className="relative w-[320px] h-[34px]">
                <button
                  type="button"
                  onClick={() => setIsProjectDropdownOpen((prev) => !prev)}
                  className="w-full h-[34px] border border-[#C9DEFA] bg-white flex items-center justify-between px-[10px] text-[13px] font-medium shadow-sm"
                >
                  <span className="truncate">{projectName}</span>
                  <span className="text-[9px] text-slate-400">▼</span>
                </button>

                {isProjectDropdownOpen && (
                  <div className="absolute left-0 top-[36px] z-50 w-full border border-[#C9DEFA] bg-white rounded-[4px] shadow-md overflow-hidden text-[13px]">
                    {PROJECT_OPTIONS.map((project) => (
                      <button
                        key={project.id}
                        type="button"
                        onClick={() => handleProjectSelect(project)}
                        className={`w-full min-h-[36px] text-left px-[10px] leading-[18px] hover:bg-[#EAF1FC] ${
                          selectedProject.id === project.id
                            ? "bg-[#ADDCFF] font-semibold"
                            : ""
                        }`}
                      >
                        {project.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="relative w-[110px] flex-shrink-0">
                <div
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="h-[34px] border border-[#C9DEFA] bg-white rounded-[4px] flex items-center justify-between px-[10px] text-[13px] cursor-pointer shadow-sm select-none"
                >
                  <span className="truncate font-medium">{selectedMember}</span>
                  <span className="text-[9px] text-slate-400">▼</span>
                </div>

                {isDropdownOpen && (
                  <div className="absolute left-0 top-[36px] w-full border border-[#C9DEFA] bg-white rounded-[4px] shadow-md overflow-hidden text-[13px] z-50">
                    {teamMembers.map((member) => (
                      <div
                        key={member}
                        onClick={() => {
                          setSelectedMember(member);
                          setIsDropdownOpen(false);
                        }}
                        className={`h-[34px] flex items-center px-[10px] cursor-pointer transition-colors ${
                          selectedMember === member
                            ? "bg-[#ADDCFF] font-semibold"
                            : "hover:bg-[#EAF1FC]"
                        }`}
                      >
                        {member}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="w-[320px] min-h-[220px] bg-white border border-[#C9DEFA] px-[18px] py-[14px] shadow-sm rounded-[2px]">
              <div className="flex items-center justify-between mb-[8px]">
                <span className="text-[13px] font-semibold text-black">
                  진행 중 TODO
                </span>
                <span className="text-[11px] text-gray-500">
                  {selectedMember === "전체" ? "전체" : selectedMember}
                </span>
              </div>

              {filteredTodos.length > 0 ? (
                filteredTodos.map((todo) => (
                  <TodoRow
                    key={todo.id}
                    todo={todo}
                    onToggle={handleToggleTodo}
                  />
                ))
              ) : (
                <div className="h-[150px] flex items-center justify-center text-[13px] text-gray-500">
                  표시할 TODO가 없습니다.
                </div>
              )}
            </div>

            <div className="w-[320px] rotate-[-1.5deg] mt-[6px]">
              <div className="relative w-full h-[180px] bg-[#FFF1A8] px-[18px] py-[16px] text-[14px] text-[#4A3B12] shadow-[3px_5px_10px_rgba(0,0,0,0.1)] border border-[#EAE2B7]">
                <div className="absolute top-[-8px] left-[50%] -translate-x-1/2 w-[70px] h-[16px] bg-[#ADDCFF]/80 rotate-[2deg] rounded-[1px] shadow-sm" />

                <div className="flex items-center justify-between mb-[8px]">
                  <div className="font-semibold text-[13px] text-black">
                    개인 NOTE
                  </div>

                  <button
                    type="button"
                    onClick={handlePersonalNoteSave}
                    className="h-[24px] px-[8px] bg-white/70 border border-[#EAE2B7] text-[11px] font-semibold text-[#4A3B12] hover:bg-white"
                  >
                    저장
                  </button>
                </div>

                <textarea
                  value={personalNote}
                  onChange={(event) => setPersonalNote(event.target.value)}
                  placeholder="개인 메모를 입력하세요."
                  className="w-full h-[105px] bg-transparent resize-none outline-none text-[12px] leading-[21px] text-[#5C4A1B] placeholder:text-[#8A7A3E]"
                />

                {isNoteSaved && (
                  <div className="absolute right-[14px] bottom-[10px] text-[11px] font-semibold text-[#4A8DFF]">
                    저장되었습니다.
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="w-[400px] flex-col flex-shrink-0">
            <div className="w-full h-[34px] flex items-center justify-end mb-[24px]">
              <button
                type="button"
                onClick={handleNoticeClick}
                className="w-[76px] h-[28px] bg-white border border-[#C9DEFA] text-[13px] text-black font-medium hover:bg-[#EAF1FC] active:bg-[#ADDCFF]/40 transition-colors shadow-sm"
              >
                공지 작성
              </button>
            </div>

            <div className="flex items-center justify-between mb-[14px] px-[6px]">
              <button
                type="button"
                onClick={handlePrevMonth}
                className="text-[20px] text-gray-400 hover:text-[#4A8DFF] select-none leading-none"
              >
                ‹
              </button>
              <span className="text-[14px] font-bold tracking-wide">
                {calendarDate.getFullYear()}{" "}
                {monthNames[calendarDate.getMonth()]}
              </span>
              <button
                type="button"
                onClick={handleNextMonth}
                className="text-[20px] text-gray-400 hover:text-[#4A8DFF] select-none leading-none"
              >
                ›
              </button>
            </div>

            <div className="grid grid-cols-7 text-[11px] text-gray-500 mb-[6px] font-semibold text-center">
              {["M", "T", "W", "TH", "F", "S", "SU"].map((day) => (
                <div
                  key={day}
                  className="h-[20px] flex items-center justify-center"
                >
                  {day}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 bg-white border border-[#C9DEFA] rounded-[2px] overflow-hidden shadow-sm">
              {calendarDays.map((item) => (
                <CalendarCell
                  key={item.key}
                  item={item}
                  active={item.isToday}
                  selected={item.key === selectedDateKey}
                  muted={!item.isCurrentMonth}
                  hasSchedules={(schedules[item.key] || []).length > 0}
                  onClick={() => handleDateClick(item.key)}
                />
              ))}
            </div>

            <div className="mt-[20px]">
              <div className="h-[34px] bg-white border border-[#C9DEFA] flex items-center justify-between px-[12px] text-[13px] font-semibold rounded-t-[2px]">
                <div className="flex items-center">
                  <span className="mr-[6px] text-[9px] text-slate-400">▼</span>
                  {formatScheduleDate(selectedDateKey)} 일정 리스트
                </div>

                <button
                  type="button"
                  onClick={handleOpenScheduleCreate}
                  className="h-[24px] px-[8px] bg-[#4A8DFF] text-white text-[11px] font-semibold"
                >
                  + 추가
                </button>
              </div>

              <div className="min-h-[130px] bg-white border-x border-b border-[#C9DEFA] px-[16px] py-[14px] text-[13px] leading-[24px] shadow-sm rounded-b-[2px]">
                {selectedDateSchedules.length > 0 ? (
                  selectedDateSchedules.map((schedule) => (
                    <button
                      key={schedule.id}
                      type="button"
                      onClick={() => handleOpenScheduleEdit(schedule)}
                      className="w-full text-left h-[28px] flex items-center gap-[8px] hover:bg-[#EAF1FC] px-[4px]"
                    >
                      <span className="text-[12px] font-semibold text-[#4A8DFF] w-[45px]">
                        {schedule.time}
                      </span>
                      <span className="truncate">· {schedule.title}</span>
                    </button>
                  ))
                ) : (
                  <div className="h-[96px] flex items-center justify-center text-[13px] text-gray-500">
                    등록된 일정이 없습니다.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {showNoticeModal && (
        <NoticeWriteModal onClose={() => setShowNoticeModal(false)} />
      )}

      {showPermissionModal && (
        <PermissionModal onClose={() => setShowPermissionModal(false)} />
      )}

      {showScheduleModal && (
        <ScheduleModal
          selectedDate={selectedDateKey}
          schedule={editingSchedule}
          onClose={() => {
            setShowScheduleModal(false);
            setEditingSchedule(null);
          }}
          onSave={handleSaveSchedule}
          onDelete={handleDeleteSchedule}
        />
      )}
    </Layout>
  );
}

export default Dashboard;