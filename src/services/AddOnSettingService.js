import axios from 'axios';

export default class AddOnSettingService {

    async addOnDetails() {
        return await axios.post('/user/addon-settings').then((res) => res).catch((err) => err);
    }

    async setLoginAttempts(number_of_login_attempts) {
        return await axios.post('/user/addon-settings-update-login-attempts', { number_of_login_attempts: number_of_login_attempts }).then((res) => res).catch((err) => err);
    }

    async setMaxPasswordPeriod(maximum_password_period) {
        return await axios.post('/user/addon-settings-update-password-period', { maximum_password_period: maximum_password_period }).then((res) => res).catch((err) => err);
    }

    async updateReviewPeriod(review_period_from, review_period_to) {
        return await axios.post('/user/addon-settings-update-review-period', { review_period_from: review_period_from, review_period_to: review_period_to }).then((res) => res).catch((err) => err);
    }

    async dataBackup(user_id, company_id, type) {
        return await axios.post('/company/download-data-backup',
            {
                user_id: user_id,
                company_id: company_id,
                type: type
            }).then((res) => res).catch((err) => err);
    }
}
