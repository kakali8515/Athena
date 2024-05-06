import axios from 'axios';

export default class TechnicalDiagnosticResultsService {
    // Action guideline
    async actionGuideLines() {
        return await axios.post('/technical-diagnosis-settings/action-guidelines').then((res) => res).catch((err) => err);
    }

    // Diagnosis Program
    async diagnosisProgram() {
        return await axios.post('/technical-diagnosis-settings/diagnosis-program').then((res) => res).catch((err) => err);
    }

    // Default asset category
    async defaultAssetCategory() {
        return await axios.post('/technical-diagnosis-settings/list-of-default-asset-category').then((res) => res).catch((err) => err);
    }

    // Default asset classification
    async defaultAssetClassification(id) {
        return await axios.post('/technical-diagnosis-settings/list-of-asset-classification', { category_id: id }).then((res) => res).catch((err) => err);
    }

    // list of asset code
    async assetCodeList(id, certificate) {
        return await axios.post('/technical-diagnosis-settings/list-of-asset-code', { category_id: id, certification: certificate }).then((res) => res).catch((err) => err);
    }

    // list of item code
    async itemCodeList(id, certificate, classificationCode) {
        return await axios.post('/technical-diagnosis-settings/list-of-item-code', { category_id: id, certification: certificate, classification_code: classificationCode }).then((res) => res).catch((err) => err);
    }

    // Column list to show
    async showColumnList(id) {
        return await axios.post('/technical-diagnosis-settings/list-of-column-to-show', { category_id: id }).then((res) => res).catch((err) => err);
    }

    // Column list to searach
    async searchColumnList() {
        return await axios.post('/technical-diagnosis-settings/list-of-column-to-search').then((res) => res).catch((err) => err);
    }

    // Test Results list
    async testResultsList() {
        return await axios.post('/technical-diagnosis-settings/list-of-test-results').then((res) => res).catch((err) => err);
    }


    // set template manual
    async setTemplateManual(_id, _template_id) {
        return await axios.post('/technical-diagnosis-settings/set-template-manual', { id: _id, template_id: _template_id }).then((res) => res).catch((err) => err);
    }

    // get template list
    async getTemplateList() {
        return await axios.post('/technical-diagnosis-settings/list-of-template').then((res) => res).catch((err) => err);
    }

    // finish evaluation
    async finishEvaluation(_id, category_id) {
        return await axios.post('/technical-diagnosis-settings/finish-evalution', { id: _id, category_id: category_id }).then((res) => res).catch((err) => err);
    }

    // evaluation results
    async evaluationResults(template_id, asset_id, certification, diagnosis_status) {
        return await axios.post('/technical-diagnosis-settings/list-of-evalution',
            {
                template_id: template_id,
                asset_id: asset_id,
                certification: certification,
                diagnosis_status: diagnosis_status
            }).then((res) => res).catch((err) => err);
    }

    // diagnosis results
    async diagnosisResults(credentials) {
        return await axios.post('/technical-diagnosis-settings/list-of-diagnosis-result', { ...credentials }).then((res) => res).catch((err) => err);
    }

    // diagnosis list
    async diagnosisList(credentials) {
        return await axios.post('/technical-diagnosis-settings', { ...credentials }).then((res) => res).catch((err) => err);
    }

    // result count
    async resultCount(credentials) {
        return await axios.post('/technical-diagnosis-settings/result-count', { ...credentials }).then((res) => res).catch((err) => err);
    }

    // Download
    async downloadFiles(fileName, key) {
        return await axios.post("/technical-diagnosis-settings/file-download-url", { file_name: fileName, file_key: key }).then((res) => res).catch((err) => err);
    }

    async downloadDiagnosisResult(credentials) {
        return await axios.post("/technical-diagnosis-settings/download-diagnosis-result", { ...credentials }).then((res) => res).catch((err) => err);
    }

    // Save manual diagnosis
    async saveEvaluation(evaluationArray, diagnosis_status, template_id, asset_id, certification, automatic, category_id) {
        return await axios.post("/technical-diagnosis-settings/save-evalution", {
            evaluationArray: evaluationArray,
            diagnosis_status: diagnosis_status,
            template_id: template_id,
            asset_id: asset_id,
            certification: certification,
            automatic: automatic,
            category_id: category_id
        }).then((res) => res).catch((err) => err);
    }


    // donut graph
    async donutGraph(certificate) {
        return await axios.post('/technical-diagnosis-settings/donut-graph', { certification: certificate }).then((res) => res).catch((err) => err);
    }

    // bar graph by category
    async barGraphCategory(certificate) {
        return await axios.post('/technical-diagnosis-settings/bar-graph-by-category', { certification: certificate }).then((res) => res).catch((err) => err);
    }

    // bar graph by code
    async barGraphCode(certificate) {
        return await axios.post('/technical-diagnosis-settings/bar-graph-by-code', { certification: certificate }).then((res) => res).catch((err) => err);
    }

    // download  
    async downloadEvaluation(diagnosis_status, asset_id, template_id, certification, category_id) {
        return await axios.post('/technical-diagnosis-settings/manual-evaluation-download-result',
            {
                diagnosis_status: diagnosis_status,
                asset_id: asset_id,
                template_id: template_id,
                certification: certification,
                category_id: category_id
            }).then((res) => res).catch((err) => err);
    }

    // automatic upload results
    async automaticUploadResult(data) {
        return await axios.post('/technical-diagnosis-settings/automatic-upload', data
        ).then((res) => res).catch((err) => err);
    }

    // automatic upload results
    async downloadautomaticUploadResult(data) {
        return await axios.post('/technical-diagnosis-settings/automatic-evaluation-download-result', data
        ).then((res) => res).catch((err) => err);
    }
}