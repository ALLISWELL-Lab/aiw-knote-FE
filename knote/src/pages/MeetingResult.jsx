import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Layout from "../components/Layout";
import api from "../api";
import Breadcrumb from "../components/Breadcrumb";

function SectionBox({ title, children }) {
  return (
    <div className="w-full border border-[#C9DEFA] bg-white shadow-sm">
      <div className="h-[42px] border-b border-[#C9DEFA] bg-[#EAF1FC] flex items-center px-[18px]">
        <span className="text-[15px] font-semibold text-black">{title}</span>
      </div>
      <div className="px-[20px] py-[18px] text-[14px] leading-[28px] text-black">
        {children}
      </div>
    </div>
  );
}

function normalizeTranscript(transcript) {
  if (!transcript) return [];

  if (Array.isArray(transcript)) {
    return transcript.map((item, index) => {
      if (typeof item === "string") {
        return {
          speaker: `STT SEGMENT ${index + 1}`,
          text: item,
        };
      }
      return {
        speaker:
          item.speaker ||
          item.speakerName ||
          item.speakerLabel ||
          `SPEAKER ${index + 1}`,
        text:
          item.text ||
          item.content ||
          item.transcriptText ||
          item.sentence ||
          "",
      };
    });
  }

  if (typeof transcript === "string") {
    return transcript
      .split("\n")
      .filter((line) => line.trim() !== "")
      .map((line, index) => ({
        speaker: `STT SEGMENT ${index + 1}`,
        text: line,
      }));
  }

  return [];
}

function normalizeActionItems(actionItems) {
  if (!actionItems) return [];

  if (Array.isArray(actionItems)) {
    return actionItems.map((item, index) => {
      if (typeof item === "string") {
        return {
          id: index,
          title: item,
          assignee: "미지정",
          done: false,
        };
      }
      return {
        id: item.actionItemId || item.actionItemsId || item.id || index,
        title: item.title || item.content || item.task || "액션아이템",
        assignee:
          item.assigneeName ||
          item.assignee ||
          item.memberName ||
          item.assigneeId ||
          "미지정",
        done: item.done || item.completed || false,
      };
    });
  }

  return [];
}

