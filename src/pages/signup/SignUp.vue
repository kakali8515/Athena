<template>
  <div class="signup_base_wrap">
    <div class="wraper">
      <img src="@/assets/images/logo.png" />
      <p class="title">회원가입</p>
      <p>
        Athena를 사용시 필요한 정보를 입력해주세요.<br />
        사용중이신 휴대폰번호를 입력해주세요.
      </p>
      <div class="required_wrap">
        <p>* 필수항목</p>
      </div>
      <form class="form_wrap">
        <div class="form" :class="error.email ? 'field-error' : ''">
          <p><span>*</span>이메일</p>
          <div class="f-wrap">
            <input type="email" placeholder="입력" v-model="userEmail" @keyup="checkEmailInputValue()" />
            <button type="button" @click="getEmailVerified" :disabled="emailAuth">
              이메일 인증
            </button>
          </div>
          <span v-if="error.email">{{ error.email }}</span>
          <span class="success-msg" v-if="emailSuccessMsg">{{
              emailSuccessMsg
          }}</span>
        </div>
        <div class="form" :class="error.emailCode ? 'field-error' : ''">
          <p><span>*</span>인증번호 입력</p>
          <div class="f-wrap">
            <div class="time_wrap">
              <input type="text" placeholder="3분동안 이메일이 도착하지 않을 경우 재전송을 선택해주세요" v-model="emailCode"
                @keyup="checkEmailCodeInputValue()" />
              <div class="timer">
                <p>{{ newTime }}</p>
              </div>
            </div>
            <button type="button" @click="emailCodeCertification" :disabled="emailCertification">
              인증
            </button>
          </div>
          <span>{{ error.emailCode }}</span>
          <span class="success-msg" v-if="successMsg">{{ successMsg }}</span>
        </div>
        <div class="form" :class="error.password ? 'field-error' : ''">
          <p><span>*</span>비밀번호</p>
          <input type="password" placeholder="비밀번호 입력" v-model="password" />
          <span>{{ error.password }}</span>
        </div>

        <div class="form" :class="error.confirmPassword ? 'field-error' : ''">
          <p><span>*</span>비밀번호 확인</p>
          <input type="password" placeholder="비밀번호 확인" v-model="confirmPassword" />
          <span>{{ error.confirmPassword }}</span>
        </div>

        <div class="form" :class="error.name ? 'field-error' : ''">
          <p><span>*</span>이름</p>
          <input type="text" placeholder="이름 입력" v-model="userName" />
          <span>{{ error.name }}</span>
        </div>
        <div class="form" :class="error.phoneNumber ? 'field-error' : ''">
          <p><span>*</span>전화번호</p>
          <!-- <div class="phn_wrap">
            <select>
              <option>선택</option>
              <option>선택</option>
              <option>선택</option>
            </select>
            <span>-</span>
            <input type="text" placeholder="입력" v-model="phone1" />
            <span>-</span>
            <input type="text" placeholder="입력" v-model="phone2"/>
          </div> -->
          <input type="text" placeholder="입력" v-model="phone1" @keypress="isNumber($event)" minlength="10"
            maxlength="11" />
          <span>{{ error.phoneNumber }}</span>
        </div>
        <div class="form">
          <div class="department_wrap">
            <div class="wrap" :class="error.department ? 'field-error' : ''">
              <p>부서</p>
              <input type="text" placeholder="입력" v-model="department" />
              <span>{{ error.department }}</span>
            </div>
            <div class="wrap" :class="error.rank ? 'field-error' : ''">
              <p>직급</p>
              <input type="text" placeholder="입력" v-model="rank" />
              <span>{{ error.rank }}</span>
            </div>
          </div>
        </div>
        <div class="form">
          <div class="flex justify-start checkwrap">
            <div>
              <div class="form-check" :class="error.termsCheck ? 'field-error' : ''">
                <input class="
                    form-check-input
                    appearance-none
                    h-4
                    w-4
                    border border-gray-300
                    rounded-sm
                    bg-white
                    checked:bg-blue-600 checked:border-blue-600
                    focus:outline-none
                    transition
                    duration-200
                    mt-1
                    align-top
                    bg-no-repeat bg-center bg-contain
                    float-left
                    mr-2
                    cursor-pointer
                  " type="checkbox" value="" id="flexCheckDefault" v-model="termsCheck" />
                <label class="form-check-label inline-block text-gray-800" for="flexCheckDefault">
                  (필수)
                  <a href="javascript:void(0)" @click="isTerms = true">이용약관</a>에 동의합니다.
                </label>
                <span class="span-msg">{{ error.termsCheck }}</span>
              </div>

              <div class="form-check" :class="error.personalCheck ? 'field-error' : ''">
                <input class="
                    form-check-input
                    appearance-none
                    h-4
                    w-4
                    border border-gray-300
                    rounded-sm
                    bg-white
                    checked:bg-blue-600 checked:border-blue-600
                    focus:outline-none
                    transition
                    duration-200
                    mt-1
                    align-top
                    bg-no-repeat bg-center bg-contain
                    float-left
                    mr-2
                    cursor-pointer
                  " type="checkbox" value="" id="flexCheckChecked" v-model="personalCheck" />
                <label class="form-check-label inline-block text-gray-800" for="flexCheckChecked">
                  (필수)
                  <a  href="javascript:void(0)" @click="isPrivacy = true">개인정보 수집·이용</a>에 동의합니다.
                </label>
                <span class="span-msg">{{ error.personalCheck }}</span>
              </div>
            </div>
          </div>
        </div>
      </form>
      <div class="button_wrap">
        <button type="button" class="bordered" @click="$router.replace('/SignUpCompanyCode')">
          뒤로가기
        </button>
        <button type="button" class="solid" @click="userSignup">
          회원가입
        </button>
      </div>
    </div>
    <RegistrationModal v-show="isSignupSuccess" @close="closeModal" link="/login" />
  </div>
  <privacypolicymodal v-if="isPrivacy" @close="(isPrivacy = false)"/>
  <termsandcondition v-if="isTerms" @close="(isTerms = false)"/>
