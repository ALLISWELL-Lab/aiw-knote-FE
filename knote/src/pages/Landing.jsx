function GoogleIcon() {
    return (
      <svg width="17" height="17" viewBox="0 0 18 18" aria-hidden="true">
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
  
  function Landing() {
    const handleGoogleLogin = () => {
  const baseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";
  window.location.href = `${baseUrl}/oauth2/authorization/google`;
};
  
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#ADDCFF] via-[#C9DAFF] to-[#CFC3FF] flex items-center justify-center overflow-hidden">
        <style>
          {`
            @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@500;600;700;800;900&display=swap');
          `}
        </style>
  
        <div className="w-full flex flex-col items-center translate-y-[-6px]">
          <img
            src="/images/knote-logo.png"
            alt="KNOTE"
            className="w-[760px] h-auto object-contain mb-[96px] select-none"
            draggable="false"
          />
  
          <h2
            className="text-[39px] font-bold text-black mb-[150px] tracking-[-1px] text-center"
            style={{ fontFamily: "'Orbitron', sans-serif" }}
          >
            Ready To Init?
          </h2>
  
          <button
            type="button"
            onClick={handleGoogleLogin}
            aria-label="Google로 계속하기"
            className="
              h-[32px]
              min-w-[214px]
              px-[15px]
              bg-white
              border
              border-[#dadce0]
              rounded-full
              shadow-[0_1px_2px_rgba(60,64,67,0.18)]
              flex
              items-center
              justify-center
              gap-[9px]
              text-[15px]
              font-medium
              text-[#3c4043]
              hover:bg-[#f8fafd]
              hover:shadow-[0_2px_5px_rgba(60,64,67,0.25)]
              active:bg-[#f1f3f4]
              transition
            "
          >
            <GoogleIcon />
            <span className="leading-none">Google로 계속하기</span>
          </button>
        </div>
      </div>
    );
  }
  
  export default Landing;