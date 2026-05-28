import { useState } from "react";
import Layout from "../components/Layout";
import Breadcrumb from "../components/Breadcrumb";

function ModalShell({ title, children, width = "w-[390px]", onClose }) {
  return (
    <div className="fixed inset-0 z-50 bg-black/20 flex items-center justify-center">
      <div
        className={`${width} bg-white border border-[#C9DEFA] shadow-[0_8px_28px_rgba(0,0,0,0.18)] translate-x-[145px]`}
      >
        <div className="h-[46px] border-b border-[#C9DEFA] bg-[#EAF1FC] flex items-center justify-between px-[18px]">
          <span className="text-[15px] font-semibold text-black">{title}</span>
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="text-[18px] text-black leading-none"
            >
              ×
            </button>
          )}
        </div>

        {children}
      </div>
    </div>
  );
}

function AlertModal({ title, message, onClose }) {
  return (
    <ModalShell title={title} onClose={onClose}>
      <div className="px-[26px] py-[28px] text-[14px] leading-[23px] text-black text-center">
        {message}
      </div>

      <div className="h-[56px] border-t border-[#C9DEFA] bg-[#EAF1FC] flex items-center justify-center">
        <button
          type="button"
          onClick={onClose}
          className="w-[64px] h-[28px] bg-[#4A8DFF] text-white text-[13px]"
        >
          확인
        </button>
      </div>
    </ModalShell>
  );
}

function ConfirmModal({
  title,
  message,
  confirmText = "확인",
  cancelText = "취소",
  onCancel,
  onConfirm,
  danger = false,
}) {
  return (
    <ModalShell title={title} onClose={onCancel}>
      <div className="px-[26px] py-[28px] text-[14px] leading-[23px] text-black text-center">
        {message}
      </div>

      <div className="h-[56px] border-t border-[#C9DEFA] bg-[#EAF1FC] flex items-center justify-end gap-[10px] px-[18px]">
        <button
          type="button"
          onClick={onCancel}
          className="w-[56px] h-[28px] bg-white border border-[#C9DEFA] text-[13px] text-black"
        >
          {cancelText}
        </button>

        <button
          type="button"
          onClick={onConfirm}
          className={`w-[56px] h-[28px] text-white text-[13px] ${
            danger ? "bg-[#E43D3D]" : "bg-[#4A8DFF]"
          }`}
        >
          {confirmText}
        </button>
      </div>
    </ModalShell>
  );
}

function ProjectCreateModal({ onClose }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [teamName, setTeamName] = useState("팀 선택");

  return (
    <ModalShell title="프로젝트 생성" width="w-[520px]" onClose={onClose}>
      <div className="grid grid-cols-2 gap-[14px] px-[22px] py-[20px]">
        <div>
          <label className="block text-[13px] font-semibold text-black mb-[8px]">
            프로젝트명
          </label>
          <input
            defaultValue="데이터베이스 01분반 팀프로젝트"
            className="w-full h-[36px] border border-[#C9DEFA] px-[10px] text-[13px] text-black outline-none"
          />
        </div>

        <div>
          <label className="block text-[13px] font-semibold text-black mb-[8px]">
            세부사항
          </label>
          <input
            defaultValue="회의에서 이어진 팀프로젝트"
            className="w-full h-[36px] border border-[#C9DEFA] px-[10px] text-[13px] text-black outline-none"
          />
        </div>

        <div>
          <label className="block text-[13px] font-semibold text-black mb-[8px]">
            본인 담당 역할 설정
          </label>
          <input
            defaultValue="공동 개발"
            className="w-full h-[36px] border border-[#C9DEFA] px-[10px] text-[13px] text-black outline-none"
          />
        </div>

        <div>
          <label className="block text-[13px] font-semibold text-black mb-[8px]">
            프로젝트 마감 기한
          </label>
          <input
            defaultValue="2026. 06. 05"
            className="w-full h-[36px] border border-[#C9DEFA] px-[10px] text-[13px] text-black outline-none"
          />
        </div>

        <div>
          <label className="block text-[13px] font-semibold text-black mb-[8px]">
            개별 프로젝트 이름 설정
          </label>
          <input
            defaultValue="자바 싫어!"
            className="w-full h-[36px] border border-[#C9DEFA] px-[10px] text-[13px] text-black outline-none"
          />
        </div>

        <div className="relative">
          <label className="block text-[13px] font-semibold text-black mb-[8px]">
            팀 선택
          </label>
          <button
            type="button"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="w-full h-[36px] border border-[#C9DEFA] bg-white px-[10px] text-[13px] text-black flex items-center justify-between"
          >
            {teamName}
            <span className="text-[10px]">▼</span>
          </button>

          {isDropdownOpen && (
            <div className="absolute left-0 right-0 top-[68px] z-20 border border-[#C9DEFA] bg-white text-[13px] text-black shadow-sm">
              {["졸프 03 세얼간이", "데이터베이스 2팀", "캡스톤 03팀"].map(
                (team) => (
                  <button
                    key={team}
                    type="button"
                    onClick={() => {
                      setTeamName(team);
                      setIsDropdownOpen(false);
                    }}
                    className="w-full h-[34px] text-left px-[10px] hover:bg-[#EAF1FC]"
                  >
                    {team}
                  </button>
                )
              )}
            </div>
          )}
        </div>
      </div>

      <div className="h-[56px] border-t border-[#C9DEFA] bg-[#EAF1FC] flex items-center justify-end gap-[10px] px-[18px]">
        <button
          type="button"
          onClick={onClose}
          className="w-[56px] h-[28px] bg-white border border-[#C9DEFA] text-[13px] text-black"
        >
          취소
        </button>
        <button
          type="button"
          onClick={onClose}
          className="w-[56px] h-[28px] bg-[#4A8DFF] text-white text-[13px]"
        >
          생성
        </button>
      </div>
    </ModalShell>
  );
}

