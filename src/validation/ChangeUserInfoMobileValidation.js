import validator from "validator";
import {errorMsg} from "@/config/Message";

const ChangeUserInfoMobileValidation = (data) => {
    let errors = {};
    const { email, emailOTP, isConfirmOTP} = data;

    if (validator.isEmpty(email)) {
        errors.email = errorMsg.emptyPhone;
    }
    else if (!validator.isNumeric(email)) {
        errors.email = errorMsg.validPhone;
      }
    if (validator.isEmpty(emailOTP)) {
        errors.emailOTP =  errorMsg.validOTP;
    }
    else if (isConfirmOTP==0) {
        errors.emailOTP = errorMsg.verifyOTP;
    }

    return {
        isInvalid: Object.keys(errors).length > 0,
        error: errors
    };
};

export default ChangeUserInfoMobileValidation;
