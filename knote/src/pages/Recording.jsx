import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import Breadcrumb from "../components/Breadcrumb";

function Recording() {
  const navigate = useNavigate();

  const [isRecording, setIsRecording] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showSaved, setShowSaved] = useState(false);

  const handleStartRecording = () => {
    setIsRecording(true);
    setShowSaved(false);
    setShowConfirm(false);
  };

  const handleStopRecording = () => {
    setShowConfirm(true);
  };

  const handleSaveRecording = () => {
    setShowConfirm(false);
    setShowSaved(true);
    setIsRecording(false);
  };

  const handleGoUpload = () => {
    navigate("/file-upload");
  };

  return (
    <Layout>
      <Breadcrumb items={["home", "meeting", "meetingUpload", "recording"]} />

      <div className="w-[980px] mx-auto mt-[100px]">
        <div className="w-[520px] h-[430px] border border-[#C9DEFA] ml-[170px] flex items-center justify-center bg-white shadow-sm">
          <div className="w-[300px] h-[270px] border border-[#C9DEFA] bg-white flex flex-col items-center justify-center shadow-sm">
            {!isRecording ? (
              <>
                <button
                  type="button"
                  onClick={handleStartRecording}
                  className="w-[92px] h-[92px] rounded-full bg-[#4A8DFF] flex items-center justify-center mb-[48px] shadow-md hover:opacity-90"
                >
                  <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
                    <rect
                      x="9"
                      y="4"
                      width="6"
                      height="11"
                      rx="3"
                      stroke="white"
                      strokeWidth="2"
                    />
                    <path
                      d="M6 11C6 14.5 8.4 17 12 17C15.6 17 18 14.5 18 11"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <path
                      d="M12 17V21"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <path
                      d="M9 21H15"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </button>

                <p className="text-[15px] text-black">
                  마이크를 누르고 녹음을 시작하세요.
                </p>
              </>
            ) : (
              <>
                <button
                  type="button"
                  onClick={handleStopRecording}
                  className="w-[48px] h-[48px] rounded-[4px] bg-[#4A8DFF] mb-[58px] shadow-sm"
                />

                <div className="flex gap-[5px] mb-[18px]">
                  <div className="w-[4px] h-[18px] rounded-full bg-[#ADDCFF]" />
                  <div className="w-[4px] h-[18px] rounded-full bg-[#ADDCFF]" />
                </div>

                <p className="text-[14px] text-black">녹음 중입니다.</p>
              </>
            )}
          </div>
        </div>

        <div className="flex gap-[14px] mt-[34px] ml-[390px]">
          <button
            type="button"
            onClick={() => navigate("/meeting")}
            className="w-[58px] h-[28px] border border-[#C9DEFA] bg-white text-[13px] text-black hover:bg-[#EAF1FC]"
          >
            취소
          </button>

          {isRecording ? (
            <button
              type="button"
              onClick={handleStopRecording}
              className="w-[58px] h-[28px] bg-[#4A8DFF] text-white text-[13px]"
            >
              저장
            </button>
          ) : (
            <button
              type="button"
              onClick={handleGoUpload}
              className="w-[82px] h-[28px] bg-[#4A8DFF] text-white text-[13px]"
            >
              파일 업로드
            </button>
          )}
        </div>
      </div>

      {showConfirm && (
        <div className="fixed inset-0 z-50 bg-black/20 flex items-center justify-center">
          <div className="w-[420px] bg-white border border-[#C9DEFA] shadow-[0_8px_28px_rgba(0,0,0,0.18)] translate-x-[145px]">
            <div className="h-[46px] border-b border-[#C9DEFA] bg-[#EAF1FC] flex items-center px-[18px] text-[15px] font-semibold text-black">
              녹음 저장
            </div>

            <div className="px-[26px] py-[28px] flex items-center gap-[14px] text-[15px] text-black">
              <span className="w-[24px] h-[24px] rounded-full bg-[#4A8DFF] text-white flex items-center justify-center text-[13px] shrink-0">
                !
              </span>
              <span>녹음을 저장하시겠습니까?</span>
            </div>

            <div className="h-[56px] border-t border-[#C9DEFA] bg-[#EAF1FC] flex items-center justify-end gap-[10px] px-[18px]">
              <button
                type="button"
                onClick={() => setShowConfirm(false)}
                className="w-[56px] h-[28px] border border-[#C9DEFA] text-[13px] text-black bg-white"
              >
                취소
              </button>
              <button
                type="button"
                onClick={handleSaveRecording}
                className="w-[56px] h-[28px] bg-[#4A8DFF] text-white text-[13px]"
              >
                확인
              </button>
            </div>
          </div>
        </div>
      )}

      {showSaved && (
        <div className="fixed inset-0 z-50 bg-black/20 flex items-center justify-center">
          <div className="w-[380px] bg-white border border-[#C9DEFA] shadow-[0_8px_28px_rgba(0,0,0,0.18)] translate-x-[145px]">
            <div className="h-[46px] border-b border-[#C9DEFA] bg-[#EAF1FC] flex items-center px-[18px] text-[15px] font-semibold text-black">
              저장 완료
            </div>

            <div className="px-[26px] py-[28px] flex items-center gap-[14px] text-[15px] text-black">
              <span className="w-[24px] h-[24px] rounded-full bg-[#4A8DFF] text-white flex items-center justify-center text-[13px] shrink-0">
                ✓
              </span>
              <span>저장되었습니다.</span>
            </div>

            <div className="h-[56px] border-t border-[#C9DEFA] bg-[#EAF1FC] flex items-center justify-end px-[18px]">
              <button
                type="button"
                onClick={() => setShowSaved(false)}
                className="w-[56px] h-[28px] bg-[#4A8DFF] text-white text-[13px]"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}

export default Recording;