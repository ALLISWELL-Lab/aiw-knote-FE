import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import Breadcrumb from "../components/Breadcrumb";

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

function getMondayStartDate(date) {
  const copiedDate = new Date(date);
  const day = copiedDate.getDay();
  const mondayOffset = day === 0 ? -6 : 1 - day;

  copiedDate.setDate(copiedDate.getDate() + mondayOffset);
  copiedDate.setHours(0, 0, 0, 0);

  return copiedDate;
}

function isSameDate(dateA, dateB) {
  return (
    dateA.getFullYear() === dateB.getFullYear() &&
    dateA.getMonth() === dateB.getMonth() &&
    dateA.getDate() === dateB.getDate()
  );
}

function isDateInCurrentWeek(date, today) {
  const weekStart = getMondayStartDate(today);
  const weekEnd = new Date(weekStart);

  weekEnd.setDate(weekStart.getDate() + 6);
  weekEnd.setHours(23, 59, 59, 999);

  return date >= weekStart && date <= weekEnd;
}

function getCalendarDays(today) {
  const year = today.getFullYear();
  const month = today.getMonth();

  const firstDate = new Date(year, month, 1);
  const firstDay = firstDate.getDay();
  const mondayStartIndex = firstDay === 0 ? 6 : firstDay - 1;

  const startDate = new Date(year, month, 1 - mondayStartIndex);

  return Array.from({ length: 42 }, (_, index) => {
    const current = new Date(startDate);

    current.setDate(startDate.getDate() + index);
    current.setHours(0, 0, 0, 0);

    return {
      date: current,
      day: current.getDate(),
      isCurrentMonth: current.getMonth() === month,
      isToday: isSameDate(current, today),
      isCurrentWeek: isDateInCurrentWeek(current, today),
    };
  });
}

function formatWeeklyRange(today) {
  const weekStart = getMondayStartDate(today);
  const weekEnd = new Date(weekStart);

  weekEnd.setDate(weekStart.getDate() + 6);

  const startMonth = String(weekStart.getMonth() + 1).padStart(2, "0");
  const startDay = String(weekStart.getDate()).padStart(2, "0");
  const endMonth = String(weekEnd.getMonth() + 1).padStart(2, "0");
  const endDay = String(weekEnd.getDate()).padStart(2, "0");

  return `${weekStart.getFullYear()}.${startMonth}.${startDay} - ${weekEnd.getFullYear()}.${endMonth}.${endDay}`;
}

function CalendarCell({ day, active = false, today = false, muted = false }) {
  return (
    <div
      className={`h-[42px] border border-[#C9DEFA] flex items-center justify-center text-[15px] ${
        today
          ? "bg-[#4A8DFF] text-white font-semibold"
          : active
          ? "bg-[#ADDCFF] text-black font-semibold"
          : muted
          ? "bg-[#EAF1FC] text-gray-400"
          : "bg-white text-black"
      }`}
    >
      {day}
    </div>
  );
}

function WeeklyFeedback() {
  const today = new Date();
  const calendarDays = getCalendarDays(today);

  return (
    <Layout>
      <Breadcrumb items={["home", "feedback", "weeklyFeedback"]} />

      <div className="w-[900px] mx-auto">
        {/* Toggle buttons */}
        <div className="flex gap-[14px] mb-[82px]">
          <Link
            to="/feedback"
            className="h-[32px] px-[14px] border border-[#C9DEFA] bg-white text-[14px] text-black flex items-center justify-center rounded-[3px] hover:bg-[#ADDCFF]/40"
          >
            회의 피드백
          </Link>

          <Link
            to="/weekly-feedback"
            className="h-[32px] px-[14px] border border-[#C9DEFA] bg-[#ADDCFF] text-[14px] font-semibold text-black flex items-center justify-center rounded-[3px]"
          >
            위클리 피드백
          </Link>
        </div>

        <div className="grid grid-cols-[360px_1fr] gap-[60px]">
          {/* Calendar */}
          <div className="border border-[#C9DEFA] bg-white w-[360px] shadow-sm">
            <div className="h-[54px] flex items-center justify-between px-[28px] text-black">
              <span className="text-[28px]">‹</span>
              <span className="text-[16px] font-semibold">
                {today.getFullYear()} {monthNames[today.getMonth()]}
              </span>
              <span className="text-[28px]">›</span>
            </div>

            <div className="grid grid-cols-7 text-[13px] text-black">
              {["M", "T", "W", "TH", "F", "S", "SU"].map((d) => (
                <div
                  key={d}
                  className="h-[34px] flex items-center justify-center bg-white"
                >
                  {d}
                </div>
              ))}

              {calendarDays.map((item, index) => (
                <CalendarCell
                  key={`${item.date.toISOString()}-${index}`}
                  day={item.day}
                  active={item.isCurrentWeek}
                  today={item.isToday}
                  muted={!item.isCurrentMonth}
                />
              ))}
            </div>
          </div>

          {/* Weekly feedback panel */}
          <div className="border border-[#C9DEFA] bg-white w-[640px] min-h-[500px] shadow-sm">
            <div className="h-[42px] border-b border-[#C9DEFA] bg-[#EAF1FC] flex items-center justify-between px-[18px] text-[15px] font-semibold text-black">
              <span> AI 위클리 피드백 열람</span>
              <span className="text-[12px] text-gray-500 font-normal">
                {formatWeeklyRange(today)}
              </span>
            </div>

            <div className="px-[22px] py-[26px] text-[14px] leading-[26px] text-black">
              <p className="font-semibold text-[18px] mb-[18px]">
                &lt;위클리 업무 피드백&gt;
              </p>

              <div className="mb-[36px]">
                <p className="mb-[14px]">
                  ㆍ투두 수행률이 미흡해요.{" "}
                  <span className="font-medium">(현재 완료율: 3/8)</span>
                </p>

                <p>
                  ㆍ“프론트엔드 개발완료 및 연동 진행” 업무의 수행 시간이
                  예상한 시간(예상 시간: 7일)보다 길었어요.{" "}
                  <span className="font-medium">(소요시간: 10일)</span>
                </p>
              </div>

              <p className="font-semibold text-[18px] mb-[18px]">
                &lt;업무 수행에 관한 AI 조언&gt;
              </p>

              <div className="mb-[36px]">
                <p className="mb-[14px]">
                  ㆍ본인만의 마감 기한을 정하고, 업무 흐름 중 막혀서 머무르지
                  않고 일단 다음 단계로 넘어가는 것을 추천해요.
                </p>

                <p className="mb-[14px]">
                  ㆍ다음 단계를 진행하다 보면 이전 단계가 더 쉽게 풀릴 수
                  있어요.
                </p>

                <p>
                  ㆍ다음에도 같은 어려움을 겪는다면, 다른 해결책을 제시해
                  볼게요.
                </p>

                <p className="text-[12px] text-gray-500 mt-[12px]">
                  (투두 흐름상 2번째 투두의 수행 시간이 다음 단계로
                  진행되기까지의 시간을 바탕으로 제시한 조언이에요.)
                </p>
              </div>

              <p className="font-semibold text-[18px] mb-[18px]">
                &lt;이번 주의 명언&gt;
              </p>

              <p>ㆍNO PAIN, NO GAIN</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default WeeklyFeedback;