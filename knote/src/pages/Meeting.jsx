import Layout from "../components/Layout";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";

function Meeting() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      navigate("/meeting/result");
    }
  };

  return (
    <Layout>
      <div className="mb-8">
        <p className="text-sm text-gray-500 mb-2">Home / 회의 / 회의 업로드</p>
        <h2 className="text-2xl font-bold text-gray-900">회의 업로드</h2>
        <p className="text-sm text-gray-500 mt-1">
          회의 녹음 또는 음성 파일을 업로드해 요약과 분석에 활용할 수 있습니다.
        </p>
      </div>

      <div className="bg-white rounded-3xl shadow-md p-8 border border-gray-100">
        <div className="grid grid-cols-2 gap-8">
          {/* 왼쪽 */}
          <div className="rounded-3xl border border-gray-200 bg-[#F5F7FB] p-8 min-h-[360px] flex flex-col items-center justify-center">
            <div className="w-24 h-24 rounded-full bg-red-50 flex items-center justify-center text-3xl mb-6 shadow-sm">
              🎙️
            </div>

            <div className="flex flex-col gap-4 w-full items-center">
              <button
                onClick={() => navigate("/meeting/result")}
                className="w-48 h-14 rounded-2xl border border-gray-200 bg-white shadow-sm font-semibold text-gray-800 hover:bg-gray-50 transition"
              >
                RECORD
              </button>

              <button
                onClick={handleUploadClick}
                className="w-48 h-14 rounded-2xl border border-gray-200 bg-white shadow-sm font-semibold text-gray-800 hover:bg-gray-50 transition"
              >
                UPLOAD
              </button>

              {/* 숨겨진 파일 입력창 */}
              <input
                ref={fileInputRef}
                type="file"
                accept="audio/*"
                className="hidden"
                onChange={handleFileChange}
              />
            </div>

            <p className="text-xs text-gray-400 text-center leading-5 mt-6">
              음성 파일을 업로드하거나
              <br />
              바로 회의를 녹음할 수 있습니다.
            </p>
          </div>

          {/* 오른쪽 */}
          <div className="rounded-3xl border border-gray-200 bg-[#F5F7FB] p-6 min-h-[360px] flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-800">업로드된 회의 파일</h3>
              <span className="text-xs px-2 py-1 rounded-full bg-blue-50 text-blue-600">
                3 Files
              </span>
            </div>

            <div className="mb-4">
              <input
                className="w-full border border-gray-200 rounded-2xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-200 bg-white"
                placeholder="Search..."
              />
            </div>

            <div className="space-y-3 text-sm text-gray-700 flex-1">
              <div className="border border-gray-200 rounded-2xl p-4 bg-white shadow-sm">
                20260201 일요일 정기 회의
              </div>
              <div className="border border-gray-200 rounded-2xl p-4 bg-white shadow-sm">
                20260127 백엔드 역할 분배
              </div>
              <div className="border border-gray-200 rounded-2xl p-4 bg-white shadow-sm">
                20260124 피그마 점검
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center text-sm text-gray-500">
          업로드된 회의 파일은 이후 STT 변환, 요약, 투두 추출에 활용됩니다.
        </div>
      </div>
    </Layout>
  );
}

export default Meeting;