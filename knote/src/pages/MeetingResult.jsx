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
      .map((line, index) => {
        if (line.includes(":")) {
          const [speaker, ...textParts] = line.split(":");
          return {
            speaker: speaker.trim(),
            text: textParts.join(":").trim(),
          };
        }
        return {
          speaker: `SPEAKER ${index + 1}`,
          text: line.trim(),
        };
      });
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
        id: item.actionItemId || item.id || index,
        title: item.title || item.memo || "액션아이템",
        assignee: item.assigneeName || item.assignee || "미지정",
        done: item.completed || item.done || false,
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
  const [isDownloading, setIsDownloading] = useState(false);

  useEffect(() => {
    const fetchMeetingResult = async () => {
      if (!meetingId) {
        setErrorMessage("회의 식별 번호(meetingId)가 파라미터에 누락되어 결과를 로드할 수 없습니다.");
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
        setErrorMessage("AI 텍스트 가공 분석이 진행 중이거나 서버에 데이터가 없습니다. 잠시 후 다시 확인해 주세요.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchMeetingResult();
  }, [meetingId]);

  const handleDownloadTranscript = async () => {
    if (!meetingId) return;

    try {
      setIsDownloading(true);
      const response = await api.get(`/meetings/${meetingId}/stt/download`, {
        responseType: "blob",
      });

      const blob = new Blob([response.data], { type: "text/plain;charset=utf-8" });
      const downloadUrl = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = downloadUrl;
      link.setAttribute("download", `meeting_${meetingId}_stt.txt`);

      document.body.appendChild(link);
      link.click();

      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(downloadUrl);

    } catch (error) {
      console.error("STT 원문 다운로드 실패:", error);
      alert("파일 다운로드에 실패했습니다. 백엔드 서버 상태를 확인해주세요.");
    } finally {
      setIsDownloading(false);
    }
  };

  const meetingTitle = meeting?.agenda || "회의 분석 결과";

  // 🎯 우측 요약 전용 실시간 반응형 가드 선언
  const rawSummary = meeting?.aiSummary || meeting?.summaryText || meeting?.summary || "";

  const renderProfessionalSummary = () => {
    if (!rawSummary) {
      return <p className="text-gray-400">회의 분석 텍스트 요약본 수집 진행 중...</p>;
    }

    try {
      if (typeof rawSummary === "string" && (rawSummary.trim().startsWith("[") || rawSummary.trim().startsWith("{"))) {
        const parsed = JSON.parse(rawSummary);

        if (Array.isArray(parsed)) {
          return (
            <ul className="space-y-[10px] list-none pl-0">
              {parsed.map((sentence, idx) => (
                <li key={idx} className="flex items-start gap-[8px] text-[14px] text-black leading-[24px]">
                  <span className="text-[#4A8DFF] mt-[1px]">ㆍ</span>
                  <span>{sentence}</span>
                </li>
              ))}
            </ul>
          );
        }
      }
    } catch (e) {
      console.log("JSON 파싱 패스, 일반 텍스트 포맷팅 가동");
    }

    return (
      <p className="text-[14px] leading-[26px] text-black whitespace-pre-wrap">
        {rawSummary.replace(/[\[\]"']/g, "")}
      </p>
    );
  };

  // 🎯 [실시간 렌더링 핵교정] 
  // 함수 내부에 변수를 배치하여, 상태(State)가 바뀔 때마다 최신 백엔드 데이터를 즉시 추적하도록 동적 렌더러 함수로 갱신 완료!
  const renderDecisionBoxContent = () => {
    const activeDecisions = meeting?.decisions || [];
    const activeSummaryForDecision = meeting?.aiSummary || meeting?.summaryText || meeting?.summary || "";

    // 1순위: 백엔드가 리얼 decisions 배열 데이터를 넘겨줬을 경우
    if (Array.isArray(activeDecisions) && activeDecisions.length > 0) {
      return activeDecisions.map((decision, index) => (
        <p key={index}>
          {index + 1}. {typeof decision === "string" ? decision : decision.content || decision.title}
        </p>
      ));
    }

    // 2순위: decisions 배열은 비어있지만 요약 텍스트 주머니가 채워져 있을 경우
    if (activeSummaryForDecision && String(activeSummaryForDecision).trim() !== "") {
      try {
        const cleanStr = String(activeSummaryForDecision).trim();
        if (cleanStr.startsWith("[") || cleanStr.includes("[")) {
          const targetJson = cleanStr.substring(cleanStr.indexOf("["), cleanStr.lastIndexOf("]") + 1);
          const parsed = JSON.parse(targetJson);

          if (Array.isArray(parsed) && parsed.length > 0) {
            return (
              <div className="space-y-[8px]">
                {parsed.map((str, idx) => (
                  <p key={idx} className="flex items-start gap-[6px]">
                    <span className="text-[#4A8DFF] mt-[2px]">ㆍ</span>
                    <span className="text-[14px] text-black leading-[24px]">
                      {String(str).replace(/[\[\]"']/g, "").trim()}
                    </span>
                  </p>
                ))}
              </div>
            );
          }
        }
      } catch (e) {
        console.log("결정사항 내부 파싱 예외 복구 진행");
      }

      // 일반 통문자열 형태일 경우 대괄호를 걷어내고 정형화 출력
      return (
        <p className="whitespace-pre-wrap text-[14px] text-black leading-[24px]">
          ㆍ{String(activeSummaryForDecision).replace(/[\[\]"']/g, "").trim()}
        </p>
      );
    }

    // 3순위: 백엔드 데이터가 아예 통째로 비어있을 때 가이드라인 출력
    return <p className="text-gray-400">ㆍAI 분석 기반 자동 의사결정 요약 완료</p>;
  };

  return (
    <Layout>
      <Breadcrumb items={["home", "meeting", "meetingResult"]} />

      {isLoading && (
        <div className="w-[980px] h-[460px] mx-auto border border-[#C9DEFA] bg-white flex items-center justify-center text-[15px] text-gray-400 shadow-sm animate-pulse">
          KNOTE AI 협업 엔진이 회의 내용을 분석 요약하는 중입니다...
        </div>
      )}

      {!isLoading && errorMessage && (
        <div className="w-[980px] h-[460px] mx-auto border border-[#C9DEFA] bg-white flex flex-col items-center justify-center text-center shadow-sm">
          <p className="text-[15px] font-semibold text-black mb-[12px]">결과 조회 실패</p>
          <p className="text-[13px] leading-[22px] text-red-500 max-w-[520px]">{errorMessage}</p>
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

              <button
                onClick={handleDownloadTranscript}
                disabled={isDownloading}
                className={`w-[114px] h-[30px] bg-[#4A8DFF] text-white text-[13px] rounded-[3px] font-medium transition-colors hover:bg-[#4A8DFF]/90 active:bg-[#4A8DFF]/80 ${
                  isDownloading ? "opacity-60 cursor-not-allowed" : ""
                }`}
              >
                {isDownloading ? "받는 중..." : "원문 다운로드"}
              </button>
            </div>

            <div className="w-full border border-[#C9DEFA] bg-white mb-[28px] shadow-sm">
              <div className="h-[42px] border-b border-[#C9DEFA] bg-[#EAF1FC] flex items-center px-[18px]">
                <span className="text-[15px] font-semibold text-black">회의 결정사항</span>
              </div>

              <div className="px-[20px] py-[18px] text-[14px] leading-[30px] text-black min-h-[150px]">
                {renderDecisionBoxContent()}
              </div>
            </div>

            <div className="w-full border border-[#C9DEFA] bg-white shadow-sm">
              <div className="h-[42px] border-b border-[#C9DEFA] bg-[#EAF1FC] flex items-center px-[18px]">
                <span className="text-[15px] font-semibold text-black">AI TODO</span>
              </div>

              <div className="px-[20px] py-[18px] min-h-[170px]">
                {actionItems.length > 0 ? (
                  <div className="space-y-[12px] text-[14px] text-black">
                    {actionItems.map((item) => (
                      <label key={item.id} className="flex items-center justify-between gap-[10px] cursor-pointer">
                        <div className="flex items-center gap-[10px]">
                          <input type="checkbox" defaultChecked={item.done} className="w-[15px] h-[15px] accent-[#4A8DFF]" />
                          <span>{item.title}</span>
                        </div>
                        <span className="text-[13px] text-black whitespace-nowrap">{item.assignee}</span>
                      </label>
                    ))}
                  </div>
                ) : (
                  <p className="text-[14px] text-gray-500">백엔드 응답에 액션아이템 데이터가 없습니다.</p>
                )}
              </div>
            </div>
          </div>

          {/* Right column */}
          <div className="space-y-[24px]">
            <SectionBox title="AI 회의 요약">
              {renderProfessionalSummary()}
            </SectionBox>

            <div className="border border-[#C9DEFA] bg-white h-[386px] overflow-hidden shadow-sm">
              <div className="h-[42px] border-b border-[#C9DEFA] bg-[#EAF1FC] flex items-center px-[18px]">
                <span className="text-[15px] font-semibold text-black">STT 변환 결과 원문</span>
              </div>

              <div className="h-[342px] overflow-y-auto px-[20px] py-[18px] text-[14px] text-black leading-[24px] bg-gray-50/30">
                {transcriptList.length > 0 ? (
                  transcriptList.map((segment, index) => (
                    <div key={index} className="mb-[22px] bg-white p-[12px] border border-gray-100 rounded-[3px]">
                      <p className="font-bold text-[13px] text-[#4A8DFF] mb-[6px]">
                        {segment.speaker}
                      </p>
                      <p className="text-[13px] text-black">{segment.text}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-center pt-[100px]">음성 변환 데이터 스크립트 원문이 존재하지 않습니다.</p>
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