function TeamCard({ team, active, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full text-left border border-[#C9DEFA] px-[14px] py-[12px] mb-[10px] ${
        active ? "bg-[#EAF1FC]" : "bg-white hover:bg-[#F8FBFF]"
      }`}
    >
      <div className="flex items-center justify-between mb-[6px]">
        <span className="text-[14px] font-semibold text-black">
          {team.name}
        </span>
        <span className="text-[12px] text-[#4A8DFF] font-semibold">
          {team.role}
        </span>
      </div>

      <p className="text-[12px] leading-[18px] text-black">{team.desc}</p>
    </button>
  );
}

function ProjectRow({ name, dueDate, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full h-[38px] border-b border-[#C9DEFA] flex items-center justify-between px-[12px] text-[13px] text-black hover:bg-[#EAF1FC]"
    >
      <span>{name}</span>
      <span className="text-[12px] text-gray-500">{dueDate} 종료 ›</span>
    </button>
  );
}

function MemberAvatar({ name, color = "#4A8DFF" }) {
  return (
    <div
      className="w-[58px] h-[58px] rounded-[4px] flex items-center justify-center text-white text-[18px] font-semibold shrink-0"
      style={{ backgroundColor: color }}
    >
      {name}
    </div>
  );
}

function Tag({ children }) {
  return (
    <span className="h-[22px] px-[7px] border border-[#C9DEFA] bg-[#EAF1FC] text-black text-[12px] flex items-center rounded-[3px] whitespace-nowrap">
      {children}
    </span>
  );
}

function MemberPanel({ member, isLeader, onDelegate }) {
  return (
    <div className="border border-[#C9DEFA] bg-white shadow-sm">
      <div className="h-[42px] border-b border-[#C9DEFA] bg-[#EAF1FC] flex items-center justify-between px-[16px]">
        <span className="text-[14px] font-semibold text-black">
          {member.name}
        </span>

        {isLeader ? (
          <span className="h-[24px] px-[8px] bg-[#4A8DFF] text-white text-[12px] flex items-center">
            팀장
          </span>
        ) : (
          <button
            type="button"
            onClick={onDelegate}
            className="w-[74px] h-[28px] bg-white border border-[#C9DEFA] text-[13px] text-black hover:bg-[#EAF1FC]"
          >
            팀장 위임
          </button>
        )}
      </div>

      <div className="px-[18px] py-[18px] flex gap-[18px]">
        <MemberAvatar name={member.initial} color={member.color} />

        <div className="flex-1">
          <div className="flex gap-[6px] mb-[14px]">
            {member.tags.map((tag) => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </div>

          <div className="h-px bg-black/30 mb-[12px]" />

          <p className="text-[13px] leading-[23px] text-black">
            ㆍ프로젝트 역할: {isLeader ? "팀장" : "팀원"}
            <br />
            ㆍ프로젝트 담당: {member.role}
          </p>
        </div>
      </div>
    </div>
  );
}

function Team() {
  const [view, setView] = useState("list");
  const [selectedTeamId, setSelectedTeamId] = useState(2);
  const [activeModal, setActiveModal] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [delegateTarget, setDelegateTarget] = useState(null);

  const teams = [
    {
      id: 1,
      name: "졸프 03 세얼간이",
      desc: "캡스톤디자인과창업프로젝트A 03팀 세얼간이",
      role: "팀장 담당",
      memberCount: 3,
    },
    {
      id: 2,
      name: "데이터베이스 2팀",
      desc: "데이터베이스 수업 팀프로젝트",
      role: "팀원 담당",
      memberCount: 3,
    },
    {
      id: 3,
      name: "캡스톤 03팀",
      desc: "AI 회의록 관리 서비스 프로젝트",
      role: "팀원 담당",
      memberCount: 3,
    },
  ];

  const projects = [
    { id: 1, name: "데베 플젝 1", dueDate: "2026. 06. 22" },
    { id: 2, name: "데베 과제 1", dueDate: "2026. 06. 22" },
    { id: 3, name: "데베 과제 2", dueDate: "2026. 06. 22" },
  ];

  const members = [
    {
      id: 1,
      initial: "정",
      name: "정서윤",
      role: "백엔드, DB",
      tags: ["백엔드", "Spring"],
      color: "#4A8DFF",
      leader: true,
    },
    {
      id: 2,
      initial: "강",
      name: "강민지",
      role: "백엔드, API 연동",
      tags: ["백엔드", "API"],
      color: "#74A8FF",
      leader: false,
    },
    {
      id: 3,
      initial: "임",
      name: "임이랑",
      role: "프론트엔드, 화면 구현",
      tags: ["프론트엔드", "React"],
      color: "#ADDCFF",
      leader: false,
    },
  ];

  const selectedTeam = teams.find((team) => team.id === selectedTeamId);

  const handleDeleteTeam = () => {
    if (selectedTeam.memberCount > 1) {
      setActiveModal("deleteBlocked");
      return;
    }

    setActiveModal("deleteConfirm");
  };

  const handleDelegate = (member) => {
    setDelegateTarget(member);
    setActiveModal("delegateConfirm");
  };

  return (
    <Layout>
      <Breadcrumb items={["home", "team"]} />

      {view === "list" && (
        <div className="w-[980px] mx-auto">
          <div className="grid grid-cols-[360px_1fr] gap-[34px]">
            {/* Team list */}
            <div className="border border-[#C9DEFA] bg-white shadow-sm">
              <div className="h-[44px] border-b border-[#C9DEFA] bg-[#EAF1FC] flex items-center justify-between px-[18px]">
                <span className="text-[15px] font-semibold text-black">
                  팀 리스트
                </span>
                <button
                  type="button"
                  onClick={() => setActiveModal("inviteCode")}
                  className="text-[12px] text-[#4A8DFF] font-semibold"
                >
                  초대 코드 조회
                </button>
              </div>

              <div className="px-[14px] py-[14px]">
                {teams.map((team) => (
                  <TeamCard
                    key={team.id}
                    team={team}
                    active={selectedTeamId === team.id}
                    onClick={() => setSelectedTeamId(team.id)}
                  />
                ))}
              </div>
            </div>

            {/* Project list */}
            <div className="border border-[#C9DEFA] bg-white shadow-sm">
              <div className="h-[44px] border-b border-[#C9DEFA] bg-[#EAF1FC] flex items-center justify-between px-[18px]">
                <div>
                  <span className="text-[15px] font-semibold text-black">
                    {selectedTeam.name}
                  </span>
                  <span className="ml-[10px] text-[12px] text-gray-500">
                    보유 프로젝트
                  </span>
                </div>

                <div className="flex gap-[8px]">
                  <button
                    type="button"
                    className="w-[64px] h-[28px] bg-white border border-[#C9DEFA] text-[13px] text-black hover:bg-[#EAF1FC]"
                  >
                    팀 수정
                  </button>
                  <button
                    type="button"
                    onClick={handleDeleteTeam}
                    className="w-[64px] h-[28px] bg-white border border-[#C9DEFA] text-[13px] text-black hover:bg-[#FFF0F0]"
                  >
                    팀 삭제
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveModal("inviteCode")}
                    className="w-[104px] h-[28px] bg-white border border-[#C9DEFA] text-[13px] text-black hover:bg-[#EAF1FC]"
                  >
                    팀 초대코드 조회
                  </button>
                </div>
              </div>

              <div className="px-[18px] py-[18px]">
                <div className="border border-[#C9DEFA] bg-white mb-[18px]">
                  {projects.map((project) => (
                    <ProjectRow
                      key={project.id}
                      name={project.name}
                      dueDate={project.dueDate}
                      onClick={() => {
                        setSelectedProject(project);
                        setActiveModal("moveProject");
                      }}
                    />
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setActiveModal("projectCreate")}
                    className="h-[32px] px-[12px] bg-white border border-[#C9DEFA] text-[13px] text-black hover:bg-[#EAF1FC]"
                  >
                    + 프로젝트 추가하기
                  </button>

                  <button
                    type="button"
                    onClick={() => setView("members")}
                    className="h-[32px] px-[14px] bg-[#4A8DFF] text-white text-[13px]"
                  >
                    팀 선택
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-[28px] border border-[#C9DEFA] bg-white shadow-sm">
            <div className="h-[42px] border-b border-[#C9DEFA] bg-[#EAF1FC] flex items-center px-[18px] text-[15px] font-semibold text-black">
              팀 관리 안내
            </div>

            <div className="px-[18px] py-[18px] text-[13px] leading-[23px] text-black">
              ㆍ팀은 여러 개 보유할 수 있으며, 각 팀 안에서 여러 프로젝트를
              관리할 수 있습니다.
              <br />
              ㆍ팀 삭제는 팀장을 제외한 팀원이 모두 탈퇴한 경우에만 가능합니다.
              <br />
              ㆍ팀 선택 후 팀원 관리 화면에서 팀장 위임을 진행할 수 있습니다.
            </div>
          </div>
        </div>
      )}

      {view === "members" && (
        <div className="w-[980px] mx-auto">
          <div className="flex items-center justify-between mb-[18px]">
            <div>
              <h2 className="text-[20px] font-semibold text-black">
                {selectedTeam.name}
              </h2>
              <p className="text-[13px] text-black mt-[6px]">
                공동 개발 담당 · 팀원 관리
              </p>
            </div>

            <button
              type="button"
              onClick={() => setView("list")}
              className="w-[84px] h-[30px] bg-white border border-[#C9DEFA] text-[13px] text-black hover:bg-[#EAF1FC]"
            >
              목록으로
            </button>
          </div>

          <div className="grid grid-cols-[360px_1fr] gap-[34px]">
            <div className="border border-[#C9DEFA] bg-white shadow-sm">
              <div className="h-[44px] border-b border-[#C9DEFA] bg-[#EAF1FC] flex items-center px-[18px] text-[15px] font-semibold text-black">
                팀 프로젝트
              </div>

              <div className="px-[14px] py-[14px]">
                {teams.map((team) => (
                  <TeamCard
                    key={team.id}
                    team={team}
                    active={selectedTeamId === team.id}
                    onClick={() => setSelectedTeamId(team.id)}
                  />
                ))}
              </div>
            </div>

            <div className="space-y-[18px]">
              {members.map((member) => (
                <MemberPanel
                  key={member.id}
                  member={member}
                  isLeader={member.leader}
                  onDelegate={() => handleDelegate(member)}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {activeModal === "deleteBlocked" && (
        <AlertModal
          title="팀을 삭제할 수 없습니다!"
          message={
            <>
              팀을 삭제하기 위해서는 모든 팀원이 팀에서 탈퇴하여
              <br />
              해당 팀 내에 팀장만이 남아있어야 합니다.
            </>
          }
          onClose={() => setActiveModal(null)}
        />
      )}

      {activeModal === "deleteConfirm" && (
        <ConfirmModal
          title="팀 삭제"
          message={
            <>
              정말 ‘{selectedTeam.name}’ 팀을 삭제하시겠습니까?
              <br />
              삭제한 팀은 복구할 수 없습니다.
            </>
          }
          confirmText="삭제"
          danger
          onCancel={() => setActiveModal(null)}
          onConfirm={() => setActiveModal(null)}
        />
      )}

      {activeModal === "inviteCode" && (
        <AlertModal
          title="초대 코드 조회"
          message={
            <>
              {selectedTeam.name} 초대 코드
              <br />
              <span className="text-[18px] font-semibold text-[#4A8DFF]">
                LDI983CVD2
              </span>
            </>
          }
          onClose={() => setActiveModal(null)}
        />
      )}

      {activeModal === "moveProject" && selectedProject && (
        <ConfirmModal
          title="프로젝트 이동"
          message={
            <>
              이 프로젝트로 이동하시겠습니까?
              <br />
              <span className="font-semibold">
                {selectedProject.name} ({selectedProject.dueDate} 종료)
              </span>
            </>
          }
          confirmText="이동"
          onCancel={() => setActiveModal(null)}
          onConfirm={() => setActiveModal(null)}
        />
      )}

      {activeModal === "projectCreate" && (
        <ProjectCreateModal onClose={() => setActiveModal(null)} />
      )}

      {activeModal === "delegateConfirm" && delegateTarget && (
        <ConfirmModal
          title="팀장 위임"
          message={
            <>
              {delegateTarget.name}님에게
              <br />
              팀장을 위임하시겠습니까?
            </>
          }
          onCancel={() => setActiveModal(null)}
          onConfirm={() => setActiveModal("delegateComplete")}
        />
      )}

      {activeModal === "delegateComplete" && (
        <AlertModal
          title="위임 완료"
          message="위임되었습니다."
          onClose={() => setActiveModal(null)}
        />
      )}
    </Layout>
  );
}

export default Team;