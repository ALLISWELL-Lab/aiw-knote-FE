import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";

function KanbanCard({ title, tag, muted = false }) {
  return (
    <div
      className={`w-full min-h-[52px] border border-[#C9DEFA] bg-white px-[10px] py-[8px] text-[13px] text-black shadow-sm ${
        muted ? "opacity-70" : ""
      }`}
    >
      <p className="leading-[18px]">{title}</p>
      {tag && (
        <span className="inline-block mt-[6px] text-[11px] px-[5px] py-[1px] bg-[#EAF1FC] text-black border border-[#C9DEFA]">
          {tag}
        </span>
      )}
    </div>
  );
}

function DdayRow({
  todo,
  assignee,
  importance,
  priority,
  dday,
  reason,
  active = false,
}) {
  return (
    <div
      className={`grid grid-cols-[1fr_80px_78px_78px_70px] min-h-[52px] border-b border-[#C9DEFA] text-[13px] text-black ${
        active ? "bg-[#ADDCFF]/45" : "bg-white"
      }`}
    >
      <div className="flex flex-col justify-center px-[12px] leading-[19px]">
        <span>{todo}</span>
        <span className="text-[11px] text-gray-500 mt-[2px]">{reason}</span>
      </div>

      <div className="border-l border-[#C9DEFA] flex items-center justify-center">
        {assignee}
      </div>

      <div className="border-l border-[#C9DEFA] flex items-center justify-center">
        {importance}
      </div>

      <div className="border-l border-[#C9DEFA] flex items-center justify-center">
        {priority}
      </div>

      <div className="border-l border-[#C9DEFA] flex items-center justify-center font-semibold">
        D-{dday}
      </div>
    </div>
  );
}

function DdayRuleCard({ title, value, description }) {
  return (
    <div className="border border-[#C9DEFA] bg-white px-[12px] py-[12px]">
      <p className="text-[13px] font-semibold text-black mb-[6px]">{title}</p>
      <p className="text-[22px] font-semibold text-[#4A8DFF] mb-[6px]">
        {value}
      </p>
      <p className="text-[12px] leading-[18px] text-black">{description}</p>
    </div>
  );
}

