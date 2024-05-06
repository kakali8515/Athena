import axios from "axios";

export default class FindIdService {
  // User find id
  async userFindId(name, mobile) {
    return await axios
      .post(`/auth/forget-email`, { name: name, mobile: mobile })
      .then((res) => res)
      .catch((err) => err);
  }

  // User find id verify otp
  async userFindIdVerfiyOtp(name, mobile, otp) {
    return await axios
      .post(`/auth/verify-forget-email`, {
        name: name,
        mobile: mobile,
        otp: otp,
      })
      .then((res) => res)
      .catch((err) => err);
  }

  //get User find id
  async getUserFindId(name, mobile, otp) {
    return await axios
      .post(`/auth/get-forget-email`, { name: name, mobile: mobile, otp: otp })
      .then((res) => res)
      .catch((err) => err);
  }

  // find password
  async findPassword(email, name, mobile) {
    return await axios
      .post(`/auth/forget-password`, {
        email: email,
        name: name,
        mobile: mobile,
      })
      .then((res) => res)
      .catch((err) => err);
  }

  // change password
  async changePassword(otp, id, password) {
    return await axios
      .post(`/auth/reset-password`, { otp: otp, id: id, password: password })
      .then((res) => res)
      .catch((err) => err);
  }

  // verify OTP
  async verifyOTP(id, otp) {
    return await axios
      .post(`/auth/verify-forget-password`, { id: id, otp: otp })
      .then((res) => res)
      .catch((err) => err);
  }
}
