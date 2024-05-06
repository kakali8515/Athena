<template>
<div class="tab-style-one">
  <TabWrapper>
    <Tabs :title="tabTitle1">
      <div
        class="tab-pane fade show active"
        id="tabs-home"
        role="tabpanel"
        aria-labelledby="tabs-home-tab"
      >
        <div class="login_base_wrap">
          <div class="wraper">
            <p>E-mail Find</p>
            <form class="form_wrap" @submit="(e) => e.preventDefault()">
              <div
                class="form"
                :class="findIdError.findIdName ? 'field-error' : ''"
              >
                <p>Name</p>
                <input
                  type="text"
                  placeholder="Input text"
                  v-model="findIdName"
                />
                <span>{{ findIdError.findIdName }}</span>
              </div>
              <div
                class="form"
                :class="findIdError.findIdPhoneNumber ? 'field-error' : ''"
              >
                <p>Phone number</p>
                <div class="f-wrap">
                  <input
                    type="text"
                    placeholder="Input text"
                    v-model="findIdPhoneNumber"
                  />
                  <button
                    type="button"
                    @click="findIdOTPSend"
                    :disabled="phoneNoValidate"
                    :class="{ no_cursor: isVerification }"
                  >
                    {{ sendVerificationBtn }}
                  </button>
                </div>
                <span>{{
                  findIdError.findIdPhoneNumber
                }}</span>
              </div>
              <div
                class="form"
                :class="findIdError.findIdOTP ? 'field-error' : ''"
                v-if="isCertificateVisibilty"
              >
                <p>Certification number input</p>
                <div class="f-wrap">
                  <div class="time_wrap">
                    <input
                      type="text"
                      placeholder="Input text"
                      v-model="findIdOTP"
                    />
                    <div class="timer" :class="{ startTimer: startTimer }">
                      <!-- <p>03:00</p> -->
                      <p>{{ newTime }}</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    :disabled="otpValidate"
                    :class="{ no_cursor: isActive }"
                    @click="verifyOTP"
                  >
                    Authenticate
                  </button>
                </div>
                <span class="success-msg" v-if="isOTPVerified">{{
                  successMsg
                }}</span>
                <span>{{
                  findIdError.findIdOTP
                }}</span>
              </div>
              <div class="form">
                <button type="button" @click="confirmFindId">Find ID</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Tabs>
    <Tabs :title="tabTitle2">
      <div
        class="tab-pane fade show active"
        id="tabs-profile"
        role="tabpanel"
        aria-labelledby="tabs-profile-tab"
      >
        <div class="login_base_wrap">
          <div class="wraper" v-if="isFindPassword">
            <p>Find Password</p>
            <form class="form_wrap" @submit="(e) => e.preventDefault()">
              <div class="form" :class="fpError.fpEmail ? 'field-error' : ''">
                <p>Email Address</p>
                <input
                  class="form-control"
                  type="text"
                  placeholder="Input text"
                  v-model="fpEmail"
                />
                <span>{{ fpError.fpEmail }}</span>
              </div>
              <div class="form" :class="fpError.fpName ? 'field-error' : ''">
                <p>Name</p>
                <input
                  class="form-control"
                  type="text"
                  placeholder="Input text"
                  v-model="fpName"
                />
                <span>{{ fpError.fpName }}</span>
              </div>
              <div class="form" :class="fpError.fpPhone ? 'field-error' : ''">
                <p>Phone Number</p>
                <input
                  class="form-control"
                  type="text"
                  placeholder="Input text"
                  v-model="fpPhone"
                />
                <span>{{ fpError.fpPhone }}</span>
              </div>

              <div class="form">
                <button type="button" @click="forgetPassword">
                  Send email
                </button>
              </div>
            </form>
          </div>
          <div class="wraper" v-if="isChangePassword">
            <p>Change Password</p>
            <form class="form_wrap" @submit="(e) => e.preventDefault()">
              <div
                class="form"
                :class="cpError.cpPassword ? 'field-error' : ''"
              >
                <p>Password</p>
                <input
                  class="form-control"
                  type="text"
                  placeholder="Input text"
                  v-model="cpPassword"
                />
                <span>{{ cpError.cpPassword }}</span>
              </div>
              <div
                class="form"
                :class="cpError.cpPasswordVerify ? 'field-error' : ''"
              >
                <p>Verify Password</p>
                <input
                  class="form-control"
                  type="text"
                  placeholder="Input text"
                  v-model="cpPasswordVerify"
                />
                <span>{{ cpError.cpPasswordVerify }}</span>
              </div>
              <div class="form" :class="cpError.cpOTP ? 'field-error' : ''">
                <p>OTP</p>
                <input
                  class="form-control"
                  type="text"
                  placeholder="Input text"
                  v-model="cpOTP"
                />
                <span>{{ cpError.cpOTP }}</span>
              </div>
              <div class="form">
                <button type="button" @click="changePassword">Change</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Tabs>
  </TabWrapper>
  </div>
  <FindEmailOtpVerificationModal
    headingText="E-mail find"
    :bodytext="EmailId"
    v-show="isOTPSuccess"
    @close="closeModal"
    btn1="Login"
    btn2="Find password"
    link1="/logIn"
    link2="/findPassword"
  />
  <FindEmailOtpVerificationModal
    headingText="Email has been sent"
    bodytext="The email has been sent successfully. If your email is not verified, please try again."
    v-show="isPasswordSuccess"
    @close="closeModal"
    btn2="Confirm"
    link2="/passwordResetPage"
  />
