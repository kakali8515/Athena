import actions from "./actions.js"
import mutations from "./mutations.js"

export default {
    namespaced : true,
    state : ()=>({
    
        certificate : localStorage.getItem('certificationName') ? localStorage.getItem('certificationName') : null,
        token : localStorage.getItem('token') ? localStorage.getItem('token') : null,
        email : localStorage.getItem('uEmail') ? localStorage.getItem('uEmail') : null,
        certificationAudit : ''

    }),

  mutations: mutations,
  actions: actions
}