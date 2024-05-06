
import { createStore } from 'vuex';
import signup from './modules/signup';
import signin from './modules/signin';
import diagnosisManagement from './modules/diagnosisManagement';
import technicalDiagnosis from './modules/technicalDiagnosis';
import header from './modules/header';
import sideBar from './modules/sideBar';


export default createStore({
    state : {
       status : 'vuex is working',
       imgBaseURL: process.env.VUE_APP_IMAGE_BASE_URL,
       notificationList: '',
       msgHasread:'',
       technicalDiagnosisId:'',
       companyAccess: '',
       addMenu: '',
    },
    getters : {

    },
    mutations : {
      
    },
    actions : {
       
    },
    modules : {
       signup,
       signin,
       diagnosisManagement,
       technicalDiagnosis,
       header,
       sideBar
    }
})