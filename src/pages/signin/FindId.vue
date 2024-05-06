<template>
  <ul
    class="
      findidtab
      nav nav-tabs
      flex
      justify-start
      flex-col
      md:flex-row
      flex-wrap
      list-none
      border-b-0
      pl-0
      mb-4
    "
    id="tabs-tab"
    role="tablist"
  >
    <li
      class="nav-item"
      role="presentation"
      @click="this.$router.push('/findId')"
    >
      <a
        href="#tabs-home"
        class="
          findid_nav
          nav-link
          block
          font-medium
          text-xs
          leading-tight
          border-x-0 border-t-0 border-b-2 border-transparent
          px-6
          py-3
          my-2
          focus:border-transparent
          active
        "
        id="tabs-home-tab"
        data-bs-toggle="pill"
        data-bs-target="#tabs-home"
        role="tab"
        aria-controls="tabs-home"
        aria-selected="true"
        >이메일 찾기</a
      >
    </li>
    <li
      class="nav-item"
      role="presentation"
      @click="this.$router.push('/findPassword')"
    >
      <a
        href="#tabs-profile"
        class="
          findid_nav
          nav-link
          block
          font-medium
          text-xs
          leading-tight
          border-x-0 border-t-0 border-b-2 border-transparent
          px-6
          py-3
          my-2
          focus:border-transparent
        "
        id="tabs-profile-tab"
        data-bs-toggle="pill"
        data-bs-target="#tabs-profile"
        role="tab"
        aria-controls="tabs-profile"
        aria-selected="false"
        >비밀번호 찾기</a
      >
    </li>
  </ul>
  <div class="tab-content" id="tabs-tabContent">
    <div
      class="tab-pane fade show active"
      id="tabs-home"
      role="tabpanel"
      aria-labelledby="tabs-home-tab"
    >
      <div class="login_base_wrap">
        <div class="wraper">
          <p>이메일 찾기</p>
          <form class="form_wrap" @submit="(e) => e.preventDefault()">
            <div
              class="form"
              :class="findIdError.findIdName ? 'field-error' : ''"
            >
              <p>이름</p>
              <input
                type="text"
                placeholder="이름"
                v-model="findIdName"
              />
              <span>{{ findIdError.findIdName }}</span>
            </div>
            <div
              class="form"
              :class="findIdError.findIdPhoneNumber ? 'field-error' : ''"
            >
              <p>휴대폰번호</p>
              <div class="f-wrap">
                <input
                  type="text"
                  placeholder="휴대폰번호"
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
              <span>{{ findIdError.findIdPhoneNumber }}</span>
            </div>
            <div
              class="form"
              :class="findIdError.findIdOTP ? 'field-error' : ''"
              v-if="isCertificateVisibilty"
            >
              <p>인증번호 입력</p>
              <div class="f-wrap">
                <div class="time_wrap">
                  <input
                    type="text"
                    placeholder="인증번호 입력"
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
                  인증하기
                </button>
              </div>
              <span class="success-msg" v-if="isOTPVerified">{{
                successMsg
              }}</span>
              <span>{{ findIdError.findIdOTP }}</span>
            </div>
            <div class="form">
              <button type="button" @click="confirmFindId">아이디 찾기</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>

  <FindEmailOtpVerificationModal
    headingText="이메일 찾기"
    :bodytext="EmailId"
    v-show="isOTPSuccess"
    @close="closeModal"
    btn1="로그인"
    btn2="비밀번호 찾기"
    link1="/logIn"
    link2="/findPassword"
  />
</template>

<script>
import findIdValidation from "@/validation/findIdValidation";
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
      sendVerificationBtn: "인증번호 보내기",
      isOTPVerified: false,
      EmailId: "",
      isOTPSuccess: false,
      startTimer: true,
      successMsg: "",
      isVerification: false,
      isActive: true,
      verificationTimer: false,
      // find password states
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
    },

    async confirmFindId() {
      if (!this.checkError()) {
        return;
      } else {
        if (!this.isOTPVerified) {
          this.findIdError.findIdOTP = errorMsg.verifyOTP;
        } else {
          this.successMsg = "";
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
                } else {
                  this.findIdError.findIdPhoneNumber = "";
                }
                if (res.response.data.error.otp) {
                  this.findIdError.findIdOTP = errorMsg.OTPCheck;
                } else {
                  this.findIdError.findIdOTP = "";
                }
              }
            })
            .catch((err) => {
            console.log(err);
          });;
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
              } else {
                this.findIdError.findIdPhoneNumber = "";
              }
              if (res.response.data.error.otp) {
                this.findIdError.findIdOTP = errorMsg.OTPCheck;
              } else {
                this.findIdError.findIdOTP = "";
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

