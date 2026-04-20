import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Layout from "../components/Layout";
import api from "../api";

function MeetingResult() {
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sttContent, setSttContent] = useState(""); 

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const meetingId = queryParams.get('id');
  console.log("현재 요청하려는 ID:", meetingId);

  useEffect(() => {
// meetingId가 없거나 문자열 "null"인 경우 실행 방지
  if (!meetingId || meetingId === "null") {
    console.warn("ID가 없어서 요청을 중단합니다.");
    setLoading(false);
    return;
  }

    const fetchData = async () => {
  try {
    console.log("요청 주소:", `/meetings/${meetingId}`);
    const response = await api.get(`/meetings/${meetingId}`);
    const data = response.data;

    // 데이터가 있나 확인
      const hasSummary = data.summaryText && data.summaryText !== "[]";

    let summaryList = [];
    try {
      summaryList = data.summaryText ? JSON.parse(data.summaryText) : [];
    } catch (e) {
      summaryList = [data.summaryText];
    }

    setAnalysis({ ...data, displaySummary: summaryList });

    if (data.transcript) {
        setSttContent(data.transcript);
      }
      
    setLoading(false);

    

    // [핵심] 만약 아직 요약이 없다면? 3초 뒤에 한 번 더 시도 (자동 새로고침 효과)
      if (!hasSummary) {
        setTimeout(fetchData, 3000); 
      }

  } catch (error) {
    console.error("데이터 로딩 중 에러 발생:", error);
  } finally {
    setLoading(false);
  }
};
    fetchData();
  }, [meetingId]);

  // 실제 파일 다운로드 함수
  const handleDownload = () => {
    if (!sttContent) {
      alert("다운로드할 STT 원문이 없습니다.");
      return;
    }
    const element = document.createElement("a");
    const file = new Blob([sttContent], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `meeting_${meetingId}_script.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element); // 깔끔하게 제거
  };

  if (loading) return <Layout><div className="p-10 text-center">회의 결과를 분석 중입니다...</div></Layout>;
  if (!analysis) return <Layout><div className="p-10 text-center">데이터를 찾을 수 없습니다.</div></Layout>;

// 데이터가 없을 때 보여줄 스켈레톤 UI 컴포넌트
  const SkeletonLoader = ({ text }) => (
    <div className="animate-pulse space-y-3 py-4">
      <div className="h-16 bg-gray-100 rounded-2xl w-full"></div>
      <div className="h-16 bg-gray-100 rounded-2xl w-full"></div>
      <p className="text-xs text-blue-500 font-medium animate-bounce text-center mt-2">
        {text}
      </p>
    </div>
  );

  if (loading) return <Layout><div className="p-10 text-center">분석 준비 중...</div></Layout>;
  if (!analysis) return <Layout><div className="p-10 text-center">데이터를 찾을 수 없습니다.</div></Layout>;

  return (
    <Layout>
      <div className="mb-8 flex justify-between items-end">
        <div>
          <p className="text-sm text-gray-500 mb-1">Home / 회의 / 분석 결과</p>
          <h2 className="text-2xl font-bold text-gray-900">회의 분석 결과</h2>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 왼쪽 컬럼 */}
        <div className="space-y-6">
          {/* 1. 회의 정보 & 다운로드 버튼 */}
          <div className="bg-white rounded-3xl shadow-md p-6 border border-gray-100">
            <div className="flex justify-between items-start mb-4">
              <h3 className="font-semibold text-gray-800">회의 정보</h3>
              <button 
                onClick={handleDownload}
                className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 text-blue-600 rounded-full hover:bg-blue-100 transition-colors text-xs font-bold border border-blue-100"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                원문 다운로드
              </button>
            </div>
            <p className="text-lg text-gray-700 font-bold mb-1">{analysis.agenda || "새로운 회의"}</p>
            <p className="text-xs text-gray-400">Meeting ID: {analysis.meetingId}</p>
          </div>

          {/* 2. 주요 결정사항 */}
          <div className="bg-white rounded-3xl shadow-md p-6 border border-gray-100">
            <h3 className="font-semibold text-gray-800 mb-4">주요 결정사항</h3>
            <div className="space-y-3 text-sm text-gray-700">
              {analysis.displaySummary && analysis.displaySummary.length > 0 ? (
                analysis.displaySummary.slice(0, 2).map((item, index) => (
                  <div key={index} className="border border-gray-200 rounded-2xl p-4 bg-[#F5F7FB]">
                    <span className="font-bold text-blue-600 mr-2">{index + 1}.</span> {item}
                  </div>
                ))
              ) : (
                <SkeletonLoader text="AI가 결정사항을 추출하고 있습니다..." />
              )}
            </div>
          </div>

          {/* 3. Action Item */}
          <div className="bg-white rounded-3xl shadow-md p-6 border border-gray-100">
            <h3 className="font-semibold text-gray-800 mb-4">Action Item</h3>
            <div className="space-y-3">
              {analysis.actionItems && analysis.actionItems.length > 0 ? (
                analysis.actionItems.map((item) => (
                  <div key={item.id} className="flex flex-col border border-gray-200 rounded-2xl p-4 bg-[#F5F7FB]">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-sm text-gray-800">{item.title}</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${item.isCompleted ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'}`}>
                        {item.isCompleted ? "완료" : "진행중"}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">{item.memo}</p>
                  </div>
                ))
              ) : (
                <SkeletonLoader text="AI가 할 일을 정리하고 있습니다..." />
              )}
            </div>
          </div>
        </div>

        {/* 오른쪽 컬럼 */}
        <div className="space-y-6">
          {/* 4. AI 회의 요약 */}
          <div className="bg-white rounded-3xl shadow-md p-6 border border-gray-100">
            <h3 className="font-semibold text-gray-800 mb-4">AI 회의 요약</h3>
            <div className="text-sm text-gray-700 leading-7 space-y-3">
              {analysis.displaySummary && analysis.displaySummary.length > 0 ? (
                analysis.displaySummary.map((segment, index) => (
                  <p key={index} className="border border-gray-200 rounded-2xl p-4 bg-[#F5F7FB]">{segment}</p>
                ))
              ) : (
                <SkeletonLoader text="AI가 회의 내용을 요약 중입니다..." />
              )}
            </div>
          </div>

          {/* 5. STT 텍스트 미리보기 */}
          <div className="bg-white rounded-3xl shadow-md p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-800">STT 텍스트 변환 결과</h3>
              <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-500">Transcript Preview</span>
            </div>
            <div className="h-[420px] overflow-y-auto rounded-2xl border border-gray-200 bg-[#F5F7FB] p-4 text-sm text-gray-700 leading-7 whitespace-pre-wrap">
              {sttContent || "STT 텍스트를 불러오는 중입니다..."}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default MeetingResult;