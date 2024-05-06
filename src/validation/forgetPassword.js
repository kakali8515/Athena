import validator from "validator";
import { errorMsg } from "@/config/Message";

const fpValidation = (data) => {

    let errors = {};

    const { fpEmail, fpName, fpPhone } = data;

    if (validator.isEmpty(fpEmail)) {
        errors.fpEmail = errorMsg.emptyEmail;
    }
    if (!validator.isEmail(fpEmail)) {
        errors.fpEmail = errorMsg.errorEmail;
    }
    if (validator.isEmpty(fpName)) {
        errors.fpName = errorMsg.emptyName;
    }
    if (validator.isEmpty(fpPhone)) {
        errors.fpPhone = errorMsg.emptyPhone;
    }
    if (!validator.isNumeric(fpPhone)) {
        errors.fpPhone = errorMsg.validPhone;
    }

    return {
        isInvalid: Object.keys(errors).length > 0,
        fpError: errors
    };

}

const cpValidation = (data) => {

    let errors = {};

    const { cpOTP, cpPassword, cpPasswordVerify } = data;

    if (validator.isEmpty(cpOTP)) {
        errors.cpOTP = errorMsg.validOTP;
    }
    if (validator.isEmpty(cpPassword)) {
        errors.cpPassword = errorMsg.emptyPassword;
    }
    else if (!(cpPassword.match(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,30}$/))) {
        
        if(!(cpPassword.match(/^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+){8,30}$/)) && !(cpPassword.match(/^(?=.*[@$!%*#?&])(?=.*[a-zA-Z])([A-Za-z\d@$!%*#?&]+){8,30}$/)) && !(cpPassword.match(/^(?=.*[@$!%*#?&])(?=.*[0-9])([0-9\d@$!%*#?&]+){8,30}$/)) ){
            errors.cpPassword = errorMsg.passwordError;
        }
        
    }
    if (validator.isEmpty(cpPasswordVerify)) {
        errors.cpPasswordVerify = errorMsg.emptyConfirmPassword;
    }
    if (!validator.equals(cpPassword, cpPasswordVerify)) {
        errors.cpPasswordVerify = errorMsg.matchPassword;
    }

    return {
        isInvalid: Object.keys(errors).length > 0,
        cpError: errors
    };

}

export { fpValidation, cpValidation };