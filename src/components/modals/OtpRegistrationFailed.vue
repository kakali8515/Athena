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
          <h5 class="text-xl font-medium leading-normal text-gray-800">
            OTP 인증
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
            @click="close"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body relative">
          <p> OTP 번호를 입력하시오.</p>
          <div class="otp_form_wrap mt-30">
            <p>OTP</p>
            <div class="form flex" :class="error ? 'field-error' : ''">
              <input type="OTP" placeholder="정확한 OTP 번호를 입력해 주세요" v-model="verifyToken" />
              <button type="button" @click="confirm">확인</button>
            </div>
            <span class="error-msg">{{ error }}</span>
            <span>* OTP 사용이 어려울 경우 관리자에게 문의해주세요.</span>
            <span @click="reset" class="otp_reset">OTP 등록 재설정 링크</span>
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
          <!-- <div class="qrcode_info">
            <p>Please scan the QR code on your mobile device with Google OTP app</p>
        </div> -->
        </div>
      </div>
    </div>
   
  </div>
</template>


<script>
export default {
  name: "OtpRegistrationFailed",
  props: {
    errorMsg: String,
  },

  // props: ['errorMsg'],
  data() {
    return {
      verifyToken: "",
      error : "",
    };
  },
  watch : {
   errorMsg :function(newVal, oldVal){
     this.error = newVal;
   }
  },
  methods: {
    close() {
      this.error = "";
      this.$emit("close");
    },

    confirm() {
      this.$emit("confirm", this.verifyToken);
      this.verifyToken= '';
      // this.$emit("close");
    },
    reset() {
      this.$emit("reset");
    },
  },
};
</script>

<style lang="scss">
  .otp_reset{
    margin-top: 10px !important;
    color:#096fba !important;
    text-decoration: underline;
    cursor: pointer;
  }
</style>