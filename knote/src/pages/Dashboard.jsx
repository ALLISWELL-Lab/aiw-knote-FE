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

function TodoRow({ text, checked = false }) {
  return (
    <label className="flex items-center gap-[10px] h-[34px] text-[14px] text-black cursor-pointer">
      <input
        type="checkbox"
        defaultChecked={checked}
        className="w-[13px] h-[13px] accent-[#4A8DFF]"
      />
      <span>{text}</span>
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
      day: current.getDate(),
      isCurrentMonth: current.getMonth() === month,
      isToday:
        current.getFullYear() === ref.getFullYear() &&
        current.getMonth() === ref.getMonth() &&
        current.getDate() === ref.getDate(),
    };
  });
}

function formatScheduleDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}/${month}/${day}`;
}

function CalendarCell({ day, active = false, muted = false }) {
  return (
    <div
      className={`h-[44px] flex items-center justify-center text-[14px] ${
        active
          ? "bg-[#4A8DFF] text-white font-semibold"
          : muted
          ? "text-gray-400"
          : "text-black"
      }`}
    >
      {day}
    </div>
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

function Dashboard() {

  const today = new Date();
  const [calendarDate, setCalendarDate] = useState(new Date(today.getFullYear(), today.getMonth(), 1));

  const calendarDays = getCalendarDays(calendarDate, today);

  const handlePrevMonth = () =>
    setCalendarDate((d) => new Date(d.getFullYear(), d.getMonth() - 1, 1));

  const handleNextMonth = () =>
    setCalendarDate((d) => new Date(d.getFullYear(), d.getMonth() + 1, 1));

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState("전체");
  const [showNoticeModal, setShowNoticeModal] = useState(false);
  const [showPermissionModal, setShowPermissionModal] = useState(false);

  const [teamMembers, setTeamMembers] = useState(["전체"]); 
  const [projectName, setProjectName] = useState("PROJECT 로딩 중...");
  const [isTeamLeader, setIsTeamLeader] = useState(true); // 기본값 팀장 활성화

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // 1. 내 정보 조회 API를 찔러서 현재 어떤 팀에 속해있는지 teamId를 가져옵니다.
        const myInfoRes = await api.get("/members/me");
        
        // 팀원분의 DB 설계 기준 혹은 생성한 팀 타겟팅 (teamId가 없다면 임시 1L로 Fallback)
        const teamId = myInfoRes.data.teamId || 1; 

        // 2. 방금 백엔드에 새로 만든 정석 특정 팀 멤버 목록 조회 API를 찌릅니다 🚀
        const membersRes = await api.get(`/teams/${teamId}/members`);
        
        if (membersRes.data && Array.isArray(membersRes.data)) {
          // 백엔드가 넘겨준 MemberDTO의 name(이름) 배열을 맵핑합니다.
          const realNames = membersRes.data.map(member => member.name);
          // 화면의 드롭다운 리스트 갱신 (진짜 팀원들 이름 + "전체" 필터 추가)
          setTeamMembers([...realNames, "전체"]);
        }

        // 3. (옵션) 진짜 팀명이나 프로젝트명도 가입 정보에 맞게 매핑해 줍니다.
        const titleRes = await api.get(`/teams/${teamId}`);
        if (titleRes.data && titleRes.data.name) {
          setProjectName(`PROJECT: ${titleRes.data.name}`);
        } else {
          setProjectName("PROJECT: 캡스톤디자인과창업프로젝트 B");
        }

      } catch (error) {
        console.error("대시보드 실시간 연동 중 에러 발생:", error);
        // 혹시라도 서버가 내려갔을 때 데모가 꺼지지 않도록 안전망 이름들 복구
        setTeamMembers(["정서윤", "임이랑", "강민지", "전체"]);
        setProjectName("PROJECT: 캡스톤디자인과창업프로젝트 B");
      }
    };

    fetchDashboardData();
  }, []);

  const isLoading = projectName === "PROJECT 로딩 중..." || teamMembers.length <= 1;

  // 로그인 직후 대시보드로 진입했을 때, 로딩 스켈레톤
  if (isLoading) {
    return (
      <Layout>
        <div className="w-[980px] mx-auto animate-pulse text-gray-300 mt-[40px]">
          {/* 상단 브레드크럼 스켈레톤 */}
          <div className="w-full flex justify-between mb-[18px]">
            <div className="w-[80px] h-[20px] bg-gray-200 rounded" />
            <div className="w-[400px] h-[30px] bg-gray-200 rounded" />
          </div>
          <div className="h-px bg-gray-200 w-full mb-[38px]" />
          
          {/* 본문 좌우 레이아웃 스켈레톤 */}
          <div className="w-full flex justify-between gap-[40px]">
            {/* 왼쪽 영역 바디 스켈레톤 */}
            <div className="flex flex-col gap-[28px] flex-1">
              <div className="w-[320px] h-[34px] bg-gray-200 rounded" />
              <div className="w-[320px] h-[220px] bg-gray-100 rounded" />
              <div className="w-[320px] h-[165px] bg-gray-100 rounded" />
            </div>
            {/* 오른쪽 달력 영역 스켈레톤 */}
            <div className="w-[400px] flex-col flex-shrink-0">
              <div className="w-full h-[34px] bg-gray-200 rounded mb-[24px]" />
              <div className="w-full h-[300px] bg-gray-100 rounded" />
            </div>
          </div>
        </div>
      </Layout>
    );
  }
  
  const handleNoticeClick = () => {
    if (isTeamLeader) {
      setShowNoticeModal(true);
      return;
    }

    setShowPermissionModal(true);
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
              <div className="w-[320px] h-[34px] border border-[#C9DEFA] bg-white flex items-center justify-between px-[10px] text-[13px] font-medium shadow-sm">
                {/* 동적 프로젝트명 바인딩 */}
                <span className="truncate">{projectName}</span>
                <span className="text-[9px] text-slate-400">▼</span>
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

            <div className="w-[320px] h-[220px] bg-white border border-[#C9DEFA] px-[18px] py-[14px] shadow-sm rounded-[2px]">
              <TodoRow text="임이랑 TO DO LIST (D-1)" checked />
              <TodoRow text="정서윤 TO DO LIST (D-2)" />
              <TodoRow text="강민지 TO DO LIST (D-1)" />
              <TodoRow text="공통 TO DO LIST (D-3)" />
            </div>

            <div className="w-[320px] rotate-[-1.5deg] mt-[6px]">
              <div className="relative w-full h-[165px] bg-[#FFF1A8] px-[18px] py-[16px] text-[14px] text-[#4A3B12] shadow-[3px_5px_10px_rgba(0,0,0,0.1)] border border-[#EAE2B7]">
                <div className="absolute top-[-8px] left-[50%] -translate-x-1/2 w-[70px] h-[16px] bg-[#ADDCFF]/80 rotate-[2deg] rounded-[1px] shadow-sm" />
                <div className="font-semibold text-[13px] mb-[8px] text-black">
                  개인 NOTE
                </div>
                <div className="text-[12px] leading-[21px] text-[#5C4A1B]">
                  오늘 회의 핵심 정리하기...
                  <br />
                  업로드 플로우 점검
                  <br />
                  API 응답 구조 확인
                </div>
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
                {calendarDate.getFullYear()} {monthNames[calendarDate.getMonth()]}
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
              {calendarDays.map((item, index) => (
                <CalendarCell
                  key={index}
                  day={item.day}
                  active={item.isToday}
                  muted={!item.isCurrentMonth}
                />
              ))}
            </div>

            <div className="mt-[20px]">
              <div className="h-[34px] bg-white border border-[#C9DEFA] flex items-center px-[12px] text-[13px] font-semibold rounded-t-[2px]">
                <span className="mr-[6px] text-[9px] text-slate-400">▼</span>
                {formatScheduleDate(today)} 일정 리스트
              </div>
              <div className="h-[130px] bg-white border-x border-b border-[#C9DEFA] px-[20px] py-[16px] text-[13px] leading-[24px] shadow-sm rounded-b-[2px]">
                · 오전 10시 회의(디스코드)
                <br />· 피그마 포스터 작업 완료하기
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
    </Layout>
  );
}

export default Dashboard;