
export default{
    isVerificationSuccess(state){
       state.isCodeVerified = false;
    },

    getCompanyID(state, id){
       state.company_id = id;
    },

    getErrorCodeMessage(state, message){
       state.errorCodeMsg = message;
    },
    
    getSuccessMessage(state, message){
      state.SucessCodeMsg = message;
   },

   getCompanyName(state, name){
      state.company_name = name;
   },
}