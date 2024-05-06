import axios from 'axios';

export default class PermissionClassificationService {

    async addAuthorityName(authority_name) {
        return await axios.post('/permission/add-authority', { authority_name: authority_name }).then((res) => res).catch((err) => err);
    }

    async authorityList() {
        return await axios.post('/permission/authority-list').then((res) => res).catch((err) => err);
    }

    async getClassificationTableList(user_data) {
        console.log(user_data)
        return await axios.post('/permission/list', { ...user_data }).then((res) => res).catch((err) => err);
    }

    async addPermissionClassification(user_data) {
        return await axios.post('/permission/save', { ...user_data }).then((res) => res).catch((err) => err);
    }

    async deletePermissionByathorityId(user_data) {
        return await axios.post('/permission/delete', { ...user_data }).then((res) => res).catch((err) => err);
    }


    async deletePermission(user_id) {
        return await axios.post('/user/member-remove-authority', {user_id: user_id }).then((res) => res).catch((err) => err);
    }
}
