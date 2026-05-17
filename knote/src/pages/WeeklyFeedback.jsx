import { Link } from "react-router-dom";
import Layout from "../components/Layout";

// 💡 날짜 셀 높이를 다시 깔끔하고 직관적인 원래 크기(h-[36px])로 완벽 롤백
function CalendarCell({ day, active = false, muted = false }) {
  return (
    <div
      className={`h-[36px] border border-[#C9DEFA] flex items-center justify-center text-[13px] ${
        active
          ? "bg-[#4A8DFF] text-white font-semibold"
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
  return (
    <Layout>
      {/* Breadcrumb */}
      <div className="flex items-center gap-[10px] text-[14px] text-black mb-[18px]">
        <span className="font-semibold">⌂ Home</span>
        <span className="text-gray-400">/</span>
        <span>피드백</span>
        <span className="text-gray-400">/</span>
        <span className="font-semibold">위클리 피드백</span>
      </div>

      <div className="h-px bg-[#C9DEFA] mb-[36px]" />

      <div className="w-[980px] mx-auto text-black">
        
        {/* Toggle buttons */}
        <div className="flex gap-[14px] mb-[34px]">
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

        {/* 💡 핵심 수정: items-stretch 대신 items-center를 주어 달력이 우측 박스의 정중앙 높이에 위치하게 만듭니다. */}
        <div className="grid grid-cols-[300px_1fr] gap-[40px] items-center">
          
          {/* ================= [LEFT CALENDAR AREA] ================= */}
          {/* 달력은 원래 디자인하셨던 콤팩트하고 아담한 기본 구조로 깔끔하게 떨어집니다 */}
          <div className="border border-[#C9DEFA] bg-white w-[300px] shadow-sm rounded-[2px] flex flex-col flex-shrink-0">
            {/* 연도/월 조작 헤더 */}
            <div className="h-[46px] flex items-center justify-between px-[20px] text-black border-b border-[#C9DEFA]/60 bg-white rounded-t-[2px]">
              <span className="text-[22px] cursor-pointer select-none hover:text-gray-400">‹</span>
              <span className="text-[14px] font-semibold">2022 JANUARY</span>
              <span className="text-[22px] cursor-pointer select-none hover:text-gray-400">›</span>
            </div>

            {/* 요일 및 날짜 일자판 그리드 */}
            <div className="grid grid-cols-7 text-[12px] text-black p-[8px] pt-[4px]">
              {["M", "T", "W", "TH", "F", "S", "SU"].map((d) => (
                <div
                  key={d}
                  className="h-[30px] flex items-center justify-center bg-white font-medium text-gray-500"
                >
                  {d}
                </div>
              ))}

              <CalendarCell day="26" muted />
              <CalendarCell day="27" muted />
              <CalendarCell day="28" muted />
              <CalendarCell day="29" muted />
              <CalendarCell day="30" muted />
              <CalendarCell day="31" muted />
              <CalendarCell day="1" />

              <CalendarCell day="2" />
              <CalendarCell day="3" />
              <CalendarCell day="4" />
              <CalendarCell day="5" />
              <CalendarCell day="6" />
              <CalendarCell day="7" />
              <CalendarCell day="8" />

              <CalendarCell day="9" active />
              <CalendarCell day="10" active />
              <CalendarCell day="11" active />
              <CalendarCell day="12" active />
              <CalendarCell day="13" active />
              <CalendarCell day="14" active />
              <CalendarCell day="15" active />

              <CalendarCell day="16" />
              <CalendarCell day="17" />
              <CalendarCell day="18" />
              <CalendarCell day="19" />
              <CalendarCell day="20" />
              <CalendarCell day="21" />
              <CalendarCell day="22" />

              <CalendarCell day="23" />
              <CalendarCell day="24" />
              <CalendarCell day="25" muted />
              <CalendarCell day="26" muted />
              <CalendarCell day="27" muted />
              <CalendarCell day="28" muted />
              <CalendarCell day="29" muted />

              <CalendarCell day="30" />
              <CalendarCell day="31" />
              <CalendarCell day="1" muted />
              <CalendarCell day="2" muted />
              <CalendarCell day="3" muted />
              <CalendarCell day="4" muted />
              <CalendarCell day="5" muted />
            </div>
          </div>

          {/* ================= [RIGHT FEEDBACK AREA] ================= */}
          <div className="border border-[#C9DEFA] bg-white flex-1 min-h-[460px] shadow-sm rounded-[2px]">
            <div className="h-[42px] border-b border-[#C9DEFA] bg-[#EAF1FC] flex items-center px-[18px] text-[14px] font-semibold text-black">
              AI 위클리 피드백
            </div>

            <div className="px-[24px] py-[22px] text-[13px] leading-[24px] text-slate-800">
              <p className="font-bold text-[15px] mb-[12px] text-black">
                &lt;위클리 업무 피드백&gt;
              </p>

              <div className="mb-[28px] pl-[6px] space-y-[4px]">
                <p>
                  ㆍ투두 수행률이 미흡해요.{" "}
                  <span className="font-semibold text-[#4A8DFF]">(현재 완료율: 3/8)</span>
                </p>
                <p>
                  ㆍ“프론트엔드 개발완료 및 연동 진행” 업무의 수행 시간이
                  예상한 시간(예상 시간: 7일)보다 길었어요.{" "}
                  <span className="font-semibold text-amber-600">(소요시간: 10일)</span>
                </p>
              </div>

              <p className="font-bold text-[15px] mb-[12px] text-black">
                &lt;업무 수행에 관한 AI 조언&gt;
              </p>

              <div className="mb-[28px] pl-[6px] space-y-[6px]">
                <p>
                  ㆍ본인만의 마감 기한을 정하고, 업무 흐름 중 막혀서 머무르지
                  않고 일단 다음 단계로 넘어가는 것을 추천해요.
                </p>
                <p>
                  ㆍ다음 단계를 진행하다 보면 이전 단계가 더 쉽게 풀릴 수 있어요.
                </p>
                <p>
                  ㆍ다음에도 같은 어려움을 겪는다면, 다른 해결책을 제시해 볼게요.
                </p>
                <p className="text-[11px] text-gray-400 pt-[4px] leading-normal">
                  (투두 흐름상 2번째 투두의 수행 시간이 다음 단계로
                  진행되기까지의 시간을 바탕으로 제시한 조언이에요.)
                </p>
              </div>

              <p className="font-bold text-[15px] mb-[12px] text-black">
                &lt;이번 주의 명언&gt;
              </p>
              <p className="pl-[6px] font-semibold text-slate-700 tracking-wide">ㆍNO PAIN, NO GAIN</p>
            </div>
          </div>

        </div>
      </div>
    </Layout>
  );
}

export default WeeklyFeedback;