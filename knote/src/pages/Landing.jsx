function GoogleIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 18 18"
      aria-hidden="true"
      className="shrink-0"
    >
      <path
        fill="#4285F4"
        d="M17.64 9.2c0-.64-.06-1.25-.16-1.84H9v3.48h4.84c-.21 1.12-.84 2.07-1.8 2.71v2.25h2.91c1.7-1.57 2.69-3.88 2.69-6.6z"
      />
      <path
        fill="#34A853"
        d="M9 18c2.43 0 4.47-.8 5.96-2.19l-2.91-2.25c-.81.54-1.84.86-3.05.86-2.34 0-4.32-1.58-5.03-3.71H.96v2.33C2.44 15.98 5.48 18 9 18z"
      />
      <path
        fill="#FBBC05"
        d="M3.97 10.71c-.18-.54-.28-1.11-.28-1.71s.1-1.17.28-1.71V4.96H.96C.35 6.17 0 7.54 0 9s.35 2.83.96 4.04l3.01-2.33z"
      />
      <path
        fill="#EA4335"
        d="M9 3.58c1.32 0 2.51.45 3.44 1.35l2.58-2.58C13.46.9 11.42 0 9 0 5.48 0 2.44 2.02.96 4.96l3.01 2.33C4.68 5.16 6.66 3.58 9 3.58z"
      />
    </svg>
  );
}

function FeatureBadge({ icon, text }) {
  return (
    <div className="h-[36px] px-[15px] rounded-full border border-white/60 bg-white/35 backdrop-blur-md flex items-center gap-[8px] text-[13px] sm:text-[14px] font-medium text-[#36425A] shadow-sm whitespace-nowrap">
      <span className="text-[15px]">{icon}</span>
      <span>{text}</span>
    </div>
  );
}

