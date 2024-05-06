import validator from "validator";
import { errorMsg } from "@/config/Message";

const networkValidation = (data) => {
    let errors = {};

    const { tab_name, file_name } = data;

    if (validator.isEmpty(tab_name)) {
        errors.tab_name = errorMsg.tab_name;
    }
    else if (validator.isLength(tab_name, { min: 10 })) {
        errors.tab_name = errorMsg.tab_name_length;
    }
    
    return {
        isInvalid: Object.keys(errors).length > 0,
        error: errors
    };
}

export default networkValidation;