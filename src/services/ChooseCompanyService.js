import axios from 'axios';

export default class ChooseCompanyService {

    // For final submission
    async chooseCompany(credentials) {
        return await axios.post('/auth/verify-auth-company', { ...credentials }).then((res) => res).catch((err) => err);
    }

    // for user settings
    async userSettings(uId) {
        return await axios.post('/auth/user-settings', { user_id: uId }).then((res) => res).catch((err) => err);
    }

    //Kepp company of your choice
    async keepApprovedCompany(uId) {
        return await axios.post('/auth/user-approved-company-list', { user_id: uId }).then((res) => res).catch((err) => err);
    }

}