import axios from 'axios';

export default class AssetManagementService {
    // asset sharing history
    async assetSharingHistory() {
        return await axios.post('/assets/get-sharing-history').then((res) => res).catch((err) => err);
    }

    // asset sharing history status change
    async shareHistoryStatusChange(assetID, shareStatus) {
        return await axios.post('/assets/share-request-status-change', { assets_request_id: assetID, share_status: shareStatus }).then((res) => res).catch((err) => err);
    }

    // view share request details
    async viewShareRequestDetails(shared_request_id, category_id, certification, page, limit) {
        return await axios.post('/assets/view-share-details', { shared_request_id: shared_request_id, category_id: category_id, certification: certification, page: page, limit: limit }).then((res) => res).catch((err) => err);
    }

    // add classification category
    async addClassificationCategory(credentials) {
        return await axios.post('/assets/add-category', { ...credentials }).then((res) => res).catch((err) => err);
    }

    // add classification category fields
    async addClassificationCategoryFields(credentials) {
        return await axios.post('/assets/add-category-fields', { ...credentials }).then((res) => res).catch((err) => err);
    }

    // asset share request save
    async shareReequestUpdate(credentials) {
        return await axios.post('/assets/update-by-sharer', { ...credentials }).then((res) => res).catch((err) => err);
    }

    // asset columns delete
    async assetColumnDelete(categoryId, fieldId) {
        return await axios.post('/assets/delete-category-fields', { assets_category_id: categoryId, assets_category_field_id: fieldId }).then((res) => res).catch((err) => err);
    }

    // my revision history list
    async revisionHistoryList(_page, _limit) {
        return await axios.post('/assets/my-revision-history-list', { page: _page, limit: _limit }).then((res) => res).catch((err) => err);
    }

    // edit asset - list by group
    async editListByGroup(category_id, certification, group_id) {
        return await axios.post('/assets/list-by-group', { category_id: category_id, certification : certification, group_id: group_id }).then((res) => res).catch((err) => err);
    }

    // asset classification criteria
    async assetClassificationCriteria() {
        return await axios.post('/assets/classification-criteria').then((res) => res).catch((err) => err);
    }

    // save classification criteria
    async saveClassificationCriteria(id, _remark) {
        return await axios.post('/assets/save-classification-criteria', { category_id: id, remark: _remark }).then((res) => res).catch((err) => err);
    }

    // asset group list save (add/edit)
    async assetListSave(_data) {
        return await axios.post('/assets/save', { data: _data }).then((res) => res).catch((err) => err);
    }

    // edit group delete
    async editGroupDelete(id) {
        return await axios.post('/assets/delete-group', { group_id: id }).then((res) => res).catch((err) => err);
    }

    // edit asset group tab
    async editGroupCategoryList(shared_request_id) {
        return await axios.post('/assets/category-list', { shared_request_id: shared_request_id }).then((res) => res).catch((err) => err);
    }

    // edit asset group - add
    async editAssetAddGroup(grName) {
        return await axios.post('/assets/add-group', { group_name: grName }).then((res) => res).catch((err) => err);
    }

    // edit asset group - List (upper dropdown)
    async editAssetGroupList() {
        return await axios.post('/assets/group-list').then((res) => res).catch((err) => err);
    }

    // edit assign group - save ( assign asstes to group)
    async editAssignGroupSave(group_id, certification, asset_id) {
        return await axios.post('/assets/assign-group', { group_id: group_id, certification: certification, asset_id: asset_id }).then((res) => res).catch((err) => err);
    }

    // edit asset group - Full list
    async editAssetFullList(id, _certification, pagination) {
        return await axios.post('/assets/full-list', { category_id: id, certification: _certification, pagination: pagination }).then((res) => res).catch((err) => err);
    }

    // asset classification and column setting update columns
    async updateCategoryList(credentials) {
        return await axios.post('/assets/update-category-fields', { ...credentials }).then((res) => res).catch((err) => err);
    }

    // asset classification and column setting delete category
    async assetClassificationDeleteCategory(assetId) {
        return await axios.post('/assets/delete-category', { assets_category_id: assetId }).then((res) => res).catch((err) => err);
    }


    // asset classification and column setting update category
    async assetClassificationUpdateCategory(credentials) {
        return await axios.post('/assets/update-category', { ...credentials }).then((res) => res).catch((err) => err);
    }

    // my revision history save
    async saveRevisionHistory(credentials) {
        return await axios.post('/assets/revision-history-save', { data: credentials }).then((res) => res).catch((err) => err);
    }

    // edit group - all field list by category
    async allFieldList(id) {
        return await axios.post('/assets/all-field-list-by-category', { assets_category_id: id }).then((res) => res).catch((err) => err);
    }

    // edit group - field list by category
    async fieldList(id) {
        return await axios.post('/assets/field-list-by-category', { assets_category_id: id }).then((res) => res).catch((err) => err);
    }

    // asset list selection
    async getAllAssetList(credentials) {
        return await axios.post('/assets/list', { ...credentials }).then((res) => res).catch((err) => err);
    }

    // download ledger
    async downloadLedger(credentials) {
        return await axios.post('/assets/download-ledger', { ...credentials }).then((res) => res).catch((err) => err);
    }

    // division list
    async assetDivisionList(cat_id) {
        return await axios.post('/assets/division-list', { assets_category_id: cat_id }).then((res) => res).catch((err) => err);
    }

    // share with company
    async shareWithCompany(shared_company_id, group_id, certification, assets_array) {
        return await axios.post('/assets/share-with-company', { shared_company_id: shared_company_id, group_id: group_id, certification: certification, assets_array: assets_array }).then((res) => res).catch((err) => err);
    }

    // ranking list
    async getRankingList() {
        return await axios.post('/assets/confidentiality-integrity-availability-values').then((res) => res).catch((err) => err);
    }

    // calculate threat ranking
    async calculateThreatRating(data) {
        return await axios.post('/assets/calculate-threat-ranking', data).then((res) => res).catch((err) => err);
    }

    // download excel
    async downloadExcel(category_id, certification) {
        return await axios.post('/assets/download-sample-excel', { category_id: category_id, certification: certification }).then((res) => res).catch((err) => err);
    }

    // upload excel
    async uploadExcel(data) {
        return await axios.post('/assets/upload-excel', data).then((res) => res).catch((err) => err);
    }
} 