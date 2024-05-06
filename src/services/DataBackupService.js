import axios from 'axios';

export default class DataBackupService {
    async getDataBackup(uid, compid, _type){
        return await axios.post('/auth/download-data-backup', { user_id : uid, company_id : compid, type : _type }).then((res) => res).catch((err) => err);
    }
}