import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";

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
      {/* Breadcrumb */}
      <div className="flex items-center gap-[10px] text-[14px] text-black mb-[18px]">
        <span className="font-semibold">⌂ Home</span>
        <span className="text-gray-400">/</span>
        <span>회의</span>
        <span className="text-gray-400">/</span>
        <span>회의 업로드</span>
        <span className="text-gray-400">/</span>
        <span className="font-semibold">녹음</span>
      </div>

      <div className="h-px bg-[#C9DEFA] mb-[86px]" />

      {/* Main recording area */}
      <div className="w-[430px] h-[430px] border border-[#C9DEFA] mx-auto flex items-center justify-center bg-white shadow-sm">
        <div className="w-[260px] h-[260px] border border-[#C9DEFA] bg-white flex flex-col items-center justify-center shadow-sm">
          {!isRecording ? (
            <>
              <button
                type="button"
                onClick={handleStartRecording}
                className="w-[90px] h-[90px] rounded-full bg-[#4A8DFF] flex items-center justify-center mb-[50px] shadow-md hover:opacity-90"
              >
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
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
                className="w-[44px] h-[44px] rounded-[4px] bg-[#4A8DFF] mb-[62px] shadow-sm"
              />

              <div className="flex gap-[5px] mb-[18px]">
                <div className="w-[4px] h-[16px] rounded-full bg-[#ADDCFF]" />
                <div className="w-[4px] h-[16px] rounded-full bg-[#ADDCFF]" />
              </div>

              <p className="text-[14px] text-black">녹음 중입니다.</p>
            </>
          )}
        </div>
      </div>

      {/* Buttons */}
      <div className="flex justify-center gap-[14px] mt-[34px]">
        <button
          type="button"
          onClick={() => navigate("/meeting")}
          className="w-[58px] h-[28px] border border-[#C9DEFA] bg-white text-[13px] text-black"
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

      {/* Confirm modal */}
      {showConfirm && (
        <div className="fixed left-1/2 bottom-[105px] -translate-x-1/2 w-[320px] h-[38px] bg-white border border-[#C9DEFA] flex items-center justify-between px-[12px] shadow-sm">
          <div className="flex items-center gap-[8px] text-[12px] text-black">
            <span className="text-[#4A8DFF] text-[16px]">▲</span>
            <span>녹음을 저장하시겠습니까?</span>
          </div>

          <div className="flex gap-[8px]">
            <button
              type="button"
              onClick={() => setShowConfirm(false)}
              className="w-[40px] h-[24px] border border-[#C9DEFA] text-[12px] text-black bg-white"
            >
              취소
            </button>
            <button
              type="button"
              onClick={handleSaveRecording}
              className="w-[40px] h-[24px] bg-[#4A8DFF] text-white text-[12px]"
            >
              확인
            </button>
          </div>
        </div>
      )}

      {/* Saved notice */}
      {showSaved && (
        <div className="fixed left-1/2 bottom-[55px] -translate-x-1/2 w-[360px] min-h-[44px] bg-white border border-[#C9DEFA] flex items-center justify-center gap-[10px] shadow-sm text-[12px] px-[14px] text-black">
          <span className="w-[16px] h-[16px] rounded-full bg-[#4A8DFF] text-white flex items-center justify-center text-[10px] shrink-0">
            i
          </span>
          <span>
            녹음 파일 저장 기능은 추후 연동 예정입니다. 현재는 파일 업로드를
            통해 회의 분석을 진행해 주세요.
          </span>
        </div>
      )}
    </Layout>
  );
}

export default Recording;