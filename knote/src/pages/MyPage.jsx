import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import Breadcrumb from "../components/Breadcrumb";
import api from "../api";

const DEFAULT_MEMBER = {
  id: 1,
  name: "정서윤",
  role: "",
  tags: [],
};

const DEFAULT_NOTIFICATION = {
  allAlarm: true,
  meetingAlarm: true,
  todoAlarm: false,
  meetingAlarmTime: "1일 전",
  todoAlarmTime: "3일 전",
  customMinute: 7,
};

const alarmOptions = ["3일 전", "1일 전", "1시간 전", "30분 전", "직접 설정"];

function UserIconLarge() {
  return (
    <div className="w-[78px] h-[78px] bg-[#EAF1FC] rounded-[4px] flex items-center justify-center border border-[#C9DEFA]">
      <div className="relative w-[48px] h-[48px]">
        <div className="absolute left-1/2 -translate-x-1/2 top-[3px] w-[20px] h-[20px] bg-white rounded-full" />
        <div className="absolute left-1/2 -translate-x-1/2 bottom-[3px] w-[40px] h-[24px] bg-white rounded-t-full" />
      </div>
    </div>
  );
}

function Toggle({ checked, disabled = false, onChange }) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={() => onChange(!checked)}
      className={`relative w-[38px] h-[20px] rounded-full transition ${
        checked ? "bg-[#4A8DFF]" : "bg-gray-300"
      } ${disabled ? "opacity-45 cursor-not-allowed" : ""}`}
    >
      <span
        className={`absolute top-[3px] w-[14px] h-[14px] bg-white rounded-full transition ${
          checked ? "left-[21px]" : "left-[3px]"
        }`}
      />
    </button>
  );
}

