import axios from 'axios';

export default class CompanyLicenceService{

    //License Extension :
    async licenseExtension(credentials){
        return await axios.post('/auth/lisence-extension-request', { ...credentials }).then((res) => res).catch((err) => err);
    }

    //Add-on Packge :
    async addOnPackage(credentials){
        return await axios.post('/auth/add-on-package', { ...credentials }).then((res) => res).catch((err) => err);
    }

     //Change Packge :
     async changePackage(credentials){
        return await axios.post('/auth/change-package', { ...credentials }).then((res) => res).catch((err) => err);
    }

    //Licence Packge List :
    async packageList(packageType){
        return await axios.post('auth/lisence-package-list', { package_type : packageType }).then((res) => res).catch((err) => err);
    }

    //Company LicenceList :
    async companyLicenceList(compID){
        return await axios.post('auth/company-lisence-list', { company_id : compID }).then((res) => res).catch((err) => err);
    }
}