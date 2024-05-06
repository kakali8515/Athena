const userAdminCol = [
  {
    name: "No",
    id: "no",
    isSortable: false,
    type: "number",
  },
  {
    name: "이메일",
    id: "email",
    isSortable: true,
    type: "text",
  },
  {
    name: "이름",
    id: "name",
    isSortable: true,
    type: "text",
  },
  {
    name: "부서 ",
    id: "department",
    isSortable: true,
    type: "text",
  },
  {
    name: "직급",
    id: "rank",
    isSortable: true,
    type: "text",
  },
  {
    name: "인증여부",
    id: "user_certification_status",
    isSortable: true,
    type: "text",
  },
  {
    name: "가입일",
    id: "member_since",
    isSortable: true,
    type: "text",
  },
  {
    name: "접속일",
    id: "user_access_date",
    isSortable: true,
    type: "text",
  },
  {
    name: "상태",
    id: "user_status",
    isSortable: true,
    type: "text",
  },
  {
    name: "비밀번호 만료",
    id: "password_expired",
    isSortable: true,
    type: "text",
  },
  {
    name: "OTP",
    id: "login_otp_enabled",
    isSortable: true,
    type: "text",
  },
];
const noticecolData = [
  {
    name: "No",
    id: "no",
    isSortable: false,
    type: "number",
  },
  {
    name: "제목",
    id: "title",
    isSortable: false,
    type: "string",
  },
  {
    name: "작성자",
    id: "writer_name",
    isSortable: false,
    type: "string",
  },
  {
    name: "작성일",
    id: "created_date",
    isSortable: false,
    type: "string",
  },
  {
    name: "조회수",
    id: "number_of_views",
    isSortable: false,
    type: "number",
  },
];
const diagnosisSettingCol = [
  {
    name: "idx",
  },
  {
    name: "인증명",
  },
  {
    name: "메뉴명",
  },
  {
    name: "분야",
  },
  {
    name: "항목명",
  },
  {
    name: "상세내용",
  },
  {
    name: "항목번호",
  },
  {
    name: "세부항목번호",
  },
  {
    name: "주요확인사항",
  },
  {
    name: "등급",
  },
  {
    name: "설명",
  },
  {
    name: "위험",
  },
  {
    name: "보호",
  },
  {
    name: "위협코드",
  },
  {
    name: "마킹",
  },
];
const FullUserListCol = [
  {
    item: "부서",
  },
  {
    item: "직급",
  },
  {
    item: "이름",
  },
  {
    item: "이메일 주소",
  },
];
const threatSettingCol = [
  {
    name: "idx",
  },
  {
    name: "위협코드",
  },
  {
    name: "대분류",
  },
  {
    name: "중분류",
  },
  {
    name: "위협내용",
  },
  {
    name: "기밀성",
  },
  {
    name: "무결성",
  },
  {
    name: "가용성",
  },
  {
    name: "위협등급",
  },
];
const logUserCol = [
  {
    name: "이벤트 시간",
    id: "event_time",
    isSortable: true,
    type: "text",
  },
  {
    name: "IP 주소",
    id: "ip",
    isSortable: true,
    type: "text",
  },
  {
    name: "아이디",
    id: "name",
    isSortable: true,
    type: "text",
  },
  {
    name: "이벤트 유형",
    id: "log_type_text",
    isSortable: true,
    type: "text",
  },
  {
    name: "결과",
    id: "result",
    isSortable: true,
    type: "text",
  },
];
const technicalAreaCol = [
  {
    name: "분야",
    id: "class",
    isSortable: true,
    type: "text",
  },
  {
    name: "자산등급",
    id: "state",
    isSortable: false,
    type: "text",
  },
  {
    name: "세부항목번호",
    id: "code",
    isSortable: false,
    type: "text",
  },
  {
    name: "주요확인사항",
    id: "item_name",
    isSortable: true,
    type: "text",
  },
  {
    name: "취약성 ",
    id: "vulnerability",
    isSortable: false,
    type: "text",
  },
  {
    name: "위협내용",
    id: "threat",
    isSortable: false,
    type: "text",
  },
  {
    name: "위협 등급",
    id: "threat_rating",
    isSortable: true,
    type: "text",
  },
  {
    name: "위험도",
    id: "risk",
    isSortable: true,
    type: "text",
  },
  {
    name: "위험도",
    id: "risk_value",
    isSortable: true,
    type: "text",
  },
];
const MgmntAreaCol = [
  {
    name: "자산그룹",
    id: "asset_group",
    isSortable: true,
    type: "text",
  },
  {
    name: "자산등급",
    id: "state",
    isSortable: false,
    type: "text",
  },
  {
    name: "점검항목",
    id: "code",
    isSortable: false,
    type: "text",
  },
  {
    name: "항목명",
    id: "item_name",
    isSortable: true,
    type: "text",
  },
  {
    name: "취약성",
    id: "vulnerability",
    isSortable: false,
    type: "text",
  },
  {
    name: "위협내용",
    id: "threat",
    isSortable: false,
    type: "text",
  },
  {
    name: "위협 등급",
    id: "threat_rating",
    isSortable: true,
    type: "text",
  },
  {
    name: "위험 내용",
    id: "content",
    isSortable: true,
    type: "text",
  },
  {
    name: "위험도",
    id: "risk",
    isSortable: false,
    type: "text",
  },
];
const ThreatAnalysisCol = [
  {
    name: "위협코드",
    id: "threat_code",
    isSortable: true,
    type: "text",
  },
  {
    name: "대분류",
    id: "main_category",
    isSortable: true,
    type: "text",
  },
  {
    name: "중분류",
    id: "middle_class",
    isSortable: true,
    type: "text",
  },
  {
    name: "위협내용",
    id: "threats",
    isSortable: true,
    type: "text",
  },
  {
    name: "기밀성",
    id: "confidentiality",
    isSortable: true,
    type: "text",
  },
  {
    name: "무결성",
    id: "integrity",
    isSortable: true,
    type: "text",
  },
  {
    name: "가용성",
    id: "availability",
    isSortable: true,
    type: "text",
  },
  {
    name: "위협등급",
    id: "threat_ranking",
    isSortable: true,
    type: "text",
  },
];

