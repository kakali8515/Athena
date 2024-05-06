<template>
  <ul class="
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
    " id="tabs-tab" role="tablist">
    <li class="nav-item" role="presentation" @click="this.$router.push('/findId')">
      <a href="#tabs-home" class="
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
        " id="tabs-home-tab" data-bs-toggle="pill" data-bs-target="#tabs-home" role="tab" aria-controls="tabs-home"
        aria-selected="false">이메일 찾기</a>
    </li>
    <li class="nav-item" role="presentation" @click="this.$router.push('/findPassword')">
      <a href="#tabs-profile" class="
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
        " id="tabs-profile-tab" data-bs-toggle="pill" data-bs-target="#tabs-profile" role="tab"
        aria-controls="tabs-profile" aria-selected="true">비밀번호 찾기</a>
    </li>
  </ul>
  <div class="tab-content" id="tabs-tabContent">
    <div class="tab-pane fade show active" id="tabs-profile" role="tabpanel" aria-labelledby="tabs-profile-tab">
      <div class="login_base_wrap">
        <div class="wraper" v-if="isFindPassword">
          <p>비밀번호 찾기</p>
          <form class="form_wrap" @submit="(e) => e.preventDefault()">
            <div class="form" :class="fpError.fpEmail ? 'field-error' : ''">
              <p>이메일 주소</p>
              <input class="form-control" type="text" placeholder="이메일 주소" v-model="fpEmail" />
              <span>{{ fpError.fpEmail }}</span>
            </div>
            <div class="form" :class="fpError.fpName ? 'field-error' : ''">
              <p>이름</p>
              <input class="form-control" type="text" placeholder="이름" v-model="fpName" />
              <span>{{ fpError.fpName }}</span>
            </div>
            <div class="form" :class="fpError.fpPhone ? 'field-error' : ''">
              <p>휴대폰번호</p>
              <input class="form-control" type="text" placeholder="휴대폰번호" v-model="fpPhone" />
              <span>{{ fpError.fpPhone }}</span>
            </div>

            <div class="form">
              <button type="button" @click="forgetPassword">
                이메일 보내기
              </button>
            </div>
          </form>
        </div>
        <div class="wraper" v-if="isChangePassword">
          <p>비밀번호 변경</p>
          <form class="form_wrap" @submit="(e) => e.preventDefault()">
            <div class="form" :class="cpError.cpOTP ? 'field-error' : ''">
              <p>비밀번호 인증 번호</p>
              <input class="form-control" type="text" placeholder="OTP" v-model="cpOTP" @keyup="getOTPVerified"/>
              <span>{{ cpError.cpOTP }}</span>
            </div>
            <div class="form" :class="cpError.cpPassword ? 'field-error' : ''">
              <p>비밀번호</p>
              <input :class="isOtpValid ? 'form-control inputDisabled' : 'form-control'" type="password"
                placeholder="비밀번호" v-model="cpPassword" :disabled="isOtpValid" />
              <span>{{ cpError.cpPassword }}</span>
            </div>
            <div class="form" :class="cpError.cpPasswordVerify ? 'field-error' : ''">
              <p>비밀번호 확인</p>
              <input :class="isOtpValid ? 'form-control inputDisabled' : 'form-control'" type="password"
                placeholder="비밀번호 확인" v-model="cpPasswordVerify" :disabled="isOtpValid" />
              <span>{{ cpError.cpPasswordVerify }}</span>
            </div>
            <div class="form">
              <button type="button" @click="changePassword">변경</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>

  <FindEmailOtpVerificationModal headingText="이메일이 전송 되었습니다"
    bodytext="이메일이 전송 되었습니다. 이메일을 못받으셨으면, 다시 시도해주세요."
    v-show="isPasswordSuccess" @close="closeModal" btn2="확인" link2="/findPassword" />

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
  name: "FindPassword2",
  components: {
    Tabs,
    TabWrapper,
    FindEmailOtpVerificationModal,
  },
  data() {
    return {
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
      isOtpValid: true,
    };
  },
  created() {
    this.findIdService = new findIdService();
  },

  methods: {

    closeModal() {
      this.isPasswordSuccess = false;
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

    // verify otp
    async getOTPVerified() {
      if (this.cpOTP.length == 8) {
        this.findIdService.verifyOTP(this.userId, this.cpOTP)
          .then((res) => {
            console.log(res);
            if (res.status == 200) {
              this.isOtpValid = false;
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

<style lang="scss" scoped>
.tab-content {
  .login_base_wrap {
    .wraper {
      .form_wrap {
        .form {
          input {
            &.inputDisabled {
              background-color: #e0e0e0 !important;
            }
          }
        }
      }
    }
  }
}
</style>
