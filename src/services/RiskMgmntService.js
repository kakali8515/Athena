import axios from "axios";

export default class RiskMgmntService {
  // threat technical Area
  async technicalArea(page, limit, certification, sortBy, sortOrder) {
    return await axios
      .post(`/risk-management/technical-area`, {
        page: page,
        limit: limit,
        certification: certification,
        sortBy: sortBy,
        sortOrder: sortOrder
      })
      .then((res) => res)
      .catch((err) => err);
  }
  // threat management Area
  async managementArea(page, limit, certification, sortBy, sortOrder) {
    return await axios
      .post(`/risk-management/management-area`, {
        page: page,
        limit: limit,
        certification: certification,
        sortBy: sortBy,
        sortOrder: sortOrder
      })
      .then((res) => res)
      .catch((err) => err);
  }

  // threat analysis
  async threatAnalysis(page, limit, certification, sortBy, sortOrder) {
    return await axios
      .post(`/risk-management/threat-analysis`, {
        page: page,
        limit: limit,
        certification: certification,
        sortBy: sortBy,
        sortOrder: sortOrder
      })
      .then((res) => res)
      .catch((err) => err);
  }

  // information protection plan technical area
  async infoProtectionTechnicalArea(
    page,
    limit,
    certification,
    asset_class,
    action_status,
    sortBy,
    sortOrder
  ) {
    return await axios
      .post(`/risk-management/information-plan-technical-area`, {
        page: page,
        limit: limit,
        certification: certification,
        class: asset_class,
        action_status: action_status,
        sortBy: sortBy,
        sortOrder: sortOrder
      })
      .then((res) => res)
      .catch((err) => err);
  }

  // information protection plan management area
  async infoProtectionManagementArea(
    page,
    limit,
    certification,
    asset_class,
    action_status,
    sortBy,
    sortOrder
  ) {
    return await axios
      .post(`/risk-management/information-plan-management-area`, {
        page: page,
        limit: limit,
        certification: certification,
        class: asset_class,
        action_status: action_status,
        sortBy: sortBy,
        sortOrder: sortOrder
      })
      .then((res) => res)
      .catch((err) => err);
  }

  // information protection plan cost list
  async costList() {
    return await axios
      .post(`/risk-management/implementation-cost-list`)
      .then((res) => res)
      .catch((err) => err);
  }

  // information protection plan difficulty list
  async difficultyList() {
    return await axios
      .post(`/risk-management/implementation-difficulty-list`)
      .then((res) => res)
      .catch((err) => err);
  }

  // information protection plan class list
  async classList(certification) {
    return await axios
      .post(`/risk-management/class-list`, {
        certification: certification,
      })
      .then((res) => res)
      .catch((err) => err);
  }

  // information protection plan download management data
  async infoProtectionManagementDownload(type, certification, sortBy, sortOrder) {
    return await axios
      .post(`/risk-management/information-plan-management-download-result`, {
        type: type,
        certification: certification,
        sortBy: sortBy,
        sortOrder: sortOrder
      })
      .then((res) => res)
      .catch((err) => err);
  }
  // information protection plan download management data
  async infoProtectionTechnicalDownload(type, certification, sortBy, sortOrder) {
    return await axios
      .post(`/risk-management/information-plan-technical-download-result`, {
        type: type,
        certification: certification,
        sortBy: sortBy,
        sortOrder: sortOrder
      })
      .then((res) => res)
      .catch((err) => err);
  }

  // technical area Download Result
  async technicalAreaDownload(type, certification, sortBy, sortOrder) {
    return await axios
      .post(`/risk-management/technical-area-download-result`, {
        type: type,
        certification: certification,
        sortBy: sortBy,
        sortOrder: sortOrder
      })
      .then((res) => res)
      .catch((err) => err);
  }

  // management area Download Result
  async managementAreaDownload(type, certification, sortBy, sortOrder) {
    return await axios
      .post(`/risk-management/management-area-download-result`, {
        type: type,
        certification: certification,
        sortBy: sortBy,
        sortOrder: sortOrder
      })
      .then((res) => res)
      .catch((err) => err);
  }

  // threat analysis Download Result
  async threatDownload(type, certification, sortBy, sortOrder) {
    return await axios
      .post(`/risk-management/threat-analysis-download-result`, {
        type: type,
        certification: certification,
        sortBy: sortBy,
        sortOrder: sortOrder
      })
      .then((res) => res)
      .catch((err) => err);
  }

  // save Management data
  async saveManagement(data) {
    return await axios
      .post(`/risk-management/information-plan-management-save`, {
        data: data,
      })
      .then((res) => res)
      .catch((err) => err);
  }

  // save Technical data
  async saveTechnical(data) {
    return await axios
      .post(`/risk-management/information-plan-technical-save`, {
        data: data,
      })
      .then((res) => res);
  }

  // manager list
  async managerList() {
    return await axios.post(`/risk-management/manager-list`).then((res) => res);
  }

  // graph
  async chartData(certification, doa_value) {
    return await axios
      .post(`/risk-management/graph`, {
        certification: certification,
        doa_value: doa_value,
      })
      .then((res) => res)
      .catch((err) => err);
  }

  // DAOA List
  async fetchDoa(certification) {
    return await axios
      .post(`/risk-management/get-doa-value`, {
        certification: certification,
      })
      .then((res) => res)
      .catch((err) => err);
  }

  async graphList(certification, doa_value) {
    return await axios
      .post(`/risk-management/graph-list`, {
        certification: certification,
        doa_value: doa_value,
      })
      .then((res) => res)
      .catch((err) => err);
  }
}
