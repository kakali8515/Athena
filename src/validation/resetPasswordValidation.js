import validator from "validator";
import { errorMsg } from "@/config/Message";

const resetPasswordValidation = (data) => {

    let errors = {};

    const { newPassword, confirmPassword, currentPassword } = data;

    if (validator.isEmpty(currentPassword)) {
        errors.currentPassword = errorMsg.emptyPassword;
    }

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

    return {
        isInvalid: Object.keys(errors).length > 0,
        error: errors
    };

}

export default resetPasswordValidation;