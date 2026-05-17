import { Link } from "react-router-dom";
import Layout from "../components/Layout";

function CalendarCell({ day, active = false, muted = false }) {
  return (
    <div
      className={`h-[42px] border border-[#C9DEFA] flex items-center justify-center text-[15px] ${
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
              <span className="text-[16px] font-semibold">2022 JANUARY</span>
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

          {/* Weekly feedback panel */}
          <div className="border border-[#C9DEFA] bg-white w-[640px] min-h-[500px] shadow-sm">
            <div className="h-[42px] border-b border-[#C9DEFA] bg-[#EAF1FC] flex items-center px-[18px] text-[15px] font-semibold text-black">
              ＞ AI 위클리 피드백 열람
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