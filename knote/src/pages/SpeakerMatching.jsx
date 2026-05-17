import { useNavigate, useSearchParams } from "react-router-dom";
import Layout from "../components/Layout";

function SpeakerCard({ speaker, text }) {
  return (
    <div className="relative w-[220px] bg-white border border-[#C9DEFA] shadow-sm">
      <div className="h-[30px] border-b border-[#C9DEFA] flex items-center justify-between px-[10px] bg-[#EAF1FC]">
        <span className="text-[13px] font-semibold text-black">
          {speaker}
        </span>
        <span className="text-[13px] text-black">×</span>
      </div>

      <div className="px-[10px] py-[10px] text-[13px] leading-[19px] text-black min-h-[70px]">
        {text}
      </div>

      <div className="absolute left-[-8px] top-[16px] w-0 h-0 border-y-[8px] border-y-transparent border-r-[8px] border-r-white" />
    </div>
  );
}

function SpeakerSelectColumn({
  speaker,
  checked = true,
  selected = "팀원 1",
  muted = false,
}) {
  return (
    <div className="w-[100px]">
      <div className="flex items-center gap-[8px] mb-[22px]">
        <input
          type="checkbox"
          defaultChecked={checked}
          className="w-[13px] h-[13px] accent-[#4A8DFF]"
        />
        <span className="text-[13px] font-semibold text-black">
          {speaker}
        </span>
      </div>

      <select
        defaultValue={selected}
        className="w-full h-[28px] border border-[#C9DEFA] bg-white text-[12px] px-[6px] mb-0 text-black"
      >
        <option>선택</option>
        <option>팀원 1</option>
        <option>팀원 2</option>
        <option>팀원 3</option>
        <option>팀원 4</option>
        <option>팀원 5</option>
      </select>

      <div className="w-full border-x border-b border-[#C9DEFA] bg-white text-[13px] text-black">
        {["팀원 1", "팀원 2", "팀원 3", "팀원 4", "팀원 5"].map((member) => (
          <div
            key={member}
            className={`h-[34px] flex items-center px-[8px] ${
              member === selected && !muted
                ? "bg-[#ADDCFF] text-black font-semibold"
                : ""
            }`}
          >
            {member}
          </div>
        ))}
      </div>
    </div>
  );
}

function SpeakerMatching() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const meetingId = searchParams.get("id");

  const handleCancel = () => {
    if (meetingId) {
      navigate(`/file-upload?id=${meetingId}`);
      return;
    }

    navigate("/file-upload");
  };

  const handleComplete = () => {
    if (meetingId) {
      navigate(`/meeting/result?id=${meetingId}`);
      return;
    }

    navigate("/meeting/result");
  };

  return (
    <Layout>
      {/* Breadcrumb */}
      <div className="flex items-center gap-[10px] text-[14px] text-black mb-[18px]">
        <span className="font-semibold">⌂ Home</span>
        <span className="text-gray-400">/</span>
        <span>회의</span>
        <span className="text-gray-400">/</span>
        <span className="font-semibold">화자 매칭</span>
      </div>

      <div className="h-px bg-[#C9DEFA] mb-[46px]" />

      <div className="w-[850px] h-[520px] mx-auto flex">
        {/* Left speaker transcript area */}
        <div className="w-[360px] h-full bg-white border border-[#C9DEFA] px-[28px] py-[24px] shadow-sm">
          <div className="space-y-[24px]">
            <SpeakerCard
              speaker="SPEAKER A"
              text={
                <>
                  자, 2월 7일 오전 10시네요. 회의를 시작해 볼까요?
                  화면님께서 준비해 오신 것부터 볼게요.
                </>
              }
            />

            <SpeakerCard
              speaker="SPEAKER B"
              text={
                <>
                  네, 저는 저번에 지적해주셨던 몇 개의 화면 구성과 새 페이지
                  제작, 몇 가지 컴포넌트를 수정해 보았어요.
                </>
              }
            />

            <SpeakerCard
              speaker="SPEAKER C"
              text={<>아, 그럼 이 기능이 저렇게 나타난 거군요?</>}
            />

            <SpeakerCard
              speaker="SPEAKER D"
              text={<>네, 맞아요. 제 생각에도 그러합니다.</>}
            />
          </div>
        </div>

        {/* Right matching area */}
        <div className="w-[500px] h-full bg-white border border-[#C9DEFA] ml-[30px] px-[10px] py-[24px] relative shadow-sm">
          <div className="flex gap-[20px]">
            <SpeakerSelectColumn
              speaker="SPEAKER A"
              selected="팀원 1"
              checked={true}
            />
            <SpeakerSelectColumn
              speaker="SPEAKER B"
              selected="팀원 2"
              checked={true}
            />
            <SpeakerSelectColumn
              speaker="SPEAKER C"
              selected="팀원 3"
              checked={true}
            />
            <SpeakerSelectColumn
              speaker="SPEAKER D"
              selected="선택"
              checked={false}
              muted
            />
          </div>

          {meetingId && (
            <div className="absolute left-[12px] bottom-[14px] text-[12px] text-gray-500">
              meetingId: {meetingId}
            </div>
          )}

          <div className="absolute left-0 right-0 bottom-[48px] h-px bg-[#C9DEFA]" />

          <div className="absolute right-[12px] bottom-[12px] flex gap-[10px]">
            <button
              type="button"
              onClick={handleCancel}
              className="w-[48px] h-[28px] bg-white border border-[#C9DEFA] text-[13px] text-black"
            >
              취소
            </button>

            <button
              type="button"
              onClick={handleComplete}
              className="w-[48px] h-[28px] bg-[#4A8DFF] text-white text-[13px]"
            >
              완료
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default SpeakerMatching;