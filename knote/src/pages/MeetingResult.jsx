import Layout from "../components/Layout";

function MeetingResult() {
  return (
    <Layout>
      <div className="mb-8">
        <p className="text-sm text-gray-500 mb-2">Home / 회의 / 회의 분석</p>
        <h2 className="text-2xl font-bold text-gray-900">회의 분석 결과</h2>
        <p className="text-sm text-gray-500 mt-1">
          STT 텍스트, 회의 요약, 주요 결정사항, Action Item을 확인할 수 있습니다.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {/* 왼쪽 영역 */}
        <div className="space-y-6">
          {/* 회의 정보 */}
          <div className="bg-white rounded-3xl shadow-md p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-gray-800">회의 정보</h3>
              <button className="text-xs px-3 py-1 rounded-full bg-blue-50 text-blue-600">
                Download
              </button>
            </div>

            <p className="text-sm text-gray-700 font-medium">
              2025.12.11 - 방학 프로젝트 회의
            </p>
            <p className="text-xs text-gray-400 mt-2">
              참여자: 김이화, 이화연, 하츄핑
            </p>
          </div>

          {/* 주요 결정사항 */}
          <div className="bg-white rounded-3xl shadow-md p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-800">주요 결정사항</h3>
              <span className="text-xs px-2 py-1 rounded-full bg-blue-50 text-blue-600">
                Decisions
              </span>
            </div>

            <div className="space-y-3 text-sm text-gray-700">
              <div className="border border-gray-200 rounded-2xl p-4 bg-[#F5F7FB]">
                1. 방학 기간 내 핵심 기능 개발을 우선 완료한다.
              </div>
              <div className="border border-gray-200 rounded-2xl p-4 bg-[#F5F7FB]">
                2. 일주일에 두 번 정기 회의를 진행한다.
              </div>
              <div className="border border-gray-200 rounded-2xl p-4 bg-[#F5F7FB]">
                3. 구현 화면은 회의 후 바로 팀원끼리 함께 점검한다.
              </div>
            </div>
          </div>

          {/* Action Item */}
          <div className="bg-white rounded-3xl shadow-md p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-800">Action Item</h3>
              <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-500">
                AI Extracted
              </span>
            </div>

            <div className="space-y-3 text-sm text-gray-700">
              <div className="flex items-center justify-between border border-gray-200 rounded-2xl p-4 bg-[#F5F7FB]">
                <span>로그인 화면 구현</span>
                <span className="text-blue-600 font-medium">김이화</span>
              </div>
              <div className="flex items-center justify-between border border-gray-200 rounded-2xl p-4 bg-[#F5F7FB]">
                <span>STT 결과 API 정리</span>
                <span className="text-blue-600 font-medium">이화연</span>
              </div>
              <div className="flex items-center justify-between border border-gray-200 rounded-2xl p-4 bg-[#F5F7FB]">
                <span>발표 흐름 정리</span>
                <span className="text-blue-600 font-medium">하츄핑</span>
              </div>
            </div>
          </div>
        </div>

        {/* 오른쪽 영역 */}
        <div className="space-y-6">
          {/* AI 요약 */}
          <div className="bg-white rounded-3xl shadow-md p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-800">AI 회의 요약</h3>
              <span className="text-xs px-2 py-1 rounded-full bg-blue-50 text-blue-600">
                Summary
              </span>
            </div>

            <div className="text-sm text-gray-700 leading-7 space-y-3">
              <p className="border border-gray-200 rounded-2xl p-4 bg-[#F5F7FB]">
                이번 회의에서는 중간발표 전까지 구현할 핵심 기능 범위를 STT, 회의 요약, Action Item 자동 추출로 정리하였다.
              </p>
              <p className="border border-gray-200 rounded-2xl p-4 bg-[#F5F7FB]">
                팀원들은 회의 업로드 이후 분석 결과 화면을 중심으로 발표 흐름을 구성하기로 합의하였다.
              </p>
            </div>
          </div>

          {/* STT 텍스트 */}
          <div className="bg-white rounded-3xl shadow-md p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-800">STT 텍스트 변환 결과</h3>
              <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-500">
                Transcript
              </span>
            </div>

            <div className="h-[420px] overflow-y-auto rounded-2xl border border-gray-200 bg-[#F5F7FB] p-4 text-sm text-gray-700 leading-7 space-y-4">
              <p>
                김이화: 이번 중간발표에서는 전체 기능을 욕심내기 보다 핵심 기능 위주로 보여주는 게 좋을 것 같아요.
              </p>
              <p>
                이화연: 그럼 STT 변환이랑 요약, 그리고 Action Item까지 연결되는 흐름을 먼저 완성하는 게 맞겠네요.
              </p>
              <p>
                하츄핑: 회의 업로드 페이지에서 바로 분석 결과 페이지로 넘어가게 하면 발표 흐름도 깔끔할 것 같아요.
              </p>
              <p>
                김이화: 맞아요. 분석 결과 페이지에서 주요 결정사항이랑 AI TODO 리스트가 같이 보이면 교수님도 이해하시기 쉬울 것 같아요.
              </p>
              <p>
                이화연: 백엔드 작업은 마무리했습니다. 프론트엔드와 연동만 하면 완성될 것 같아요.
              </p>
              <p>
                하츄핑: 그럼 발표에서는 이 흐름을 먼저 보여주고, 이후 확장 기능은 추후 구현 예정으로 설명하면 좋겠습니다.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default MeetingResult;