</template>

<script>
import SignupService from "@/services/signupService.js";
import signUpValidation from "@/validation/signUpValidation";
import RegistrationModal from "@/components/modals/RegistrationModal.vue";
import { errorMsg, status } from "@/config/Message";
import validator from "validator";
import bcrypt from "bcryptjs";
import privacypolicymodal from "@/components/modals/privacypolicymodal.vue";
import termsandcondition from "@/components/modals/termsandcondition.vue";
//const bcrypt = require("bcrypt") ;

export default {
  name: "SignUp",
  components: {
    RegistrationModal,
    privacypolicymodal,
    termsandcondition
  },
  props: ["id"],
  data() {
    return {
      userEmail: "",
      password: "",
      confirmPassword: "",
      userName: "",
      phone1: "",
      phone2: "",
      department: "",
      rank: "",
      termsCheck: "",
      personalCheck: "",
      signUpSuccessMessage: "",
      error: {},
      emailAuth: true,
      emailCertification: true,
      emailVerificationHash: "",
      emailCode: "",
      isEmailCodeCertified: false,
      newTime: "03:00",
      timer: 180,
      storeSetInterval: null,
      isSignupSuccess: false,
      company_id: this.id,
      successMsg: "",
      emailSuccessMsg: "",
      isPrivacy: false,
      isTerms: false,
    };
  },

  created() {
    this.signupService = new SignupService();
  },

  methods: {
    isNumber: function (evt) {
      evt = evt ? evt : window.event;
      var charCode = evt.which ? evt.which : evt.keyCode;
      if (
        charCode > 31 &&
        (charCode < 48 || charCode > 57) &&
        charCode !== 46
      ) {
        evt.preventDefault();
      } else {
        return true;
      }
    },
    checkEmailInputValue() {
      console.log(this.userEmail);
      if (this.userEmail) {
        this.emailAuth = false;
      }

      if (!this.userEmail) {
        this.emailAuth = true;
      }
    },

    checkEmailCodeInputValue() {
      if (this.emailCode) {
        this.emailCertification = false;
      }

      if (!this.emailCode) {
        this.emailCertification = true;
      }
    },

    getEmailVerified() {
      if (!validator.isEmail(this.userEmail)) {
        this.error.email = "이메일을 확인해 주세요";
        return;
      } else {
        this.signupService.verifyEmail(this.userEmail).then((res) => {
          console.log(res);
          if (res.status == 200) {
            this.emailAuth = true;
            this.error.email = "";
            this.emailCode = "";
            this.error.emailCode = "";
            this.emailSuccessMsg = "인증번호 전송이 완료되었습니다.";
            this.successMsg = "";
            this.emailVerificationHash = res.data.code;
            if (this.storeSetInterval) {
              clearInterval(this.storeSetInterval);
            }
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
              this.emailAuth = false;
              this.emailCertification = true;
              this.emailVerificationHash = "";
              //this.newTime = "03:00"
            }, (this.timer + 1) * 1000);
          } else if (res.response.status == 400) {
            this.emailSuccessMsg = "";
            this.error.email = "이미 사용중인 이메일입니다";
          }
        });
      }
    },

    async emailCodeCertification() {
      const match = await bcrypt.compare(
        this.emailCode,
        this.emailVerificationHash
      );
      console.log("match", match);
      if (match) {
        clearInterval(this.storeSetInterval);
        this.newTime = "03:00";
        this.isEmailCodeCertified = true;
        this.error.emailCode = "";
        this.successMsg = status.verifiedEmailCode;
        this.emailSuccessMsg = "";
        console.log("verification :", this.isEmailCodeCertified);
      } else {
        this.error.emailCode = errorMsg.wrongEmailVerifyCode;
      }
    },

    checkError() {
      let credential = {
        name: this.userName,
        password: this.password,
        confirmPassword: this.confirmPassword,
        email: this.userEmail,
        emailCode: this.emailCode,
        certifiedCode: this.isEmailCodeCertified,
        phoneNumber: this.phone1,
        department: this.department,
        rank: this.rank,
        termsCheck: this.termsCheck,
        personalCheck: this.personalCheck,
      };
      const { isInvalid, error } = signUpValidation(credential);
      if (isInvalid) {
        this.error = error;
        return false;
      } else {
        this.error = {};
        return true;
      }
    },

    userSignup() {
      if (!this.checkError()) {
        return;
      }
      let userData = {
        name: this.userName,
        mobile: this.phone1,
        password: this.password,
        email: this.userEmail,
        department: this.department,
        rank: this.rank,
        company_id: this.company_id,
      };
      this.signupService.userRegistration(userData).then((res) => {
        console.log(res);
        if (res.status == 200) {
          this.error.name = "";
          this.error.password = "";
          this.error.confirmPassword = "";
          this.error.email = "";
          this.error.phoneNumber = "";
          this.error.department = "";
          this.error.rank = "";
          this.signUpSuccessMessage = res.data.message;
          this.isSignupSuccess = true;
        } else {
          console.warn(res);
        }
      });
    },

    closeModal() {
      this.isSignupSuccess = false;
    },
  },
};
</script>
<style scoped>
.span-msg {
  display: block;
}
</style>

