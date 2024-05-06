import SignupService from '../../../services/signupService.js';
import validator from 'validator';
const signupService = new SignupService();

export default {

    //For company code page :
    getVerification({ commit }, code) {
        if (validator.isEmpty(code)) {
            commit("getErrorCodeMessage", "기업코드를 입력해 주세요.");
            return;
        }
        signupService.verifyCompanyCode(code).then((res) => {
            if (res.status == 200) {
                console.log("company code : ", res.data)
                commit("getErrorCodeMessage", "")
                commit('isVerificationSuccess')
                commit('getCompanyID', res.data.company_id)
                commit("getSuccessMessage", '기업코드가 확인되었습니다.')
                commit('getCompanyName', res.data.company_name)

            }

            if (res.response.status == 400) {
                console.warn(res.response.data.error)
                let message = "유효한 기업코드가 아닙니다.";
                commit("getErrorCodeMessage", message)
            }

        }).catch(err => {
            console.log(err)
        })

    },


    emptyErrorCodeMsg({commit}){
        commit("getErrorCodeMessage", "")
    },


    // For Signup page :

   getSameCodeErrorMsg({commit}, message){
    commit("getErrorCodeMessage", message)
   },

   getCompanyID({commit},id){
    commit('getCompanyID', id)
   }


}