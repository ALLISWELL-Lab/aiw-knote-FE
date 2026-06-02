import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import Breadcrumb from "../components/Breadcrumb";
// import api from "../api"; // 💡 영상 촬영을 위해 실제 API 대신 하드코딩 데이터를 사용합니다.

function MeetingFeedback() {
  const currentMemberId = 1; 

  // ------------------------------------
  // 하드코딩용 더미 데이터 정의
  // ------------------------------------
  
  // 1. 좌측 회의 리스트 더미 데이터
  const dummyMeetings = [
    { id: 3, code: "MEET-0517", title: "SDT 기능 및 본서버 배포 논의", agenda: "SDT 기능과 로딩 페이지 성능 개선 및 작업 배분" },
    { id: 2, code: "MEET-0514", title: "UI/UX 디자인 피드백 및 수정", agenda: "사용자 피드백 반영한 메인 대시보드 컴포넌트 구조 고도화" },
    { id: 1, code: "MEET-0510", title: "1차 스프린트 회고 및 Task 점검", agenda: "스프린트 백로그 점검 및 완료되지 않은 Task 원인 분석" }
  ];

  // 2. 회의 ID별 상세 데이터 매핑 (BRIEF, 요약, 상세)
  const dummyFeedbacks = {
    3: {
      meetingSummary: "• SDT 기능과 로딩 페이지 성능이 중요하다.\n• 액션 아이템 추출 방식과 시퀀스 필터링에 대한 논의가 있었다.\n• 프론트 작업과 본서버 작업에 대한 책임 배분 및 진행 상황 공유가 이루어졌다.",
      feedbackSummary: "이번 회의에서 팀원의 참여가 활발하였고, 의사소통까지 이끌어내려는 노력이 돋보였습니다. 팀 워크의 원활함을 위해서는 꾸준한 Task 진행과 적극적인 피드백이 필요할 것 같습니다.",
      feedbackDetail: "현재 Task 완료율이 16.7%로 매우 낮아, 우선순위 설정 및 시간 관리 부족이 근본 원인으로 보입니다. 이러한 점에서 개선이 필요하며, 의사소통 또한 더욱 원활히 이뤄질 수 있도록 주간 체크인 미팅 도입이 효과적일 것입니다. 회의에서의 참여도는 좋았지만, 주어진 작업에 대한 지속적인 완료율 향상이 요구됩니다."
    },
    2: {
      meetingSummary: "• 대시보드 컴포넌트의 반응형 레이아웃 오차 수정이 시급함.\n• 차트 라이브러리(Recharts) 도입에 따른 번들 사이즈 증가 이슈 공유.\n• 디자이너 최종 시안 가이드라인 준수 및 QA 일정 재조정 필요.",
      feedbackSummary: "UI 가독성에 대한 심도 있는 논의가 이루어졌으며, 사용자 중심의 사고가 돋보였습니다. 다만, 기술적 제약 사항을 공유하는 과정에서 다소 방어적인 태도가 아쉬웠습니다.",
      feedbackDetail: "차트 라이브러리 도입 등 기술적 이슈를 제기할 때, 대안(Alternative)을 함께 제시한다면 더 건설적인 회의가 될 것입니다. 프론트엔드 파트 내의 협업 만족도는 높으나 타 직군(디자인)과의 소통 스트레스 지수가 높게 측정되었으므로, 정기적인 디자인-개발 싱크 업 세션을 제안합니다."
    },
    1: {
      meetingSummary: "• 1차 스프린트 목표 달성률 65%로 다소 저조한 원인 분석.\n• Git 브랜치 전략(Git-flow) 미숙지로 인한 머지 충돌 및 병목 현상 발생.\n• 다음 스프린트에서는 티켓 단위를 더 쪼개서 진행하기로 합의.",
      feedbackSummary: "실패 원인을 솔직하게 공유하고 서로를 격려하는 심리적 안정감이 돋보인 회의였습니다. 문제 해결을 위한 액션 아이템 도출 과정이 매우 구체적이었습니다.",
      feedbackDetail: "머지 충돌로 인한 병목은 CI/CD 파이프라인 자동화 및 일일 씽크업을 통해 예방할 수 있습니다. 팀 전반의 피로도가 상승한 상태이므로, 다음 스프린트에서는 무리한 기능 추가보다는 기술 부채 해결과 코드 리팩토링에 20%의 리소스를 할당할 것을 권장합니다."
    }
  };

  // ------------------------------------
  // State 상태 관리 정의
  // ------------------------------------
  const [meetings, setMeetings] = useState([]); 
  const [selectedMeetingId, setSelectedMeetingId] = useState(null); 
  const [searchQuery, setSearchQuery] = useState(""); 
  
  const [meetingBrief, setMeetingBrief] = useState("회의를 선택하여 요약된 회의의 핵심 내용을 확인하세요!");
  const [aiSummary, setAiSummary] = useState("특정 회의를 선택하여 해당 회의에 대한 AI 피드백을 확인하세요!");
  const [aiDetail, setAiDetail] = useState("");

  // ------------------------------------
  // 컴포넌트 마운트 시 하드코딩 목록 로드
  // ------------------------------------
  useEffect(() => {
    setMeetings(dummyMeetings);
  }, []);

  // ------------------------------------
  // 회의 클릭 시 하드코딩 데이터 매핑
  // ------------------------------------
  const handleMeetingSelect = (meetingId) => {
    setSelectedMeetingId(meetingId);

    const data = dummyFeedbacks[meetingId];
    if (data) {
      setMeetingBrief(data.meetingSummary);
      setAiSummary(data.feedbackSummary);
      setAiDetail(data.feedbackDetail);
    } else {
      setMeetingBrief("회의 요약 데이터가 존재하지 않습니다.");
      setAiSummary("피드백 요약 정보가 없습니다.");
      setAiDetail("상세 피드백 기록이 존재하지 않습니다.");
    }
  };

  // 검색어 필터링 유틸리티 로직
  const filteredMeetings = meetings.filter(m => 
    (m.code && m.code.includes(searchQuery)) || 
    (m.title && m.title.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (m.agenda && m.agenda.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <Layout>
      <Breadcrumb items={["home", "feedback", "meetingFeedback"]} />

      <div className="w-[850px] mx-auto text-black">
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

        <div className="grid grid-cols-[260px_1fr] gap-[46px] mb-[42px] items-start">
          {/* Left meeting list */}
          <div className="flex flex-col gap-[16px]">
            <div className="w-full h-[38px] bg-white border border-[#C9DEFA] rounded-[4px] flex items-center justify-between px-[14px] shadow-sm">
              <input 
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full text-[14px] text-black outline-none placeholder-gray-400"
              />
              <span className="text-[#4A8DFF] text-[17px]">⌕</span>
            </div>

            <div className="w-full bg-white border border-[#C9DEFA] rounded-[3px] shadow-sm overflow-hidden min-h-[150px]">
              <div className="h-[30px] bg-[#EAF1FC] flex items-center px-[12px] gap-[8px] text-[13px] text-black border-b border-[#C9DEFA]">
                <span className="text-[#4A8DFF]">⌕</span>
                <span>{searchQuery}</span>
              </div>

              <div className="px-[13px] py-[12px] flex flex-col gap-[14px]">
                {filteredMeetings.length > 0 ? (
                  filteredMeetings.map((meeting) => (
                    <div 
                      key={meeting.id}
                      onClick={() => handleMeetingSelect(meeting.id)}
                      className={`flex gap-[9px] cursor-pointer p-[6px] rounded-[3px] transition-colors ${
                        selectedMeetingId === meeting.id ? "bg-[#ADDCFF]/40 font-semibold" : "hover:bg-[#EAF1FC]"
                      }`}
                    >
                      <div className={`w-[18px] h-[18px] rounded-[3px] shrink-0 ${
                        selectedMeetingId === meeting.id ? "bg-[#4A8DFF]" : "bg-[#C9DEFA]"
                      }`} />
                      <div className="text-[13px] leading-[15px] w-[180px]">
                        <p className="text-black font-semibold">{meeting.code || `회의 ID: ${meeting.id}`}</p>
                        <p className="text-gray-600 mt-[2px] font-normal truncate">{meeting.title || meeting.agenda}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-400 text-center py-[20px] text-[13px]">데이터가 존재하지 않습니다.</p>
                )}
              </div>
            </div>
          </div>

          {/* Right brief */}
          <div className="border border-[#C9DEFA] bg-white min-h-[170px] shadow-sm rounded-[2px] w-full">
            <div className="px-[18px] py-[14px] text-[14px] font-semibold border-b border-[#C9DEFA] bg-[#EAF1FC]/40">
              회의 BRIEF
            </div>
            <div className="px-[24px] py-[20px] text-[13px] leading-[22px] text-slate-700 whitespace-pre-wrap">
              {meetingBrief}
            </div>
          </div>
        </div>

        {/* AI feedback summary */}
        <div className="w-full border border-[#C9DEFA] bg-white shadow-sm mb-[42px] rounded-[2px]">
          <div className="px-[18px] py-[14px] text-[14px] font-semibold border-b border-[#C9DEFA] bg-[#EAF1FC]/40">
            AI 피드백 요약
          </div>
          <div className="px-[24px] py-[20px] text-[13px] leading-[22px] text-slate-700 whitespace-pre-wrap">
            {aiSummary}
          </div>
        </div>

        {/* Detail feedback */}
        <div className="w-full border border-[#C9DEFA] bg-white shadow-md rounded-[2px] mb-[40px]">
          <div className="h-[38px] border-b border-[#C9DEFA] bg-[#EAF1FC] flex items-center px-[14px] text-[14px] font-semibold">
            AI 상세 피드백
          </div>

          <div className="px-[24px] py-[22px] text-[13px] leading-[24px] text-slate-700">
            {selectedMeetingId ? (
              <div className="whitespace-pre-wrap">
                {aiDetail || "상세 분석 결과 텍스트를 구성하는 중입니다..."}
              </div>
            ) : (
              <p className="text-gray-400 text-center py-[20px]">
                회의 목록을 클릭하시면 GPT 상세 피드백 진단 결과서가 오픈됩니다.
              </p>
            )}
          </div>
        </div>

      </div>
    </Layout>
  );
}

export default MeetingFeedback;