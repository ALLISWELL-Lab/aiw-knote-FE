import { useNavigate } from "react-router-dom";

function LoadingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#ADDCFF] via-[#C9DAFF] to-[#CFC3FF] flex items-center justify-center overflow-hidden">
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@500;600;700;800;900&display=swap');

          @keyframes loadingPulse {
            0% {
              opacity: 0.35;
              transform: scale(0.9);
            }
            50% {
              opacity: 1;
              transform: scale(1.08);
            }
            100% {
              opacity: 0.35;
              transform: scale(0.9);
            }
          }
        `}
      </style>

      <div className="w-full flex flex-col items-center translate-y-[-10px]">
        {/* Logo */}
        <img
          src="/images/knote-logo.png"
          alt="KNOTE"
          className="w-[520px] h-auto object-contain mb-[78px] select-none translate-x-[60px]"
          draggable="false"
        />

        {/* Loading Text */}
        <h1
          className="text-[46px] font-black text-black mb-[22px] tracking-[1px]"
          style={{ fontFamily: "'Orbitron', sans-serif" }}
        >
          Loading......
        </h1>

        <p className="text-[24px] font-semibold text-black mb-[70px]">
          조금만 기다려 주세요!
        </p>

        {/* Loading Dots */}
        <div className="flex items-center gap-[12px] mb-[76px]">
          <span
            className="w-[12px] h-[12px] rounded-full bg-[#4A8DFF]"
            style={{ animation: "loadingPulse 1.1s infinite" }}
          />
          <span
            className="w-[12px] h-[12px] rounded-full bg-[#4A8DFF]"
            style={{ animation: "loadingPulse 1.1s infinite 0.18s" }}
          />
          <span
            className="w-[12px] h-[12px] rounded-full bg-[#4A8DFF]"
            style={{ animation: "loadingPulse 1.1s infinite 0.36s" }}
          />
        </div>

        {/* Home Button */}
        <button
          type="button"
          onClick={() => navigate("/")}
          className="
            h-[36px]
            min-w-[180px]
            px-[18px]
            bg-white
            border
            border-[#dadce0]
            rounded-full
            shadow-[0_1px_2px_rgba(60,64,67,0.18)]
            flex
            items-center
            justify-center
            text-[14px]
            font-medium
            text-[#3c4043]
            hover:bg-[#f8fafd]
            hover:shadow-[0_2px_5px_rgba(60,64,67,0.25)]
            active:bg-[#f1f3f4]
            transition
          "
        >
          홈으로 돌아가기
        </button>
      </div>
    </div>
  );
}

export default LoadingPage;