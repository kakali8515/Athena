import axios from 'axios';

export default class DashboardService{

    // notice list
    async noticeBoardList(_page, _limit, certificate){
        return await axios.post('/dashboard/notice-list', { page : _page, limit : _limit, certification : certificate  }).then((res) => res).catch((err) => err);
    }

   

      // asset management
      async scheduleManagement(certificate){
        return await axios.post('/dashboard/asset-details', { certification : certificate }).then((res) => res).catch((err) => err);
    }

      // risk management
      async riskManagement(certificate, _type){
        return await axios.post('/dashboard/risk-details', { certification : certificate, type : _type }).then((res) => res).catch((err) => err);
    }

    // diagnosis management
    async diagnosisManagement(certificate){
        return await axios.post('/dashboard/diagnosis-management-chart', { certification : certificate }).then((res) => res).catch((err) => err);
    }

     // event management
     async evidenceManagement(certificate){
      return await axios.post('/dashboard/evidence-chart', { certification : certificate, status : "" }).then((res) => res).catch((err) => err);
  }

     // dash board setup view
     async dashBoardSetupView(){
        return await axios.post('/dashboard/get-dashboard-setup').then((res) => res).catch((err) => err);
    }
   
     // dash board setup save
     async dashBoardSetupSave(credentials){
        return await axios.post('/dashboard/save-dashboard-setup', { ...credentials }).then((res) => res).catch((err) => err);
    }


}