const logFilterData =
{
    event_time: "이벤트 시간",
    ip: "IP 주소",
    name: "아이디",
    log_type: "이벤트 유형",
    result: "결과",
};

const userManagementSettinfFilterData =
{
    certification: "인증명",
    menu: "메뉴명",
    class: "분야",
    item_title: "항목명",
    item_number: "항목번호",
    detailed_contents: "상세내용",
    code: "위협코드",
    grade: "등급",
    explain: "설명",
    risk: "위험",
    protection: "보호",
    marking: "마킹",
}

const userThreatAnalysisfFilterData =
{
    threat_code: "위협코드",
    main_category: "대분류",
    middle_class: "중분류",
    threats: "위협내용",
    confidentiality: "기밀성",
    integrity: "무결성",
    availability: "가용성",
    threat_ranking: "위협등급"
}

const riskThreatAnalysisfFilterData =
{
    threat_code: "위협코드",
    main_category: "대분류",
    middle_class: "중분류",
    threats: "위협내용",
    confidentiality: "기밀성",
    integrity: "무결성",
    availability: "가용성"
}

const riskManagementAreaFilterData =
{
    class: "자산그룹",
    grade: "자산등급",
    code: "점검항목",
    item_title: "항목명",
    score: "취약성",
    threat: "위협내용",
    threat_ranking: "위협 등급",
}
const riskTechnicalAreaFilterData =
{
    class: "분야",
    code: "세부항목번호",
    item: "주요확인사항",
    grade: "취약성",
    threat: "위협내용",
    threat_ranking: "위협 등급",
    risk: "위험도",
}
const riskInfoManagementAreaFilterData =
{
    class: "통제영역",
    code: "점검항목",
    diagnosis_status: "현황",
    risk: "위협내용",
    protection: "보호대책",
    implementation_cost: "구현 비용",
    implementation_difficulty: "구현 난이도",
    risk_progress_result: "진행결과",
}
const riskInfoTechnicalAreaFilterData =
{
    class: "통제영역",
    code: "점검항목",
    current_explain: "현황",
    risk: "위협내용",
    protection: "보호대책",
    implementation_cost: "구현 비용",
    implementation_difficulty: "구현 난이도",
    risk_progress_result: "진행결과",
    action_schedule: "조치 현황",
    note: "비고"
}

const diagnosisFilterData =
{
    code: "세부항목번호",
    detailed_contents: "상세내용"
}

const operatingStatementFilterData =
{
    item_number: "항목번호",
    class: "항목명",
    diagnosis_status: "운영현황(또는 미선택사유)"
}


export {
    logFilterData,
    userManagementSettinfFilterData,
    userThreatAnalysisfFilterData,
    riskThreatAnalysisfFilterData,
    riskManagementAreaFilterData,
    riskTechnicalAreaFilterData,
    riskInfoManagementAreaFilterData,
    riskInfoTechnicalAreaFilterData,
    diagnosisFilterData,
    operatingStatementFilterData
};