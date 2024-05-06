import AuthService from '@/services/AuthService';
import Toast from "@/alert/alert.js";
//import validator from 'validator';
import { useCookies } from "vue3-cookies";


const authService = new AuthService();
const { cookies } = useCookies();

export default {



  //For Login page :
  async userLogin({ commit }, credentials) {
    return authService.doLogin(credentials.email, credentials.password).then((res) => {
      if (res.status == 200) {
        console.log('res', res.data.waiting_for_approval, res.data.total_company);
        if(res.data.waiting_for_approval == 'yes' && res.data.total_company == 0){
          Toast.fire('The admin has no comopany.');
        }
        commit("getErrorEmailMsg", "");
        commit("getErrorPasswordMsg", "");
        if (res.data.is_authenticator_enable == 'n') {
          //alert("its working")
          commit("statusUpdate", res.status)
          let userCredentials = {
            user_id: res.data.user_id,
            user_email: res.data.email,
            company_id: res.data.company_id,
            company_code: res.data.company_code,
            company_name: res.data.company_name,
            access_token : res.data.access_token,
            access_token_expiry : res.data.access_token_expiry,
            total_company : res.data.total_company,
            lisence_expiration_remaining_date : res.data.lisence_expiration_remaining_date,
            is_user_admin : res.data.is_user_admin,
            //pending_company_status : res.data.pending_company_status.status,
            //pending_company_status_reason : res.data.pending_company_status.note,
            company_list : res.data.company_list

          }

          //checking if pending property staus exists and then assigning its value
          let obj = res.data
          if(obj.hasOwnProperty("pending_company_status")){
            Object.assign(userCredentials, {pending_company_status : obj.pending_company_status})
          }else{
            Object.assign(userCredentials, {pending_company_status : null })
          }


          commit("getDisableAuthLoginInfo", userCredentials)
          commit("isAuthenticatorEnable", false)
          if (credentials.saveCredentials) {
            cookies.set("rememberUserEmail", credentials.email);
            // cookies.set("rememberUserPassword", this.password);
          }
          return;
        } else {
          commit("isAuthenticatorEnable", true)
          let userData = {
            user_id: res.data.user_id,
            user_email: res.data.email,
            authenticator_secret_key: res.data.authenticator_secret_key,
            is_default_password_reset: res.data.is_default_password_reset,
            login_otp_enabled: res.data.login_otp_enabled,
            qr_code_url: res.data.qr_code_url,
          }
          commit('isVerificationSuccess');
          commit('getLoginInfo', userData);
          if (res.data.login_otp_enabled == 'no') {
            commit('getOTPRegisterConfirm', true);
          } else {
            commit('getOTPRegisterFailed', true);
          }
          if (credentials.saveCredentials) {
            cookies.set("rememberUserEmail", credentials.email);
            // cookies.set("rememberUserPassword", this.password);
          }

        }


      }else if (res.response.status == 400) {
        commit("statusUpdate", res.response.status)
        if(res.response.data.error.login_attempt_fail == "y"){
          commit("getErrorPasswordAttemptsMsg", res.response.data.error.attempts)
        }
        if (res.response.data.error.password_expired == "y") {
          commit("getErrorPasswordExpired", true)
          commit("getErrorPasswordExpiredUserId", res.response.data.error.user_id)
        }
        if (res.response.data.error.password) {
          commit("getErrorPasswordMsg", res.response.data.error.password)
        }
        if (res.response.data.error.email) {
          commit("getErrorEmailMsg", res.response.data.error.email)
        }
        if (res.response.data.error.inactive_status) {
          Toast.fire(res.response.data.error.inactive_status);
        }
        console.warn(res.response.data.error)
      } else if (res.response.status == 401) {
        Toast.fire(res.response.data.error);
      }

    })
  },

  modalotpRegClose({ commit }) {
    commit('getOTPRegisterConfirm', false);
  },

  modalotpRegfailedClose({ commit }) {
    commit('getOTPRegisterFailed', false);
  },

  // OTP Registration

  otpRegistration({ commit }, otpRes) {
    commit('otpRegistration', otpRes);
  },

  otpResData({ commit }, otpRes) {
    commit('otpRegistration', otpRes);
  },
  //update user credential
updateUserCredential({ commit }, value) {
  commit('updateUserCredential', value);
}

}