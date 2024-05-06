import validator from "validator";
import { errorMsg } from "@/config/Message";

const ChangeUserInfoValidation = (data) => {

    let errors = {};

    const { newPassword, confirmPassword, currentPassword, mobile, username, department, rank } = data;

    if (validator.isEmpty(newPassword)) {
        errors.newPassword = errorMsg.emptyPassword;
    }
    else if (!(newPassword.match(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,30}$/))) {

        if (!(newPassword.match(/^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+){8,30}$/)) && !(newPassword.match(/^(?=.*[@$!%*#?&])(?=.*[a-zA-Z])([A-Za-z\d@$!%*#?&]+){8,30}$/)) && !(newPassword.match(/^(?=.*[@$!%*#?&])(?=.*[0-9])([0-9\d@$!%*#?&]+){8,30}$/))) {
            errors.newPassword = errorMsg.passwordError;
        }

    }
    if (validator.equals(currentPassword, newPassword)) {
        errors.newPassword = errorMsg.matchCurrentNewPassword;
    }
    if (validator.isEmpty(confirmPassword)) {
        errors.confirmPassword = errorMsg.emptyConfirmPassword;
    }
    if (!validator.equals(newPassword, confirmPassword)) {
        errors.confirmPassword = errorMsg.matchPassword;
    }
    if (validator.isEmpty(mobile)) {
        errors.mobile = errorMsg.emptyPhone;
    }
    if (validator.isEmpty(username)) {
        errors.username = errorMsg.emptyName;
    }
    if (validator.isEmpty(department)) {
        errors.department = errorMsg.emptyDepartment;

    }
    if (validator.isEmpty(rank)) {
        errors.rank = errorMsg.emptyRank;
    }

    return {
        isInvalid: Object.keys(errors).length > 0,
        error: errors
    };

}

export default ChangeUserInfoValidation;