import userAdmin from '@/services/userAdmin';


const userAdminService = new userAdmin();

export default {
    getAdminsidebarMenuList({ commit }) {
        userAdminService.technicalDiagnosisMenuList().then((res) => {
            console.log("getMenuList", res)
            commit("getMenuList", res.data.asset_list)
        })
    },

}