const presetHeader = [
  // {
  //   name: "#",
  //   id: "id",
  //   isSortable: false,
  //   type: "text",
  // },
  {
    name: "증적코드",
    id: "evidence_code",
    isSortable: false,
    type: "text",
  },
  {
    name: "영역구분",
    id: "control_area",
    isSortable: false,
    type: "text",
  },
  {
    name: "증적명",
    id: "evidence",
    isSortable: false,
    type: "text",
  },
  {
    name: "이행주기",
    id: "cycle",
    isSortable: false,
    type: "text",
  },
  {
    name: "담당자",
    id: "due_diligence",
    isSortable: false,
    type: "text",
  },
];

const EvidenceHeader = [
  
  {
    name: "증적코드",
    id: "evidence_code",
    isSortable: false,
    type: "text",
  },
  {
    name: "영역구분",
    id: "control_area",
    isSortable: false,
    type: "text",
  },
  {
    name: "증적명",
    id: "evidence",
    isSortable: false,
    type: "text",
  },
  {
    name: "이행주기",
    id: "cycle",
    isSortable: false,
    type: "text",
  },
  
];

const InformationProtectionPlanManageColData = [
  {
    name: "통제영역",
    isSortable: true,
    type: "text",
  },
  {
    name: "점검항목",
    isSortable: true,
    type: "text",
  },
  {
    name: "현황",
    isSortable: true,
    type: "text",
  },
  {
    name: "위협내용",
    isSortable: true,
    type: "text",
  },
  {
    name: "위험도",
    isSortable: true,
    type: "text",
  },
  {
    name: "보호대책 ",
    isSortable: true,
    type: "text",
  },
  {
    name: "시급성",
    isSortable: true,
    type: "text",
  },
  {
    name: "구현 비용",
    isSortable: true,
    type: "text",
  },
  {
    name: "구현 난이도",
    isSortable: true,
    type: "text",
  },
  {
    name: "우선순위",
    isSortable: true,
    type: "text",
  },
  {
    name: "조치 현황",
    isSortable: true,
    type: "text",
  },
  {
    name: "조치일정",
    isSortable: true,
    type: "text",
  },
  {
    name: "비고",
    isSortable: true,
    type: "text",
  },
  {
    name: "담당자",
    isSortable: true,
    type: "text",
  },
];
const InformationProtectionPlanTechColData = [
  {
    name: "통제영역",
    isSortable: true,
    type: "text",
  },
  {
    name: "점검항목",
    isSortable: true,
    type: "text",
  },
  {
    name: "현황",
    isSortable: true,
    type: "text",
  },
  {
    name: "위협내용",
    isSortable: true,
    type: "text",
  },
  {
    name: "위험도",
    isSortable: true,
    type: "text",
  },
  {
    name: "보호대책 ",
    isSortable: true,
    type: "text",
  },
  {
    name: "시급성",
    isSortable: true,
    type: "text",
  },
  {
    name: "구현 비용",
    isSortable: true,
    type: "text",
  },
  {
    name: "구원 난이도",
    isSortable: true,
    type: "text",
  },
  {
    name: "우선순위",
    isSortable: true,
    type: "text",
  },
  {
    name: "조치 현황",
    isSortable: true,
    type: "text",
  },
  {
    name: "조치일정",
    isSortable: true,
    type: "text",
  },
  {
    name: "비고",
    isSortable: true,
    type: "text",
  },
  {
    name: "담당자",
    isSortable: true,
    type: "text",
  },
];
const riskMgmntCol = [
  // {
  //   name: "위험도 0",
  // },
  // {
  //   name: "위험도 1",
  // },
  // {
  //   name: "위험도 2",
  // },
  {
    name: "위험도 3",
  },
  {
    name: "위험도 4",
  },
  {
    name: "위험도 5",
  },
  {
    name: "위험도 6",
  },
  {
    name: "위험도 7",
  },
  {
    name: "위험도 8",
  },
  {
    name: "위험도 9",
  },
];

export {
  userAdminCol,
  noticecolData,
  diagnosisSettingCol,
  FullUserListCol,
  threatSettingCol,
  logUserCol,
  presetHeader,
  EvidenceHeader,
  technicalAreaCol,
  MgmntAreaCol,
  ThreatAnalysisCol,
  InformationProtectionPlanManageColData,
  InformationProtectionPlanTechColData,
  riskMgmntCol
};
