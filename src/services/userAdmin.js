import axios from "axios";

export default class userAdmin {
  async getUserData(page, limit, searchKey, searchBy, sortBy, sortOrder) {
    return await axios
      .post("/user/member-list", {
        page: page,
        limit: limit,
        searchKey: searchKey,
        searchBy: searchBy,
        sortBy: sortBy,
        sortOrder: sortOrder,
      })
      .then((res) => res)
      .catch((err) => err);
  }
  // admin name list
  async userFilterList() {
    return await axios
      .post("/user/member-list-filter-values")
      .then((res) => res)
      .catch((err) => err);
  }

  // get member detail information
  async getMemberDetail(user_id) {
    return await axios
      .post(`/user/member-details`, { user_id: user_id })
      .then((res) => res)
      .catch((err) => err);
  }

  // login OTP Enable
  async loginOTPEnable(user_id, is_authenticator_enable) {
    return await axios
      .post(`/user/member-otp-settings-update`, {
        user_id: user_id,
        is_authenticator_enable: is_authenticator_enable,
      })
      .then((res) => res)
      .catch((err) => err);
  }

  //  member password reset
  async passwordExpirationReset(user_id) {
    return await axios
      .post(`/user/member-password-expiration-reset`, { user_id: user_id })
      .then((res) => res)
      .catch((err) => err);
  }

  //  member update status
  async memberUpdateStatus(user_id, status) {
    return await axios
      .post(`/user/member-status-update`, { user_id: user_id, status: status })
      .then((res) => res)
      .catch((err) => err);
  }

  //  member update
  // async memberUpdate(user_id, approval_status, note, ip_access_type, ip) {
  //   return await axios
  //     .post(`/user/member-update`, {
  //       user_id: user_id,
  //       approval_status: approval_status,
  //       note: note,
  //       ip_access_type: ip_access_type,
  //       ip: ip,
  //     })
  //     .then((res) => res)
  //     .catch((err) => err);
  // }

  //  member update
  async memberUpdate(
    user_id,
    authority_id,
    department,
    rank,
    allowed_asset_group_type,
    allowed_asset_group_ids,
    allowed_evidence_group_type,
    allowed_evidence_group_ids,
    approval_status,
    note,
    ip_access_type,
    ip
  ) {
    return await axios
      .post(`/user/member-update`, {
        user_id: user_id,
        authority_id: authority_id,
        department: department,
        rank: rank,
        allowed_asset_group_type: allowed_asset_group_type,
        allowed_asset_group_ids: allowed_asset_group_ids,
        allowed_evidence_group_type: allowed_evidence_group_type,
        allowed_evidence_group_ids: allowed_evidence_group_ids,
        approval_status: approval_status,
        note: note,
        ip_access_type: ip_access_type,
        ip: ip,
      })
      .then((res) => res)
      .catch((err) => err);
  }

  //  delete member
  async deleteMember(user_id) {
    return await axios
      .post(`/user/member-delete`, { user_id: user_id })
      .then((res) => res)
      .catch((err) => err);
  }

  //Management Diagnosis Settings List search key
  async DiagnosisSearchKey() {
    return await axios
      .post("/user/management-diagnosis-settings/list-of-menus")
      .then((res) => res)
      .catch((err) => err);
  }

  //Management Diagnosis Settings List
  async diagnosisSettingsList(
    page,
    limit,
    searchMenu,
    certification,
    sortBy,
    sortOrder
  ) {
    return await axios
      .post("/user/management-diagnosis-settings", {
        page: page,
        limit: limit,
        searchMenu: searchMenu,
        certification: certification,
        sortBy: sortBy,
        sortOrder: sortOrder,
      })
      .then((res) => res)
      .catch((err) => err);
  }

  // License list
  async licenseList() {
    return await axios
      .post("/company/license-list")
      .then((res) => res)
      .catch((err) => err);
  }

  // technical diagnosis template list
  async templateList() {
    return await axios
      .post("/user/technical-diagnosis-settings/template")
      .then((res) => res)
      .catch((err) => err);
  }

  // template add
  async templateAdd(template_name) {
    return await axios
      .post("/user/technical-diagnosis-settings/template/add", {
        template_name: template_name,
      })
      .then((res) => res)
      .catch((err) => err);
  }

