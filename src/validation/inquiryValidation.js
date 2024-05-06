import validator from "validator";
import { errorMsg } from "@/config/Message";

const inquiryValidation = (data) => {
    let errors = {};

    const { inquiry_title, inquiry_type, inquiry_details, sub_type_id } = data;

    if(validator.isEmpty(inquiry_title)){
        errors.inquiry_title = errorMsg.inquiry_title;
        console.log(inquiry_type)
    }

    if(validator.isEmpty(inquiry_type.toString())){
        errors.inquiry_type = errorMsg.inquiry_type;
    }
    else if(validator.isEmpty(sub_type_id.toString())){
        errors.inquiry_type = errorMsg.sub_type_id;
    }

    if(validator.isEmpty(inquiry_details)){
        errors.inquiry_details = errorMsg.inquiry_details;
    }

    return {
        isInvalid: Object.keys(errors).length > 0,
        error: errors
    };
}

export default inquiryValidation;