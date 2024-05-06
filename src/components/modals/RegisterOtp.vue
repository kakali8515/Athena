<template>
  <div class="modal-overlap waitingcompanyapproval z-10">
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
            OTP 등록하기
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
          <div class="otp_form_wrap">
            <p>OTP</p>
            <div class="form flex" :class="errorMsg ? 'field-error' : ''">
              <input type="text" placeholder="인증번호를 입력해주세요" v-model="verifyToken" />
              <button type="button" @click="confirm">확인</button>
            </div>
            <span class="error-msg">{{ errorMsg }}</span>
          </div>
          <div class="key_wrap">
            <p>key</p>
            <img :src="qrCode" alt="QR" />
            <!-- <img src="@/assets/images/otp_qr_code.svg"> -->
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
          <div class="qrcode_info">
            <p>
             모바일에 있는 구글 OTP 앱으로 QR코드를 스캔하세요.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  name: "RegisterOtp",
  props: {
    qrCode: String,
    errorMsg: String,
  },
  data() {
    return {
      verifyToken: "",
    };
  },
  methods: {
    close() {
      this.verifyToken = ''
      this.$emit("close");
    },

    confirm(verifyToken) {
      // this.verifyToken = '';
      this.$emit("confirm", this.verifyToken);
      this.verifyToken = '';
    },
  },
};
</script>

<style lang="scss">
</style>