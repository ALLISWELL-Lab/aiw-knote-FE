import { Link } from "react-router-dom";

const breadcrumbMap = {
  home: { label: "⌂ Home", to: "/dashboard" },
  team: { label: "팀", to: "/team" },
  meeting: { label: "회의", to: "/meeting" },
  meetingUpload: { label: "회의 업로드", to: "/meeting" },
  recording: { label: "녹음" },
  fileUpload: { label: "음성 파일" },
  speakerMatching: { label: "화자 매칭" },
  meetingResult: { label: "회의 분석" },
  todo: { label: "투두", to: "/todo" },
  todoSprint: { label: "프로젝트 스프린트" },
  todoMatching: { label: "TODO-담당자 매칭" },
  feedback: { label: "피드백", to: "/feedback" },
  meetingFeedback: { label: "회의 피드백" },
  weeklyFeedback: { label: "위클리 피드백", to: "/weekly-feedback" },
  myPage: { label: "마이페이지" },
};

function Breadcrumb({ items = [] }) {
  return (
    <>
      <div className="flex items-center gap-[10px] text-[14px] text-black mb-[18px]">
        {items.map((key, index) => {
          const item = breadcrumbMap[key];
          const isLast = index === items.length - 1;

          if (!item) return null;

          return (
            <div key={`${key}-${index}`} className="flex items-center gap-[10px]">
              {index > 0 && <span className="text-gray-400">/</span>}

              {!isLast && item.to ? (
                <Link
                  to={item.to}
                  className={`hover:underline ${
                    index === 0 ? "font-semibold" : ""
                  }`}
                >
                  {item.label}
                </Link>
              ) : (
                <span className="font-semibold">{item.label}</span>
              )}
            </div>
          );
        })}
      </div>

      <div className="h-px bg-[#C9DEFA] mb-[34px]" />
    </>
  );
}

export default Breadcrumb;