  // technical diagnosis menu list
  async technicalDiagnosisMenuList() {
    return await axios
      .post("/user/technical-diagnosis-settings")
      .then((res) => res)
      .catch((err) => err);
  }

  // technical diagnosis add item to group
  async addItem(template_id, risk_profile_tech_id) {
    return await axios
      .post("/user/technical-diagnosis-settings/template/grouping/edit", {
        template_id: template_id,
        risk_profile_tech_id: risk_profile_tech_id,
      })
      .then((res) => res)
      .catch((err) => err);
  }

  // technical diagnosis view item group
  async viewItem(template_id) {
    return await axios
      .post("/user/technical-diagnosis-settings/template/view", {
        template_id: template_id,
      })
      .then((res) => res)
      .catch((err) => err);
  }

  // technical diagnosis item view
  async viewDiagnosisListView(id) {
    return await axios
      .post("/user/technical-diagnosis-settings/detail", { id: id })
      .then((res) => res)
      .catch((err) => err);
  }

  // technical diagnosis add category list
  async assetCategoryList() {
    return await axios
      .post("/technical-diagnosis-settings/list-of-default-asset-category")
      .then((res) => res)
      .catch((err) => err);
  }

  // technical diagnosis technical risk list
  async technicalRiskList(category) {
    return await axios
      .post("/user/technical-diagnosis-settings/technical-risk-list", {
        category: category,
      })
      .then((res) => res)
      .catch((err) => err);
  }

  // technical diagnosis add
  async addTechnicalDiagnosis(
    category,
    code,
    addclass,
    item,
    grade,
    explain,
    risk,
    protection,
    threat,
    id
  ) {
    return await axios
      .post("/user/technical-diagnosis-settings/add-edit", {
        category: category,
        code: code,
        class: addclass,
        item: item,
        grade: grade,
        explain: explain,
        risk: risk,
        protection: protection,
        threat: threat,
        id: id,
      })
      .then((res) => res)
      .catch((err) => err);
  }
  // delete management diagnosis
  async deleteManagementDiagnosis(id) {
    return await axios
      .post("/user/management-diagnosis-settings/delete", { idArray: id })
      .then((res) => res)
      .catch((err) => err);
  }

  //Threat analysis main category list
  async mainCategoryList() {
    return await axios
      .post("/user/threat-analysis/list-of-main-category")
      .then((res) => res)
      .catch((err) => err);
  }

  //Threat analysis Settings List
  async threatAnalysisList(
    page,
    limit,
    searchByMainCategory,
    certification,
    sortBy,
    sortOrder
  ) {
    return await axios
      .post("/user/threat-analysis", {
        page: page,
        limit: limit,
        searchByMainCategory: searchByMainCategory,
        certification: certification,
        sortBy: sortBy,
        sortOrder: sortOrder,
      })
      .then((res) => res)
      .catch((err) => err);
  }

  //add/edit Threat analysis
  async addthreatAnalysis(
    threat_code,
    main_category,
    middle_class,
    threats,
    confidentiality,
    integrity,
    availability,
    id
  ) {
    return await axios
      .post("/user/threat-analysis/add-edit", {
        threat_code: threat_code,
        main_category: main_category,
        middle_class: middle_class,
        threats: threats,
        confidentiality: confidentiality,
        integrity: integrity,
        availability: availability,
        id: id,
      })
      .then((res) => res)
      .catch((err) => err);
  }

  // delete Threat analysis
  async deleteThreatAnalysis(id) {
    return await axios
      .post("/user/threat-analysis/delete", { idArray: id })
      .then((res) => res)
      .catch((err) => err);
  }

  //add/edit Management Diagnosis
  async addManagementDiagnosis(
    certification,
    menu,
    classes,
    item_number,
    detailed_contents,
    item_title,
    code,
    item,
    grade,
    explain,
    risk,
    protection,
    threat,
    marking,
    id
  ) {
    return await axios
      .post("/user/management-diagnosis-settings/add-edit", {
        certification: certification,
        menu: menu,
        class: classes,
        item_number: item_number,
        detailed_contents: detailed_contents,
        item_title: item_title,
        code: code,
        item: item,
        grade: grade,
        explain: explain,
        risk: risk,
        protection: protection,
        threat: threat,
        marking: marking,
        id: id,
      })
      .then((res) => res)
      .catch((err) => err);
  }

  // get add data

