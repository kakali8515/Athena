import SideBarService from "../../../services/SideBarService.js";
const sideBarService = new SideBarService();

export default {
  getPermissionList({ commit }, value) {
    commit("PermissionList", value);
  },
};
