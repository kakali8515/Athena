import actions from "./actions.js"
import mutations from "./mutations.js"

export default {
    namespaced : true,
    state : ()=>({
      
        isActionGuidelines : false,
        isdiagnosisProgram : false,
        guideLineList : [],
        diagnosisProgramList : [],
        assetCategoryList : [],
        assetClassificationList : [],
        assetClassificationValue : "",
        assetCodeList : [],
        assetCodeValue : "",
        itemCodeList : [],
        listColumn : [],
        showColumnList : [],
        testResultList : [],
        templateList : [],
        evaluationList : [],
        diagnosisResult : {},
        diagnosisList : [],
        diagnosisDynamicData : [],
        allCount : {},
        initialCount : {},
        finalCount : {},
        selectedTitle : "",
        emptyCheckBox : false,
        technialDiagnosisRowId : "",
        isDiagnosisComplete:false

    }),

  mutations: mutations,
  actions: actions
}