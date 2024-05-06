import axios from "axios";

export default class DiagnosisManagementService {
  // Diagnosis settings
  async diagnosisSettings(_searchMenu) {
    return await axios
      .post("/management-diagnosis-settings", { searchMenu: _searchMenu })
      .then((res) => res)
      .catch((err) => err);
  }

  // Evaluate list of rows
  async evaluateListofRows(className, text, date, searchByMenu, sortBy, sortOrder, certification) {
    return await axios
      .post("/management-diagnosis-settings/list-of-rows-to-evaluate", {
        searchByClass: className,
        searchByText: text,
        searchByUploadDate: date,
        searchByMenu: searchByMenu,
        sortBy: sortBy,
        sortOrder: sortOrder,
        certification: certification
      })
      .then((res) => res)
      .catch((err) => err);
  }

  // Risk Evaluation
  async doRiskEvaluation(credentials) {
    return await axios
      .post("/management-diagnosis-settings/risk-evaluation", {
        ...credentials,
      })
      .then((res) => res)
      .catch((err) => err);
  }

  // Diagnosis Status List
  async diagnosisStatusList() {
    return await axios
      .post("/management-diagnosis-settings/list-of-diagnosis-status")
      .then((res) => res)
      .catch((err) => err);
  }

  // List of score
  async diagnosisScoreList(certificate) {
    return await axios
      .post("/management-diagnosis-settings/list-of-score",{certification:certificate})
      .then((res) => res)
      .catch((err) => err);
  }

  // Graph Result
  async diagnosisGraphResult(certificate, menu) {
    return await axios
      .post("/management-diagnosis-settings/donut-graph-reprasentation", {
        certification: certificate,
        menu: menu,
      })
      .then((res) => res)
      .catch((err) => err);
  }

  // Network Graph Result
  async diagnosisNetworkGraph(certificate, menu) {
    return await axios
      .post("/management-diagnosis-settings/network-graph-reprasentation", {
        certification: certificate,
        menu: menu,
      })
      .then((res) => res)
      .catch((err) => err);
  }

  // Bar Graph Result
  async diagnosisBarGraph(certificate, menu) {
    return await axios
      .post("/management-diagnosis-settings/bar-graph-reprasentation", {
        certification: certificate,
        menu: menu,
      })
      .then((res) => res)
      .catch((err) => err);
  }

  // Class List
  async classList(certificate, menu) {
    return await axios
      .post("/management-diagnosis-settings/list-of-class", {
        certification: certificate,
        menu: menu,
      })
      .then((res) => res)
      .catch((err) => err);
  }

  // Upload History
  async uploadHistory(className, menu, certification) {
    return await axios
      .post("/management-diagnosis-settings/upload-history", {
        class_name: className,
        menu: menu,
        certification: certification
      })
      .then((res) => res)
      .catch((err) => err);
  }

  // download result
  async downloadDiagnosisResult(searchClass, certification, searchText, searchDate) {
    return await axios
      .post("/management-diagnosis-settings/download-result", {
        searchByClass: searchClass,
        certification: certification,
        searchByText: searchText,
        searchByUploadDate: searchDate,
      })
      .then((res) => res)
      .catch((err) => err);
  }

  // menu dropdown
  async diagnosisMenu(certificate) {
    return await axios
      .post("/management-diagnosis-settings/list-of-menus", {
        certification: certificate,
      })
      .then((res) => res)
      .catch((err) => err);
  }
}
