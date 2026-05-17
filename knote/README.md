# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.


### 🧾 코드 컨벤션

커밋 메시지는 다음 규칙에 맞춰 작성합니다.

> 📌 예시: `✨ feat: sign up complete`

| 태그 | 설명 |
| :--- | :--- |
| ✨ **feat** | 새로운 기능 추가 |
| 🐛 **fix** | 버그 수정 |
| 📝 **docs** | 문서 수정 (README 등) |
| 💄 **style** | 코드 포맷팅, 세미콜론 누락 (코드 로직 변경 없음) |
| ♻️ **refactor** | 코드 리팩토링 (기능 변화 없이 구조 개선) |
| ✅ **test** | 테스트 코드 추가, 기존 테스트 리팩토링 |
| 🔧 **chore** | 빌드 설정 변경, 패키지 매니저 설정 등 |
| 🔀 **merge** | 브랜치 병합 (예: `merge: main`) |
| 📍 **checkpoint** | 작업 진행 중 (체크포인트) |
| 🎨 **design** | UI/UX 디자인 변경 |