function AlarmTimeSelect({ value, disabled, onChange }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative w-[190px]">
      <button
        type="button"
        disabled={disabled}
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full h-[32px] border border-[#C9DEFA] bg-white px-[10px] text-[13px] text-black flex items-center justify-between ${
          disabled ? "opacity-45 cursor-not-allowed" : ""
        }`}
      >
        <span>{value}</span>
        <span className="text-[10px] text-gray-400">▼</span>
      </button>

      {isOpen && !disabled && (
        <div className="absolute left-0 top-[34px] z-30 w-full bg-white border border-[#C9DEFA] shadow-md text-[13px] text-black">
          {alarmOptions.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => {
                onChange(option);
                setIsOpen(false);
              }}
              className={`w-full h-[32px] text-left px-[10px] hover:bg-[#EAF1FC] ${
                value === option ? "bg-[#ADDCFF]/50 font-semibold" : ""
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function ResultModal({ message, onClose }) {
  return (
    <div className="fixed inset-0 z-50 bg-black/20 flex items-center justify-center">
      <div className="w-[360px] bg-white border border-[#C9DEFA] shadow-[0_8px_28px_rgba(0,0,0,0.18)]">
        <div className="h-[46px] border-b border-[#C9DEFA] bg-[#4A8DFF] flex items-center justify-center text-[15px] font-semibold text-white">
          알림
        </div>
        <div className="px-[24px] py-[30px] text-[14px] text-black text-center leading-[22px] whitespace-pre-wrap">
          {message}
        </div>
        <div className="h-[54px] flex items-center justify-end px-[18px]">
          <button
            type="button"
            onClick={onClose}
            className="w-[58px] h-[28px] border border-[#C9DEFA] bg-white text-[13px] text-black hover:bg-[#EAF1FC]"
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
}

function MyPage() {
  const [notifications, setNotifications] = useState(DEFAULT_NOTIFICATION);

  // 백엔드 @NotNull 필드 유지를 위한 기존 회원 정보 원본 저장 상태
  const [serverRawData, setServerRawData] = useState(null);

  const [userId, setUserId] = useState(1);
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [tags, setTags] = useState([]);
  const [singleTagInput, setSingleTagInput] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [resultMessage, setResultMessage] = useState("");

  const isIndividualAlarmDisabled = !notifications.allAlarm;

  // 마운트 시 데이터 조회 및 백엔드 DTO 필드 변환 처리
  useEffect(() => {
    const fetchMyPageData = async () => {
      try {
        setIsLoading(true);
        const memberResponse = await api.get("/members/me");
        const memberData = memberResponse.data || {};

        // 원본 데이터를 보관하여 필수 데이터 규격 유지
        setServerRawData(memberData);

        setUserId(memberData.id || 1);
        setName(memberData.name || "정서윤");
        setRole(memberData.role || "");
        
        // interestedField 문자열을 쉼표 기준으로 쪼개어 tags 배열로 변환
        if (memberData.interestedField) {
          const parsedTags = memberData.interestedField
            .split(",")
            .map((t) => t.trim())
            .filter((t) => t.length > 0);
          setTags(parsedTags);
        } else {
          setTags([]);
        }

        try {
          const notificationResponse = await api.get("/mypage/notifications/settings");
          if (notificationResponse.data) {
            const notificationData = notificationResponse.data;
            setNotifications({
              allAlarm: notificationData.allAlarm ?? notificationData.allNotification ?? DEFAULT_NOTIFICATION.allAlarm,
              meetingAlarm: notificationData.meetingAlarm ?? DEFAULT_NOTIFICATION.meetingAlarm,
              todoAlarm: notificationData.todoAlarm ?? notificationData.deadlineAlarm ?? DEFAULT_NOTIFICATION.todoAlarm,
              meetingAlarmTime: notificationData.meetingAlarmTime || DEFAULT_NOTIFICATION.meetingAlarmTime,
              todoAlarmTime: notificationData.todoAlarmTime || notificationData.deadlineAlarmTime || DEFAULT_NOTIFICATION.todoAlarmTime,
              customMinute: notificationData.customMinute ?? DEFAULT_NOTIFICATION.customMinute,
            });
          }
        } catch (notifErr) {
          console.log("알림 설정 로드 스킵");
        }
      } catch (error) {
        console.error("마이페이지 데이터 조회 실패:", error);
        setRole("");
        setTags([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMyPageData();
  }, []);

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      const cleanTag = singleTagInput.trim().replace("#", "");
      if (cleanTag === "") return;
      if (tags.includes(cleanTag)) {
        setSingleTagInput("");
        return;
      }
      setTags([...tags, cleanTag]);
      setSingleTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter((t) => t !== tagToRemove));
  };

  // 백엔드 MemberDTO 필드 규격에 맞춰 매핑 후 수정 요청 전송
  const handleMemberSave = async () => {
    if (!name.trim()) {
      setResultMessage("이름을 입력해 주세요.");
      return;
    }

    // tags 배열을 다시 쉼표 구분 문자열로 채워 백엔드 필드 명세 충족
    const interestedFieldString = tags.join(", ");

    const payload = {
      id: userId,
      provider: serverRawData?.provider || "google",
      email: serverRawData?.email || "user@example.com",
      name: name.trim(),
      interestedField: interestedFieldString,
      activated: serverRawData?.activated ?? true,
      role: role.trim()
    };

    try {
      await api.post(`/members/me?memberId=${userId}`, payload);
      setResultMessage("회원 프로필 정보가 성공적으로 변경되었습니다.");
    } catch (error) {
      console.error("회원 정보 수정 실패:", error);
      setResultMessage("회원 프로필 정보 변경에 실패했습니다. 다시 시도해 주세요.");
    }
  };

  const handleNotificationSave = async () => {
    const payload = {
      allAlarm: notifications.allAlarm,
      meetingAlarm: notifications.allAlarm ? notifications.meetingAlarm : false,
      todoAlarm: notifications.allAlarm ? notifications.todoAlarm : false,
      meetingAlarmTime: notifications.meetingAlarmTime,
      todoAlarmTime: notifications.todoAlarmTime,
      customMinute: notifications.customMinute,
    };

    try {
      await api.post("/mypage/notifications/settings", payload);
      setResultMessage("알림 설정이 성공적으로 저장되었습니다.");
    } catch (error) {
      console.error("알림 설정 수정 실패:", error);
      setResultMessage("알림 설정에 실패했습니다. 다시 시도해 주세요.");
    }
  };

  return (
    <Layout customUser={{ name, tags: tags }}>
      <Breadcrumb items={["home", "myPage"]} />

      <div className="w-[980px] mx-auto text-black">
        <section className="w-[620px] min-h-[250px] border border-[#C9DEFA] bg-white px-[34px] py-[28px] mb-[42px] shadow-sm relative">
          <div className="inline-flex h-[28px] px-[14px] border border-[#4A8DFF] text-[#4A8DFF] text-[13px] font-semibold items-center justify-center mb-[26px]">
            프로필 관리
          </div>

          <div className="flex items-start gap-[34px]">
            <UserIconLarge />

            <div className="flex-1">
              <div className="flex items-center gap-[12px] mb-[14px]">
                <input
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  className="w-[160px] h-[32px] border-b border-black bg-transparent text-[15px] font-semibold text-black outline-none"
                  placeholder="이름을 입력하세요"
                />
              </div>

              <div className="flex flex-wrap items-center gap-[8px] mb-[18px] min-h-[24px]">
                {tags.length > 0 ? (
                  tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="h-[22px] pl-[7px] pr-[4px] bg-white border border-[#4A8DFF]/40 rounded-[3px] text-[12px] text-black flex items-center gap-[5px] shadow-sm select-none"
                    >
                      <span>#{tag}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveTag(tag)}
                        className="w-[14px] h-[14px] bg-gray-100 hover:bg-red-100 rounded-full flex items-center justify-center text-[10px] text-gray-500 hover:text-red-500 font-bold transition-colors"
                      >
                        ✕
                      </button>
                    </span>
                  ))
                ) : (
                  <span className="text-[12px] text-gray-400 italic select-none">
                    아래 관심 태그 창에 키워드를 추가해보세요.
                  </span>
                )}
              </div>

              <div className="grid grid-cols-[90px_1fr] gap-y-[14px] text-[13px] text-black">
                <span className="font-semibold">역할</span>
                <input
                  value={role}
                  onChange={(event) => setRole(event.target.value)}
                  className="h-[30px] border-b border-[#C9DEFA] bg-transparent px-[4px] outline-none"
                  placeholder="예: 백엔드 개발자"
                />

                <span className="font-semibold">관심 태그</span>
                <input
                  value={singleTagInput}
                  onChange={(event) => setSingleTagInput(event.target.value)}
                  onKeyDown={handleKeyDown}
                  className="h-[30px] border-b border-[#C9DEFA] bg-transparent px-[4px] outline-none"
                  placeholder="태그를 입력하고 Enter를 누르세요"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end mt-[28px]">
            <button
              type="button"
              onClick={handleMemberSave}
              className="w-[82px] h-[32px] bg-[#4A8DFF] text-white text-[13px] font-semibold shadow-sm hover:opacity-90 transition"
            >
              저장
            </button>
          </div>
        </section>

        <section className="w-[620px] min-h-[300px] border border-[#C9DEFA] bg-white px-[34px] py-[28px] shadow-sm">
          <div className="inline-flex h-[28px] px-[14px] border border-[#4A8DFF] text-[#4A8DFF] text-[13px] font-semibold items-center justify-center mb-[30px]">
            알림 설정
          </div>

          <div className="grid grid-cols-[150px_80px_1fr] items-center gap-y-[18px] text-[13px] text-black">
            <span className="font-semibold">전체 알림 설정</span>
            <div>
              <Toggle
                checked={notifications.allAlarm}
                onChange={(value) =>
                  setNotifications((prev) => ({
                    ...prev,
                    allAlarm: value,
                    meetingAlarm: value ? prev.meetingAlarm : false,
                    todoAlarm: value ? prev.todoAlarm : false,
                  }))
                }
              />
              <div className="text-[10px] text-gray-500 mt-[4px]">
                {notifications.allAlarm ? "ENABLED" : "DISABLED"}
              </div>
            </div>
            <div />

            <span className="font-semibold">회의 알림 켜기/끄기</span>
            <div>
              <Toggle
                checked={notifications.meetingAlarm}
                disabled={isIndividualAlarmDisabled}
                onChange={(value) =>
                  setNotifications((prev) => ({
                    ...prev,
                    meetingAlarm: value,
                  }))
                }
              />
              <div className="text-[10px] text-gray-500 mt-[4px]">
                {notifications.meetingAlarm && notifications.allAlarm
                  ? "ENABLED"
                  : "DISABLED"}
              </div>
            </div>
            <div className="flex items-center gap-[10px]">
              <span className="font-semibold">회의 알림 시간 설정</span>
              <AlarmTimeSelect
                value={notifications.meetingAlarmTime}
                disabled={isIndividualAlarmDisabled || !notifications.meetingAlarm}
                onChange={(value) =>
                  setNotifications((prev) => ({
                    ...prev,
                    meetingAlarmTime: value,
                  }))
                }
              />
            </div>

            <span className="font-semibold">투두 마감 알림 켜기</span>
            <div>
              <Toggle
                checked={notifications.todoAlarm}
                disabled={isIndividualAlarmDisabled}
                onChange={(value) =>
                  setNotifications((prev) => ({
                    ...prev,
                    todoAlarm: value,
                  }))
                }
              />
              <div className="text-[10px] text-gray-500 mt-[4px]">
                {notifications.todoAlarm && notifications.allAlarm
                  ? "ENABLED"
                  : "DISABLED"}
              </div>
            </div>
            <div className="flex items-center gap-[10px]">
              <span className="font-semibold">마감 알림 시간 설정</span>
              <AlarmTimeSelect
                value={notifications.todoAlarmTime}
                disabled={isIndividualAlarmDisabled || !notifications.todoAlarm}
                onChange={(value) =>
                  setNotifications((prev) => ({
                    ...prev,
                    todoAlarmTime: value,
                  }))
                }
              />
            </div>
          </div>

          {(notifications.meetingAlarmTime === "직접 설정" ||
            notifications.todoAlarmTime === "직접 설정") && (
            <div className="mt-[24px] ml-[230px] w-[190px] border border-[#C9DEFA] bg-white shadow-sm">
              <div className="h-[32px] bg-[#F8FBFF] border-b border-[#C9DEFA] flex items-center justify-center text-[12px] text-black font-semibold">
                직접 설정
              </div>

              <div className="px-[14px] py-[14px]">
                <label className="text-[12px] text-black">알림 시간</label>
                <div className="mt-[8px] flex items-center gap-[8px]">
                  <input
                    type="number"
                    min="1"
                    value={notifications.customMinute}
                    onChange={(event) =>
                      setNotifications((prev) => ({
                        ...prev,
                        customMinute: Number(event.target.value),
                      }))
                    }
                    className="w-full h-[32px] border border-[#C9DEFA] px-[8px] text-[13px] text-black outline-none"
                  />
                  <span className="text-[12px] text-black whitespace-nowrap">분 전</span>
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-end mt-[28px]">
            <button
              type="button"
              onClick={handleNotificationSave}
              className="w-[82px] h-[32px] bg-[#4A8DFF] text-white text-[13px] font-semibold"
            >
              저장
            </button>
          </div>
        </section>
      </div>

      {resultMessage && (
        <ResultModal
          message={resultMessage}
          onClose={() => setResultMessage("")}
        />
      )}
    </Layout>
  );
}

export default MyPage;