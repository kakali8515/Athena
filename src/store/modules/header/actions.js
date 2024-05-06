
export default {
    getCertificate({ commit }, certification) {
        commit('getCertificate', certification)
    },
    getToken({ commit }, token) {
        commit('getToken', token)
    },
    getUemail({ commit }, email) {
        commit('getUemail', email)
    }
}