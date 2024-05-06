import axios from 'axios';

export default class CompanyApprovalService {

    // cancel company approval
   async cancelApproval(_uId, _comId){
    return await axios.post('/auth/delete-account', { user_id : _uId, company_id : _comId }).then((res) => res).catch((err) => err); 
   }

   //completion of company approval
   async completionApproval(_uId, _comId){
    return await axios.post('/auth/company-approval-request', { user_id : _uId, company_id : _comId }).then((res) => res).catch((err) => err); 
   }
}