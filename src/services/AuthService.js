import axios from "axios";

export default class AuthService {
  async doLogin(email, password) {
    return await axios
      .post("/auth/login", { email: email, password: password })
      .then((res) => res)
      .catch((err) => err);
  }

  // http://athena-api-dev.dvconsulting.org:4000/api/v1/auth/verify-auth

  async doVerifyAuth(userId, verifyToken) {
    return await axios
      .post("/auth/verify-auth", { user_id: userId, verify_token: verifyToken })
      .then((res) => res)
      .catch((err) => err);
  }

  async doRegisterQRCode(userId, secretCode) {
    return await axios
      .post("/auth/register-qr-code", {
        user_id: userId,
        secret_code: secretCode,
      })
      .then((res) => res)
      .catch((err) => err);
  }

  async reset(user_id) {
    return await axios
      .post("/auth/generate-qr-code", { user_id: user_id })
      .then((res) => res)
      .catch((err) => err);
  }
}
