import Layout from "../components/Layout";

function Todo() {
  return (
    <Layout>
      <div className="mb-8">
        <p className="text-sm text-gray-500 mb-2">Home / 투두</p>
        <h2 className="text-2xl font-bold text-gray-900">투두 관리</h2>
        <p className="text-sm text-gray-500 mt-1">
          회의에서 추출된 작업과 담당자 매칭 현황을 확인할 수 있습니다.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {/* 왼쪽: 추출된 TODO */}
        <div className="bg-white rounded-3xl shadow-md p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-semibold text-gray-800">회의에서 추출된 TODO</h3>
            <span className="text-xs px-2 py-1 rounded-full bg-blue-50 text-blue-600">
              3 Tasks
            </span>
          </div>

          <div className="space-y-4 text-sm text-gray-700">
            <div className="border border-gray-200 rounded-2xl p-4 bg-[#F5F7FB] shadow-sm flex items-center justify-between">
              <span>로그인 페이지 퍼블리싱</span>
              <span className="text-amber-400">●</span>
            </div>

            <div className="border border-gray-200 rounded-2xl p-4 bg-[#F5F7FB] shadow-sm flex items-center justify-between">
              <span>회의 녹음 기능 API 연결</span>
              <span className="text-green-500">●</span>
            </div>

            <div className="border border-gray-200 rounded-2xl p-4 bg-[#F5F7FB] shadow-sm flex items-center justify-between">
              <span>발표 자료 초안 정리</span>
              <span className="text-blue-500">●</span>
            </div>
          </div>
        </div>

        {/* 오른쪽: 담당자 매칭 */}
        <div className="bg-white rounded-3xl shadow-md p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-semibold text-gray-800">담당자 매칭</h3>
            <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-500">
              Assigned
            </span>
          </div>

          <div className="space-y-4 text-sm text-gray-700">
            <div className="flex items-center justify-between border border-gray-200 rounded-2xl p-4 bg-[#F5F7FB] shadow-sm">
              <div>
                <p className="text-gray-800">로그인 페이지 퍼블리싱</p>
                <p className="text-xs text-gray-400 mt-1">Frontend</p>
              </div>
              <span className="text-blue-600 font-medium">김이화</span>
            </div>

            <div className="flex items-center justify-between border border-gray-200 rounded-2xl p-4 bg-[#F5F7FB] shadow-sm">
              <div>
                <p className="text-gray-800">회의 녹음 기능 API 연결</p>
                <p className="text-xs text-gray-400 mt-1">Backend</p>
              </div>
              <span className="text-blue-600 font-medium">박백엔</span>
            </div>

            <div className="flex items-center justify-between border border-gray-200 rounded-2xl p-4 bg-[#F5F7FB] shadow-sm">
              <div>
                <p className="text-gray-800">발표 자료 초안 정리</p>
                <p className="text-xs text-gray-400 mt-1">Planning</p>
              </div>
              <span className="text-blue-600 font-medium">최기획</span>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Todo;