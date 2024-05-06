import axios from 'axios';

export default class UserAdminLicenseService {

// Current License Details
    async currentLicenseDetails(){
        return await axios.post('/company/current-license-details').then((res) => res).catch((err) => err);
    }

// Company License List
async companyLicenseList(){
    return await axios.post('/company/license-list').then((res) => res).catch((err) => err);
}

//Refund request 

async refundRequest(refund_account, reason){
    return await axios.post('/company/license-refund-request-save', { refund_account: refund_account, refund_reason : reason }).then((res) => res).catch((err) => err);
}

}