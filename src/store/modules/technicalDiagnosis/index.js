import actions from "./actions.js"
import mutations from "./mutations.js"

export default {
    namespaced : true,
    state : ()=>({
    
        menuList : [],

    }),

  mutations: mutations,
  actions: actions
}