function Landing() {
  const handleGoogleLogin = () => {
    const baseUrl =
      import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";

      // // 만약 baseUrl에 '/api/v1'이 포함되어 있다면, 소셜 로그인할 때만 싹 제거해 줍니다.
      // const cleanBaseUrl = baseUrl.replace('/api/v1', '');

    window.location.href = `${baseUrl}/oauth2/authorization/google`;
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#AEDDFF] via-[#C8D8FF] to-[#D7C8FF] flex items-center justify-center px-[20px] py-[38px]">
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@500;600;700;800;900&family=Pretendard:wght@400;500;600;700;800&display=swap');

          .landing-font {
            font-family: 'Pretendard', Arial, sans-serif;
          }

          .landing-orbitron {
            font-family: 'Orbitron', Arial, sans-serif;
          }
        `}
      </style>

      {/* 배경 장식 */}
      <div className="absolute top-[-130px] left-[-100px] w-[390px] h-[390px] rounded-full bg-white/30 blur-[4px]" />

      <div className="absolute right-[-130px] bottom-[-150px] w-[460px] h-[460px] rounded-full bg-[#9DBEFF]/30 blur-[8px]" />

      <div className="absolute top-[12%] right-[7%] w-[160px] h-[160px] rounded-full bg-white/25 blur-[2px]" />

      <div className="absolute bottom-[13%] left-[7%] w-[120px] h-[120px] rounded-full bg-[#B6A9FF]/20 blur-[3px]" />

      <div className="absolute top-[17%] left-[12%] w-[8px] h-[8px] rounded-full bg-white/70" />
      <div className="absolute top-[24%] right-[16%] w-[6px] h-[6px] rounded-full bg-white/60" />
      <div className="absolute bottom-[19%] right-[11%] w-[9px] h-[9px] rounded-full bg-white/60" />

      <main className="landing-font relative z-10 w-full max-w-[1080px] min-h-[660px] rounded-[36px] border border-white/55 bg-white/25 backdrop-blur-[18px] shadow-[0_28px_80px_rgba(67,91,155,0.22)] px-[28px] sm:px-[58px] lg:px-[90px] py-[46px] sm:py-[54px] flex flex-col items-center justify-center text-center">
        {/* 상단 영문 문구 */}
        <div className="mb-[18px] h-[34px] px-[18px] rounded-full border border-white/60 bg-white/35 flex items-center justify-center shadow-sm">
          <span className="landing-orbitron text-[12px] sm:text-[13px] font-semibold tracking-[3px] text-[#4F70B8]">
            AI MEETING WORKSPACE
          </span>
        </div>

        {/* 로고 */}
        <img
          src="/images/knote-logo.png"
          alt="KNOTE"
          draggable="false"
          className="
            w-[520px]
            sm:w-[620px]
            lg:w-[680px]
            max-w-[92%]
            h-auto
            object-contain
            select-none
            mb-[18px]
            sm:mb-[22px]
            translate-x-[30px]
            sm:translate-x-[55px]
            lg:translate-x-[70px]
          "
        />

        {/* 메인 문구 */}
        <h1
          className="
            text-[29px]
            sm:text-[35px]
            lg:text-[42px]
            font-extrabold
            text-[#172033]
            tracking-[-1.5px]
            leading-[1.3]
            mb-[17px]
            whitespace-normal
            lg:whitespace-nowrap
          "
        >
          회의를 기록하고, 업무까지 연결하세요
        </h1>

        {/* 설명 문구 */}
        <p className="max-w-[850px] text-[15px] sm:text-[18px] leading-[27px] sm:leading-[30px] text-[#4E5D76] font-medium mb-[28px]">
          회의 기록부터 핵심 내용 정리, TODO 추출과 담당자 매칭까지
          <span className="hidden md:inline"> · </span>
          <br className="md:hidden" />
          KNOTE가 팀의 업무 흐름을 자연스럽게 이어드립니다.
        </p>

        {/* 기능 태그 */}
        <div className="flex flex-wrap items-center justify-center gap-[9px] sm:gap-[12px] mb-[34px]">
          <FeatureBadge icon="✦" text="회의 자동 분석" />
          <FeatureBadge icon="✓" text="TODO 추천" />
          <FeatureBadge icon="↗" text="업무 흐름 관리" />
        </div>

        {/* 로그인 버튼 */}
        <button
          type="button"
          onClick={handleGoogleLogin}
          aria-label="Google로 계속하기"
          className="
            group
            relative
            h-[54px]
            sm:h-[58px]
            min-w-[280px]
            sm:min-w-[330px]
            px-[30px]
            bg-white
            border
            border-[#D7DFEC]
            rounded-full
            shadow-[0_9px_24px_rgba(58,72,108,0.16)]
            flex
            items-center
            justify-center
            gap-[13px]
            text-[16px]
            sm:text-[18px]
            font-bold
            text-[#303744]
            hover:-translate-y-[2px]
            hover:shadow-[0_14px_30px_rgba(58,72,108,0.23)]
            hover:bg-[#FCFDFF]
            active:translate-y-0
            transition-all
            duration-200
          "
        >
          <span className="w-[30px] h-[30px] rounded-full bg-white flex items-center justify-center">
            <GoogleIcon />
          </span>

          <span>Google로 시작하기</span>

          <span className="absolute right-[22px] text-[18px] text-[#8B96A9] transition-transform duration-200 group-hover:translate-x-[3px]">
            →
          </span>
        </button>

        <p className="mt-[16px] text-[13px] sm:text-[14px] text-[#68768E] font-medium">
          Google 계정으로 간편하게 팀 협업을 시작할 수 있습니다.
        </p>

        {/* 하단 장식 문구 */}
        <div className="mt-[32px] flex items-center gap-[11px] text-[#677590]">
          <span className="w-[38px] h-px bg-white/70" />

          <span className="landing-orbitron text-[11px] sm:text-[12px] tracking-[2px] font-semibold">
            READY TO INIT?
          </span>

          <span className="w-[38px] h-px bg-white/70" />
        </div>
      </main>

      <p className="landing-font absolute bottom-[15px] left-1/2 -translate-x-1/2 text-[11px] sm:text-[12px] text-[#556784]/80 whitespace-nowrap">
        KNOTE · Connect meetings to meaningful actions
      </p>
    </div>
  );
}

export default Landing;