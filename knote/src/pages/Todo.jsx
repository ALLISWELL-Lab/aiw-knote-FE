import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";

function TodoSummaryCard({ title, value, description }) {
  return (
    <div className="border border-[#C9DEFA] bg-white shadow-sm">
      <div className="h-[36px] border-b border-[#C9DEFA] bg-[#EAF1FC] flex items-center px-[14px] text-[14px] font-semibold text-black">
        {title}
      </div>

      <div className="px-[18px] py-[16px]">
        <p className="text-[30px] font-semibold text-black mb-[8px]">
          {value}
        </p>
        <p className="text-[13px] leading-[20px] text-black">
          {description}
        </p>
      </div>
    </div>
  );
}

function TodoPreviewRow({ title, status, member }) {
  return (
    <div className="grid grid-cols-[1fr_72px_80px] h-[38px] border-b border-[#C9DEFA] text-[13px] text-black">
      <div className="flex items-center px-[12px]">{title}</div>
      <div className="flex items-center justify-center">{status}</div>
      <div className="flex items-center justify-center">{member}</div>
    </div>
  );
}

function Todo() {
  const navigate = useNavigate();

  return (
    <Layout>
      {/* Breadcrumb */}
      <div className="flex items-center gap-[10px] text-[14px] text-black mb-[18px]">
        <span className="font-semibold">⌂ Home</span>
        <span className="text-gray-400">/</span>
        <span>투두</span>
        <span className="text-gray-400">/</span>
        <span className="font-semibold">투두 메인</span>
      </div>

      <div className="h-px bg-[#C9DEFA] mb-[42px]" />

      <div className="w-[920px] mx-auto">
        {/* Top buttons */}
        <div className="grid grid-cols-2 gap-[28px] mb-[34px]">
          <button
            type="button"
            onClick={() => navigate("/todo/sprint")}
            className="h-[110px] border border-[#C9DEFA] bg-white shadow-sm hover:bg-[#ADDCFF]/40 flex flex-col items-center justify-center"
          >
            <p className="text-[18px] font-semibold text-black mb-[10px]">
              프로젝트 스프린트
            </p>
            <p className="text-[13px] text-black">
              프로젝트 진행 보드와 AI D-day 제안을 확인합니다.
            </p>
          </button>

          <button
            type="button"
            onClick={() => navigate("/todo/matching")}
            className="h-[110px] border border-[#C9DEFA] bg-white shadow-sm hover:bg-[#ADDCFF]/40 flex flex-col items-center justify-center"
          >
            <p className="text-[18px] font-semibold text-black mb-[10px]">
              TODO 담당자 매칭
            </p>
            <p className="text-[13px] text-black">
              회의 기반 AI TODO를 팀원과 매칭합니다.
            </p>
          </button>
        </div>

        {/* Summary */}
        <div className="grid grid-cols-3 gap-[20px] mb-[34px]">
          <TodoSummaryCard
            title="전체 TODO"
            value="12"
            description="현재 프로젝트에서 관리 중인 전체 TODO입니다."
          />
          <TodoSummaryCard
            title="진행 중"
            value="5"
            description="담당자가 배정되어 진행 중인 작업입니다."
          />
          <TodoSummaryCard
            title="매칭 필요"
            value="3"
            description="AI가 추출했지만 담당자 확인이 필요한 작업입니다."
          />
        </div>

        {/* Recent TODO preview */}
        <div className="border border-[#C9DEFA] bg-white shadow-sm">
          <div className="h-[42px] border-b border-[#C9DEFA] bg-[#EAF1FC] flex items-center justify-between px-[18px]">
            <span className="text-[15px] font-semibold text-black">
              최근 TODO
            </span>
            <span className="text-[13px] text-gray-500">
              회의 분석 결과 기반
            </span>
          </div>

          <div className="grid grid-cols-[1fr_72px_80px] h-[34px] border-b border-[#C9DEFA] bg-[#ADDCFF] text-[13px] text-black font-semibold">
            <div className="flex items-center px-[12px]">TODO</div>
            <div className="flex items-center justify-center">상태</div>
            <div className="flex items-center justify-center">담당자</div>
          </div>

          <TodoPreviewRow
            title="회의 업로드 화면 정리하기"
            status="진행"
            member="임이랑"
          />
          <TodoPreviewRow
            title="STT 응답 구조 확인하기"
            status="대기"
            member="정서윤"
          />
          <TodoPreviewRow
            title="회의 업로드 API 연동 점검하기"
            status="진행"
            member="강민지"
          />
          <TodoPreviewRow
            title="액션아이템 담당자 매칭하기"
            status="매칭"
            member="미정"
          />
        </div>

        <div className="text-center text-[13px] leading-[21px] text-black mt-[34px]">
          회의 분석 결과에서 추출된 TODO를 기반으로 프로젝트 스프린트와
          담당자 매칭을 진행할 수 있습니다.
        </div>
      </div>
    </Layout>
  );
}

export default Todo;