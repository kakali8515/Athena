export default {

   getGuideList(state, value) {
      state.guideLineList = value;
   },

   getDiagnosisProgramList(state, value) {
      state.diagnosisProgramList = value;
   },

   getAssetCategoryList(state, value) {
      state.assetCategoryList = value;
   },

   getAssetClassificationList(state, value) {
      state.assetClassificationList = value;
   },

   getAssetClassificationValue(state, value) {
      state.assetClassificationValue = value;
   },

   getAssetCodeList(state, value) {
      state.assetCodeList = value;
   },

   getAssetCodeValue(state, value) {
      state.assetCodeValue = value;
   },

   getItemCodeList(state, value) {
      state.itemCodeList = value;
   },

   getSearchColumnList(state, value) {
      state.listColumn = value;
   },

   getShowColumnList(state, value) {
      state.showColumnList = value;
   },

   getTestResultList(state, value) {
      state.testResultList = value;
   },

   getTemplateList(state, value) {
      state.templateList = value;
   },

   getEvaluationList(state, value) {
      state.evaluationList = value;
   },

   getDiagnosisResult(state, value) {
      state.diagnosisResult = value;
   },

   getDiagnosisList(state, value) {
      state.diagnosisList = value;
   },

   getDiagnosisDynamicData(state, value) {
      state.diagnosisDynamicData = value;
   },

   getResultCount(state, count) {
      state.initialCount = { good: count.previous_good, weak: count.previous_weak, vulnarable: count.previous_weak, manual: count.previous_manual, na: count.previous_na };
      state.finalCount ={ good: count.current_good, weak: count.current_weak, vulnarable: count.current_weak, manual: count.current_manual, na: count.current_na };
      state.allCount = {prev : count.previous_total_records, current : count.current_total_records};
   },

   //Function to create download link
   activateDownloadLink(state, value) {
      const url = `${process.env.VUE_APP_API_BASE_URL}/download/file?url=${value.url}`// later required base url to dynamic
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', value.fileName);
      document.body.appendChild(link);
      link.click();
   },


   setSelectedTitle(state, value){
        state.selectedTitle = value;
   },

   emptyCheckBox(state, value){
     state.emptyCheckBox = value;
   },

   setTechnicalDiagnosisRowId(state, value){
      state.technialDiagnosisRowId = value;
   },

   // Modals Toggle

   actionGuidelineModal(state, value) {
      state.isActionGuidelines = value;
   },

   diagnosisProgramModal(state, value) {
      state.isdiagnosisProgram = value;
   },

   diagnosisComplete(state, value) {
      state.isDiagnosisComplete = value;
   },

}