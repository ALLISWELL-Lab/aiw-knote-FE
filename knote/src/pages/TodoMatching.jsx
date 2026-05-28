import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import Breadcrumb from "../components/Breadcrumb";

function AssignedTodoRow({ task, member, checked = false }) {
  return (
    <div className="grid grid-cols-[28px_1fr_90px] items-start min-h-[34px] text-[13px] text-black">
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

function CompleteModal({ onClose }) {
  return (
    <div className="fixed inset-0 z-50 bg-black/20 flex items-center justify-center">
      <div className="w-[390px] bg-white border border-[#C9DEFA] shadow-[0_8px_28px_rgba(0,0,0,0.18)] translate-x-[145px]">
        <div className="h-[46px] border-b border-[#C9DEFA] bg-[#EAF1FC] flex items-center px-[18px] text-[15px] font-semibold text-black">
          매칭 완료
        </div>

        <div className="px-[26px] py-[28px] flex items-center gap-[14px] text-[15px] text-black">
          <span className="w-[24px] h-[24px] rounded-full bg-[#4A8DFF] text-white flex items-center justify-center text-[13px] shrink-0">
            ✓
          </span>
          <span>TODO-담당자 매칭이 완료되었습니다.</span>
        </div>

        <div className="h-[56px] border-t border-[#C9DEFA] bg-[#EAF1FC] flex items-center justify-end px-[18px]">
          <button
            type="button"
            onClick={onClose}
            className="w-[56px] h-[28px] bg-[#4A8DFF] text-white text-[13px]"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
}

function TodoMatching() {
  const navigate = useNavigate();
  const [showCompleteModal, setShowCompleteModal] = useState(false);

  return (
    <Layout>
      <Breadcrumb items={["home", "todo", "todoMatching"]} />

      <div className="w-[850px] h-[330px] border border-[#C9DEFA] bg-white mx-auto shadow-sm">
        <div className="grid grid-cols-2 gap-[52px] px-[10px] pt-[10px]">
          <div className="h-[26px] border border-[#C9DEFA] bg-[#EAF1FC] flex items-center px-[12px] text-[13px] font-semibold text-black">
            회의 분석 기반 AI TODO 배정
          </div>

          <div className="h-[26px] border border-[#C9DEFA] bg-[#EAF1FC] flex items-center px-[12px] text-[13px] font-semibold text-black">
            매칭되지 않은 TODO
          </div>
        </div>

        <div className="grid grid-cols-2 gap-[52px] px-[10px] pt-[22px]">
          <div className="h-[210px] border border-[#C9DEFA] bg-white px-[14px] py-[14px]">
            <div className="space-y-[8px]">
              <AssignedTodoRow
                checked
                task="회의 분석 결과 페이지 스크린샷 정리"
                member="임이랑"
              />

              <AssignedTodoRow
                checked
                task="프로젝트 스프린트 화면 캡처 정리"
                member="임이랑"
              />

              <AssignedTodoRow
                checked
                task="백엔드 API 응답 형식 확인"
                member="정서윤"
              />

              <AssignedTodoRow
                task="회의 업로드 API 연동 점검"
                member="강민지"
              />

              <AssignedTodoRow
                task="STT 상태 조회 응답 확인"
                member="정서윤"
              />
            </div>
          </div>

          <div className="h-[210px] border border-[#C9DEFA] bg-white px-[18px] py-[14px]">
            <div className="space-y-[14px]">
              <UnassignedTodoRow task="회의 피드백 문구 최종 점검" />
              <UnassignedTodoRow task="발표용 시연 흐름 정리" />
              <UnassignedTodoRow task="보고서 화면 흐름 설명 보완" />
            </div>
          </div>
        </div>

        <div className="h-[56px] border-t border-[#C9DEFA] bg-[#EAF1FC] mt-[18px] flex items-center justify-end gap-[10px] px-[14px]">
          <button
            type="button"
            onClick={() => navigate("/todo")}
            className="w-[48px] h-[28px] bg-white border border-[#C9DEFA] text-[13px] text-black hover:bg-[#EAF1FC]"
          >
            취소
          </button>

          <button
            type="button"
            className="w-[58px] h-[28px] bg-white border border-[#C9DEFA] text-[13px] text-black hover:bg-[#EAF1FC]"
          >
            초기화
          </button>

          <button
            type="button"
            onClick={() => setShowCompleteModal(true)}
            className="w-[48px] h-[28px] bg-[#4A8DFF] text-white text-[13px]"
          >
            확정
          </button>
        </div>
      </div>

      <div className="text-center text-[13px] leading-[20px] text-black mt-[34px]">
        회의 분석 페이지에서 제시된 TODO와 팀원 정보를 기반으로 매칭된
        리스트입니다.
        <br />
        팀원과 TODO 내용의 일치 여부를 확인한 뒤 확정하세요.
      </div>

      {showCompleteModal && (
        <CompleteModal onClose={() => setShowCompleteModal(false)} />
      )}
    </Layout>
  );
}

export default TodoMatching;