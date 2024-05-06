import axios from 'axios';

export default class ChangeUserInfoService {


    // get user information
    async getUserInfo() {
        return await axios.post(`/user/profile`)
            .then((res) => res)
            .catch((err) => err)
    }

    // get register company list
    async getRegisterCompanyList(user_id) {
        return await axios.post(`/auth/user-all-company-list`, { user_id: user_id })
            .then((res) => res)
            .catch((err) => err)
    }


    // verify current password
    async verifyCurrentPassword(current_password) {
        return await axios.post(`/user/verify-password`, { current_password: current_password })
            .then((res) => res)
            .catch((err) => err)
    }


    // verify company code
    async verifyCompanyCode(company_code) {
        return await axios.post(`/company/check-company-code`, { company_code: company_code })
            .then((res) => res)
            .catch((err) => err)
    }

    //  company code approval
    async companyCodeApproval(user_id, company_id) {
        return await axios.post(`/auth/company-approval-request`, { user_id: user_id, company_id: company_id })
            .then((res) => res)
            .catch((err) => err)
    }


    //  update profile with password
    async updateProfilewithPassword(name, department, rank, mobile, password, access_company_type, access_company_id, deleted_register_company_ids) {
        return await axios.post(`/user/profile-update`, { name: name, department: department, rank: rank, mobile: mobile, password: password, access_company_type: access_company_type, access_company_id: access_company_id, deleted_register_company_ids: deleted_register_company_ids })
            .then((res) => res)
            .catch((err) => err)
    }

    //  update profile with out password
    async updateProfilewithoutPassword(name, department, rank, mobile, access_company_type, access_company_id, deleted_register_company_ids) {
        return await axios.post(`/user/profile-update`, { name: name, department: department, rank: rank, mobile: mobile, access_company_type: access_company_type, access_company_id: access_company_id, deleted_register_company_ids: deleted_register_company_ids })
            .then((res) => res)
            .catch((err) => err)
    }


    // get register company list
    async getRegisterApproveCompanyList(user_id) {
        return await axios.post(`/auth/user-approved-company-list`, { user_id: user_id })
            .then((res) => res)
            .catch((err) => err)
    }


    // send mobile otp
    async sendOTP(mobile) {
        return await axios.post(`/user/verify-mobile`, { mobile: mobile })
            .then((res) => res)
            .catch((err) => err)
    }

    // verify mobile otp
    async verifyOTP(otp) {
        return await axios.post(`/user/match-code-current-mobile`, { otp: otp })
            .then((res) => res)
            .catch((err) => err)
    }


    // reset password
    async resetPassword(user_id, old_password, password, confirm_password) {
        return await axios.post(`/user/change-password`, { user_id: user_id, old_password: old_password, password: password, confirm_password: confirm_password })
            .then((res) => res)
            .catch((err) => err)
    }


}