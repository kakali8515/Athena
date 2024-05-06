<template>
  <div class="modal-overlap waitingcompanyapproval">
    <div
      class="
        modal-dialog modal-dialog-centered
        relative
        w-auto
        pointer-events-none
      "
    >
      <div
        class="
          modal-content
          border-none
          shadow-lg
          relative
          flex flex-col
          w-full
          pointer-events-auto
          bg-white bg-clip-padding
          rounded-md
          outline-none
          text-current
        "
      >
        <div
          class="
            modal-header
            flex flex-shrink-0
            items-center
            justify-between
            p-4
            rounded-t-md
          "
        >
          <h5
            class="text-xl font-medium leading-normal text-gray-800"
            id="exampleModalScrollableLabel"
          >
            Verify OTP
          </h5>
          <button
            type="button"
            class="
              btn-close
              box-content
              w-4
              h-4
              p-1
              text-black
              border-none
              rounded-none
              opacity-50
              focus:shadow-none focus:outline-none focus:opacity-100
              hover:text-black hover:opacity-75 hover:no-underline
            "
            data-bs-dismiss="modal"
            aria-label="Close"
            @click="close"
          ></button>
        </div>
        <div class="modal-body relative">
          <div class="verify_password v-otp">
            <div class="form_wrapper">
              <h4>휴대폰 번호</h4>
              <div
                class="inputwrap flex"
                :class="error.email ? 'field-error' : ''"
              >
                <input type="text" v-model="email" placeholder="휴대폰 번호" />
                <button
                  type="button"
                  @click="verifyMobile"
                  :class="{ no_cursor: isVerification }"
                  :disabled="emailValidated"
                >
                  인증코드 보내기
                </button>
              </div>
              <span class="error-msg">{{ error.email }}</span>
            </div>
            <div class="form_wrapper">
              <h4>인증번호 입력</h4>
              <div
                class="inputwrap flex"
                :class="error.emailOTP ? 'field-error' : ''"
              >
                <div class="timer_wrap">
                  <input
                    type="text"
                    v-model="emailOTP"
                    placeholder="OTP 입력 "
                  />
                  <span class="timer" :class="{ startTimer: startTimer }">{{
                    newTime
                  }}</span>
                </div>

                <button
                  type="button"
                  :class="{ no_cursor: isActive }"
                  @click="verifyOTP"
                  :disabled="otpValidate"
                >
                  인증
                </button>
              </div>
              <span class="success-msg" v-if="isConfirmOTP == 1">{{
                isOtpSuccess
              }}</span>
              <span class="error-msg">{{ error.emailOTP }}</span>
            </div>
          </div>
        </div>
        <div
          class="
            modal-footer
            flex flex-shrink-0
            items-center
            justify-center
            p-4
            rounded-b-md
          "
        >
          <button
            type="button"
            class="
              blue_bordered blue_bordered_full
              px-6
              py-2.5
              text-white
              font-medium
              text-xs
              leading-tight
              uppercase
              rounded
              focus:outline-none focus:ring-0
              transition
              duration-150
              ease-in-out
            "
            @click="confirmFindId"
          >
            확인
          </button>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import ChangeUserInfoService from "@/services/ChangeUserInfoService";
import { errorMsg } from "@/config/Message";
import ChangeUserInfoMobileValidation from "@/validation/ChangeUserInfoMobileValidation";
import validator from "validator";
export default {
  name: "VerifyOtp",
  data() {
    return {
      email: "",
      emailOTP: "",
      error: {},
      timer: 130,
      isActive: true,
      isVerification: false,
      emailValidated: 0,
      otpValidate: 1,
      startTimer: true,
      showTick: true,
      storeSetInterval: null,
      newTime: "03:00",
      isConfirmOTP: 0,
      isOtpSuccess: "",
      validateOnce: false,
      isCheckUserEmail: false,
      clickSendOtp: false,
      clickVerifyOtp: false,
      otpCheck: false,
      user_id: localStorage.getItem("uid"),
      isModalVisible: false,
    };
  },
  created() {
    this.ChangeUserInfoService = new ChangeUserInfoService();
  },

  methods: {
    close() {
      this.$emit("close");
    },

    checkError() {
      let credential = {
        email: this.email,
        emailOTP: this.emailOTP,
        isConfirmOTP: this.isConfirmOTP,
      };
      const { isInvalid, error } = ChangeUserInfoMobileValidation(credential);

      if (isInvalid) {
        this.error = error;
        return false;
      } else {
        this.error = "";
        return true;
      }
    },

    async confirmFindId() {
      //   this.validateOnce = true;
      if (!this.checkError()) {
        return;
      } else {
        this.$emit("isMobileOTPConfirm");
        this.$emit("close");
        console.log("ok");
      }
    },

    sendOtpErrorCheck() {
      if (validator.isEmpty(this.email)) {
        this.error.email = errorMsg.emptyPhone;
        return true;
      } else {
        return false;
      }
    },

    verifyOTPError() {
      if (validator.isEmpty(this.emailOTP)) {
        this.error.emailOTP = errorMsg.validOTP;
        return true;
      } else {
        return false;
      }
    },

    async verifyMobile() {
      this.clickSendOtp = true;
      if (this.sendOtpErrorCheck()) {
        return;
      } else {
        this.ChangeUserInfoService.sendOTP(this.email).then((res) => {
          if (res.status == 200) {
            console.log(res);
            this.isActive = false;
            this.isVerification = true;
            this.emailValidated = 1;
            this.otpValidate = 0;
            this.startTimer = false;
            this.showTick = true;
            this.emailOTP = "";
            this.error.email = "";
            this.isCheckUserEmail = false;
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
              this.isVerification = false;
              this.isActive = true;
              this.emailValidated = 0;
              this.otpValidate = 1;
              this.startTimer = true;
            }, (this.timer + 1) * 1000);
          } else if (res.response.status == 400) {
            this.isCheckUserEmail = true;
            return (this.error.email = "정확한 전화번호를 입력해 주세요");
          }
        });
      }
    },

    async verifyOTP() {
      if (this.verifyOTPError()) {
        return;
      } else {
        this.ChangeUserInfoService.verifyOTP(this.emailOTP)
          .then((res) => {
            if (res.status == 200) {
              this.startTimer = true;
              this.showTick = false;
              this.isActive = true;
              this.isVerification = false;
              this.emailValidated = 0;
              this.otpValidate = 1;
              this.isConfirmOTP = 1;
              this.error.emailOTP = "";
              return true;
            } else if (res.response.status == 400) {
              this.error.emailOTP = res.response.data.error;
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


<style lang="scss">
</style>