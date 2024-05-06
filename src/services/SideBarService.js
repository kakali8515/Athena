import axios from "axios";

export default class SideBarService {
  // permission
  async permission(certification, uId, cId) {
    return await axios
      .post(`user/permission`, {
        certification: certification,
        user_id: uId, //optionnal
        company_id: cId,
      })
      .then((res) => res)
      .catch((err) => err);
  }
  // sidebar
  async sideBar(certification, uId, cId) {
    return await axios
      .post(`user/sidebar`, {
        certification: certification,
        user_id: uId, //optionnal
        company_id: cId,
      })
      .then((res) => res)
      .catch((err) => err);
  }

  // menu dropdown
  async diagnosisMenu(certificate) {
    return await axios
      .post("/management-diagnosis-settings/list-of-menus", {
        certification: certificate,
      })
      .then((res) => res)
      .catch((err) => err);
  }
}
