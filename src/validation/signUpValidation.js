import validator from "validator";
import { errorMsg } from "@/config/Message";

const signUpValidation = (data) => {
  let errors = {};

  const {
    name,
    password,
    confirmPassword,
    email,
    emailCode,
    certifiedCode,
    phoneNumber,
    department,
    rank,
    termsCheck,
    personalCheck,
  } = data;

  if (termsCheck == false) {
    errors.termsCheck = errorMsg.termsError;
  }

  if (personalCheck == false) {
    errors.personalCheck = errorMsg.personalError;
  }

  // if (validator.isEmpty(department)) {
  //   errors.department = errorMsg.emptyDepartment;
  // }

  if (validator.isEmpty(name)) {
    errors.name = errorMsg.emptyName;
  }

  if (validator.isEmpty(password)) {
    errors.password = errorMsg.emptyPassword;
  } else if (
    !password.match(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,30}$/
    )
  ) {
    if (
      !password.match(/^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+){8,30}$/) &&
      !password.match(
        /^(?=.*[@$!%*#?&])(?=.*[a-zA-Z])([A-Za-z\d@$!%*#?&]+){8,30}$/
      ) &&
      !password.match(/^(?=.*[@$!%*#?&])(?=.*[0-9])([0-9\d@$!%*#?&]+){8,30}$/)
    ) {
      errors.password = errorMsg.passwordError;
    }
  }
  if (validator.isEmpty(confirmPassword)) {
    errors.confirmPassword = errorMsg.emptyConfirmPassword;
  }
  if (!validator.equals(password, confirmPassword)) {
    errors.confirmPassword = errorMsg.matchPassword;
  }
  if (!validator.isEmail(email)) {
    errors.email = errorMsg.errorEmail;
  }
  if (validator.isEmpty(email)) {
    errors.email = errorMsg.emptyEmail;
  }

  if (validator.isEmpty(emailCode)) {
    errors.emailCode = errorMsg.emptyEmailVerification;
  } else if (!certifiedCode) {
    errors.emailCode = errorMsg.emailUnverified;
  }

  if (validator.isEmpty(phoneNumber)) {
    errors.phoneNumber = errorMsg.emptyPhone;
  } else if (!validator.isNumeric(phoneNumber)) {
    errors.phoneNumber = errorMsg.validPhone;
  }
  else if (phoneNumber.length < 10) {
    errors.phoneNumber = errorMsg.validPhone;
  }

  // if (validator.isEmpty(rank)) {
  //   errors.rank = errorMsg.emptyRank;
  // }

  return {
    isInvalid: Object.keys(errors).length > 0,
    error: errors,
  };
};

export default signUpValidation;
