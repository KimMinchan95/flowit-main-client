# Flowit 프로젝트 구현 체크리스트

## Phase 1: 프로젝트 초기 설정 및 아키텍처 구성

- [ ] 프로젝트 초기 환경 세팅
  - [x] Next.js(App Router) 프로젝트 세팅
  - [x] TypeScript / ESLint / Prettier 설정
  - [x] 폴더 구조 설계
  - [x] 공통 컴포넌트 구조 설계
  - [x] 상태 관리(Zustand 등) 세팅
  - [x] API 클라이언트(Axios/Fetch Wrapper) 구성
  - [x] i18n(다국어) 설정 (선택)

---

## Phase 2: 로그인 / 회원가입

- [x] 로그인 UI 구현
- [x] 로그인 API 연동
  - root로 진입시 (Auth) login 으로 이동
  - Access Token -> Zustand 저장 (LocalStorage 저장 X -> persist 미사용)
  - Refresh Token -> 쿠키
  - Axios 인터셉터 설정
  - 새로고침시 accessToken 재발급

- [x] 회원가입 UI 구현
- [x] 회원가입 API 연동
- [x] 로그인 함수 단위테스트 추가

---

## Phase 3: 워크스페이스 (Workspace) 관리

- [x] 나의 워크스페이스 UI 구현
- [x] 나의 워크스페이스 목록 API 연동

- [x] 워크스페이스 생성 모달 UI
- [x] 워크스페이스 생성 API 연동

---

## Phase 4: 공통 레이아웃 (App Layout)

- [ ] 글로벌 레이아웃 구성
  - [ ] 사이드바 UI 구현
  - [ ] 탑 헤더 UI 구현

- [ ] 알림 UI
- [ ] 알림 API 연동

- [ ] 유저 프로필 Dropdown
  - [ ] 프로필 정보 UI
  - [ ] 로그아웃 기능
  - [ ] 로그아웃 API 연동

---

## Phase 5: 칸반 보드 (Board)

- [ ] 보드 뷰 (BoardView) UI 틀 잡기
- [ ] 보드 조회 API 연동

- [ ] Task 카드 UI
  - [ ] Drag & Drop 상태 변경 기능

- [ ] Task 생성 모달 구현
  - [ ] 마크다운 에디터 지원

- [ ] Task 생성 API 연동

- [ ] Task 수정 모달 구현
- [ ] Task 수정 API 연동

- [ ] Task 상세 보기 패널
  - [ ] Side / Center 뷰 토글 기능

- [ ] Task 상세 조회 API 연동
  - [ ] Task 상세 뷰 - 댓글 기능
  - [ ] Task 상세 뷰 - 활동 로그(Activity Log)

---

## Phase 6: 대시보드 (Dashboard)

- [ ] 상단 통계 위젯 구현
- [ ] 통계 API 연동

- [ ] 내 작업(My Tasks) 리스트 UI
- [ ] 내 작업 API 연동

- [ ] 최근 활동 타임라인 UI
- [ ] 최근 활동 API 연동

---

## Phase 7: 멤버 관리 (Members)

- [ ] 멤버 관리 테이블 뷰 구현
- [ ] 멤버 목록 API 연동
  - [ ] 멤버 권한 변경 기능
  - [ ] 멤버 강퇴(Kick) 기능

- [ ] 초대 코드 UI
- [ ] 팀원 초대 API 연동

---

