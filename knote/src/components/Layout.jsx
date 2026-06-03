import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

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

function RobotBriefing({ currentDate, isVisible }) {
  return (
    <div
      className={`fixed left-[34px] bottom-[42px] z-30 bg-white w-[250px] h-[210px] shadow-[0_4px_4px_rgba(0,0,0,0.16)] px-[18px] pt-[12px] border border-[#C9DEFA] transition-transform duration-300 ${
        isVisible ? "translate-x-0" : "translate-x-[-330px]"
      }`}
    >
      <div className="mb-[6px]">
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
          <rect
            x="11"
            y="13"
            width="26"
            height="25"
            rx="4"
            stroke="#4A8DFF"
            strokeWidth="4"
          />
          <circle cx="19" cy="25" r="2.5" fill="#4A8DFF" />
          <circle cx="29" cy="25" r="2.5" fill="#4A8DFF" />
          <path
            d="M19 32H29"
            stroke="#4A8DFF"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <path
            d="M24 13V6"
            stroke="#4A8DFF"
            strokeWidth="4"
            strokeLinecap="round"
          />
          <circle cx="24" cy="5" r="3" fill="#4A8DFF" />
          <path
            d="M6 24V31"
            stroke="#4A8DFF"
            strokeWidth="4"
            strokeLinecap="round"
          />
          <path
            d="M42 24V31"
            stroke="#4A8DFF"
            strokeWidth="4"
            strokeLinecap="round"
          />
        </svg>
      </div>

      <div className="relative bg-[#F8FBFF] border border-[#C9DEFA] rounded-[3px] shadow-sm text-[14px] text-black">
        <div className="absolute left-[-11px] top-[55px] w-0 h-0 border-y-[10px] border-y-transparent border-r-[11px] border-r-[#F8FBFF]" />

        <div className="h-[39px] border-b border-[#C9DEFA] flex items-center px-[10px] text-black font-semibold text-[12px] whitespace-nowrap">
          {formatBriefingDate(currentDate)} 데일리 브리핑
        </div>

        <div className="px-[12px] py-[12px] leading-[22px]">
          업무 이수율이 훌륭합니다.
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

function NoticeAlertModal({ notices, onClose }) {
  return (
    <div className="fixed inset-0 z-50 bg-black/20 flex items-center justify-center">
      <div className="w-[430px] bg-white border border-[#C9DEFA] shadow-[0_8px_28px_rgba(0,0,0,0.18)]">
        <div className="h-[46px] border-b border-[#C9DEFA] bg-[#EAF1FC] flex items-center px-[18px] text-[15px] font-semibold text-black">
          공지 알림
        </div>

        <div className="px-[22px] py-[22px] max-h-[320px] overflow-y-auto text-black">
          {notices.length > 0 ? (
            <div className="space-y-[14px]">
              {notices.map((notice) => (
                <div
                  key={notice.id}
                  className="border border-[#C9DEFA] bg-[#F8FBFF] px-[14px] py-[12px]"
                >
                  <div className="flex items-center justify-between mb-[8px]">
                    <p className="text-[14px] font-semibold text-black">
                      {notice.title}
                    </p>

                    {!notice.read && (
                      <span className="w-[7px] h-[7px] bg-red-500 rounded-full" />
                    )}
                  </div>

                  <p className="text-[13px] leading-[21px] text-black mb-[8px]">
                    {notice.content}
                  </p>

                  <p className="text-[11px] text-gray-500">
                    {notice.createdAt}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="h-[110px] flex items-center justify-center text-[14px] text-gray-500">
              등록된 공지가 없습니다.
            </div>
          )}
        </div>

        <div className="h-[56px] border-t border-[#C9DEFA] bg-[#EAF1FC] flex items-center justify-end px-[18px]">
          <button
            type="button"
            onClick={onClose}
            className="w-[56px] h-[28px] bg-[#4A8DFF] text-white text-[13px]"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
}

function Layout({ children }) {
  const navigate = useNavigate();

  const [currentTime, setCurrentTime] = useState(new Date());
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [notices, setNotices] = useState([]);
  const [showNoticeModal, setShowNoticeModal] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const loadNotices = () => {
    const savedNotices = JSON.parse(
      localStorage.getItem("knoteNotices") || "[]"
    );
    setNotices(savedNotices);
  };

  useEffect(() => {
    loadNotices();

    const handleNoticeUpdate = () => {
      loadNotices();
    };

    window.addEventListener("knote-notice-updated", handleNoticeUpdate);
    window.addEventListener("storage", handleNoticeUpdate);

    return () => {
      window.removeEventListener("knote-notice-updated", handleNoticeUpdate);
      window.removeEventListener("storage", handleNoticeUpdate);
    };
  }, []);

  const hasUnreadNotice = notices.some((notice) => !notice.read);

  const handleNoticeBellClick = () => {
    setShowNoticeModal(true);
  };

  const handleCloseNoticeModal = () => {
    const readNotices = notices.map((notice) => ({
      ...notice,
      read: true,
    }));

    localStorage.setItem("knoteNotices", JSON.stringify(readNotices));
    setNotices(readNotices);
    setShowNoticeModal(false);
  };

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
    <div className="min-h-screen bg-[#EAF1FC] overflow-x-auto">
      <aside
        className={`fixed left-0 top-0 z-20 w-[290px] h-screen bg-[#ADDCFF] px-[34px] py-[42px] border-r border-[#C9DEFA] transition-transform duration-300 ${
          isSidebarOpen ? "translate-x-0" : "translate-x-[-290px]"
        }`}
      >
        <div className="flex gap-[22px] items-start">
          <UserIcon />

          <div className="flex-1 pt-[10px] min-w-0">
            <div className="text-[15px] text-black font-semibold mb-[14px]">
              정서윤
            </div>

            <div className="h-[2px] bg-black w-full mb-[14px]" />

            <div className="flex flex-nowrap gap-[4px] items-center overflow-visible">
              <span className="inline-flex items-center justify-center whitespace-nowrap bg-white text-black border border-[#4A8DFF]/30 rounded-[3px] px-[4px] h-[22px] leading-none text-[12px]">
                #백엔드
              </span>
              <span className="inline-flex items-center justify-center whitespace-nowrap bg-white text-black border border-[#4A8DFF]/30 rounded-[3px] px-[4px] h-[22px] leading-none text-[12px]">
                #JAVA
              </span>
            </div>
          </div>
        </div>

        <div className="h-px bg-black/25 mt-[58px] mb-[52px]" />

        <nav className="w-full bg-[#4A8DFF] shadow-[0_4px_4px_rgba(0,0,0,0.18)] px-[36px] py-[34px] flex flex-col gap-[23px]">
          {item("/", "홈", "home", true)}
          {item("/team", "팀", "team")}
          {item("/meeting", "회의", "meeting")}
          {item("/todo", "투두", "todo")}
          {item("/feedback", "피드백", "feedback")}
        </nav>
      </aside>

      <RobotBriefing currentDate={currentTime} isVisible={isSidebarOpen} />

      <main
        className={`min-h-screen bg-[#EAF1FC] transition-all duration-300 ${
          isSidebarOpen ? "ml-[290px]" : "ml-0"
        }`}
      >
        <header className="h-[70px] w-full bg-[#ADDCFF] border-b border-[#C9DEFA] shadow-[0_4px_5px_rgba(0,0,0,0.16)] flex items-center justify-between px-[40px]">
          <div className="flex items-center gap-[24px] text-black">
            <button
              type="button"
              onClick={() => setIsSidebarOpen((prev) => !prev)}
              className="text-[26px] leading-none hover:text-[#4A8DFF] transition-colors"
              aria-label="사이드바 열기/닫기"
            >
              ≡
            </button>

            <span className="text-[17px] font-semibold">
              {formatHeaderTime(currentTime)}
            </span>
          </div>

          <div className="flex items-center gap-[18px]">
            <button
              type="button"
              onClick={() => navigate("/team-onboarding")}
              className="h-[30px] px-[12px] bg-white border border-[#C9DEFA] rounded-full text-[13px] font-semibold text-black hover:bg-[#EAF1FC] transition"
            >
              팀 온보딩
            </button>

            <button
              type="button"
              onClick={handleNoticeBellClick}
              className="relative w-[28px] h-[28px] flex items-center justify-center"
              aria-label="공지 알림 확인"
            >
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

              {hasUnreadNotice && (
                <span className="absolute right-[2px] top-[2px] w-[8px] h-[8px] bg-red-500 rounded-full border border-white" />
              )}
            </button>

            <button
              type="button"
              onClick={() => navigate("/mypage")}
              className="w-[28px] h-[28px] flex items-center justify-center"
              aria-label="마이페이지로 이동"
            >
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
            </button>
          </div>
        </header>

        <div className="px-[40px] pt-[42px] pb-[38px]">{children}</div>
      </main>

      {showNoticeModal && (
        <NoticeAlertModal
          notices={notices}
          onClose={handleCloseNoticeModal}
        />
      )}
    </div>
  );
}

export default Layout;