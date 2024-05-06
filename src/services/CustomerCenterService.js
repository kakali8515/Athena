import axios from 'axios';

export default class CustomerCenterService {

    // get notice list
    async noticeList(page, limit) {
        return await axios.post(`/notice`, { page: page, limit: limit })
            .then((res) => res)
            .catch((err) => err)
    }

    //  notice details
    async noticeDetails(id) {
        return await axios.post(`/notice/notice-details`, { id: id })
            .then((res) => res)
            .catch((err) => err)
    }

    //  FAQ tag list
    async faqtagList() {
        return await axios.post(`/faq/faq-tags`)
            .then((res) => res)
            .catch((err) => err)
    }

    // all FAQ list
    async faqList(page, limit, tag_id) {
        return await axios.post(`/faq`, { page: page, limit: limit, tag_id: tag_id })
            .then((res) => res)
            .catch((err) => err)
    }

    // inquiry list
    async inquiryList(page, limit) {
        return await axios.post(`/inquiry`, { page: page, limit: limit })
            .then((res) => res)
            .catch((err) => err)
    }

    // inquiry type list
    async inquiryTypeList() {
        return await axios.post(`/inquiry/inquiry-type`)
            .then((res) => res)
            .catch((err) => err)
    }

    //  inquiry details list
    async inquiryDetails(inquiry_id) {
        return await axios.post(`/inquiry/inquiry-details`, { inquiry_id: inquiry_id })
            .then((res) => res)
            .catch((err) => err)
    }

    //  inquiry type details list
    async inquirySubTypeList(type_id) {
        return await axios.post(`/inquiry/inquiry-subtype`, { type_id: type_id })
            .then((res) => res)
            .catch((err) => err)
    }

}