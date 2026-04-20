import Layout from "../components/Layout";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import api from "../api"; // axios 인스턴스 임포트

function Meeting() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  // 파일을 선택했을 때 실행되는 함수
  const handleFileChange = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      console.log("업로드 시작...");

      // 1. 서버로 보낼 FormData 생성
      const formData = new FormData();
      formData.append("file", file);
      // 백엔드 CreateMeetingRecordRequest 형식을 맞추기 위해 agenda 추가
      formData.append("agenda", file.name.split('.')[0]); // 파일명을 기본 제목으로 사용

      // 2. 백엔드 API 호출 (회의 생성 - 파일 업로드)
      const response = await api.post("/meetings/record-file", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // 3. 서버가 응답한 데이터에서 생성된 회의 ID 추출
      const newMeetingId = response.data.meetingId;

      console.log("실제 생성된 회의 ID:", newMeetingId);

      if (newMeetingId) {
        // 4. 성공 시 주소창에 ID를 달고 결과 페이지로 이동!
        navigate(`/meeting/result?id=${newMeetingId}`);
      }
    } catch (error) {
      console.error("파일 업로드 중 오류 발생:", error.response || error);
      alert("업로드에 실패했습니다. 백엔드 서버 상태를 확인해주세요.");
    } finally {
     // 파일 입력창을 초기화하여 같은 파일을 다시 올릴 수 있게 함
     event.target.value = "";
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
          <div className="rounded-3xl border border-gray-200 bg-[#F5F7FB] p-8 min-h-[360px] flex flex-col items-center justify-center">
            <div className="w-24 h-24 rounded-full bg-red-50 flex items-center justify-center text-3xl mb-6 shadow-sm">
              🎙️
            </div>

            <div className="flex flex-col gap-4 w-full items-center">
              {/* RECORD 버튼: 여기도 나중에 녹음 시작 API와 연동이 필요할 수 있습니다. */}
              <button
                onClick={() => alert("녹음 기능은 구현 준비 중입니다. 업로드 기능을 이용해주세요!")}
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

              <input
                ref={fileInputRef}
                type="file"
                accept="audio/*"
                className="hidden"
                onChange={handleFileChange}
              />
            </div>

            <p className="text-xs text-gray-400 text-center leading-5 mt-6">
              음성 파일을 업로드하거나 <br /> 바로 회의를 녹음할 수 있습니다.
            </p>
          </div>

          {/* 오른쪽 (파일 목록 - 현재는 하드코딩 상태) */}
          <div className="rounded-3xl border border-gray-200 bg-[#F5F7FB] p-6 min-h-[360px] flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-800">업로드된 회의 파일</h3>
              <span className="text-xs px-2 py-1 rounded-full bg-blue-50 text-blue-600">3 Files</span>
            </div>
            {/* ... 생략 (기존 디자인 유지) ... */}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Meeting;