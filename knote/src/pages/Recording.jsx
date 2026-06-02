import { useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Layout from "../components/Layout";
import Breadcrumb from "../components/Breadcrumb";
import api from "../api";

function Recording() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const meetingId = searchParams.get("id");

  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const streamRef = useRef(null);

  const [isRecording, setIsRecording] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showSaved, setShowSaved] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const stopMicrophoneStream = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
  };

  const handleStartRecording = async () => {
    try {
      setErrorMessage("");
      setShowSaved(false);
      setShowConfirm(false);

      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        setErrorMessage("현재 브라우저에서 녹음 기능을 지원하지 않습니다.");
        return;
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });

      streamRef.current = stream;
      audioChunksRef.current = [];

      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (event) => {
        if (event.data && event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error("마이크 권한 또는 녹음 시작 실패:", error);
      setErrorMessage(
        "마이크 권한을 허용했는지 확인해 주세요. 녹음을 시작할 수 없습니다."
      );
      stopMicrophoneStream();
    }
  };

  const handleStopRecording = () => {
    if (!isRecording || isUploading) return;
    setShowConfirm(true);
  };

  const handleCancelSave = () => {
    setShowConfirm(false);
  };

  const getTargetMeetingId = () => {
    if (meetingId) return meetingId;

    // 현재 녹음 페이지가 /recording?id=123 형태로 들어오지 않는 경우를 위한 임시값.
    // 실제 연동에서는 회의 생성 API 또는 진입 전 meetingId 생성 흐름으로 교체하는 게 좋아.
    return 1;
  };

  const createMeetingRecord = async () => {
    const targetMeetingId = getTargetMeetingId();

    const response = await api.post("/meetings/record", null, {
      params: {
        meetingId: targetMeetingId,
      },
    });

    return response.data;
  };

  const uploadRecordedFile = async (audioBlob) => {
    const recordData = await createMeetingRecord();

    const targetMeetingId =
      recordData?.meetingId || recordData?.id || getTargetMeetingId();

    const recordedFile = new File([audioBlob], "recording.webm", {
      type: "audio/webm",
    });

    const formData = new FormData();
    formData.append("file", recordedFile);
    formData.append("meetingId", targetMeetingId);

    const response = await api.post("/meetings/record-file", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    const responseMeetingId =
      response.data?.meetingId || response.data?.id || targetMeetingId;

    if (!responseMeetingId) {
      throw new Error("meetingId가 응답에 없습니다.");
    }

    return responseMeetingId;
  };

  const handleSaveRecording = async () => {
    try {
      setIsUploading(true);
      setErrorMessage("");
      setShowConfirm(false);

      const mediaRecorder = mediaRecorderRef.current;

      if (!mediaRecorder) {
        setErrorMessage("저장할 녹음 데이터가 없습니다.");
        setIsUploading(false);
        return;
      }

      mediaRecorder.onstop = async () => {
        try {
          const audioBlob = new Blob(audioChunksRef.current, {
            type: "audio/webm",
          });

          if (audioBlob.size === 0) {
            throw new Error("녹음 파일이 비어 있습니다.");
          }

          const responseMeetingId = await uploadRecordedFile(audioBlob);

          setShowSaved(true);
          setIsRecording(false);
          setIsUploading(false);

          stopMicrophoneStream();

          setTimeout(() => {
            navigate(`/speaker-matching?id=${responseMeetingId}`);
          }, 900);
        } catch (error) {
          console.error("녹음 파일 업로드 실패:", error);
          setErrorMessage(
            "녹음 파일 업로드에 실패했습니다. 백엔드 서버와 S3 연동 상태를 확인해 주세요."
          );
          setIsRecording(false);
          setIsUploading(false);
          stopMicrophoneStream();
        }
      };

      if (mediaRecorder.state !== "inactive") {
        mediaRecorder.stop();
      } else {
        setIsUploading(false);
        setErrorMessage("이미 녹음이 종료된 상태입니다.");
      }
    } catch (error) {
      console.error("녹음 저장 실패:", error);
      setErrorMessage("녹음을 저장하는 중 문제가 발생했습니다.");
      setIsUploading(false);
      stopMicrophoneStream();
    }
  };

  const handleCancelRecording = () => {
    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state !== "inactive"
    ) {
      mediaRecorderRef.current.stop();
    }

    stopMicrophoneStream();
    setIsRecording(false);
    setShowConfirm(false);
    setShowSaved(false);
    setErrorMessage("");
    audioChunksRef.current = [];
    navigate("/meeting");
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
                  disabled={isUploading}
                  className="w-[92px] h-[92px] rounded-full bg-[#4A8DFF] flex items-center justify-center mb-[48px] shadow-md hover:opacity-90 disabled:opacity-50"
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
                  disabled={isUploading}
                  className="w-[48px] h-[48px] rounded-[4px] bg-[#4A8DFF] mb-[58px] shadow-sm disabled:opacity-50"
                />

                <div className="flex gap-[5px] mb-[18px]">
                  <div className="w-[4px] h-[18px] rounded-full bg-[#ADDCFF]" />
                  <div className="w-[4px] h-[18px] rounded-full bg-[#ADDCFF]" />
                </div>

                <p className="text-[14px] text-black">
                  {isUploading
                    ? "녹음 파일 업로드 중입니다."
                    : "녹음 중입니다."}
                </p>
              </>
            )}
          </div>
        </div>

        <div className="flex gap-[14px] mt-[34px] ml-[390px]">
          <button
            type="button"
            onClick={handleCancelRecording}
            disabled={isUploading}
            className="w-[58px] h-[28px] border border-[#C9DEFA] bg-white text-[13px] text-black hover:bg-[#EAF1FC] disabled:opacity-50"
          >
            취소
          </button>

          {isRecording ? (
            <button
              type="button"
              onClick={handleStopRecording}
              disabled={isUploading}
              className="w-[58px] h-[28px] bg-[#4A8DFF] text-white text-[13px] disabled:opacity-50"
            >
              저장
            </button>
          ) : (
            <button
              type="button"
              onClick={handleGoUpload}
              disabled={isUploading}
              className="w-[82px] h-[28px] bg-[#4A8DFF] text-white text-[13px] disabled:opacity-50"
            >
              파일 업로드
            </button>
          )}
        </div>

        {errorMessage && (
          <p className="mt-[22px] ml-[170px] w-[520px] text-center text-[13px] leading-[21px] text-red-500">
            {errorMessage}
          </p>
        )}
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
                onClick={handleCancelSave}
                disabled={isUploading}
                className="w-[56px] h-[28px] border border-[#C9DEFA] text-[13px] text-black bg-white disabled:opacity-50"
              >
                취소
              </button>
              <button
                type="button"
                onClick={handleSaveRecording}
                disabled={isUploading}
                className="w-[56px] h-[28px] bg-[#4A8DFF] text-white text-[13px] disabled:opacity-50"
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