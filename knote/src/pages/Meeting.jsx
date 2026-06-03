import { Link, useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import Breadcrumb from "../components/Breadcrumb";

function formatMeetingDate(raw) {
  if (!raw || raw.length !== 8) return raw;
  return `${raw.slice(0, 4)}. ${raw.slice(4, 6)}. ${raw.slice(6, 8)}`;
}

function MeetingFileItem({ color, date, title }) {
  return (
    <div className="flex gap-[10px] mb-[12px]">
      <div
        className="w-[18px] h-[18px] rounded-[3px] shrink-0"
        style={{ backgroundColor: color }}
      />
      <div>
        <p className="font-semibold leading-[15px]">{formatMeetingDate(date)}</p>
        <p className="leading-[15px]">{title}</p>
      </div>
    </div>
  );
}

function Meeting() {
  const navigate = useNavigate();

  return (
    <Layout>
  <Breadcrumb items={["home", "meeting"]} />

      <div className="w-[980px] mx-auto">
        <div className="grid grid-cols-[1fr_340px] gap-[34px]">
          {/* Main upload section */}
          <div className="border border-[#C9DEFA] bg-white shadow-sm">
            <div className="h-[44px] border-b border-[#C9DEFA] bg-[#EAF1FC] flex items-center justify-between px-[18px]">
              <span className="text-[15px] font-semibold text-black">
                회의 업로드
              </span>
              <span className="text-[13px] text-gray-500">
                녹음 또는 음성 파일을 등록하세요
              </span>
            </div>

            <div className="h-[430px] flex items-center justify-center">
              <div className="grid grid-cols-2 gap-[34px]">
                {/* Record */}
                <button
                  type="button"
                  onClick={() => navigate("/recording")}
                  className="w-[230px] h-[245px] border border-[#C9DEFA] bg-white shadow-sm hover:bg-[#ADDCFF]/35 transition flex flex-col items-center justify-center"
                >
                  <div className="w-[78px] h-[78px] rounded-full border-[5px] border-[#4A8DFF] flex items-center justify-center mb-[28px]">
                    <div className="w-[26px] h-[26px] rounded-full bg-[#4A8DFF]" />
                  </div>

                  <p className="text-[18px] font-semibold text-black mb-[10px]">
                    RECORD
                  </p>
                  <p className="text-[13px] text-black text-center leading-[20px]">
                    회의를 바로 녹음하고
                    <br />
                    분석 흐름으로 이동합니다.
                  </p>
                </button>

                {/* Upload */}
                <button
                  type="button"
                  onClick={() => navigate("/file-upload")}
                  className="w-[230px] h-[245px] border border-[#C9DEFA] bg-white shadow-sm hover:bg-[#ADDCFF]/35 transition flex flex-col items-center justify-center"
                >
                  <div className="w-[82px] h-[66px] relative mb-[34px]">
                    <div className="absolute left-[4px] top-[18px] w-[74px] h-[42px] border-[5px] border-[#4A8DFF] rounded-[4px]" />
                    <div className="absolute left-[14px] top-[4px] w-[32px] h-[22px] border-[5px] border-[#4A8DFF] border-b-0 rounded-t-[4px]" />
                  </div>

                  <p className="text-[18px] font-semibold text-black mb-[10px]">
                    UPLOAD
                  </p>
                  <p className="text-[13px] text-black text-center leading-[20px]">
                    저장된 회의 음성 파일을
                    <br />
                    업로드합니다.
                  </p>
                </button>
              </div>
            </div>
          </div>

          {/* Right recent meeting list */}
          <div className="space-y-[22px]">
            <div className="border border-[#C9DEFA] bg-white shadow-sm">
              <div className="h-[44px] border-b border-[#C9DEFA] bg-[#EAF1FC] flex items-center px-[18px] text-[15px] font-semibold text-black">
                회의 검색
              </div>

              <div className="px-[18px] py-[18px]">
                <div className="w-full h-[38px] bg-white border border-[#C9DEFA] rounded-[4px] flex items-center justify-between px-[14px] shadow-sm">
                  <span className="text-[14px] text-gray-400">Search...</span>
                  <span className="text-[#4A8DFF] text-[17px]">⌕</span>
                </div>
              </div>
            </div>

            <div className="border border-[#C9DEFA] bg-white shadow-sm">
              <div className="h-[44px] border-b border-[#C9DEFA] bg-[#EAF1FC] flex items-center px-[18px] text-[15px] font-semibold text-black">
                최근 회의
              </div>

              <div className="px-[18px] py-[16px] text-[13px] text-black">
                <MeetingFileItem
                  color="#ADDCFF"
                  date="20260201"
                  title="일요일 정기 회의"
                />
                <MeetingFileItem
                  color="#C9DEFA"
                  date="20260127"
                  title="백엔드 역할 분배"
                />
                <MeetingFileItem
                  color="#4A8DFF"
                  date="20260124"
                  title="피그마 점검"
                />
                <MeetingFileItem
                  color="#EAF1FC"
                  date="20260120"
                  title="프론트 연동 회의"
                />
              </div>
            </div>

            <div className="border border-[#C9DEFA] bg-white shadow-sm">
              <div className="h-[44px] border-b border-[#C9DEFA] bg-[#EAF1FC] flex items-center px-[18px] text-[15px] font-semibold text-black">
                안내
              </div>

              <div className="px-[18px] py-[18px] text-[13px] leading-[22px] text-black">
                회의 녹음 파일을 업로드하면 화자 매칭 후 회의 요약, 결정사항,
                액션아이템을 확인할 수 있습니다.
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Meeting;