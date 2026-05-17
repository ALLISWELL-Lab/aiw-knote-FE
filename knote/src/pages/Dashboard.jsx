import { useState } from "react";
import Layout from "../components/Layout";

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

function getCalendarDays(date) {
  const year = date.getFullYear();
  const month = date.getMonth();

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
        current.getFullYear() === date.getFullYear() &&
        current.getMonth() === date.getMonth() &&
        current.getDate() === date.getDate(),
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

function Dashboard() {
  const today = new Date();
  const calendarDays = getCalendarDays(today);

  // 드롭다운 상태 관리 토글 스테이트
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState("전체");
  const teamMembers = ["정서윤", "임이랑", "강민지", "전체"];

  return (
    <Layout>
      {/* 💡 상단 영역을 본문 너비인 w-[980px] mx-auto 상자 안에 똑같이 맞춰 가둡니다 */}
      <div className="w-[980px] mx-auto text-black flex flex-col">
        
        {/* 상단 레이아웃 라인 - [홈 타이틀]과 [진행률 바]가 선 위에서 자연스럽게 양 끝 정렬 */}
        <div className="w-full flex items-end justify-between mb-[18px]">
          {/* 1. 홈 타이틀 */}
          <div className="flex items-center gap-[10px] text-[14px] font-semibold pb-[2px]">
            <span>⌂ Home</span>
          </div>

          {/* 2. 프로젝트 진행률 바 
            오른쪽 우측 본문의 달력 세트 너비(w-[400px])와 완벽히 동일한 크기로 설정하여 
            아래에 배치될 공지 작성 버튼의 우측 끝과 수직 칼정렬을 이룹니다.
          */}
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

      {/* 구분 가로선 (언제나 선 위에 진행률 바가 유지됩니다) */}
      <div className="h-px bg-[#C9DEFA] w-full mb-[38px]" />

      {/* 💡 본문 그리드 프레임 (동일한 w-[980px] mx-auto 정가운데 정렬) */}
      <div className="w-[980px] mx-auto text-black">
        
        {/* 본문 좌우 레이아웃 */}
        <div className="w-full flex justify-between items-start gap-[40px]">
          
          {/* ================= [LEFT SIDE CONTENT] ================= */}
          <div className="flex flex-col gap-[28px] flex-1">
            
            {/* 프로젝트 바 & 드롭다운 라인 (h-[34px]) */}
            <div className="flex items-center gap-[12px] w-full h-[34px]">
              {/* 프로젝트 셀렉터 */}
              <div className="w-[320px] h-[34px] border border-[#C9DEFA] bg-white flex items-center justify-between px-[10px] text-[13px] font-medium shadow-sm">
                <span className="truncate">PROJECT: ALL IS WELL</span>
                <span className="text-[9px] text-slate-400">▼</span>
              </div>

              {/* 커스텀 드롭다운 */}
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

            {/* 중단: TODO 리스트 박스 */}
            <div className="w-[320px] h-[220px] bg-white border border-[#C9DEFA] px-[18px] py-[14px] shadow-sm rounded-[2px]">
              <TodoRow text="팀원 A TO DO LIST (D-9)" />
              <TodoRow text="팀원 B TO DO LIST (D-9)" />
              <TodoRow text="팀원 C TO DO LIST (D-9)" />
              <TodoRow text="팀원 D TO DO LIST (D-9)" checked />
            </div>

            {/* 하단: 포스트잇 NOTE */}
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

          {/* ================= [RIGHT SIDE CONTENT] ================= */}
          {/* 대형화된 달력과 일정 리스트 세트 (w-[400px]) */}
          <div className="w-[400px] flex-col flex-shrink-0">
            
            {/* 💡 공지 작성 버튼: 선 아랫동네에서 수평 정렬을 유지하며 우측 끝 배치 */}
            <div className="w-full h-[34px] flex items-center justify-end mb-[24px]">
              <button className="w-[76px] h-[28px] bg-white border border-[#C9DEFA] text-[13px] text-black font-medium hover:bg-[#EAF1FC] active:bg-[#ADDCFF]/40 transition-colors shadow-sm">
                공지 작성
              </button>
            </div>

            {/* 달력 본체 헤더 */}
            <div className="flex items-center justify-between mb-[14px] px-[6px]">
              <span className="text-[20px] cursor-pointer select-none hover:text-gray-400">‹</span>
              <span className="text-[14px] font-bold tracking-wide">
                {today.getFullYear()} {monthNames[today.getMonth()]}
              </span>
              <span className="text-[20px] cursor-pointer select-none hover:text-gray-400">›</span>
            </div>

            {/* 요일 그리드 */}
            <div className="grid grid-cols-7 text-[11px] text-gray-500 mb-[6px] font-semibold text-center">
              {["M", "T", "W", "TH", "F", "S", "SU"].map((day) => (
                <div key={day} className="h-[20px] flex items-center justify-center">
                  {day}
                </div>
              ))}
            </div>

            {/* 달력 일자판 */}
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

            {/* 일정 리스트 박스 */}
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
    </Layout>
  );
}

export default Dashboard;