import axios from 'axios';


export default class SignupService{

// company code verification :
    async verifyCompanyCode(code){
        return await axios.post('/company/check-company-code', { company_code : code }).then((res) => res).catch((err) => err);
    }

//signup page email verification :
    async verifyEmail(email){
        return await axios.post('/auth/email-verify', { email_id : email }).then((res) => res).catch((err) => err);
    }

// user registration on signup page :
async userRegistration(user_data){
    return await axios.post('/auth/signup', {...user_data}).then((res) => res).catch((err) => err);
}
}



