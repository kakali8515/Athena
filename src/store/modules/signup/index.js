import actions from "./actions.js"
import mutations from "./mutations.js"

export default {
    namespaced : true,
    state : ()=> ({

      // company code page
      isCodeVerified : true,
      company_id : '',
      errorCodeMsg : "",
      SucessCodeMsg:"",
      company_name:""
      
    }),
    
    mutations :mutations,
    actions : actions
}