import Layout from "../components/Layout";

function Team() {
  return (
    <Layout>
      <div className="mb-8">
        <p className="text-sm text-gray-500 mb-2">Home / 팀</p>
        <h2 className="text-2xl font-bold text-gray-900">팀 관리</h2>
        <p className="text-sm text-gray-500 mt-1">
          팀원 정보, 역할 분담, 현재 담당 업무를 확인할 수 있습니다.
        </p>
      </div>

      {/* 상단: 팀원 카드 */}
      <div className="grid grid-cols-3 gap-6 mb-6">
        {/* 팀원 1 */}
        <div className="bg-white rounded-3xl shadow-md p-6 border border-gray-100">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 rounded-2xl bg-teal-500" />
            <div>
              <h3 className="font-semibold text-gray-900">김이화</h3>
              <p className="text-sm text-gray-500">Frontend</p>
            </div>
          </div>

          <div className="flex gap-2 mb-4">
            <span className="text-xs px-2 py-1 rounded-full bg-blue-50 text-blue-600">
              React
            </span>
            <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-600">
              UI
            </span>
          </div>

          <div className="text-sm text-gray-600 leading-6">
            대시보드, 회의 업로드/분석 화면 퍼블리싱 및 프론트 구조 설계 담당
          </div>
        </div>

        {/* 팀원 2 */}
        <div className="bg-white rounded-3xl shadow-md p-6 border border-gray-100">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 rounded-2xl bg-blue-400" />
            <div>
              <h3 className="font-semibold text-gray-900">이화연</h3>
              <p className="text-sm text-gray-500">Backend</p>
            </div>
          </div>

          <div className="flex gap-2 mb-4">
            <span className="text-xs px-2 py-1 rounded-full bg-blue-50 text-blue-600">
              API
            </span>
            <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-600">
              DB
            </span>
          </div>

          <div className="text-sm text-gray-600 leading-6">
            STT 처리, AI 분석 결과 응답, 데이터 저장 구조 및 서버 로직 담당
          </div>
        </div>

        {/* 팀원 3 */}
        <div className="bg-white rounded-3xl shadow-md p-6 border border-gray-100">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 rounded-2xl bg-purple-400" />
            <div>
              <h3 className="font-semibold text-gray-900">하츄핑</h3>
              <p className="text-sm text-gray-500">Planning</p>
            </div>
          </div>

          <div className="flex gap-2 mb-4">
            <span className="text-xs px-2 py-1 rounded-full bg-blue-50 text-blue-600">
              PM
            </span>
            <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-600">
              Docs
            </span>
          </div>

          <div className="text-sm text-gray-600 leading-6">
            기능 정의, 발표 자료 구성, 회의 정리 및 프로젝트 산출물 관리 담당
          </div>
        </div>
      </div>

      {/* 하단: 역할 분담 + 팀원 리스트 */}
      <div className="grid grid-cols-2 gap-6">
        {/* 역할 분담 현황 */}
        <div className="bg-white rounded-3xl shadow-md p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-semibold text-gray-800">역할 분담 현황</h3>
            <span className="text-xs px-2 py-1 rounded-full bg-blue-50 text-blue-600">
              Current Roles
            </span>
          </div>

          <div className="space-y-4 text-sm text-gray-700">
            <div className="flex items-center justify-between border border-gray-200 rounded-2xl p-4 bg-[#F5F7FB] shadow-sm">
              <div>
                <p className="text-gray-900">프론트엔드 퍼블리싱</p>
                <p className="text-xs text-gray-400 mt-1">UI / Routing / Layout</p>
              </div>
              <span className="text-blue-600 font-medium">김이화</span>
            </div>

            <div className="flex items-center justify-between border border-gray-200 rounded-2xl p-4 bg-[#F5F7FB] shadow-sm">
              <div>
                <p className="text-gray-900">STT 및 결과 API 개발</p>
                <p className="text-xs text-gray-400 mt-1">Server / AI Response</p>
              </div>
              <span className="text-blue-600 font-medium">박백엔</span>
            </div>

            <div className="flex items-center justify-between border border-gray-200 rounded-2xl p-4 bg-[#F5F7FB] shadow-sm">
              <div>
                <p className="text-gray-900">기획 및 발표 자료 정리</p>
                <p className="text-xs text-gray-400 mt-1">PM / Documentation</p>
              </div>
              <span className="text-blue-600 font-medium">최기획</span>
            </div>
          </div>
        </div>

        {/* 팀원 리스트 */}
        <div className="bg-white rounded-3xl shadow-md p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-semibold text-gray-800">팀원 리스트</h3>
            <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-500">
              3 Members
            </span>
          </div>

          <div className="space-y-3 text-sm text-gray-700">
            <div className="border border-gray-200 rounded-2xl p-4 bg-[#F5F7FB] shadow-sm">
              <div className="flex items-center justify-between">
                <span className="font-medium text-gray-900">김이화</span>
                <span className="text-xs px-2 py-1 rounded-full bg-blue-50 text-blue-600">
                  Frontend
                </span>
              </div>
              <p className="text-xs text-gray-400 mt-2">
                React, Tailwind, 화면 구현
              </p>
            </div>

            <div className="border border-gray-200 rounded-2xl p-4 bg-[#F5F7FB] shadow-sm">
              <div className="flex items-center justify-between">
                <span className="font-medium text-gray-900">이화연</span>
                <span className="text-xs px-2 py-1 rounded-full bg-blue-50 text-blue-600">
                  Backend
                </span>
              </div>
              <p className="text-xs text-gray-400 mt-2">
                API, DB, STT 결과 처리
              </p>
            </div>

            <div className="border border-gray-200 rounded-2xl p-4 bg-[#F5F7FB] shadow-sm">
              <div className="flex items-center justify-between">
                <span className="font-medium text-gray-900">하츄핑</span>
                <span className="text-xs px-2 py-1 rounded-full bg-blue-50 text-blue-600">
                  Planning
                </span>
              </div>
              <p className="text-xs text-gray-400 mt-2">
                기획 정리, 발표자료, 일정 관리
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Team;