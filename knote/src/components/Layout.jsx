import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

function UserIcon() {
  return (
    <div className="w-[78px] h-[78px] bg-white rounded-[4px] flex items-center justify-center border border-[#4A8DFF]/30">
      <div className="relative w-[48px] h-[48px]">
        <div className="absolute left-1/2 -translate-x-1/2 top-[3px] w-[20px] h-[20px] bg-[#4A8DFF] rounded-full" />
        <div className="absolute left-1/2 -translate-x-1/2 bottom-[3px] w-[40px] h-[24px] bg-[#4A8DFF] rounded-t-full" />
      </div>
    </div>
  );
}

function MenuIcon({ type }) {
  const color = "#FFFFFF";

  const common = {
    stroke: color,
    strokeWidth: 2,
    strokeLinecap: "round",
    strokeLinejoin: "round",
  };

  if (type === "home") {
    return (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M3 11L12 4L21 11" {...common} />
        <path d="M5 10V20H10V15H14V20H19V10" {...common} />
      </svg>
    );
  }

  if (type === "team") {
    return (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <circle cx="8" cy="8" r="3" {...common} />
        <circle cx="17" cy="9" r="2.5" {...common} />
        <path
          d="M3 20C3.8 16.5 5.5 15 8 15C10.5 15 12.2 16.5 13 20"
          {...common}
        />
        <path
          d="M13.5 19C14.1 16.8 15.3 15.7 17 15.7C18.9 15.7 20.1 16.9 21 19"
          {...common}
        />
      </svg>
    );
  }

  if (type === "meeting") {
    return (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <rect x="4" y="6" width="16" height="12" rx="1" {...common} />
        <path d="M8 10H16" {...common} />
        <path d="M8 14H13" {...common} />
      </svg>
    );
  }

  if (type === "todo") {
    return (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <rect x="5" y="4" width="14" height="16" rx="1" {...common} />
        <path d="M8 12L11 15L16 9" {...common} />
      </svg>
    );
  }

  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M7 11V20" {...common} />
      <path
        d="M7 11L10 4C10.5 3 12 3.3 12 4.5V9H18C19.2 9 20.1 10.1 19.8 11.3L18.4 18C18.2 19.2 17.2 20 16 20H7"
        {...common}
      />
    </svg>
  );
}

function formatBriefingDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}. ${month}. ${day}`;
}

// 로봇 브리핑 컴포넌트 세로 배치 정돈
function RobotBriefing({ currentDate }) {
  return (
    <div className="w-full h-[190px] bg-white shadow-[0_4px_4px_rgba(0,0,0,0.16)] px-[20px] py-[16px] border border-[#C9DEFA] rounded-[4px] flex flex-col justify-between flex-shrink-0">
      <div className="flex-shrink-0">

        <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
          <rect x="11" y="13" width="26" height="25" rx="4" stroke="#4A8DFF" strokeWidth="4" />
          <circle cx="19" cy="25" r="2.5" fill="#4A8DFF" />
          <circle cx="29" cy="25" r="2.5" fill="#4A8DFF" />
          <path d="M19 32H29" stroke="#4A8DFF" strokeWidth="3" strokeLinecap="round" />
          <path d="M24 13V6" stroke="#4A8DFF" strokeWidth="4" strokeLinecap="round" />
          <circle cx="24" cy="5" r="3" fill="#4A8DFF" />
          <path d="M6 24V31" stroke="#4A8DFF" strokeWidth="4" strokeLinecap="round" />
          <path d="M42 24V31" stroke="#4A8DFF" strokeWidth="4" strokeLinecap="round" />
        </svg>
      </div>

      <div className="relative bg-[#F8FBFF] border border-[#C9DEFA] rounded-[3px] shadow-sm text-[14px] text-black h-[100px] flex flex-col justify-between">
        <div className="absolute top-[-11px] left-[13px] w-0 h-0 border-x-[10px] border-x-transparent border-b-[11px] border-b-[#F8FBFF]" />
        <div className="h-[36px] border-b border-[#C9DEFA] flex items-center px-[12px] text-black font-semibold">
          {formatBriefingDate(currentDate)} 데일리 브리핑
        </div>
        <div className="px-[12px] pb-[10px] flex-1 flex flex-col justify-center leading-[20px]">
          업무 이슈율이 훌륭합니다.
          <br />이 속도를 유지해 보아요!
        </div>
      </div>
    </div>
  );
}

function formatHeaderTime(date) {
  return date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}

function Layout({ children }) {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const menuClass = ({ isActive }) =>
    `w-[104px] h-[30px] rounded-[3px] text-[15px] flex items-center justify-center border transition ${
      isActive
        ? "bg-[#ADDCFF] border-white text-black font-semibold"
        : "bg-white border-transparent text-black hover:bg-[#EAF1FC]"
    }`;

  const item = (to, label, iconType, end = false) => (
    <div className="flex items-center gap-[24px]">
      <div className="w-[28px] flex justify-center">
        <MenuIcon type={iconType} />
      </div>
      <NavLink to={to} end={end} className={menuClass}>
        {label}
      </NavLink>
    </div>
  );

  return (
    /* 💡 가로 찢어짐 현상을 막기 위해 overflow-x-auto를 걷어내고 깨끗하게 설정합니다 */
    <div className="min-h-screen bg-[#EAF1FC] flex w-full overflow-x-hidden">
      
      {/* Sidebar - h-screen sticky 구조로 화면 높이에 딱 맞춰 고정 */}
      <aside className="w-[290px] h-screen sticky top-0 bg-[#ADDCFF] px-[34px] pt-[42px] pb-[34px] flex flex-col justify-between shrink-0 border-r border-[#C9DEFA]">
        <div className="flex flex-col flex-1">
          {/* Profile */}
          <div className="flex gap-[26px] items-start">
            <UserIcon />

            <div className="flex-1 pt-[10px]">
              <div className="text-[15px] text-black font-semibold mb-[14px]">
                김이화
              </div>
              <div className="h-[2px] bg-black w-full mb-[14px]" />

              <div className="flex gap-[6px]">
                <span className="bg-white text-black border border-[#4A8DFF]/30 rounded-[3px] px-[4px] h-[22px] leading-[20px] text-[14px]">
                  #백엔드
                </span>
                <span className="bg-white text-black border border-[#4A8DFF]/30 rounded-[3px] px-[4px] h-[22px] leading-[20px] text-[14px]">
                  #JAVA
                </span>
              </div>

            </div>
          </div>

          <div className="h-px bg-black/25 mt-[58px] mb-[52px]" />

          {/* Menu Box */}
          <nav className="w-full bg-[#4A8DFF] shadow-[0_4px_4px_rgba(0,0,0,0.18)] px-[36px] py-[34px] flex flex-col gap-[23px]">
            {item("/", "홈", "home", true)}
            {item("/team", "팀", "team")}
            {item("/meeting", "회의", "meeting")}
            {item("/todo", "투두", "todo")}
            {item("/feedback", "피드백", "feedback")}
          </nav>
        </div>

        {/* 로봇 브리핑 위치 유연화 */}
        <div className="mt-8 flex-shrink-0">
          <RobotBriefing currentDate={currentTime} />
        </div>
      </aside>

      {/* Main 
        💡 드디어 min-w-[1500px] 고정값을 삭제하고 min-w-0 flex-1 구조로 전면 교체했습니다!
        이제 창 크기를 어떻게 조절하든 우측 상단 메뉴와 내용이 한 화면에 온전히 반응형으로 안착됩니다.
      */}
      <main className="flex-1 flex flex-col bg-[#EAF1FC] min-w-0">
        {/* Header */}
        <header className="h-[70px] w-full bg-[#ADDCFF] border-b border-[#C9DEFA] shadow-[0_4px_5px_rgba(0,0,0,0.16)] flex items-center justify-between px-[40px] flex-shrink-0">
          <div className="flex items-center gap-[24px] text-black">
            <span className="text-[26px] leading-none">≡</span>
            <span className="text-[17px] font-semibold">
              {formatHeaderTime(currentTime)}
            </span>
          </div>

          <div className="flex items-center gap-[22px]">
            <svg width="21" height="21" viewBox="0 0 24 24" fill="none">
              <path
                d="M6 17H18L16.5 15.5V11C16.5 8 14.7 6 12 6C9.3 6 7.5 8 7.5 11V15.5L6 17Z"
                stroke="black"
                strokeWidth="2"
              />
              <path
                d="M10 19C10.4 20.2 11 21 12 21C13 21 13.6 20.2 14 19"
                stroke="black"
                strokeWidth="2"
              />
            </svg>

            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <circle
                cx="12"
                cy="8"
                r="3.5"
                stroke="black"
                strokeWidth="2"
              />
              <path
                d="M5 20C5.8 16.5 8.3 14.5 12 14.5C15.7 14.5 18.2 16.5 19 20"
                stroke="black"
                strokeWidth="2"
              />
            </svg>
          </div>
        </header>

        {/* Content */}
        <div className="px-[40px] pt-[42px] pb-[38px] flex-1">{children}</div>
      </main>
    </div>
  );
}

export default Layout;