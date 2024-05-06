const AddManagementDiagnosis = [
    {
        type: "text",
        placeholder: '세부항목번호(Code)',
        item:'code', 
        disabled: false,
    },
    {
        type: "text",
        placeholder: '인증명(Certification)',
        item:'certification',
        disabled: true,
    },
    {
        type: "text",
        placeholder: '메뉴명(MENU)',
        item:'menu',
        disabled: false,
    },
    {
        type: "text",
        placeholder: '분야(Class)',
        item:'class',
        disabled: false,
    },
    {
        type: "text",
        placeholder: '항목명 (Item title)',
        item:'item_title',
        disabled: false,
    },
    {
        type: "text",
        placeholder: '상세내용 (Detailed  contents)',
        item:'detailed_contents',
        disabled: false,
    },
    {
        type: "text",
        placeholder: '항목번호(Item number)',
        item:'item_number',
        disabled: false,
    },
    {
        type: "text",
        placeholder: '주요확인사항(Item)',
        item:'item',
        disabled: false,
    },
    {
        type: "text",
        placeholder: '등급',
        item:'grade',
        disabled: false,
    },
    {
        type: "text",
        placeholder: '설명',
        item:'explain',
        disabled: false,
    },
    {
        type: "text",
        placeholder: '위험',
        item:'risk',
        disabled: false,
    },
    {
        type: "text",
        placeholder: '보호',
        item:'protection',
        disabled: false,
    },
    {
        type: "text",
        placeholder: '위협 코드',
        item:'threat',
        disabled: false,
    },
    {
        type: "text",
        placeholder: '마킹',
        item:'marking',
        disabled: false,
    },
]

const addThreatAnalysis = [
    {
        type: "text",
        placeholder: '위협코드',
        item:'threat_code'

    },
    {
        type: "text",
        placeholder: '대분류',
        item:'main_category'
    },
    {
        type: "text",
        placeholder: '중분류',
        item:'middle_class'
    },
    {
        type: "text",
        placeholder: '위협내용',
        item:'threats'
    },
    {
        type: "text",
        placeholder: '기밀성',
        item:'confidentiality'
    },
    {
        type: "text",
        placeholder: '무결성',
        item:'integrity'
    },
    {
        type: "text",
        placeholder: '가용성',
        item:'availability'
    },
    // {
    //     type: "text",
    //     placeholder: '위협',
    //     item:'threat_ranking'
    // },
]


export  {AddManagementDiagnosis,addThreatAnalysis};