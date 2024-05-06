import validator from "validator";
import {errorMsg} from "@/config/Message";

const findIdValidation = (data) => {

    let errors = {};

    const { findIdName, findIdPhoneNumber, isFindIdConfirmOTP, validation_type } = data;

    if (validator.isEmpty(findIdName)) {
        errors.findIdName = errorMsg.emptyName;
    }
    if (validator.isEmpty(findIdPhoneNumber)) {
        errors.findIdPhoneNumber = errorMsg.emptyPhone;
    }
    else if (validation_type == 'find_id') {

        if (isFindIdConfirmOTP == 0) {
            errors.findIdPhoneNumber = errorMsg.verifyMobile;
        }
    }

    return {
        isInvalid: Object.keys(errors).length > 0,
        findIdError: errors
    };

}

export default findIdValidation;