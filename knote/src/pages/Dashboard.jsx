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
      className={`h-[38px] flex items-center justify-center text-[13px] ${
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

  return (
    <Layout>
      {/* 상단 영역 */}
      <div className="relative w-[1400px] mb-[18px]">
        <div className="flex items-center gap-[8px] text-[14px] text-black">
          <span className="font-semibold">⌂ Home</span>
        </div>

        {/* 진행률 */}
        <div className="absolute left-[540px] top-[-4px] w-[480px]">
          <div className="flex items-center justify-between text-[13px] text-black mb-[5px]">
            <span>프로젝트 진행률</span>
            <span className="font-semibold">49.9%</span>
          </div>
          <div className="w-full h-[7px] bg-[#C9DEFA]">
            <div className="w-[50%] h-full bg-[#4A8DFF]" />
          </div>
        </div>
      </div>

      <div className="h-px bg-[#C9DEFA] mb-[34px]" />

      {/* 메인 대시보드 */}
      <div className="relative w-[1400px] min-h-[560px]">
        {/* 왼쪽 영역 */}
        <div className="absolute left-0 top-0 w-[470px]">
          {/* 프로젝트 선택 */}
          <div className="w-[320px] h-[34px] border border-[#C9DEFA] bg-white flex items-center justify-between px-[12px] text-[14px] text-black mb-[22px] shadow-sm">
            <span>PROJECT: ALL IS WELL</span>
            <span>▼</span>
          </div>

          {/* TODO 박스 */}
          <div className="w-[305px] h-[255px] bg-white border border-[#C9DEFA] px-[20px] py-[18px] shadow-sm">
            <TodoRow text="팀원 A TO DO LIST (D-9)" />
            <TodoRow text="팀원 B TO DO LIST (D-9)" />
            <TodoRow text="팀원 C TO DO LIST (D-9)" />
            <TodoRow text="팀원 D TO DO LIST (D-9)" checked />
          </div>

          {/* 필터 드롭다운 */}
          <div className="absolute left-[340px] top-[56px] w-[140px]">
            <div className="h-[38px] border border-[#C9DEFA] bg-white rounded-[4px] flex items-center justify-between px-[12px] text-[13px] text-black">
              <span>필터링</span>
              <span>▼</span>
            </div>

            <div className="border border-[#C9DEFA] border-t-0 bg-white rounded-b-[4px] shadow-sm overflow-hidden text-[13px] text-black">
              <div className="h-[34px] bg-[#ADDCFF] flex items-center px-[12px] font-semibold">
                팀원 1
              </div>
              <div className="h-[34px] flex items-center px-[12px]">팀원 2</div>
              <div className="h-[34px] flex items-center px-[12px]">팀원 3</div>
              <div className="h-[34px] flex items-center px-[12px]">팀원 4</div>
              <div className="h-[34px] flex items-center px-[12px]">전체</div>
            </div>
          </div>
        </div>

        {/* 포스트잇 NOTE */}
        <div className="absolute left-[620px] top-[92px] rotate-[-2deg]">
          <div className="relative w-[255px] h-[170px] bg-[#FFF1A8] px-[20px] py-[18px] text-[14px] text-[#4A3B12] shadow-[4px_6px_12px_rgba(0,0,0,0.18)] border border-[#C9DEFA]">
            <div className="absolute right-0 top-0 w-0 h-0 border-l-[24px] border-l-transparent border-b-[24px] border-b-[#C9DEFA]" />
            <div className="absolute top-[-8px] left-[92px] w-[70px] h-[18px] bg-[#ADDCFF]/90 rotate-[3deg] rounded-[2px]" />

            <div className="font-semibold text-[14px] mb-[10px] text-black">
              개인 NOTE
            </div>

            <div className="text-[13px] leading-[21px] text-[#5C4A1B]">
              오늘 회의 핵심 정리하기...
              <br />
              업로드 플로우 점검
              <br />
              API 응답 구조 확인
            </div>
          </div>
        </div>

        {/* 오른쪽 캘린더 영역 */}
        <div className="absolute right-0 top-[0px] w-[380px]">
          <div className="flex items-center justify-between mb-[14px] text-black">
            <span className="text-[24px]">‹</span>
            <span className="text-[15px] font-semibold">
              {today.getFullYear()} {monthNames[today.getMonth()]}
            </span>
            <span className="text-[24px]">›</span>
          </div>

          <div className="grid grid-cols-7 text-[12px] text-black mb-[5px]">
            {["M", "T", "W", "TH", "F", "S", "SU"].map((day) => (
              <div
                key={day}
                className="h-[24px] flex items-center justify-center"
              >
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 bg-white border border-[#C9DEFA]">
            {calendarDays.map((item, index) => (
              <CalendarCell
                key={index}
                day={item.day}
                active={item.isToday}
                muted={!item.isCurrentMonth}
              />
            ))}
          </div>

          {/* 일정 리스트 */}
          <div className="mt-[22px]">
            <div className="h-[34px] bg-white border border-[#C9DEFA] flex items-center px-[12px] text-[13px] text-black">
              <span className="mr-[4px]">▼</span>
              {formatScheduleDate(today)} 일정 리스트
            </div>

            <div className="h-[150px] bg-white border-x border-b border-[#C9DEFA] px-[22px] py-[22px] text-[13px] text-black leading-[22px]">
              · 오전 10시 회의(디스코드)
              <br />· 피그마 포스터 작업 완료하기
            </div>
          </div>
        </div>

        {/* 공지 작성 버튼 */}
        <button className="absolute right-[150px] top-[-28px] w-[76px] h-[28px] bg-white border border-[#C9DEFA] text-[13px] text-black font-medium hover:bg-[#ADDCFF]/40">
          공지 작성
        </button>
      </div>
    </Layout>
  );
}

export default Dashboard;