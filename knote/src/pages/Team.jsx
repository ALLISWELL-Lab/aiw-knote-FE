import Layout from "../components/Layout";

function MemberAvatar({ name, color = "#4A8DFF" }) {
  return (
    <div
      className="w-[44px] h-[44px] rounded-full flex items-center justify-center text-white text-[14px] font-semibold shrink-0"
      style={{ backgroundColor: color }}
    >
      {name}
    </div>
  );
}

function Tag({ children }) {
  return (
    <span className="h-[22px] px-[7px] border border-[#C9DEFA] bg-[#EAF1FC] text-black text-[12px] flex items-center rounded-[3px]">
      {children}
    </span>
  );
}

function MemberRow({ initial, name, role, tags, status, color }) {
  return (
    <div className="grid grid-cols-[56px_1fr_110px_120px] items-center min-h-[72px] border-b border-[#C9DEFA] px-[16px] text-black">
      <MemberAvatar name={initial} color={color} />

      <div>
        <p className="text-[14px] font-semibold text-black">{name}</p>
        <div className="flex gap-[6px] mt-[7px]">
          {tags.map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </div>
      </div>

      <div className="text-[13px] text-black">{role}</div>

      <div className="flex items-center gap-[8px] text-[13px] text-black">
        <span
          className={`w-[9px] h-[9px] rounded-full ${
            status === "온라인" ? "bg-[#4A8DFF]" : "bg-gray-300"
          }`}
        />
        {status}
      </div>
    </div>
  );
}

function ProgressBar({ label, value }) {
  return (
    <div>
      <div className="flex items-center justify-between text-[13px] text-black mb-[6px]">
        <span>{label}</span>
        <span className="font-semibold">{value}%</span>
      </div>
      <div className="w-full h-[9px] bg-[#C9DEFA]">
        <div
          className="h-full bg-[#4A8DFF]"
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}

function TeamNotice({ title, content }) {
  return (
    <div className="border border-[#C9DEFA] bg-white px-[12px] py-[10px]">
      <p className="text-[13px] font-semibold text-black mb-[5px]">
        {title}
      </p>
      <p className="text-[12px] leading-[18px] text-black">{content}</p>
    </div>
  );
}

function Team() {
  return (
    <Layout>
      {/* Breadcrumb */}
      <div className="flex items-center gap-[10px] text-[14px] text-black mb-[18px]">
        <span className="font-semibold">⌂ Home</span>
        <span className="text-gray-400">/</span>
        <span>팀</span>
        <span className="text-gray-400">/</span>
        <span className="font-semibold">팀 관리</span>
      </div>

      <div className="h-px bg-[#C9DEFA] mb-[38px]" />

      <div className="w-[980px] mx-auto">
        {/* Top summary */}
        <div className="grid grid-cols-[1fr_280px] gap-[28px] mb-[28px]">
          {/* Team profile */}
          <div className="border border-[#C9DEFA] bg-white shadow-sm">
            <div className="h-[44px] border-b border-[#C9DEFA] bg-[#EAF1FC] flex items-center justify-between px-[18px]">
              <span className="text-[15px] font-semibold text-black">
                팀 정보
              </span>

              <button className="w-[74px] h-[28px] bg-[#4A8DFF] text-white text-[13px]">
                팀 초대
              </button>
            </div>

            <div className="px-[22px] py-[22px] flex items-start gap-[22px]">
              <div className="w-[86px] h-[86px] rounded-[8px] bg-[#ADDCFF] border border-[#C9DEFA] flex items-center justify-center text-black text-[26px] font-semibold">
                K
              </div>

              <div className="flex-1">
                <div className="flex items-center gap-[10px] mb-[12px]">
                  <h2 className="text-[22px] font-semibold text-black">
                    KNOTE
                  </h2>
                  <span className="h-[23px] px-[8px] bg-[#EAF1FC] border border-[#C9DEFA] text-black text-[12px] flex items-center">
                    졸업프로젝트
                  </span>
                </div>

                <p className="text-[14px] leading-[23px] text-black mb-[16px]">
                  회의 내용을 기반으로 STT 변환, AI 요약, Action Item 추출,
                  팀 피드백을 제공하는 프로젝트 관리 서비스입니다.
                </p>

                <div className="grid grid-cols-3 gap-[12px]">
                  <div className="h-[54px] border border-[#C9DEFA] bg-white flex flex-col items-center justify-center">
                    <p className="text-[18px] font-semibold text-black">5</p>
                    <p className="text-[12px] text-black">팀원</p>
                  </div>

                  <div className="h-[54px] border border-[#C9DEFA] bg-white flex flex-col items-center justify-center">
                    <p className="text-[18px] font-semibold text-black">12</p>
                    <p className="text-[12px] text-black">TODO</p>
                  </div>

                  <div className="h-[54px] border border-[#C9DEFA] bg-white flex flex-col items-center justify-center">
                    <p className="text-[18px] font-semibold text-black">67%</p>
                    <p className="text-[12px] text-black">진행률</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Team status */}
          <div className="border border-[#C9DEFA] bg-white shadow-sm">
            <div className="h-[44px] border-b border-[#C9DEFA] bg-[#EAF1FC] flex items-center px-[18px]">
              <span className="text-[15px] font-semibold text-black">
                팀 현황
              </span>
            </div>

            <div className="px-[18px] py-[18px] space-y-[18px]">
              <ProgressBar label="프론트엔드" value={72} />
              <ProgressBar label="백엔드" value={61} />
              <ProgressBar label="기획/문서" value={80} />
              <ProgressBar label="UI 디자인" value={68} />
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="grid grid-cols-[1fr_300px] gap-[28px]">
          {/* Member list */}
          <div className="border border-[#C9DEFA] bg-white shadow-sm">
            <div className="h-[44px] border-b border-[#C9DEFA] bg-[#EAF1FC] flex items-center justify-between px-[18px]">
              <span className="text-[15px] font-semibold text-black">
                팀원 목록
              </span>

              <div className="flex items-center gap-[8px]">
                <button className="w-[72px] h-[28px] bg-white border border-[#C9DEFA] text-black text-[13px]">
                  역할 수정
                </button>
                <button className="w-[72px] h-[28px] bg-[#4A8DFF] text-white text-[13px]">
                  저장
                </button>
              </div>
            </div>

            <div className="grid grid-cols-[56px_1fr_110px_120px] h-[34px] border-b border-[#C9DEFA] bg-[#ADDCFF] px-[16px] text-[13px] text-black font-semibold">
              <div />
              <div className="flex items-center">이름 / 기술 태그</div>
              <div className="flex items-center">역할</div>
              <div className="flex items-center">상태</div>
            </div>

            <MemberRow
              initial="이"
              name="이화연"
              role="프론트엔드"
              status="온라인"
              color="#4A8DFF"
              tags={["React", "UI", "연동"]}
            />

            <MemberRow
              initial="감"
              name="김이화"
              role="백엔드"
              status="온라인"
              color="#74A8FF"
              tags={["Spring", "API", "DB"]}
            />

            <MemberRow
              initial="하"
              name="하츄핑"
              role="기획"
              status="오프라인"
              color="#ADDCFF"
              tags={["기획", "문서", "발표"]}
            />

            <MemberRow
              initial="전"
              name="전우치"
              role="디자인"
              status="온라인"
              color="#8DBFFF"
              tags={["Figma", "UX", "프로토타입"]}
            />

            <MemberRow
              initial="홍"
              name="홍길동"
              role="QA"
              status="오프라인"
              color="#C9DEFA"
              tags={["테스트", "검수", "시연"]}
            />
          </div>

          {/* Right panel */}
          <div className="space-y-[20px]">
            {/* Invitation */}
            <div className="border border-[#C9DEFA] bg-white shadow-sm">
              <div className="h-[40px] border-b border-[#C9DEFA] bg-[#EAF1FC] flex items-center px-[16px] text-[14px] font-semibold text-black">
                팀 초대 링크
              </div>

              <div className="px-[16px] py-[16px]">
                <div className="h-[34px] border border-[#C9DEFA] bg-white flex items-center px-[10px] text-[12px] text-black mb-[12px] truncate">
                  https://knote.ai/team/invite/KNOTE
                </div>

                <div className="flex justify-end gap-[8px]">
                  <button className="w-[58px] h-[28px] bg-white border border-[#C9DEFA] text-black text-[13px]">
                    복사
                  </button>
                  <button className="w-[58px] h-[28px] bg-[#4A8DFF] text-white text-[13px]">
                    공유
                  </button>
                </div>
              </div>
            </div>

            {/* Notice */}
            <div className="border border-[#C9DEFA] bg-white shadow-sm">
              <div className="h-[40px] border-b border-[#C9DEFA] bg-[#EAF1FC] flex items-center px-[16px] text-[14px] font-semibold text-black">
                팀 공지
              </div>

              <div className="px-[14px] py-[14px] space-y-[10px]">
                <TeamNotice
                  title="API 응답 구조 확인"
                  content="백엔드 서버 실행 후 회의 업로드 응답의 meetingId 필드를 확인해야 합니다."
                />

                <TeamNotice
                  title="회의 분석 화면 QA"
                  content="STT 결과, AI 요약, Action Item 데이터가 화면에 정상 표시되는지 확인합니다."
                />

                <TeamNotice
                  title="다음 회의"
                  content="이번 주 금요일 오후 4시에 프론트-백엔드 연동 점검 회의를 진행합니다."
                />
              </div>
            </div>

            {/* Role summary */}
            <div className="border border-[#C9DEFA] bg-white shadow-sm">
              <div className="h-[40px] border-b border-[#C9DEFA] bg-[#EAF1FC] flex items-center px-[16px] text-[14px] font-semibold text-black">
                역할 분포
              </div>

              <div className="px-[16px] py-[16px] text-[13px] leading-[24px] text-black">
                <p>ㆍ프론트엔드: 1명</p>
                <p>ㆍ백엔드: 1명</p>
                <p>ㆍ기획/문서: 1명</p>
                <p>ㆍ디자인: 1명</p>
                <p>ㆍQA: 1명</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Team;