import { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import Breadcrumb from "../components/Breadcrumb";

const DEFAULT_MEMBERS = ["정서윤", "강민지", "임이랑"];

const DEFAULT_TODOS = [
  {
    id: 1,
    task: "회의 분석 결과 페이지 스크린샷 정리",
    assignee: "임이랑",
    source: "회의 분석",
    priority: "높음",
  },
  {
    id: 2,
    task: "백엔드 API 응답 형식 확인",
    assignee: "정서윤",
    source: "회의 분석",
    priority: "높음",
  },
  {
    id: 3,
    task: "회의 업로드 API 연동 점검",
    assignee: "강민지",
    source: "회의 분석",
    priority: "중간",
  },
  {
    id: 4,
    task: "STT 상태 조회 응답 확인",
    assignee: "정서윤",
    source: "회의 분석",
    priority: "중간",
  },
  {
    id: 5,
    task: "발표용 시연 흐름 정리",
    assignee: "",
    source: "회의 분석",
    priority: "낮음",
  },
];

function CompleteModal({ onClose }) {
  return (
    <div className="fixed inset-0 z-50 bg-black/20 flex items-center justify-center">
      <div className="w-[430px] bg-white border border-[#C9DEFA] shadow-[0_8px_28px_rgba(0,0,0,0.18)] translate-x-[145px]">
        <div className="h-[46px] border-b border-[#C9DEFA] bg-[#EAF1FC] flex items-center px-[18px] text-[15px] font-semibold text-black">
          매칭 완료
        </div>

        <div className="px-[28px] py-[32px] flex items-center gap-[14px] text-[15px] text-black">
          <span className="w-[26px] h-[26px] rounded-full bg-[#4A8DFF] text-white flex items-center justify-center text-[14px] shrink-0">
            ✓
          </span>
          <span>TODO-담당자 매칭이 완료되었습니다.</span>
        </div>

        <div className="h-[58px] border-t border-[#C9DEFA] bg-[#EAF1FC] flex items-center justify-end px-[18px]">
          <button
            type="button"
            onClick={onClose}
            className="w-[60px] h-[30px] bg-[#4A8DFF] text-white text-[13px]"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
}

function AssigneeSelect({ value, members, onChange }) {
  return (
    <select
      value={value}
      onChange={(event) => onChange(event.target.value)}
      className="w-[108px] h-[32px] border border-[#C9DEFA] bg-white px-[8px] text-[13px] text-black outline-none"
    >
      <option value="">미배정</option>
      {members.map((member) => (
        <option key={member} value={member}>
          {member}
        </option>
      ))}
    </select>
  );
}

function PriorityBadge({ priority }) {
  const label = priority || "중간";

  return (
    <span
      className={`h-[24px] px-[8px] rounded-full border text-[12px] flex items-center justify-center whitespace-nowrap ${
        label === "높음"
          ? "bg-[#ADDCFF] border-[#8BCBFF] text-black font-semibold"
          : label === "낮음"
          ? "bg-white border-[#C9DEFA] text-gray-500"
          : "bg-[#EAF1FC] border-[#C9DEFA] text-black"
      }`}
    >
      {label}
    </span>
  );
}

function TodoRow({ todo, members, onToggle, onAssigneeChange }) {
  return (
    <div className="grid grid-cols-[44px_1fr_90px_132px_90px] min-h-[58px] border-b border-[#C9DEFA] bg-white text-[13px] text-black">
      <div className="flex items-center justify-center">
        <input
          type="checkbox"
          checked={todo.selected}
          onChange={() => onToggle(todo.id)}
          className="w-[14px] h-[14px] accent-[#4A8DFF]"
        />
      </div>

      <div className="flex flex-col justify-center px-[12px] leading-[19px]">
        <span className="font-medium">{todo.task}</span>
        <span className="text-[11px] text-gray-500 mt-[2px]">
          출처: {todo.source || "회의 분석"}
        </span>
      </div>

      <div className="border-l border-[#C9DEFA] flex items-center justify-center">
        <PriorityBadge priority={todo.priority} />
      </div>

      <div className="border-l border-[#C9DEFA] flex items-center justify-center">
        <AssigneeSelect
          value={todo.assignee}
          members={members}
          onChange={(value) => onAssigneeChange(todo.id, value)}
        />
      </div>

      <div className="border-l border-[#C9DEFA] flex items-center justify-center">
        <span
          className={`text-[12px] font-semibold ${
            todo.assignee ? "text-[#4A8DFF]" : "text-gray-400"
          }`}
        >
          {todo.assignee ? "매칭됨" : "미배정"}
        </span>
      </div>
    </div>
  );
}

function SummaryCard({ title, value, description }) {
  return (
    <div className="border border-[#C9DEFA] bg-white px-[16px] py-[15px] shadow-sm">
      <p className="text-[13px] font-semibold text-black mb-[8px]">{title}</p>
      <p className="text-[28px] font-bold text-[#4A8DFF] mb-[8px]">{value}</p>
      <p className="text-[12px] leading-[18px] text-gray-600">{description}</p>
    </div>
  );
}

function TodoMatching() {
  const navigate = useNavigate();
  const location = useLocation();

  const incomingTodos = location.state?.todos;
  const incomingMembers = location.state?.members;

  const initialTodos = useMemo(() => {
    const sourceTodos =
      Array.isArray(incomingTodos) && incomingTodos.length > 0
        ? incomingTodos
        : DEFAULT_TODOS;

    return sourceTodos.map((todo, index) => ({
      id: todo.id || index + 1,
      task: todo.task || todo.content || todo.title || "회의 기반 TODO",
      assignee: todo.assignee || todo.member || todo.owner || "",
      source: todo.source || "회의 분석",
      priority: todo.priority || todo.importance || "중간",
      selected: todo.selected ?? true,
    }));
  }, [incomingTodos]);

  const members = useMemo(() => {
    if (Array.isArray(incomingMembers) && incomingMembers.length > 0) {
      return incomingMembers;
    }

    const assigneesFromTodos = initialTodos
      .map((todo) => todo.assignee)
      .filter(Boolean);

    return Array.from(new Set([...DEFAULT_MEMBERS, ...assigneesFromTodos]));
  }, [incomingMembers, initialTodos]);

  const [todos, setTodos] = useState(initialTodos);
  const [showCompleteModal, setShowCompleteModal] = useState(false);

  const selectedCount = todos.filter((todo) => todo.selected).length;
  const assignedCount = todos.filter((todo) => todo.selected && todo.assignee)
    .length;
  const unassignedCount = todos.filter((todo) => todo.selected && !todo.assignee)
    .length;

  const handleToggleTodo = (id) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, selected: !todo.selected } : todo
      )
    );
  };

  const handleAssigneeChange = (id, assignee) => {
    setTodos((prev) =>
      prev.map((todo) => (todo.id === id ? { ...todo, assignee } : todo))
    );
  };

  const handleReset = () => {
    setTodos(initialTodos);
  };

  const handleConfirm = () => {
    const matchedTodos = todos
      .filter((todo) => todo.selected)
      .map(({ selected, ...rest }) => rest);

    localStorage.setItem("knoteMatchedTodos", JSON.stringify(matchedTodos));
    setShowCompleteModal(true);
  };

  const handleCloseCompleteModal = () => {
    setShowCompleteModal(false);
    navigate("/todo");
  };

  return (
    <Layout>
      <Breadcrumb items={["home", "todo", "todoMatching"]} />

      <div className="w-[1080px] mx-auto text-black">
        <div className="flex items-end justify-between mb-[24px]">
          <div>
            <h2 className="text-[22px] font-bold text-black mb-[8px]">
              TODO-담당자 매칭
            </h2>
            <p className="text-[13px] text-gray-600">
              회의 분석에서 추출된 TODO를 확인하고 담당자를 조정한 뒤 확정하세요.
            </p>
          </div>

          <button
            type="button"
            onClick={() => navigate("/todo")}
            className="w-[78px] h-[30px] bg-white border border-[#C9DEFA] text-[13px] text-black hover:bg-[#EAF1FC]"
          >
            돌아가기
          </button>
        </div>

        <div className="grid grid-cols-3 gap-[18px] mb-[24px]">
          <SummaryCard
            title="선택된 TODO"
            value={selectedCount}
            description="매칭 확정 대상이 되는 TODO입니다."
          />
          <SummaryCard
            title="담당자 매칭"
            value={assignedCount}
            description="담당자가 지정된 TODO입니다."
          />
          <SummaryCard
            title="미배정 TODO"
            value={unassignedCount}
            description="담당자 선택이 필요한 TODO입니다."
          />
        </div>

        <div className="border border-[#C9DEFA] bg-white shadow-sm">
          <div className="h-[46px] border-b border-[#C9DEFA] bg-[#EAF1FC] flex items-center justify-between px-[18px]">
            <span className="text-[15px] font-semibold text-black">
              회의 분석 기반 TODO 목록
            </span>
            <span className="text-[12px] text-gray-500">
              담당자는 드롭다운으로 수정할 수 있습니다.
            </span>
          </div>

          <div className="grid grid-cols-[44px_1fr_90px_132px_90px] h-[38px] border-b border-[#C9DEFA] bg-[#ADDCFF] text-[13px] text-black font-semibold">
            <div className="flex items-center justify-center">선택</div>
            <div className="flex items-center px-[12px]">TODO</div>
            <div className="border-l border-[#C9DEFA] flex items-center justify-center">
              우선도
            </div>
            <div className="border-l border-[#C9DEFA] flex items-center justify-center">
              담당자
            </div>
            <div className="border-l border-[#C9DEFA] flex items-center justify-center">
              상태
            </div>
          </div>

          {todos.map((todo) => (
            <TodoRow
              key={todo.id}
              todo={todo}
              members={members}
              onToggle={handleToggleTodo}
              onAssigneeChange={handleAssigneeChange}
            />
          ))}

          <div className="h-[64px] bg-[#EAF1FC] flex items-center justify-between px-[18px]">
            <p className="text-[12px] text-gray-600">
              확정 시 선택된 TODO와 담당자 정보가 저장됩니다.
            </p>

            <div className="flex items-center gap-[10px]">
              <button
                type="button"
                onClick={handleReset}
                className="w-[64px] h-[30px] bg-white border border-[#C9DEFA] text-[13px] text-black hover:bg-[#F8FBFF]"
              >
                초기화
              </button>

              <button
                type="button"
                onClick={handleConfirm}
                className="w-[64px] h-[30px] bg-[#4A8DFF] text-white text-[13px]"
              >
                확정
              </button>
            </div>
          </div>
        </div>

        <div className="mt-[22px] border border-[#C9DEFA] bg-white px-[18px] py-[16px] text-[13px] leading-[22px] text-black shadow-sm">
        회의 분석 페이지에서 전달된 TODO 데이터를 기반으로 담당자를 매칭합니다.
        </div>
      </div>

      {showCompleteModal && <CompleteModal onClose={handleCloseCompleteModal} />}
    </Layout>
  );
}

export default TodoMatching;