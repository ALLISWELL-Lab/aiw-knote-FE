import { useState } from "react";
import { useNavigate } from "react-router-dom";

function GoogleStyleIcon({ type }) {
  if (type === "create") {
    return (
      <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
        <path
          d="M12 5V19"
          stroke="#4A8DFF"
          strokeWidth="2.4"
          strokeLinecap="round"
        />
        <path
          d="M5 12H19"
          stroke="#4A8DFF"
          strokeWidth="2.4"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  return (
    <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
      <rect
        x="4"
        y="5"
        width="16"
        height="14"
        rx="2"
        stroke="#4A8DFF"
        strokeWidth="2"
      />
      <path
        d="M8 10H16"
        stroke="#4A8DFF"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M8 14H13"
        stroke="#4A8DFF"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ModalShell({ children, width = "w-[420px]", onClose }) {
  return (
    <div className="fixed inset-0 z-50 bg-black/20 flex items-center justify-center">
      <div
        className={`${width} bg-white border border-[#C9DEFA] shadow-[0_12px_36px_rgba(0,0,0,0.18)] rounded-[6px] overflow-hidden`}
      >
        <div className="h-[46px] bg-[#EAF1FC] border-b border-[#C9DEFA] flex items-center justify-end px-[16px]">
          <button
            type="button"
            onClick={onClose}
            className="text-[20px] leading-none text-black hover:text-[#4A8DFF]"
          >
            ×
          </button>
        </div>

        {children}
      </div>
    </div>
  );
}

function TeamCreateModal({ onClose, onComplete }) {
  return (
    <ModalShell width="w-[520px]" onClose={onClose}>
      <div className="px-[34px] pt-[26px] pb-[30px]">
        <h2 className="text-[20px] font-semibold text-black mb-[8px]">
          새로운 팀 생성
        </h2>

        <p className="text-[13px] text-gray-500 mb-[28px]">
          팀 정보와 첫 프로젝트 정보를 입력해 주세요.
        </p>

        <div className="grid grid-cols-2 gap-x-[18px] gap-y-[18px]">
          <div>
            <label className="block text-[13px] font-semibold text-black mb-[8px]">
              본인 이름 설정
            </label>
            <input
              defaultValue="정서윤"
              className="w-full h-[38px] border border-[#C9DEFA] bg-white px-[11px] text-[13px] text-black outline-none focus:border-[#4A8DFF]"
            />
          </div>

          <div>
            <label className="block text-[13px] font-semibold text-black mb-[8px]">
              팀 이름 입력
            </label>
            <input
              defaultValue="세얼간이"
              className="w-full h-[38px] border border-[#C9DEFA] bg-white px-[11px] text-[13px] text-black outline-none focus:border-[#4A8DFF]"
            />
          </div>

          <div className="col-span-2">
            <label className="block text-[13px] font-semibold text-black mb-[8px]">
              프로젝트 이름 입력
            </label>
            <input
              defaultValue="그로쓰 03"
              className="w-full h-[38px] border border-[#C9DEFA] bg-white px-[11px] text-[13px] text-black outline-none focus:border-[#4A8DFF]"
            />
          </div>

          <div className="col-span-2 bg-[#F8FBFF] border border-[#C9DEFA] px-[13px] py-[12px]">
            <label className="block text-[13px] font-semibold text-black mb-[8px]">
              프로젝트 기간 설정
            </label>
            <input
              defaultValue="2026/02/16 ~ 2026/02/19"
              className="w-full h-[34px] bg-white border border-[#C9DEFA] px-[10px] text-[13px] text-black outline-none focus:border-[#4A8DFF]"
            />
          </div>

          <div className="col-span-2">
            <label className="block text-[13px] font-semibold text-black mb-[8px]">
              기한 설정
            </label>
            <input
              type="date"
              defaultValue="2026-02-19"
              className="w-full h-[38px] border border-[#C9DEFA] bg-white px-[11px] text-[13px] text-black outline-none focus:border-[#4A8DFF]"
            />
          </div>
        </div>
      </div>

      <div className="h-[62px] border-t border-[#C9DEFA] bg-[#EAF1FC] flex items-center justify-end gap-[10px] px-[24px]">
        <button
          type="button"
          onClick={onClose}
          className="w-[66px] h-[30px] bg-white border border-[#C9DEFA] text-[13px] text-black hover:bg-[#F8FBFF]"
        >
          Cancel
        </button>

        <button
          type="button"
          onClick={onComplete}
          className="w-[66px] h-[30px] bg-[#4A8DFF] text-white text-[13px] hover:opacity-90"
        >
          Save
        </button>
      </div>
    </ModalShell>
  );
}

function InviteCodeModal({ onClose, onAccept }) {
  const [inviteCode, setInviteCode] = useState("LDI983CVD2");

  return (
    <ModalShell width="w-[420px]" onClose={onClose}>
      <div className="px-[34px] pt-[26px] pb-[32px]">
        <h2 className="text-[20px] font-semibold text-black mb-[8px]">
          초대코드 입력하기
        </h2>

        <p className="text-[13px] text-gray-500 mb-[26px]">
          전달받은 팀 초대코드를 입력해 주세요.
        </p>

        <label className="block text-[13px] font-semibold text-black mb-[8px]">
          초대코드
        </label>

        <input
          value={inviteCode}
          onChange={(event) => setInviteCode(event.target.value)}
          placeholder="초대코드를 입력하세요"
          className="w-full h-[48px] border border-[#C9DEFA] bg-white px-[13px] text-[15px] tracking-[1px] text-black outline-none focus:border-[#4A8DFF] mb-[24px]"
        />

        <button
          type="button"
          onClick={onAccept}
          className="w-full h-[38px] bg-[#4A8DFF] text-white text-[14px] font-semibold hover:opacity-90"
        >
          초대코드 입력하기
        </button>
      </div>
    </ModalShell>
  );
}

function CompleteModal({ message, onClose }) {
  return (
    <div className="fixed inset-0 z-50 bg-black/20 flex items-center justify-center">
      <div className="w-[380px] bg-white border border-[#C9DEFA] shadow-[0_12px_36px_rgba(0,0,0,0.18)] rounded-[6px] overflow-hidden">
        <div className="h-[48px] border-b border-[#C9DEFA] bg-[#EAF1FC] flex items-center px-[20px] text-[15px] font-semibold text-black">
          안내
        </div>

        <div className="px-[28px] py-[30px] flex items-center gap-[14px] text-[15px] text-black">
          <span className="w-[26px] h-[26px] rounded-full bg-[#4A8DFF] text-white flex items-center justify-center text-[14px] shrink-0">
            ✓
          </span>
          <span>{message}</span>
        </div>

        <div className="h-[58px] border-t border-[#C9DEFA] bg-[#EAF1FC] flex items-center justify-end px-[20px]">
          <button
            type="button"
            onClick={onClose}
            className="w-[58px] h-[30px] bg-[#4A8DFF] text-white text-[13px]"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
}

function ChoiceCard({ type, title, description, buttonText, onClick }) {
  return (
    <div className="w-[290px] h-[210px] bg-white/70 border border-white/80 shadow-[0_10px_28px_rgba(74,141,255,0.18)] rounded-[18px] px-[26px] py-[26px] flex flex-col">
      <div className="w-[54px] h-[54px] rounded-full bg-[#F8FBFF] border border-[#C9DEFA] flex items-center justify-center mb-[22px]">
        <GoogleStyleIcon type={type} />
      </div>

      <h3 className="text-[19px] font-semibold text-black mb-[10px]">
        {title}
      </h3>

      <p className="text-[13px] leading-[21px] text-black/70 mb-auto">
        {description}
      </p>

      <button
        type="button"
        onClick={onClick}
        className="w-full h-[36px] bg-white border border-[#4A8DFF] rounded-full text-[13px] font-semibold text-[#1B2B6F] hover:bg-[#EAF1FC] hover:shadow-sm transition"
      >
        {buttonText}
      </button>
    </div>
  );
}

function TeamOnboarding() {
  const navigate = useNavigate();

  const [activeModal, setActiveModal] = useState(null);
  const [completeMessage, setCompleteMessage] = useState("");

  const handleCreateComplete = () => {
    setActiveModal(null);
    setCompleteMessage("팀이 생성되었습니다.");
  };

  const handleInviteAccept = () => {
    setActiveModal(null);
    setCompleteMessage("수락되었습니다.");
  };

  const handleCompleteClose = () => {
    setCompleteMessage("");
    navigate("/team");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#ADDCFF] via-[#C9DAFF] to-[#CFC3FF] flex items-center justify-center overflow-hidden">
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@500;600;700;800;900&display=swap');
        `}
      </style>

      <div className="w-[1040px] flex flex-col items-center translate-y-[-8px]">
        <img
          src="/images/knote-logo.png"
          alt="KNOTE"
          className="w-[560px] h-auto object-contain mb-[58px] select-none translate-x-[66px]"
          draggable="false"
        />

        <div className="text-center mb-[54px]">
          <h1 className="text-[30px] font-semibold text-black mb-[18px] tracking-[-0.5px]">
            프로젝트를 시작하는 가장 빠른 방법, KNOTE
          </h1>

          <p className="text-[16px] text-black/75">
            대학생 개발팀을 위한 회의 → 요약 → 실행의 시작점
          </p>
        </div>

        <div className="flex items-center justify-center gap-[34px]">
          <ChoiceCard
            type="create"
            title="새 팀 생성하기"
            description={
              <>
                새로운 팀과 첫 프로젝트를 만들고
                <br />
                팀원들과 업무를 시작합니다.
              </>
            }
            buttonText="새 팀 생성하기"
            onClick={() => setActiveModal("createTeam")}
          />

          <ChoiceCard
            type="invite"
            title="초대코드 입력하기"
            description={
              <>
                전달받은 초대코드를 입력해
                <br />
                기존 팀에 참여합니다.
              </>
            }
            buttonText="초대코드 입력하기"
            onClick={() => setActiveModal("inviteCode")}
          />
        </div>
      </div>

      {activeModal === "createTeam" && (
        <TeamCreateModal
          onClose={() => setActiveModal(null)}
          onComplete={handleCreateComplete}
        />
      )}

      {activeModal === "inviteCode" && (
        <InviteCodeModal
          onClose={() => setActiveModal(null)}
          onAccept={handleInviteAccept}
        />
      )}

      {completeMessage && (
        <CompleteModal message={completeMessage} onClose={handleCompleteClose} />
      )}
    </div>
  );
}

export default TeamOnboarding;