import actions from "./actions.js"
import mutations from "./mutations.js"

export default {
  namespaced: true,
  state: () => ({

    isloginVerified: false,
    isLogedin: false,
    isOTPRegisterConfirm: false,
    isOTPRegisterFailed: false,
    user_id: localStorage.getItem('uid') ? localStorage.getItem('uid') : '',
    user_email: '',
    authenticator_secret_key: "",
    is_default_password_reset: "",
    login_otp_enabled: "",
    qr_code_url: "",
    isAuthenticatorEnable : true,
    errorPassword:"",
    errorEmail:"",
    errorPasswordAttempts:"",
    is_user_admin: localStorage.getItem('userAdmin') ? localStorage.getItem('userAdmin') : '',

    // errorCodeMsg: {},

    // OTP registration response

    waiting_for_approval: '',
    total_company: '',
    only_backup_available: '',
    company_code: '',
    company_name: localStorage.getItem('compName') ? localStorage.getItem('compName') : '',
    company_id : localStorage.getItem('compid') ? localStorage.getItem('compid') : '',
    company_registration_number: '',
    reg_status: '',
    company_list : [],
    pending_company_status : {},
    pending_company_status_reason : "",

    // OTP reg 'NO'
    access_token: '',
    access_token_expiry: '',
    lisence_expiration_remaining_date: '',
    passwordExpired:false,
    PasswordExpiredUserId:'',
    status:''
  }),

  mutations: mutations,
  actions: actions
}