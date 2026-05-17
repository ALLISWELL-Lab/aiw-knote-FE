import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";

function AssignedTodoRow({ task, member, checked = false }) {
  return (
    <div className="grid grid-cols-[28px_1fr_90px] items-start min-h-[32px] text-[13px] text-black">
      <div className="pt-[3px]">
        <input
          type="checkbox"
          defaultChecked={checked}
          className="w-[13px] h-[13px] accent-[#4A8DFF]"
        />
      </div>

      <div className="leading-[18px] pr-[10px]">{task}</div>

      <div className="flex items-center gap-[8px] text-black">
        <span className="text-[#4A8DFF] text-[14px]">✓</span>
        <span>{member}</span>
      </div>
    </div>
  );
}

function UnassignedTodoRow({ task }) {
  return (
    <label className="flex items-center gap-[12px] min-h-[32px] text-[13px] text-black">
      <input type="checkbox" className="w-[13px] h-[13px] accent-[#4A8DFF]" />
      <span>{task}</span>
    </label>
  );
}

function TodoMatching() {
  const navigate = useNavigate();

  return (
    <Layout>
      {/* Breadcrumb */}
      <div className="flex items-center gap-[10px] text-[14px] text-black mb-[18px]">
        <span className="font-semibold">⌂ Home</span>
        <span className="text-gray-400">/</span>
        <span>투두</span>
        <span className="text-gray-400">/</span>
        <span className="font-semibold">TODO-담당자 매칭</span>
      </div>

      <div className="h-px bg-[#C9DEFA] mb-[86px]" />

      {/* Main matching box */}
      <div className="w-[850px] h-[330px] border border-[#C9DEFA] bg-white mx-auto shadow-sm">
        {/* Header row */}
        <div className="grid grid-cols-2 gap-[52px] px-[10px] pt-[10px]">
          <div className="h-[26px] border border-[#C9DEFA] bg-[#EAF1FC] flex items-center px-[12px] text-[13px] font-semibold text-black">
            회의 기반 AI TODO 배정
          </div>

          <div className="h-[26px] border border-[#C9DEFA] bg-[#EAF1FC] flex items-center px-[12px] text-[13px] font-semibold text-black">
            매칭되지 않은 TODO
          </div>
        </div>

        {/* Content row */}
        <div className="grid grid-cols-2 gap-[52px] px-[10px] pt-[22px]">
          {/* Left assigned */}
          <div className="h-[210px] border border-[#C9DEFA] bg-white px-[14px] py-[14px]">
            <div className="space-y-[8px]">
              <AssignedTodoRow
                checked
                task="피그마 프로토타입에서 발전시키기"
                member="김이화"
              />

              <AssignedTodoRow
                checked
                task="피그마 디자인 시작하기"
                member="이화연"
              />

              <AssignedTodoRow
                checked
                task="MOCK 서버 완성하기"
                member="하주림"
              />

              <AssignedTodoRow
                task="데이터베이스 설계 완성하기"
                member="전우치"
              />

              <AssignedTodoRow
                task="API 명세서 수정 완료하기"
                member="홍길동"
              />
            </div>
          </div>

          {/* Right unassigned */}
          <div className="h-[210px] border border-[#C9DEFA] bg-white px-[18px] py-[14px]">
            <div className="space-y-[14px]">
              <UnassignedTodoRow task="그림그리기" />
              <UnassignedTodoRow task="노래부르기" />
              <UnassignedTodoRow task="누워있기" />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="h-[56px] border-t border-[#C9DEFA] bg-[#EAF1FC] mt-[18px] flex items-center justify-end gap-[10px] px-[14px]">
          <button
            type="button"
            onClick={() => navigate("/todo")}
            className="w-[48px] h-[28px] bg-white border border-[#C9DEFA] text-[13px] text-black"
          >
            취소
          </button>

          <button className="w-[58px] h-[28px] bg-white border border-[#C9DEFA] text-[13px] text-black">
            초기화
          </button>

          <button className="w-[48px] h-[28px] bg-[#4A8DFF] text-white text-[13px]">
            확정
          </button>
        </div>
      </div>

      {/* Description */}
      <div className="text-center text-[13px] leading-[20px] text-black mt-[34px]">
        회의 내용을 기반으로 매칭된 투두 리스트입니다.
        <br />
        팀원과 투두 내용의 일치 여부를 확인하세요.
        <br />
        일치 시 체크박스를 눌러 확정하세요.
      </div>
    </Layout>
  );
}

export default TodoMatching;