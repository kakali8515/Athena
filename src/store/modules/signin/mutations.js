export default {
  isVerificationSuccess(state) {
    state.isloginVerified = true;
  },

  isAuthenticatorEnable(state, bool) {
    state.isAuthenticatorEnable = bool;
  },

  getLoginInfo(state, loginData) {
    state.user_id = loginData.user_id;
    state.user_email = loginData.user_email;
    state.authenticator_secret_key = loginData.authenticator_secret_key;
    state.is_default_password_reset = loginData.is_default_password_reset;
    state.login_otp_enabled = loginData.login_otp_enabled;
    state.qr_code_url = loginData.qr_code_url;
    state.errorPassword = "";
  },

  getDisableAuthLoginInfo(state, credentials) {
    state.user_id = credentials.user_id;
    state.user_email = credentials.user_email;
    state.company_id = credentials.company_id;
    state.company_code = credentials.company_code;
    state.company_name = credentials.company_name;
    state.access_token = credentials.access_token;
    state.access_token_expiry = credentials.access_token_expiry;
    state.total_company = credentials.total_company;
    state.lisence_expiration_remaining_date = credentials.lisence_expiration_remaining_date;
    state.company_list = credentials.company_list;
    state.is_user_admin = credentials.is_user_admin;

    if (credentials.pending_company_status) {
      state.pending_company_status = credentials.pending_company_status;
    }
  },



  getOTPRegisterConfirm(state, Bool) {
    state.isOTPRegisterConfirm = Bool;
  },

  getOTPRegisterFailed(state, Bool) {
    state.isOTPRegisterFailed = Bool;
  },

  // OTP registration mutation
  otpRegistration(state, otpRes) {
    state.waiting_for_approval = otpRes.waiting_for_approva;
    state.total_company = otpRes.total_company;
    state.only_backup_available = otpRes.only_backup_available;
    state.company_code = otpRes.company_code;
    state.company_name = otpRes.company_name;
    state.company_registration_number = otpRes.company_registration_number;
    state.reg_status = otpRes.reg_status;
  },
  otpResData(state, otpRes) {
    state.total_company = otpRes.total_company;
    state.only_backup_available = otpRes.only_backup_available;
    state.company_code = otpRes.company_code;
    state.company_name = otpRes.company_name;
    state.access_token = otpRes.access_token;
    state.access_token_expiry = otpRes.access_token_expiry;
    state.lisence_expiration_remaining_date = otpRes.lisence_expiration_remaining_date;
    state.company_id = otpRes.company_id;
    state.is_user_admin = otpRes.is_user_admin;
  },
  getErrorPasswordMsg(state, message) {
    state.errorPassword = message;
    state.errorPasswordAttempts = "";
  },
  getErrorEmailMsg(state, message) {
    state.errorEmail = message;
  },
  getErrorPasswordAttemptsMsg(state, message) {
    state.errorPasswordAttempts = message;
    state.errorPassword = "";
  },
  //update user credential
  updateUserCredential(state, value) {
    state.company_id = value.company_id;
    state.company_name = value.company_name;
    state.user_id = value.user_id;
    state.is_user_admin = value.is_user_admin;
  },
  getErrorPasswordExpired(state, value) {
    state.passwordExpired = value;
  },
  getErrorPasswordExpiredUserId(state, value) {
    state.PasswordExpiredUserId = value;
  },
  statusUpdate(state, value) {
    state.status=value;
  }

}