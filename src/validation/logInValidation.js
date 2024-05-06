import validator from "validator";
import { errorMsg } from "@/config/Message";

const logInValidation = (data) => {
    let errors = {};

    const { email, password } = data;

    if(validator.isEmpty(email)){
        errors.email = errorMsg.emptyEmail;
    }
    if(!validator.isEmail(email)){
        errors.email = errorMsg.errorEmail;
    }

    if(validator.isEmpty(password)){
        errors.password = errorMsg.emptyPassword;
    }

    return {
        isInvalid: Object.keys(errors).length > 0,
        error: errors
    };
}

export default logInValidation;