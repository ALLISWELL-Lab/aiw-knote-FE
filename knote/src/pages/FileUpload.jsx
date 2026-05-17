import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import api from "../api";

function FileUpload() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [selectedFile, setSelectedFile] = useState(null);
  const [fileName, setFileName] = useState("파일을 선택해 주세요");
  const [isUploading, setIsUploading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleUploadButtonClick = () => {
    if (isUploading) return;
    fileInputRef.current?.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    setSelectedFile(file);
    setFileName(file.name);
    setErrorMessage("");
  };

  const handleSubmit = async () => {
    if (!selectedFile) {
      setErrorMessage("업로드할 회의 녹음 파일을 먼저 선택해 주세요.");
      return;
    }

    try {
      setIsUploading(true);
      setErrorMessage("");

      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("agenda", selectedFile.name.split(".")[0]);

      const response = await api.post("/meetings/record-file", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const meetingId = response.data?.meetingId;

      if (!meetingId) {
        throw new Error("meetingId가 응답에 없습니다.");
      }

      navigate(`/speaker-matching?id=${meetingId}`);
    } catch (error) {
      console.error("회의 파일 업로드 실패:", error);
      setErrorMessage(
        "파일 업로드에 실패했습니다. 백엔드 서버 실행 여부와 API 응답 형식을 확인해 주세요."
      );
    } finally {
      setIsUploading(false);
    }
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
        <span className="font-semibold">음성 파일</span>
      </div>

      <div className="h-px bg-[#C9DEFA] mb-[48px]" />

      {/* Upload modal-like box */}
      <div className="w-[620px] h-[450px] border border-[#C9DEFA] mx-auto bg-white shadow-sm">
        <div className="h-[365px] flex items-center justify-center gap-[85px]">
          {/* Drop area */}
          <div className="w-[210px] h-[210px] border border-dashed border-[#C9DEFA] bg-white flex flex-col items-center justify-center">
            <button
              type="button"
              onClick={handleUploadButtonClick}
              disabled={isUploading}
              className="w-[92px] h-[28px] border border-[#C9DEFA] bg-white text-[13px] text-black disabled:opacity-50 hover:bg-[#ADDCFF]/40"
            >
              파일 업로드
            </button>

            <input
              ref={fileInputRef}
              type="file"
              accept=".mp3,.wav,.m4a,.mp4,audio/*,video/*"
              className="hidden"
              onChange={handleFileChange}
            />

            <p className="text-[14px] text-black mt-[18px]">
              혹은 파일 끌어오기
            </p>
          </div>

          {/* File preview */}
          <div className="w-[210px] h-[260px] border border-[#C9DEFA] bg-white flex flex-col items-center justify-center shadow-sm">
            <div className="mb-[30px]">
              <svg width="44" height="54" viewBox="0 0 44 54" fill="none">
                <path
                  d="M8 2H27L40 15V52H8V2Z"
                  fill="#4A8DFF"
                  stroke="#4A8DFF"
                  strokeWidth="2"
                />
                <path d="M27 2V15H40" fill="#ADDCFF" />
                <rect x="15" y="27" width="15" height="12" fill="white" />
                <path d="M18 31H27" stroke="#4A8DFF" strokeWidth="2" />
                <path d="M18 35H24" stroke="#4A8DFF" strokeWidth="2" />
              </svg>
            </div>

            <div className="w-[180px] h-[36px] bg-[#EAF1FC] border border-[#C9DEFA] flex items-center justify-between px-[8px]">
              <div className="flex items-center gap-[6px] min-w-0">
                <span className="w-[13px] h-[13px] bg-[#4A8DFF] inline-block shrink-0" />
                <span className="text-[14px] text-black truncate max-w-[120px]">
                  {fileName}
                </span>
              </div>

              <div className="flex items-center gap-[8px] text-black shrink-0">
                <span className="text-[12px]">▼</span>
              </div>
            </div>

            {selectedFile && (
              <p className="text-[12px] text-gray-500 mt-[10px]">
                {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
              </p>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="h-[85px] border-t border-[#C9DEFA] bg-[#EAF1FC] flex items-center justify-between px-[18px]">
          <div className="text-[12px] text-red-500 max-w-[410px]">
            {errorMessage}
          </div>

          <div className="flex items-center gap-[10px]">
            <button
              type="button"
              onClick={() => navigate("/meeting")}
              disabled={isUploading}
              className="w-[48px] h-[28px] bg-white border border-[#C9DEFA] text-[13px] text-black disabled:opacity-50"
            >
              취소
            </button>

            <button
              type="button"
              onClick={handleSubmit}
              disabled={isUploading}
              className="w-[58px] h-[28px] bg-[#4A8DFF] text-white text-[13px] disabled:opacity-50"
            >
              {isUploading ? "업로드" : "완료"}
            </button>
          </div>
        </div>
      </div>

      <div className="text-center text-[14px] leading-[22px] text-black mt-[70px]">
        요약, 분석, 업무 분배에 사용하기 위한
        <br />
        음성 파일을 업로드해 주세요.
        <br />
        단, 녹음 환경에 따라 오류가 발생할 수 있습니다.
      </div>
    </Layout>
  );
}

export default FileUpload;