</template>

<script>
import findIdValidation from "@/validation/findIdValidation";
import { fpValidation, cpValidation } from "@/validation/forgetPassword";
import findIdService from "@/services/FindIdService";
import Tabs from "@/components/Tabs.vue";
import TabWrapper from "@/components/TabWrapper.vue";
import FindEmailOtpVerificationModal from "@/components/modals/FindEmailOtpVerificationModal.vue";
import { errorMsg, status } from "@/config/Message";

export default {
  name: "FindEmailOtpVerification",
  components: {
    Tabs,
    TabWrapper,
    FindEmailOtpVerificationModal,
  },
  data() {
    return {
      tabTitle1: "Find your Email",
      tabTitle2: "Find Password",
      findIdName: "",
      findIdPhoneNumber: "",
      findIdOTP: "",
      findIdError: {},
      isFindIdConfirmOTP: 0,
      isCertificateVisibilty: false,
      newTime: "",
      timer: 180,
      phoneNoValidate: 0,
      otpValidate: 1,
      storeSetInterval: null,
      showTick: true,
      sendVerificationBtn: "인증 코드 보내기",
      isOTPVerified: false,
      EmailId: "",
      isOTPSuccess: false,
      startTimer: true,
      successMsg: "",
      isVerification: false,
      isActive: true,
      verificationTimer: false,
      // find password states
      fpEmail: "",
      fpName: "",
      fpPhone: "",
      fpError: {},
      isPasswordSuccess: false,
      isChangePassword: false,
      isFindPassword: true,
      userId: "",
      cpOTP: "",
      cpPassword: "",
      cpPasswordVerify: "",
      cpError: {},
    };
  },
  created() {
    this.findIdService = new findIdService();
  },
  computed: {
    verificationStatus() {
      if (this.verificationTimer) {
        return "Re-send";
      } else {
        return "인증 코드 보내기";
      }
    },
  },
  methods: {
    checkError() {
      let credential = {
        findIdName: this.findIdName,
        findIdPhoneNumber: this.findIdPhoneNumber,
        isFindIdConfirmOTP: this.isFindIdConfirmOTP,
        validation_type: "find_id",
      };
      const { isInvalid, findIdError } = findIdValidation(credential);

      if (isInvalid) {
        this.findIdError = findIdError;
        return false;
      } else {
        this.findIdError = {};
        return true;
      }
    },

    sendOtpErrorCheck() {
      let credential = {
        findIdName: this.findIdName,
        findIdPhoneNumber: this.findIdPhoneNumber,
      };
      const { isInvalid, findIdError } = findIdValidation(credential);

      if (isInvalid) {
        this.findIdError = findIdError;
        return false;
      } else {
        this.findIdError = {};
        return true;
      }
    },

    closeModal() {
      this.isOTPSuccess = false;
      this.isPasswordSuccess = false;
    },

    async confirmFindId() {
      if (!this.checkError()) {
        return;
      } else {
        if (!this.isOTPVerified) {
          this.findIdError.findIdOTP = errorMsg.verifyOTP;
        } else {
          this.successMsg="";
          this.findIdService
            .getUserFindId(
              this.findIdName,
              this.findIdPhoneNumber,
              this.findIdOTP
            )
            .then((res) => {
              if (res.status == 200) {
                this.isOTPSuccess = true;
                this.EmailId = res.data.email;
                return true;
              } else if (res.response.status == 400) {
              if (res.response.data.error.name) {
                this.findIdError.findIdPhoneNumber = errorMsg.nameExists;
              }
              else {
                 this.findIdError.findIdPhoneNumber="";
              }
              if (res.response.data.error.otp) {
                this.findIdError.findIdOTP = errorMsg.OTPCheck;
              }
              else {
                 this.findIdError.findIdOTP="";
              }
              }
            });
        }
      }
    },

    async findIdOTPSend() {
      if (!this.sendOtpErrorCheck()) {
        return;
      } else {
        this.findIdService
          .userFindId(this.findIdName, this.findIdPhoneNumber)
          .then((res) => {
            if (res.status == 200) {
              this.isCertificateVisibilty = true;
              this.phoneNoValidate = 1;
              this.otpValidate = 0;
              this.isFindIdConfirmOTP = 1;
              this.startTimer = false;
              this.isVerification = true;
              this.findIdOTP = "";
              this.isActive = false;
              this.findIdError = {};
              this.isOTPVerified = false;

              if (this.storeSetInterval) {
                clearInterval(this.storeSetInterval);
              }

              // asign new time again
              this.timer = 180;

              this.storeSetInterval = setInterval(() => {
                let m = Math.floor(this.timer / 60);
                let s = this.timer % 60;
                m = m < 10 ? "0" + m : m;
                s = s < 10 ? "0" + s : s;
                this.newTime = m + ":" + s;
                if (this.timer > 0) {
                  return this.timer--;
                }
              }, 1000);
              setTimeout(() => {
                this.phoneNoValidate = 0;
                this.otpValidate = 1;
                this.startTimer = true;
                this.isVerification = false;
                this.isActive = true;
                this.verificationTimer = true;
              }, (this.timer + 1) * 1000);

              console.log(res.data);
            } else if (res.response.status == 400) {
              return (this.findIdError.findIdPhoneNumber = errorMsg.nameExists);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },

    async verifyOTP() {
      if (this.findIdOTP == "") {
        return (this.findIdError.findIdOTP = errorMsg.validOTP);
      } else {
        this.findIdService
          .userFindIdVerfiyOtp(
            this.findIdName,
            this.findIdPhoneNumber,
            this.findIdOTP
          )
          .then((res) => {
            if (res.status == 200) {
              this.findIdError = {};
              this.startTimer = true;
              this.isOTPVerified = true;
              this.isVerification = false;
              this.isActive = true;
              this.successMsg = status.verifiedOTP;
              this.phoneNoValidate = 0;
              this.otpValidate = 1;
              return true;
            } else if (res.response.status == 400) {
              if (res.response.data.error.name) {
                this.findIdError.findIdPhoneNumber = errorMsg.nameExists;
              }
              else {
                 this.findIdError.findIdPhoneNumber="";
              }
              if (res.response.data.error.otp) {
                this.findIdError.findIdOTP = errorMsg.OTPCheck;
              }
              else {
                 this.findIdError.findIdOTP="";
              }
            }
          });
      }
    },

    // forget password api call & validation
    checkFPError() {
      let credential = {
        fpEmail: this.fpEmail,
        fpName: this.fpName,
        fpPhone: this.fpPhone,
      };
      const { isInvalid, fpError } = fpValidation(credential);
      if (isInvalid) {
        this.fpError = fpError;
        return false;
      } else {
        this.fpError = {};
        return true;
      }
    },

    checkCPError() {
      let credential = {
        cpOTP: this.cpOTP,
        cpPassword: this.cpPassword,
        cpPasswordVerify: this.cpPasswordVerify,
      };
      const { isInvalid, cpError } = cpValidation(credential);
      if (isInvalid) {
        this.cpError = cpError;
        return false;
      } else {
        this.cpError = {};
        return true;
      }
    },

    async forgetPassword() {
      if (!this.checkFPError()) {
        return;
      } else {
        this.findIdService
          .findPassword(this.fpEmail, this.fpName, this.fpPhone)
          .then((res) => {
            // console.log(res.response.data.error.email)
            if (res.status == 200) {
              this.isPasswordSuccess = true;
              this.isFindPassword = false;
              this.isChangePassword = true;
              this.userId = res.data.id;
            } else if (res.response.status == 400) {
              if (res.response.data.error.email) {
                this.fpError.fpEmail = res.response.data.error.email;
              }
              if (res.response.data.error.name) {
                this.fpError.fpName = res.response.data.error.name;
              }
              if (res.response.data.error.mobile) {
                this.fpError.fpPhone = res.response.data.error.mobile;
              }
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },

    async changePassword() {
      if (!this.checkCPError()) {
        return;
      } else {
        this.findIdService
          .changePassword(this.cpOTP, this.userId, this.cpPassword)
          .then((res) => {
            console.log(res);
            if (res.status == 200) {
              this.$router.push("/login");
            } else if (res.response.status == 400) {
              if (res.response.data.error) {
                this.cpError.cpOTP = res.response.data.error;
              }
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
  },
};
</script>