function TodoSprint() {
  const navigate = useNavigate();

  return (
    <Layout>
      {/* Breadcrumb */}
      <div className="flex items-center gap-[10px] text-[14px] text-black mb-[18px]">
        <span className="font-semibold">⌂ Home</span>
        <span className="text-gray-400">/</span>
        <span>투두</span>
        <span className="text-gray-400">/</span>
        <span className="font-semibold">프로젝트 스프린트</span>
      </div>

      <div className="h-px bg-[#C9DEFA] mb-[34px]" />

      <div className="w-[940px] mx-auto">
        <div className="flex justify-end mb-[12px]">
          <button
            type="button"
            onClick={() => navigate("/todo")}
            className="w-[72px] h-[28px] bg-white border border-[#C9DEFA] text-[13px] text-black"
          >
            돌아가기
          </button>
        </div>

        {/* Top project board */}
        <div className="border border-[#C9DEFA] bg-white mb-[30px] shadow-sm">
          <div className="h-[42px] border-b border-[#C9DEFA] bg-[#EAF1FC] flex items-center justify-between px-[18px]">
            <span className="text-[15px] font-semibold text-black">
              프로젝트 진행 보드
            </span>
            <span className="text-[13px] text-gray-500">
              KNOTE 졸업프로젝트
            </span>
          </div>

          <div className="grid grid-cols-4 gap-[14px] px-[18px] py-[18px]">
            {/* Column 1 */}
            <div className="border border-[#C9DEFA] bg-white min-h-[245px]">
              <div className="h-[34px] border-b border-[#C9DEFA] bg-[#ADDCFF] flex items-center px-[12px] text-[13px] font-semibold text-black">
                TODO
              </div>

              <div className="p-[10px] space-y-[10px]">
                <KanbanCard
                  title="회의 분석 결과 페이지 스크린샷 정리"
                  tag="프론트"
                />
                <KanbanCard title="보고서 기능 흐름 설명 작성" tag="문서" />
                <KanbanCard
                  title="백엔드 API 응답 형식 확인"
                  tag="백엔드"
                  muted
                />
              </div>
            </div>

            {/* Column 2 */}
            <div className="border border-[#C9DEFA] bg-white min-h-[245px]">
              <div className="h-[34px] border-b border-[#C9DEFA] bg-[#ADDCFF] flex items-center px-[12px] text-[13px] font-semibold text-black">
                IN PROGRESS
              </div>

              <div className="p-[10px] space-y-[10px]">
                <KanbanCard title="회의 업로드 플로우 퍼블리싱" tag="진행중" />
                <KanbanCard title="화자 매칭 화면 구현" tag="진행중" />
              </div>
            </div>

            {/* Column 3 */}
            <div className="border border-[#C9DEFA] bg-white min-h-[245px]">
              <div className="h-[34px] border-b border-[#C9DEFA] bg-[#ADDCFF] flex items-center px-[12px] text-[13px] font-semibold text-black">
                REVIEW
              </div>

              <div className="p-[10px] space-y-[10px]">
                <KanbanCard title="회의 분석 페이지 디자인 확인" tag="검토" />
                <KanbanCard title="피드백 페이지 문구 검토" tag="검토" />
              </div>
            </div>

            {/* Column 4 */}
            <div className="border border-[#C9DEFA] bg-white min-h-[245px]">
              <div className="h-[34px] border-b border-[#C9DEFA] bg-[#ADDCFF] flex items-center px-[12px] text-[13px] font-semibold text-black">
                DONE
              </div>

              <div className="p-[10px] space-y-[10px]">
                <KanbanCard title="피그마 화면 구성 완료" tag="완료" />
                <KanbanCard title="중간발표 핵심 기능 범위 확정" tag="완료" />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom AI D-day proposal */}
        <div className="grid grid-cols-[1fr_300px] gap-[24px]">
          {/* D-day table */}
          <div className="border border-[#C9DEFA] bg-white shadow-sm">
            <div className="h-[38px] border-b border-[#C9DEFA] bg-[#EAF1FC] flex items-center justify-between px-[16px] text-[14px] font-semibold text-black">
              <span>AI TODO D-day 제안</span>
            </div>

            <div className="grid grid-cols-[1fr_80px_78px_78px_70px] h-[34px] border-b border-[#C9DEFA] bg-[#ADDCFF] text-[13px] text-black font-semibold">
              <div className="flex items-center px-[12px]">TODO</div>
              <div className="border-l border-[#C9DEFA] flex items-center justify-center">
                담당자
              </div>
              <div className="border-l border-[#C9DEFA] flex items-center justify-center">
                중요도
              </div>
              <div className="border-l border-[#C9DEFA] flex items-center justify-center">
                우선순위
              </div>
              <div className="border-l border-[#C9DEFA] flex items-center justify-center">
                제안
              </div>
            </div>

            <DdayRow
              todo="회의 분석 결과 페이지 스크린샷 정리"
              assignee="김이화"
              importance="높음"
              priority="높음"
              dday={1}
              active
              reason="보고서 캡처에 바로 사용되므로 기본 3일보다 짧게 제안"
            />

            <DdayRow
              todo="백엔드 API 응답 형식 확인"
              assignee="박백엔"
              importance="높음"
              priority="중간"
              dday={2}
              reason="프론트 연동 전에 확인되어야 하므로 빠른 마감 제안"
            />

            <DdayRow
              todo="보고서 기능 흐름 설명 작성"
              assignee="최기획"
              importance="중간"
              priority="중간"
              dday={3}
              reason="기본 D-day를 유지하여 안정적으로 작성 가능"
            />

            <DdayRow
              todo="피드백 페이지 문구 검토"
              assignee="이디자인"
              importance="낮음"
              priority="낮음"
              dday={5}
              reason="핵심 기능 연동 이후 진행해도 되는 작업으로 여유 있게 제안"
            />
          </div>

          {/* Rule card */}
          <div className="border border-[#C9DEFA] bg-white shadow-sm">
            <div className="h-[38px] border-b border-[#C9DEFA] bg-[#EAF1FC] flex items-center px-[16px] text-[14px] font-semibold text-black">
              D-day 산정 기준
            </div>

            <div className="px-[14px] py-[14px] space-y-[12px]">
              <DdayRuleCard
                title="기본값"
                value="D-3"
                description="모든 TODO는 기본적으로 3일의 수행 기간을 기준으로 시작합니다."
              />

              <DdayRuleCard
                title="우선순위 높음"
                value="-1일"
                description="다음 작업의 선행 조건이 되는 TODO는 더 짧은 D-day를 제안합니다."
              />

              <DdayRuleCard
                title="중요도 낮음"
                value="+1~2일"
                description="핵심 플로우와 직접 연결되지 않은 작업은 더 여유 있는 D-day를 제안합니다."
              />

            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default TodoSprint;