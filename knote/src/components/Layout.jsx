import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

function Layout({ children }) {
  // 실시간 시간 상태 관리
  const [currentTime, setCurrentTime] = useState(new Date());

  // 1초마다 시간을 업데이트하는 타이머 설정
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    
    // 컴포넌트 언마운트 시 타이머 해제
    return () => clearInterval(timer);
  }, []);

  // 시간을 "AM/PM hh:mm" 형식으로 변환하는 함수
  const formatTime = (date) => {
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    
    hours = hours % 12 || 12; // 0시를 12시로 표시
    const minutesStr = minutes < 10 ? `0${minutes}` : minutes;
    const hoursStr = hours < 10 ? `0${hours}` : hours;
    
    return `${ampm} ${hoursStr}:${minutesStr}`;
  };

  // 사이드바 메뉴 스타일 정의
  const menuBase = "rounded-2xl px-4 py-3 text-sm block transition-all duration-200 shadow-sm";
  const menuActive = "bg-white text-blue-700 font-semibold";
  const menuInactive = "bg-white/80 text-gray-700 hover:bg-white hover:-translate-y-[1px]";

  return (
    <div className="min-h-screen flex bg-[#EEF3FA]">
      {/* 사이드바 (Sidebar) */}
      <aside className="w-64 min-h-screen bg-[#9FB2D1] p-6 flex flex-col">
        {/* 프로필 섹션 */}
        <div className="flex flex-col items-center mb-10">
          <div className="w-16 h-16 rounded-2xl bg-teal-500 mb-3 shadow-md" />
          <p className="font-semibold text-gray-900">김이화</p>
          <div className="flex gap-2 mt-2">
            <span className="bg-white text-blue-600 px-2 py-1 rounded-md text-xs shadow-sm">#백엔드</span>
            <span className="bg-white text-blue-600 px-2 py-1 rounded-md text-xs shadow-sm">#JAVA</span>
          </div>
        </div>

        {/* 메뉴 네비게이션 */}
        <div className="bg-[#B9C8DE] rounded-[28px] p-4 shadow-md flex flex-col gap-3">
          <NavLink to="/" end className={({ isActive }) => `${menuBase} ${isActive ? menuActive : menuInactive}`}>홈</NavLink>
          <NavLink to="/team" className={({ isActive }) => `${menuBase} ${isActive ? menuActive : menuInactive}`}>팀</NavLink>
          <NavLink to="/meeting" className={({ isActive }) => `${menuBase} ${isActive ? menuActive : menuInactive}`}>회의</NavLink>
          <NavLink to="/todo" className={({ isActive }) => `${menuBase} ${isActive ? menuActive : menuInactive}`}>투두</NavLink>
          <NavLink to="/feedback" className={({ isActive }) => `${menuBase} ${isActive ? menuActive : menuInactive}`}>피드백</NavLink>
        </div>

        {/* 하단 데일리 브리핑 카드 */}
        <div className="mt-auto bg-white rounded-[28px] p-5 shadow-md text-sm text-gray-700">
          <p className="font-semibold mb-2">데일리 브리핑</p>
          <p className="leading-6">좋은 흐름입니다.<br />이 속도를 유지해보세요 👍</p>
        </div>
      </aside>

      {/* 메인 콘텐츠 영역 */}
      <div className="flex-1 flex flex-col p-6">
        {/* 상단 헤더 (실시간 시계 포함) */}
        <header className="h-16 bg-[#9FB2D1] rounded-2xl shadow-md flex items-center justify-between px-6 mb-6">
          <div className="flex items-center gap-4 text-gray-900">
            <span className="text-lg cursor-pointer">☰</span>
            {/* 실시간으로 변하는 시간 출력 */}
            <span className="text-sm font-medium">{formatTime(currentTime)}</span>
          </div>

          <div className="flex items-center gap-3">
            <button className="w-9 h-9 rounded-full bg-white hover:bg-gray-100 transition flex items-center justify-center shadow-sm">🔔</button>
            <button className="w-9 h-9 rounded-full bg-white hover:bg-gray-100 transition flex items-center justify-center shadow-sm">👤</button>
          </div>
        </header>

        {/* 하위 페이지 컨텐츠 출력 */}
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}

export default Layout;