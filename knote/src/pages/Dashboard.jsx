import Layout from "../components/Layout";

function Dashboard() {
  return (
    <Layout>
      {/* 헤더 */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Dashboard</h2>
        <p className="text-sm text-gray-500 mt-1">
          프로젝트 현황과 개인 작업을 한눈에 확인해보세요.
        </p>
      </div>

      {/* 상단 */}
      <div className="grid grid-cols-3 gap-6">
        {/* TODO */}
        <div className="bg-white rounded-3xl shadow-md p-6 border border-gray-100">
          <h3 className="font-semibold text-gray-800 mb-5">TODO</h3>

          <div className="space-y-4 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-gray-700">API 명세 정리</span>
              <span className="text-green-500">●</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-gray-700">화면 와이어프레임</span>
              <span className="text-green-500">●</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-gray-700">로그인 기능</span>
              <span className="text-amber-400">●</span>
            </div>
          </div>
        </div>

        {/* 진행률 */}
        <div className="bg-white rounded-3xl shadow-md p-6 border border-gray-100 flex flex-col justify-between">
          <div>
            <h3 className="font-semibold text-gray-800 mb-4">
              프로젝트 진행률
            </h3>

            <div className="text-3xl font-bold text-blue-600 mb-4">67%</div>

            <div className="w-full bg-gray-100 h-3 rounded-full overflow-hidden">
              <div className="bg-blue-500 h-3 rounded-full w-2/3"></div>
            </div>
          </div>

          <p className="mt-4 text-sm text-gray-500">
            이번 주 목표 대비 안정적으로 진행 중입니다.
          </p>
        </div>

        {/* NOTE */}
        <div className="bg-white rounded-3xl shadow-md p-6 border border-gray-100">
          <h3 className="font-semibold text-gray-800 mb-5">NOTE</h3>

          <div className="text-sm text-gray-600 leading-6">
            오늘 회의 내용 정리하기
            <br />
            업로드 페이지 문구 수정
            <br />
            투두 담당자 더미데이터 정리
          </div>
        </div>
      </div>

      {/* 하단 */}
      <div className="grid grid-cols-2 gap-6 mt-6">
        {/* 캘린더 */}
        <div className="bg-white rounded-3xl shadow-md p-6 border border-gray-100">
          <h3 className="font-semibold text-gray-800 mb-4">캘린더</h3>

          <div className="h-52 rounded-2xl bg-[#F5F7FB] flex items-center justify-center text-sm text-gray-400">
            캘린더 영역
          </div>
        </div>

        {/* 개인 노트 */}
        <div className="bg-white rounded-3xl shadow-md p-6 border border-gray-100">
          <h3 className="font-semibold text-gray-800 mb-4">개인 노트</h3>

          <textarea
            className="w-full h-52 rounded-2xl border border-gray-200 bg-[#F5F7FB] p-4 text-sm outline-none focus:ring-2 focus:ring-blue-200 resize-none"
            placeholder="메모를 입력하세요..."
          />
        </div>
      </div>
    </Layout>
  );
}

export default Dashboard;