function MeetingResult() {
  const [searchParams] = useSearchParams();
  const meetingId = searchParams.get("id");

  const [meeting, setMeeting] = useState(null);
  const [transcriptList, setTranscriptList] = useState([]);
  const [actionItems, setActionItems] = useState([]);
  const [isLoading, setIsLoading] = useState(Boolean(meetingId));
  const [errorMessage, setErrorMessage] = useState("");
  const [isDownloading, setIsDownloading] = useState(false); // 다운로드 진행 상태 관리 추가

  useEffect(() => {
    const fetchMeetingResult = async () => {
      if (!meetingId) {
        setErrorMessage(
          "meetingId가 없어 회의 분석 결과를 불러올 수 없습니다."
        );
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setErrorMessage("");

        const response = await api.get(`/meetings/${meetingId}`);
        const data = response.data;

        setMeeting(data);
        setTranscriptList(normalizeTranscript(data.transcript));
        setActionItems(normalizeActionItems(data.actionItems));
      } catch (error) {
        console.error("회의 분석 결과 조회 실패:", error);
        setErrorMessage(
          "회의 분석 결과를 불러오지 못했습니다. 백엔드 서버 실행 여부와 meetingId를 확인해 주세요."
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchMeetingResult();
  }, [meetingId]);

  // ------------------------------------
  // 🌟 [핵심 추가] 백엔드 STT 텍스트 다운로드 API 연동 함수
  // ------------------------------------
  const handleDownloadTranscript = async () => {
    if (!meetingId) return;

    try {
      setIsDownloading(true);

      // 백엔드 downloadMeetingStt API 호출 (바이너리 데이터를 받기 위해 responseType 추가 필수)
      const response = await api.get(`/meetings/${meetingId}/download`, {
        responseType: "blob", 
      });

      // 가상 DOM 링크 생성을 통한 다운로드 트리거 실행
      const blob = new Blob([response.data], { type: "text/plain;charset=utf-8" });
      const downloadUrl = window.URL.createObjectURL(blob);
      
      const link = document.createElement("a");
      link.href = downloadUrl;
      // 다운로드될 텍스트 파일명 세팅 (백엔드 헤더 설정과 동기화)
      link.setAttribute("download", `meeting_${meetingId}_stt.txt`); 
      
      document.body.appendChild(link);
      link.click();
      
      // 다운로드 완료 후 가상 메모리 해제 및 가상 DOM 노드 삭제
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(downloadUrl);

    } catch (error) {
      console.error("STT 원문 다운로드 실패:", error);
      alert("파일 다운로드에 실패했습니다. 백엔드 서버 상태를 확인해주세요.");
    } finally {
      setIsDownloading(false);
    }
  };

  const meetingTitle =
    meeting?.agenda ||
    meeting?.title ||
    meeting?.meetingTitle ||
    "회의 분석 결과";

  const summaryText =
    meeting?.summaryText ||
    meeting?.summary ||
    meeting?.summaryContent ||
    "";

  const decisions =
    meeting?.decisions ||
    meeting?.decisionItems ||
    meeting?.decisionSummary ||
    [];

  return (
    <Layout>
      <Breadcrumb items={["home", "meeting", "meetingResult"]} />

      {isLoading && (
        <div className="w-[980px] h-[460px] mx-auto border border-[#C9DEFA] bg-white flex items-center justify-center text-[15px] text-black shadow-sm">
          회의 분석 결과를 불러오는 중입니다...
        </div>
      )}

      {!isLoading && errorMessage && (
        <div className="w-[980px] h-[460px] mx-auto border border-[#C9DEFA] bg-white flex flex-col items-center justify-center text-center shadow-sm">
          <p className="text-[15px] font-semibold text-black mb-[12px]">
            결과 조회 실패
          </p>
          <p className="text-[13px] leading-[22px] text-red-500 max-w-[520px]">
            {errorMessage}
          </p>
        </div>
      )}

      {!isLoading && !errorMessage && meeting && (
        <div className="w-[980px] mx-auto grid grid-cols-[450px_1fr] gap-[34px]">
          {/* Left column */}
          <div>
            <div className="flex items-center justify-between mb-[18px]">
              <h2 className="text-[20px] font-semibold text-black truncate max-w-[320px]">
                {meetingTitle}
              </h2>

              {/* 💡 [수정] 클릭 시 백엔드 파일 다운로드를 트리거하도록 onClick 이벤트 바인딩 */}
              <button 
                onClick={handleDownloadTranscript}
                disabled={isDownloading}
                className={`w-[84px] h-[30px] bg-[#4A8DFF] text-white text-[13px] rounded-[3px] font-medium transition-colors hover:bg-[#4A8DFF]/90 active:bg-[#4A8DFF]/80 ${
                  isDownloading ? "opacity-60 cursor-not-allowed" : ""
                }`}
              >
                {isDownloading ? "받는 중..." : "다운로드"}
              </button>
            </div>

            <div className="w-full border border-[#C9DEFA] bg-white mb-[28px] shadow-sm">
              <div className="h-[42px] border-b border-[#C9DEFA] bg-[#EAF1FC] flex items-center px-[18px]">
                <span className="text-[15px] font-semibold text-black">
                  회의 결정사항
                </span>
              </div>

              <div className="px-[20px] py-[18px] text-[14px] leading-[30px] text-black min-h-[150px]">
                {Array.isArray(decisions) && decisions.length > 0 ? (
                  decisions.map((decision, index) => (
                    <p key={index}>
                      {index + 1}.{" "}
                      {typeof decision === "string"
                        ? decision
                        : decision.content || decision.title || decision.text}
                    </p>
                  ))
                ) : (
                  <p className="text-gray-500">
                    백엔드 응답에 결정사항 데이터가 없습니다.
                  </p>
                )}
              </div>
            </div>

            <div className="w-full border border-[#C9DEFA] bg-white shadow-sm">
              <div className="h-[42px] border-b border-[#C9DEFA] bg-[#EAF1FC] flex items-center px-[18px]">
                <span className="text-[15px] font-semibold text-black">
                  AI TODO
                </span>
              </div>

              <div className="px-[20px] py-[18px] min-h-[170px]">
                {actionItems.length > 0 ? (
                  <div className="space-y-[12px] text-[14px] text-black">
                    {actionItems.map((item) => (
                      <label
                        key={item.id}
                        className="flex items-center justify-between gap-[10px] cursor-pointer"
                      >
                        <div className="flex items-center gap-[10px]">
                          <input
                            type="checkbox"
                            defaultChecked={item.done}
                            className="w-[15px] h-[15px] accent-[#4A8DFF]"
                          />
                          <span>{item.title}</span>
                        </div>

                        <span className="text-[13px] text-black whitespace-nowrap">
                          {item.assignee}
                        </span>
                      </label>
                    ))}
                  </div>
                ) : (
                  <p className="text-[14px] text-gray-500">
                    백엔드 응답에 액션아이템 데이터가 없습니다.
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Right column */}
          <div>
            <div className="border border-[#C9DEFA] bg-white mb-[18px] shadow-sm">
              <div className="h-[42px] border-b border-[#C9DEFA] bg-[#EAF1FC] flex items-center px-[18px]">
                <span className="text-[15px] font-semibold text-black">
                  회의 요약
                </span>
              </div>

              <div className="grid grid-cols-[140px_1fr] border-b border-[#C9DEFA]">
                <div className="h-[40px] border-r border-[#C9DEFA] flex items-center px-[16px] text-[14px] text-black">
                  회의 ID
                </div>
                <div className="h-[40px] flex items-center px-[16px] text-[14px] text-black">
                  {meeting?.meetingId || meetingId}
                </div>
              </div>

              <div className="grid grid-cols-[140px_1fr]">
                <div className="h-[40px] border-r border-[#C9DEFA] flex items-center px-[16px] text-[14px] text-black">
                  회의명
                </div>
                <div className="h-[40px] flex items-center px-[16px] text-[14px] text-black truncate">
                  {meetingTitle}
                </div>
              </div>
            </div>

            <SectionBox title="AI 회의 요약">
              {summaryText ? (
                <p>{summaryText}</p>
              ) : (
                <p className="text-gray-500">
                  백엔드 응답에 회의 요약 데이터가 없습니다.
                </p>
              )}
            </SectionBox>

            <div className="border border-[#C9DEFA] bg-white h-[310px] overflow-hidden mt-[18px] shadow-sm">
              <div className="h-[42px] border-b border-[#C9DEFA] bg-[#EAF1FC] flex items-center px-[18px]">
                <span className="text-[15px] font-semibold text-black">
                  STT 변환 결과
                </span>
              </div>

              <div className="h-[268px] overflow-y-auto px-[20px] py-[18px] text-[14px] text-black leading-[24px]">
                {transcriptList.length > 0 ? (
                  transcriptList.map((segment, index) => (
                    <div key={index} className="mb-[22px]">
                      <p className="font-semibold mb-[6px] text-black">
                        {segment.speaker}
                      </p>
                      <p>{segment.text}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500">
                    백엔드 응답에 STT 변환 결과가 없습니다.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}

export default MeetingResult;