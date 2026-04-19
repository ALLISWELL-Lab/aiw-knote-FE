import { NavLink } from "react-router-dom";

function Layout({ children }) {
  const menuBase =
    "rounded-2xl px-4 py-3 text-sm block transition-all duration-200 shadow-sm";
  const menuActive =
    "bg-white text-blue-700 font-semibold";
  const menuInactive =
    "bg-white/80 text-gray-700 hover:bg-white hover:-translate-y-[1px]";

  return (
    <div className="min-h-screen flex bg-[#EEF3FA]">
      {/* Sidebar */}
      <aside className="w-64 min-h-screen bg-[#9FB2D1] p-6 flex flex-col">
        {/* 프로필 */}
        <div className="flex flex-col items-center mb-10">
          <div className="w-16 h-16 rounded-2xl bg-teal-500 mb-3 shadow-md" />
          <p className="font-semibold text-gray-900">김이화</p>

          <div className="flex gap-2 mt-2">
            <span className="bg-white text-blue-600 px-2 py-1 rounded-md text-xs shadow-sm">
              #백엔드
            </span>
            <span className="bg-white text-blue-600 px-2 py-1 rounded-md text-xs shadow-sm">
              #JAVA
            </span>
          </div>
        </div>

        {/* 메뉴 */}
        <div className="bg-[#B9C8DE] rounded-[28px] p-4 shadow-md flex flex-col gap-3">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `${menuBase} ${isActive ? menuActive : menuInactive}`
            }
          >
            홈
          </NavLink>

          <NavLink
            to="/team"
            className={({ isActive }) =>
              `${menuBase} ${isActive ? menuActive : menuInactive}`
            }
          >
            팀
          </NavLink>

          <NavLink
            to="/meeting"
            className={({ isActive }) =>
              `${menuBase} ${isActive ? menuActive : menuInactive}`
            }
          >
            회의
          </NavLink>

          <NavLink
            to="/todo"
            className={({ isActive }) =>
              `${menuBase} ${isActive ? menuActive : menuInactive}`
            }
          >
            투두
          </NavLink>

          <NavLink
            to="/feedback"
            className={({ isActive }) =>
              `${menuBase} ${isActive ? menuActive : menuInactive}`
            }
          >
            피드백
          </NavLink>
        </div>

        {/* 하단 카드 */}
        <div className="mt-auto bg-white rounded-[28px] p-5 shadow-md text-sm text-gray-700">
          <p className="font-semibold mb-2">데일리 브리핑</p>
          <p className="leading-6">
            좋은 흐름입니다.
            <br />
            이 속도를 유지해보세요 👍
          </p>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col p-6">
        {/* Header */}
        <header className="h-16 bg-[#9FB2D1] rounded-2xl shadow-md flex items-center justify-between px-6 mb-6">
          <div className="flex items-center gap-4 text-gray-900">
            <span className="text-lg">☰</span>
            <span className="text-sm font-medium">AM 08:35</span>
          </div>

          <div className="flex items-center gap-3">
            <button className="w-9 h-9 rounded-full bg-white hover:bg-gray-100 transition flex items-center justify-center shadow-sm">
              🔔
            </button>
            <button className="w-9 h-9 rounded-full bg-white hover:bg-gray-100 transition flex items-center justify-center shadow-sm">
              👤
            </button>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}

export default Layout;