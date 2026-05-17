import { Link } from "react-router-dom";
import Layout from "../components/Layout";

function Feedback() {
  return (
    <Layout>
      {/* Breadcrumb */}
      <div className="flex items-center gap-[10px] text-[14px] text-black mb-[18px]">
        <span className="font-semibold">⌂ Home</span>
        <span className="text-gray-400">/</span>
        <span>피드백</span>
        <span className="text-gray-400">/</span>
        <span className="font-semibold">회의 피드백</span>
      </div>

      <div className="h-px bg-[#C9DEFA] mb-[36px]" />

      <div className="w-[850px] mx-auto">
        {/* Toggle buttons */}
        <div className="flex gap-[14px] mb-[34px]">
          <Link
            to="/feedback"
            className="h-[32px] px-[14px] border border-[#C9DEFA] bg-[#ADDCFF] text-[14px] font-semibold text-black flex items-center justify-center rounded-[3px]"
          >
            회의 피드백
          </Link>

          <Link
            to="/weekly-feedback"
            className="h-[32px] px-[14px] border border-[#C9DEFA] bg-white text-[14px] text-black flex items-center justify-center rounded-[3px] hover:bg-[#ADDCFF]/40"
          >
            위클리 피드백
          </Link>
        </div>

        <div className="grid grid-cols-[260px_1fr] gap-[46px] mb-[42px]">
          {/* Left meeting list */}
          <div>
            <div className="w-full h-[38px] bg-white border border-[#C9DEFA] rounded-[4px] flex items-center justify-between px-[14px] shadow-sm">
              <span className="text-[14px] text-gray-400">Search...</span>
              <span className="text-[#4A8DFF] text-[17px]">⌕</span>
            </div>

            <div className="w-full h-[142px] bg-white border border-[#C9DEFA] rounded-[3px] shadow-md overflow-hidden">
              <div className="h-[30px] bg-[#EAF1FC] flex items-center px-[12px] gap-[8px] text-[13px] text-black">
                <span className="text-[#4A8DFF]">⌕</span>
                <span>“20260201”</span>
              </div>

              <div className="px-[13px] py-[8px] text-[13px] text-black">
                <div className="flex gap-[9px] mb-[9px]">
                  <div className="w-[18px] h-[18px] bg-[#ADDCFF] rounded-[3px]" />
                  <div>
                    <p className="font-semibold leading-[15px]">20260201</p>
                    <p className="leading-[15px]">일요일 정기 회의</p>
                  </div>
                </div>

                <div className="flex gap-[9px] mb-[9px]">
                  <div className="w-[18px] h-[18px] bg-[#C9DEFA] rounded-[3px]" />
                  <div>
                    <p className="font-semibold leading-[15px]">20260127</p>
                    <p className="leading-[15px]">백엔드 역할 분배</p>
                  </div>
                </div>

                <div className="flex gap-[9px]">
                  <div className="w-[18px] h-[18px] bg-[#4A8DFF] rounded-[3px]" />
                  <div>
                    <p className="font-semibold leading-[15px]">20260124</p>
                    <p className="leading-[15px]">피그마 점검</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right brief */}
          <div className="border border-[#C9DEFA] bg-white h-[170px] shadow-sm">
            <div className="px-[18px] py-[16px] text-[14px] text-black font-semibold">
              회의 BRIEF
            </div>

            <div className="px-[44px] py-[32px] text-[14px] text-black">
              회의를 선택하여 요약된 회의의 핵심 내용을 확인하세요!
            </div>
          </div>
        </div>

        {/* AI feedback summary */}
        <div className="w-[580px] h-[170px] border border-[#C9DEFA] bg-white shadow-sm mb-[60px]">
          <div className="px-[18px] py-[16px] text-[14px] text-black font-semibold">
            AI 피드백 요약 제시
          </div>

          <div className="px-[44px] py-[36px] text-[14px] leading-[20px] text-black">
            특정 회의를 선택하여 해당 회의에 대한
            <br />
            AI 피드백을 확인하세요!
          </div>
        </div>

        {/* Detail feedback */}
        <div className="w-[370px] border border-[#C9DEFA] bg-white shadow-md">
          <div className="h-[34px] border-b border-[#C9DEFA] bg-[#EAF1FC] flex items-center px-[14px] text-[14px] font-semibold text-black">
            ＞ AI 상세 피드백 열람
          </div>

          <div className="px-[18px] py-[22px] text-[13px] leading-[24px] text-black">
            <p className="font-semibold mb-[22px]">2026/01/01 회의</p>

            <p className="mb-[18px]">ㆍ주제별 전체 참여율: 100%</p>

            <div className="mb-[22px]">
              <p>ㆍ소주제 1 : O</p>
              <p>ㆍ소주제 2 : O</p>
              <p>ㆍ소주제 3 : O</p>
            </div>

            <p className="mb-[18px]">ㆍ회의 후 투두 수행률 : 19% (미흡)</p>

            <p>
              ㆍ회의에서 생성된 액션 아이템의 85%가 이화님의 발화에서
              나왔어요. 대단해요!
            </p>
            <p>ㆍ회의의 모든 소주제에 적극적으로 참여하셨어요!</p>
          </div>
        </div>

        {/* Fake scroll line */}
        <div className="absolute right-[150px] top-[760px] w-px h-[250px] bg-[#C9DEFA]" />
      </div>
    </Layout>
  );
}

export default Feedback;