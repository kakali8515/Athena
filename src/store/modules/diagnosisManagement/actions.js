import TechnicalDiagnosticResultsService from '@/services/TechnicalDiagnosticResultsService';
import Toast from "@/alert/alert.js";


const technicalDiagnosticResultsService = new TechnicalDiagnosticResultsService();


export default {
    getActionGuidelinesCategories({ commit }) {
        technicalDiagnosticResultsService.actionGuideLines().then((res) => {
            console.log("actionguide", res)
            if (res.status == 200) {
                commit("getGuideList", res.data.action_guideline)
            }

        })
    },


    getDiagnosisProgram({ commit }) {
        technicalDiagnosticResultsService.diagnosisProgram().then((res) => {
            console.log("diagnosisprogram", res)
            if (res.status == 200) {
                commit("getDiagnosisProgramList", res.data.diagnosis_pogram)
            }

        })
    },

    getAssetCategory({ commit }) {
        technicalDiagnosticResultsService.defaultAssetCategory().then((res) => {
            console.log("assetCategory", res)
            if (res.status == 200) {
                commit("getAssetCategoryList", res.data.asset_category_list)
            }

        })
    },

    getAssetClassification({ commit }, value) {
        technicalDiagnosticResultsService.defaultAssetClassification(value.id).then((res) => {
            console.log("assetClassification", res)
            if (res.status == 200) {
                commit("getAssetClassificationList", res.data.asset_classification)
            }

        })
    },

    getAssetCodeList({ commit }, value) {
        technicalDiagnosticResultsService.assetCodeList(value.id, value.certificate).then((res) => {
            console.log("assetCode", res)
            if (res.status == 200) {
                commit("getAssetCodeList", res.data.asset_code)
            }

        })
    },

    getItemCodeList({ commit }, value) {
        technicalDiagnosticResultsService.itemCodeList(value.id, value.certificate, value.code).then((res) => {
            console.log("itemCode", res)
            if (res.status == 200) {
                commit("getItemCodeList", res.data.item_code)
            }

        })
    },

    getShowColumn({ commit }, id) {
        technicalDiagnosticResultsService.showColumnList(id).then((res) => {
            console.log("showColumn", res)
            if (res.status == 200) {
                commit("getShowColumnList", res.data.list_of_column)
            }

        })
    },

    getSearchColumn({ commit }) {
        technicalDiagnosticResultsService.searchColumnList().then((res) => {
            console.log("searchColumn", res)
            if (res.status == 200) {
                commit("getSearchColumnList", res.data.list_column)
            }

        })
    },

    getTestResultList({ commit }) {
        technicalDiagnosticResultsService.testResultsList().then((res) => {
            console.log("testResultList", res)
            if (res.status == 200) {
                commit("getTestResultList", res.data.result_list)
            }

        })
    },

    setTemplateManual({ state }) {
        technicalDiagnosticResultsService.setTemplateManual(state.id, state.temp_id).then((res) => {
            console.log("tmplate-manual", res)

        })
    },

    getTemplateList({ commit }) {
        technicalDiagnosticResultsService.getTemplateList().then((res) => {
            // console.log("template list", res)
            commit("getTemplateList", res.data.template_list)

        })
    },

    finishEvaluation({ commit }, id) {
        technicalDiagnosticResultsService.finishEvaluation(id.rowId, id.categoryId).then((res) => {
            if (res.status == 200) {
                console.log("finish-evaluation", res)
                commit("diagnosisComplete", true)
                Toast.fire({ title: res.data.message });
            }

        })
    },

    saveEvaluation({ state }) {
        let credentials = {
            evaluationArray: [],
            limit: ""
        }
        technicalDiagnosticResultsService.saveEvaluation(credentials).then((res) => {
            console.log("save-evaluation", res)

        })
    },

    getEvaluationList({ state, commit }) {

        technicalDiagnosticResultsService.evaluationResults(state.page, state.limit).then((res) => {
            console.log("evaluation-list", res)
            if (res.status == 200) {
                commit('getEvaluationList', res.data)
            }


        })
    },

    getDiagnosisResult({ commit }, credentials) {

        technicalDiagnosticResultsService.diagnosisResults(credentials).then((res) => {
            console.log("diagnosis-result", res)
            if (res.status == 200) {
                commit('getDiagnosisResult', res.data)
                commit('getAssetClassificationValue', res.data.technical_diagnosis_settings[0]?.asset_classification);
                commit('getAssetCodeValue', res.data.technical_diagnosis_settings[0]?.asset_code);
            }


        })
    },

    getDiagnosisList({ commit }, credentials) {
        technicalDiagnosticResultsService.diagnosisList(credentials).then((res) => {
            console.log("diagnosis-list", res)
            if (res.status == 200) {
                commit('getDiagnosisList', res.data)
            }


        })
    },

    getResultCount({ commit }, credentials) {
        technicalDiagnosticResultsService.resultCount(credentials).then((res) => {
            console.log("result-count", res)
            if (res.status == 200) {
                commit('getResultCount', res.data)
            }


        })
    },

    // Dynamic tabs and Table
    createDynamicTabTable({ commit }, credentials) {
        let dynamicArr = [];
        technicalDiagnosticResultsService.defaultAssetCategory().then((res) => {
            console.log("assetCategoryDynamic", res)
            Array.from(res.data.asset_category_list).forEach(element => {
                let obj = {};
                Object.assign(obj, { category_id: element.id, category_name: element.category_key })
                technicalDiagnosticResultsService.showColumnList(element.id).then((res) => {
                    console.log("showColumn", res)
                    Object.assign(obj, { column_list: res.data.list_of_column })

                })

                Object.assign(credentials, { category_id: element.id })
                technicalDiagnosticResultsService.diagnosisList(credentials).then((res) => {
                    console.log("diagnosis-list", res)
                    //commit('getDiagnosisList', res.data)
                    Object.assign(obj, { total_records: res.data.total_records, diagnosis_list: res.data.technical_diagnosis_settings })
                })
                dynamicArr.push(obj)
            })

            commit("getDiagnosisDynamicData", dynamicArr);

        })

        console.log("dynamic-tab-table", dynamicArr);

    },

    //API to download files
    downLoadFiles({ commit }, value) {
        technicalDiagnosticResultsService.downloadFiles(value.fileName, value.key).then((res) => {
            console.log(res)
            let data = { url: res.data.url, fileName: value.fileName }
            commit("activateDownloadLink", data);
        })
    },

    //API to download files bulletineboard
    createDownloadFiles({ commit }, value) {
        let data = { url: value.url, fileName: value.fileName }
        console.log('data---?', data);
        commit("activateDownloadLink", data);
    },

    setSelectedTitle({ commit }, value) {
        commit("setSelectedTitle", value)
    },



    doEmptyCheckBox({ commit }, bool) {
        commit("emptyCheckBox", bool)
    },

    setTechnicalDiagnosisRowId({ commit }, value) {
        commit("setTechnicalDiagnosisRowId", value)
    },


    // Modal switches

    toggleActionGuidelineModal({ commit }, bool) {
        commit("actionGuidelineModal", bool)
    },

    toggleDiagnosisProgramModal({ commit }, bool) {
        commit("diagnosisProgramModal", bool)
    }


}