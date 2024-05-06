<template>
  <div class="signup_base_wrap">
    <div class="wraper">
      <img src="@/assets/images/logo.png" />
      <p class="title">회원가입</p>
      <p class="PretendardSemiBold">
       Athena 회원가입 시 기업 코드가 필요합니다. 기업코드입력 후 회원가입을 진행하실 수 있습니다.
      </p>

      <form class="form_wrap" :class="($store.state.signup.errorCodeMsg) ? 'field-error' : '' ">
        <div class="code_wrap">
          <p>기업 코드</p>
          <div class="input_wrap">
            <input type="text" placeholder="기업 코드" v-model="companyCode" maxlength="20" @keyup="checkCompanyCodeInputValue"/>
            <router-link :style="{pointerEvents : isActiveCertification, color : certificationColor }" to @click="$store.dispatch('signup/getVerification', companyCode)"
             >인증</router-link
            >
          </div>
          <span>{{$store.state.signup.errorCodeMsg}}</span>
          <span class="success-msg" v-if="$store.state.signup.SucessCodeMsg">{{$store.state.signup.SucessCodeMsg}}</span>
        </div>
      </form>
      <div class="button_wrap">
        <button
          type="button"
          class="bordered"
          @click="$router.push({ name: 'LogIn' })"
        >
          뒤로
        </button>
        <button type="button" class="solid" :disabled="$store.state.signup.isCodeVerified" @click="$router.push({name : 'SignUp', params : { id : $store.state.signup.company_id } })">다음</button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "SignUpCompanyCode",
  data() {
    return {
      companyCode: "",
      isActiveCertification : "none",
      certificationColor : "#828282",
      
    };
  },
  mounted() {
    this.$store.state.signup.errorCodeMsg="";
    this.$store.state.signup.company_id="";
    this.$store.state.signup.SucessCodeMsg="";
  },

  methods : {
     checkCompanyCodeInputValue() {
      console.log(this.companyCode);
      if (this.companyCode) {
        this.isActiveCertification = "auto";
        this.certificationColor = "";
      }
    },
  }
};
</script>
