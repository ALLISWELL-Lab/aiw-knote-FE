import { useNavigate } from "react-router-dom";

function ErrorPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#ADDCFF] via-[#C9DAFF] to-[#CFC3FF] flex items-center justify-center overflow-hidden">
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@500;600;700;800;900&display=swap');
        `}
      </style>

      <div className="w-full flex flex-col items-center translate-y-[-10px]">
        {/* Logo */}
        <img
          src="/images/knote-logo.png"
          alt="KNOTE"
          className="w-[520px] h-auto object-contain mb-[80px] select-none translate-x-[60px]"
          draggable="false"
        />

        {/* Error Message */}
        <p className="text-[24px] font-semibold text-black mb-[28px]">
          페이지에 문제가 발생했습니다.
        </p>

        <h1
          className="text-[64px] font-black text-black mb-[86px] tracking-[2px]"
          style={{ fontFamily: "'Orbitron', sans-serif" }}
        >
          ERROR
        </h1>

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

export default ErrorPage;