  async getAddData(setMenu, setCode, certification) {
    return await axios
      .post(`/user/management-diagnosis-settings/search`, {
        searchByItemCode: setCode,
        searchByMenu: setMenu,
        certification: certification,
      })
      .then((res) => res)
      .catch((err) => err);
  }

  // log management user list dropdown
  async logUserList() {
    return await axios
      .post(`/user/log-user-list`)
      .then((res) => res)
      .catch((err) => err);
  }
  //Threat code list
  async threatCodeList() {
    return await axios
      .post("/user/threat-analysis/list-of-threat-code")
      .then((res) => res)
      .catch((err) => err);
  }

  // log management user list dropdown
  async logEventList() {
    return await axios
      .post(`/user/log-event-list`)
      .then((res) => res)
      .catch((err) => err);
  }

  // log management table data
  async logManagementList(
    start_date,
    end_date,
    page,
    limit,
    user_id,
    result_success,
    result_fail,
    type,
    sort_by,
    sort_order
  ) {
    return await axios
      .post(`/user/log-list`, {
        start_date: start_date,
        end_date: end_date,
        page: page,
        limit: limit,
        user_id: user_id,
        result_success: result_success,
        result_fail: result_fail,
        type: type,
        sort_by: sort_by,
        sort_order: sort_order,
      })
      .then((res) => res)
      .catch((err) => err);
  }

  // user approval asset group list
  async assetGroupList() {
    return await axios
      .post("/user/assets-group-list")
      .then((res) => res)
      .catch((err) => err);
  }

  // user approval evidence group list
  async evidenceGroupList() {
    return await axios
      .post("/user/evidence-group-list")
      .then((res) => res)
      .catch((err) => err);
  }
  // save log
  async saveLog(
    start_date,
    end_date,
    user_id,
    result_success,
    result_fail,
    type,
    sort_by,
    sort_order
  ) {
    return await axios
      .post("/user/save-log", {
        start_date: start_date,
        end_date: end_date,
        user_id: user_id,
        result_success: result_success,
        result_fail: result_fail,
        type: type,
        sort_by: sort_by,
        sort_order: sort_order,
      })
      .then((res) => res)
      .catch((err) => err);
  }

  // change criteria dropdown list
  async criteriaValues() {
    return await axios
      .get("/criteria/criteria-values")
      .then((res) => res)
      .catch((err) => err);
  }
  // change criteria dropdown list
  async criteriaDetails(type) {
    return await axios
      .post("/criteria/criteria-details", { type: type })
      .then((res) => res)
      .catch((err) => err);
  }

  // save grade
  async saveGrade(data) {
    return await axios
      .post("/criteria/criteria-save-grade", { data: data })
      .then((res) => res)
      .catch((err) => err);
  }
  // save implementation cost
  async saveImplementationCost(data) {
    return await axios
      .post("/criteria/criteria-save-implementation-cost", { data: data })
      .then((res) => res)
      .catch((err) => err);
  }
  // save threat rating
  async saveThreatRating(data) {
    return await axios
      .post("/criteria/criteria-save-threat-rating", { data: data })
      .then((res) => res)
      .catch((err) => err);
  }
  // save implementation difficulty
  async saveImplementationDifficulty(data) {
    return await axios
      .post("/criteria/criteria-save-implementation-difficulty", { data: data })
      .then((res) => res)
      .catch((err) => err);
  }
  // save urgency
  async saveUrgency(data) {
    return await axios
      .post("/criteria/criteria-save-urgency", { data: data })
      .then((res) => res)
      .catch((err) => err);
  }
  // save priority
  async savePriority(data) {
    return await axios
      .post("/criteria/criteria-save-priority", { data: data })
      .then((res) => res)
      .catch((err) => err);
  }
  // save vulnerabilty
  async saveVulnerabilty(data) {
    return await axios
      .post("/criteria/criteria-save-vulnerability", { data: data })
      .then((res) => res)
      .catch((err) => err);
  }

  async saveSecurityLevel(data) {
    return await axios
      .post("/criteria/criteria-save-security-rating", { data: data })
      .then((res) => res)
      .catch((err) => err);
  }

  // threat analysis  ranking dropdown
  async rankingDropdown() {
    return await axios
      .post("/user/threat-analysis/ranking-dropdown")
      .then((res) => res)
      .catch((err) => err);
  }

}
