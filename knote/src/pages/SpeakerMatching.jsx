import { Link, useNavigate, useSearchParams } from "react-router-dom";
import Layout from "../components/Layout";
import Breadcrumb from "../components/Breadcrumb";

function SpeakerCard({ speaker, text }) {
  return (
    <div className="relative w-full bg-white border border-[#C9DEFA] shadow-sm">
      <div className="h-[34px] border-b border-[#C9DEFA] flex items-center justify-between px-[12px] bg-[#EAF1FC]">
        <span className="text-[13px] font-semibold text-black">
          {speaker}
        </span>
        <span className="text-[13px] text-black">×</span>
      </div>

      <div className="px-[12px] py-[12px] text-[13px] leading-[21px] text-black min-h-[82px]">
        {text}
      </div>

      <div className="absolute left-[-8px] top-[18px] w-0 h-0 border-y-[8px] border-y-transparent border-r-[8px] border-r-white" />
    </div>
  );
}

function SpeakerSelectColumn({
  speaker,
  checked = true,
  selected = "선택",
  muted = false,
}) {
  return (
    <div className="w-[125px]">
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
        className="w-full h-[30px] border border-[#C9DEFA] bg-white text-[12px] px-[6px] mb-0 text-black"
      >
        <option>선택</option>
        <option>정서윤</option>
        <option>임이랑</option>
        <option>강민지</option>
      </select>

      <div className="w-full border-x border-b border-[#C9DEFA] bg-white text-[13px] text-black">
        {["정서윤", "임이랑", "강민지"].map((member) => (
          <div
            key={member}
            className={`h-[36px] flex items-center px-[8px] ${
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
      <Breadcrumb items={["home", "meeting", "speakerMatching"]} />

      <div className="w-[980px] mx-auto">
        <div className="grid grid-cols-[430px_1fr] gap-[34px]">
          {/* Left speaker transcript area */}
          <div className="bg-white border border-[#C9DEFA] px-[30px] py-[26px] shadow-sm">
            <div className="h-[34px] border border-[#C9DEFA] bg-[#EAF1FC] flex items-center px-[12px] text-[14px] font-semibold text-black mb-[22px]">
              STT 화자 분리 결과
            </div>

            <div className="space-y-[20px]">
              <SpeakerCard
                speaker="SPEAKER A"
                text={
                  <>
                    SDT 되는거 보여주고 SDT 되는거 플러스 로딩하면 이런게 좀
                    중요하겠죠
                  </>
                }
              />

              <SpeakerCard
                speaker="SPEAKER B"
                text={<>제가 단계를 분리하는건가요?</>}
              />

              <SpeakerCard
                speaker="SPEAKER C"
                text={
                  <>
                    웨거에서 기능 테스트 하면서 거기서 이제 직접 넣은 것도 있고
                    그 다음에 어떤거는 디비버에다가 sql 스크립트를 써가지고
                    하나씩 돌려서 넣은것도 있어요
                  </>
                }
              />
            </div>
          </div>

          {/* Right matching area */}
          <div className="bg-white border border-[#C9DEFA] px-[24px] py-[26px] relative shadow-sm min-h-[520px]">
            <div className="h-[34px] border border-[#C9DEFA] bg-[#EAF1FC] flex items-center px-[12px] text-[14px] font-semibold text-black mb-[28px]">
              화자-팀원 매칭
            </div>

            <div className="flex gap-[28px]">
              <SpeakerSelectColumn
                speaker="SPEAKER A"
                selected="정서윤"
                checked={true}
              />
              <SpeakerSelectColumn
                speaker="SPEAKER B"
                selected="임이랑"
                checked={false}
              />
              <SpeakerSelectColumn
                speaker="SPEAKER C"
                selected="강민지"
                checked={true}
              />
            </div>

            <div className="absolute left-0 right-0 bottom-[56px] h-px bg-[#C9DEFA]" />

            <div className="absolute right-[16px] bottom-[14px] flex gap-[10px]">
              <button
                type="button"
                onClick={handleCancel}
                className="w-[52px] h-[28px] bg-white border border-[#C9DEFA] text-[13px] text-black hover:bg-[#EAF1FC]"
              >
                취소
              </button>

              <button
                type="button"
                onClick={handleComplete}
                className="w-[52px] h-[28px] bg-[#4A8DFF] text-white text-[13px]"
              >
                완료
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default SpeakerMatching;