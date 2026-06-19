# KNOTE Frontend

## 1. Project Description

KNOTE는 회의 음성 파일 또는 회의록을 기반으로 AI가 회의 내용을 분석하여 회의 요약, 주요 결정사항(Key Decisions), 액션 아이템(Action Items)을 생성하고 관리할 수 있도록 지원하는 서비스입니다.

본 저장소는 KNOTE의 Frontend 애플리케이션을 포함합니다.

---

## 2. Source Code Description

주요 디렉토리 구조는 다음과 같습니다.

```text
src/
 ├── api/          # 백엔드 API 통신
 ├── components/   # 공통 컴포넌트
 ├── pages/        # 페이지 컴포넌트
 ├── layouts/      # 레이아웃
 ├── utils/        # 유틸리티 함수
 └── assets/       # 이미지 및 정적 자원
```

Frontend는 React 기반 SPA(Single Page Application) 구조로 구현되었습니다.

---

## 3. How to Build

### Requirements

* Node.js 20+
* npm

### Install Dependencies

```bash
npm install
```

### Build

```bash
npm run build
```

빌드 결과물은 dist 폴더에 생성됩니다.

---

## 4. How to Install

### Clone Repository

```bash
git clone https://github.com/ALLISWELL-Lab/aiw-knote-FE.git
```

### Move Directory

```bash
cd aiw-knote-FE/knote
```

### Environment Variable

```env
VITE_API_BASE_URL=http://localhost:8080
```

---

## 5. How to Test

개발 서버 실행

```bash
npm run dev
```

브라우저 접속

```text
http://localhost:5173
```

---

## 6. Sample Data

현재 별도의 샘플 데이터는 제공하지 않습니다.

테스트 시 사용자는 직접 회의 파일 또는 회의 스크립트를 업로드하여 기능을 확인할 수 있습니다.

---

## 7. Database Used

Frontend는 데이터베이스를 직접 사용하지 않습니다.

Backend API를 통해 데이터를 조회 및 저장합니다.

---

## 8. Open Source Used

* React
* Vite
* React Router
* Axios
* Tailwind CSS

각 오픈소스는 MIT License 또는 해당 프로젝트 라이선스를 따릅니다.
