import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

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

// 1. 새로운 팀 생성 모달 수정: 상태 관리 및 비동기 API 통신 연동
function TeamCreateModal({ currentUserId, onClose, onComplete }) {
  const [formData, setFormData] = useState({
    name: "", // 팀 이름
    description: "", // 팀 설명 (엔티티에 text 타입으로 존재하는 필드 대응)
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    if (!formData.name.trim()) {
      alert("팀 이름을 입력해 주세요!");
      return;
    }

    // 보안 방어용 예외 처리
    if (!currentUserId) {
      alert("로그인 정보가 로드되지 않았습니다. 잠시 후 다시 시도해 주세요.");
      return;
    }

    try {
      // 백엔드의 팀 생성 API 호출 (엔티티 DTO 구조에 맞춰 전송)
      // /api/v1/teams 주소로 가며, withCredentials 덕분에 쿠키(JWT)가 함께 실려갑니다.
      await api.post("/teams", {
        name: formData.name,
        description: formData.description || "KNOTE와 함께하는 프로젝트 팀",
        leaderId: currentUserId
      });

      onComplete(); // 성공 시 "팀이 생성되었습니다." 완료 모달 띄우기
    } catch (error) {
      console.error("팀 생성 실패:", error);
      alert(error.response?.data?.message || "팀 생성 중 오류가 발생했습니다.");
    }
  };

  return (
    <ModalShell width="w-[520px]" onClose={onClose}>
      <div className="px-[34px] pt-[26px] pb-[30px]">
        <h2 className="text-[20px] font-semibold text-black mb-[8px]">새로운 팀 생성</h2>
        <p className="text-[13px] text-gray-500 mb-[28px]">팀 정보와 첫 프로젝트 정보를 입력해 주세요.</p>

        <div className="grid grid-cols-2 gap-x-[18px] gap-y-[18px]">
          {/* 유저 이름은 이미 구글 로그인 정보에 있으므로 보통 팀 이름이 최우선 필수값입니다 */}
          <div className="col-span-2">
            <label className="block text-[13px] font-semibold text-black mb-[8px]">팀 이름 입력 (필수)</label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="예: ALLISWELL"
              className="w-full h-[38px] border border-[#C9DEFA] bg-white px-[11px] text-[13px] text-black outline-none focus:border-[#4A8DFF]"
            />
          </div>

          <div className="col-span-2">
            <label className="block text-[13px] font-semibold text-black mb-[8px]">팀 설명 입력</label>
            <input
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="프로젝트 한 줄 설명이나 팀의 목적을 적어주세요."
              className="w-full h-[38px] border border-[#C9DEFA] bg-white px-[11px] text-[13px] text-black outline-none focus:border-[#4A8DFF]"
            />
          </div>

          {/* 기존 퍼블리싱용으로 남겨둔 더미 프로젝트 기한 입력 칸 (추후 기획 확정 시 백엔드 연동) */}
          <div className="col-span-2 bg-[#F8FBFF] border border-[#C9DEFA] px-[13px] py-[12px]">
            <label className="block text-[13px] font-semibold text-black mb-[8px]">프로젝트 기간 설정 (임시)</label>
            <input
              defaultValue="2026/02/16 ~ 2026/02/19"
              className="w-full h-[34px] bg-white border border-[#C9DEFA] px-[10px] text-[13px] text-black outline-none focus:border-[#4A8DFF]"
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
          onClick={handleSubmit}
          className="w-[66px] h-[30px] bg-[#4A8DFF] text-white text-[13px] hover:opacity-90"
        >
          Save
        </button>
      </div>
    </ModalShell>
  );
}

// 팀 초대코드 입력 모달
function InviteCodeModal({ onClose, onAccept }) {
  // 플레이스홀더
  const [inviteCode, setInviteCode] = useState("");

  const handleSubmit = async () => {
    if (!inviteCode.trim()) {
      alert("초대코드를 입력해 주세요!");
      return;
    }

    if (inviteCode.length !== 8) {
      alert("초대코드는 정확히 8자리여야 합니다.");
      return;
    }

    try {
      // InviteController의 @PostMapping("/join") 주소 호출
      // 백엔드 DTO 바인딩 명세인 'inviteToken' 키값과 정확히 일치시킵니다.
      await api.post("/invites/join", {
        inviteToken: inviteCode.trim(),
      });

      onAccept(); // 성공 시 "수락되었습니다." 가이드 모달 구동
    } catch (error) {
      console.error("팀 참여 실패:", error);
      alert(error.response?.data?.message || "올바르지 않거나 만료된 초대코드입니다.");
    }
  };

  return (
    <ModalShell width="w-[420px]" onClose={onClose}>
      <div className="px-[34px] pt-[26px] pb-[32px]">
        <h2 className="text-[20px] font-semibold text-black mb-[8px]">초대코드 입력하기</h2>
        <p className="text-[13px] text-gray-500 mb-[26px]">전달받은 팀 초대코드를 입력해 주세요.</p>

        <label className="block text-[13px] font-semibold text-black mb-[8px]">초대코드 (8자리)</label>
        <input
          value={inviteCode}
          onChange={(event) => setInviteCode(event.target.value)}
          placeholder="8자리 초대코드를 입력하세요"
          maxLength={8}
          className="w-full h-[48px] border border-[#C9DEFA] bg-white px-[13px] text-[15px] tracking-[1px] text-black outline-none focus:border-[#4A8DFF] mb-[24px]"
        />

        <button
          type="button"
          onClick={handleSubmit}
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

  // 현재 구글 로그인한 유저의 ID 담을 상태 추가
  const [currentUserId, setCurrentUserId] = useState(null);

  useEffect(() => {
    const fetchMyInfo = async () => {
      try {
        // 백엔드에 맞춰 회원 정보 조회 엔드포인트를 호출합니다.
        const response = await api.get("/members/me"); 
        // 백엔드가 주는 응답 객체의 ID 필드명을 확인하세요 (보통 response.data.id 혹은 response.data.memberId)
        if (response.data && response.data.id) {
          setCurrentUserId(response.data.id); 
          console.log("로그인 유저 ID 확보 성공:", response.data.id);
        }
      } catch (error) {
        console.error("사용자 정보(ID)를 불러오지 못했습니다:", error);
      }
    };
    fetchMyInfo();
  }, []);

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
    navigate("/dashboard");
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
          currentUserId={currentUserId}
          onClose={() => setActiveModal(null)}
          onComplete={handleCreateComplete}
        />
      )}

      {activeModal === "inviteCode" && (
        <InviteCodeModal
          currentUserId={currentUserId} 
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