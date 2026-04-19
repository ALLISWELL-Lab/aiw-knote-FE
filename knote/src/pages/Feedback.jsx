import Layout from "../components/Layout";

function Feedback() {
  return (
    <Layout>
      <div className="mb-8">
        <p className="text-sm text-gray-500 mb-2">Home / 피드백</p>
        <h2 className="text-2xl font-bold text-gray-900">AI 피드백</h2>
        <p className="text-sm text-gray-500 mt-1">
          회의와 주간 진행 내용을 바탕으로 협업 피드백을 확인할 수 있습니다.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {/* 회의 피드백 */}
        <div className="bg-white rounded-3xl shadow-md p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-semibold text-gray-800">회의 피드백</h3>
            <span className="text-xs px-2 py-1 rounded-full bg-blue-50 text-blue-600">
              Meeting
            </span>
          </div>

          <div className="space-y-4 text-sm text-gray-700">
            <div className="border border-gray-200 rounded-2xl p-4 bg-[#F5F7FB] shadow-sm leading-6">
              회의 안건은 명확했지만, 일부 업무 담당이 구체적으로 정리되지 않았습니다.
            </div>

            <div className="border border-gray-200 rounded-2xl p-4 bg-[#F5F7FB] shadow-sm leading-6">
              다음 회의에서는 업무 우선순위를 먼저 정하면 더 효율적입니다.
            </div>
          </div>
        </div>

        {/* 주간 피드백 */}
        <div className="bg-white rounded-3xl shadow-md p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-semibold text-gray-800">주간 피드백</h3>
            <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-500">
              Weekly
            </span>
          </div>

          <div className="space-y-4 text-sm text-gray-700">
            <div className="border border-gray-200 rounded-2xl p-4 bg-[#F5F7FB] shadow-sm leading-6">
              전체 진행률이 안정적으로 올라가고 있습니다.
            </div>

            <div className="border border-gray-200 rounded-2xl p-4 bg-[#F5F7FB] shadow-sm leading-6">
              프론트엔드 작업이 본격적으로 시작되면서 협업 가시성이 좋아졌습니다.
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Feedback;