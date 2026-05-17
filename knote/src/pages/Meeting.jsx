import Layout from "../components/Layout";
import { useNavigate } from "react-router-dom";

function Meeting() {
  const navigate = useNavigate();

  return (
    <Layout>
      {/* Breadcrumb */}
      <div className="flex items-center gap-[10px] text-[14px] text-black mb-[18px]">
        <span className="font-semibold">⌂ Home</span>
        <span className="text-gray-400">/</span>
        <span>회의</span>
        <span className="text-gray-400">/</span>
        <span className="font-semibold">회의 업로드</span>
      </div>

      <div className="h-px bg-[#C9DEFA] mb-[104px]" />

      {/* Main upload box */}
      <div className="w-[760px] h-[335px] border border-[#C9DEFA] bg-white mx-auto flex items-center justify-center shadow-sm">
        <div className="w-full flex items-center justify-center gap-[145px]">
          {/* Left record/upload panel */}
          <div className="w-[245px] h-[250px] border border-[#C9DEFA] bg-white px-[34px] py-[30px] shadow-sm">
            <p className="text-[14px] text-black mb-[32px] whitespace-nowrap">
              회의 녹음/음성 파일 업로드
            </p>

            <div className="flex items-center gap-[26px] mb-[38px]">
              <div className="w-[28px] h-[28px] rounded-full border-[4px] border-[#4A8DFF] flex items-center justify-center">
                <div className="w-[11px] h-[11px] rounded-full bg-[#4A8DFF]" />
              </div>

              <button
                type="button"
                onClick={() => navigate("/recording")}
                className="w-[98px] h-[40px] bg-white border border-[#C9DEFA] rounded-[4px] shadow-sm text-[13px] font-semibold text-black hover:bg-[#ADDCFF]/40"
              >
                RECORD
              </button>
            </div>

            <div className="flex items-center gap-[26px]">
              <div className="w-[32px] h-[25px] relative">
                <div className="absolute left-0 top-[5px] w-[30px] h-[18px] border-[3px] border-[#4A8DFF] rounded-[3px]" />
                <div className="absolute left-[4px] top-0 w-[13px] h-[8px] border-[3px] border-[#4A8DFF] border-b-0 rounded-t-[3px]" />
              </div>

              <button
                type="button"
                onClick={() => navigate("/file-upload")}
                className="w-[98px] h-[40px] bg-white border border-[#C9DEFA] rounded-[4px] shadow-sm text-[13px] font-semibold text-black hover:bg-[#ADDCFF]/40"
              >
                UPLOAD
              </button>
            </div>
          </div>

          {/* Right search/file list */}
          <div className="w-[270px]">
            <div className="w-full h-[38px] bg-white border border-[#C9DEFA] rounded-[4px] flex items-center justify-between px-[14px] shadow-sm">
              <span className="text-[14px] text-gray-400">Search...</span>
              <span className="text-[#4A8DFF] text-[17px]">⌕</span>
            </div>

            <div className="w-full h-[142px] bg-white border border-[#C9DEFA] rounded-[3px] shadow-md overflow-hidden">
              <div className="h-[30px] bg-[#EAF1FC] flex items-center px-[12px] gap-[8px] text-[13px] text-black">
                <span className="text-[#4A8DFF]">⌕</span>
                <span>“20260201”</span>
              </div>

              <div className="px-[13px] py-[8px] text-[13px] text-black">
                <div className="flex gap-[9px] mb-[9px]">
                  <div className="w-[18px] h-[18px] bg-[#ADDCFF] rounded-[3px]" />
                  <div>
                    <p className="font-semibold leading-[15px]">20260201</p>
                    <p className="leading-[15px]">일요일 정기 회의</p>
                  </div>
                </div>

                <div className="flex gap-[9px] mb-[9px]">
                  <div className="w-[18px] h-[18px] bg-[#C9DEFA] rounded-[3px]" />
                  <div>
                    <p className="font-semibold leading-[15px]">20260127</p>
                    <p className="leading-[15px]">백엔드 역할 분배</p>
                  </div>
                </div>

                <div className="flex gap-[9px]">
                  <div className="w-[18px] h-[18px] bg-[#4A8DFF] rounded-[3px]" />
                  <div>
                    <p className="font-semibold leading-[15px]">20260124</p>
                    <p className="leading-[15px]">피그마 점검</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Meeting;