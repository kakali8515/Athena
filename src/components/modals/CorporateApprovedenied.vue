<template>
    <div class="modal-overlap waitingcompanyapproval">
  <div class="modal-dialog modal-dialog-centered relative w-auto pointer-events-none">
    <div class="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
      <div class="modal-header flex flex-shrink-0 items-center justify-between p-4 rounded-t-md">
        <h5 class="text-xl font-medium leading-normal text-gray-800">
          기업승인이 거부되었습니다.
        </h5>
        <button type="button"
          class="btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
           aria-label="Close" @click="close"></button>
      </div>
      <div class="modal-body relative">
          <div class="nopermission_wrap">
              <p>{{ companyCode }}</p>
              <p>사유:<a href="#">{{rejectReason}}</a></p>
          </div> 
          <div class="info">
              <p>기업코드를 입력하여 기업인증을 요청 하실 수 있습니다.</p>
          </div>
          <div class="code_wrap" :class="($store.state.signup.errorCodeMsg) ? 'field-error' : '' ">
              <p>기업 코드</p>
              <div class="input_wrap">
                  <input type="text" placeholder="123-123" v-model="compCode" maxlength="20" @keyup="checkCompanyCodeInputValue">
                   <a href="#" :style="{pointerEvents : isActiveCertification, color : certificationColor }" @click="checkSameCode">인증</a>
              </div>
              <span>{{$store.state.signup.errorCodeMsg}}</span>
          </div>
      </div>
      <div
        class="modal-footer flex flex-shrink-0 items-center justify-center p-4 rounded-b-md">
        <button type="button" @click="approve" :disabled="$store.state.signup.isCodeVerified"
          class="solid full_button px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">
          승인요청
        </button>
      </div>
    </div>
  </div>
</div>
</template>


<script>
export default {
  name: 'CorporateApprovedenied',
  props : ["companyCode", "rejectReason"],
  data(){
    return {
      compCode : "",
      isActiveCertification : "none",
      certificationColor : "#828282",
    }
  },
  methods : {
    close(){
      this.$store.dispatch("signup/emptyErrorCodeMsg");
      this.compCode = "";
      this.$emit("close");
    },

    approve(){
      this.$store.dispatch("signup/emptyErrorCodeMsg");
      this.compCode = "";
      this.$emit("approve");
    },

    checkCompanyCodeInputValue() {
      console.log(this.compCode);
      if (this.compCode) {
        this.isActiveCertification = "auto";
        this.certificationColor = "";
      }else{
        this.$store.dispatch('signup/getSameCodeErrorMsg', "")
      }
    },

    checkSameCode(){
      if(this.companyCode == this.compCode){
        let msg = "This is the same company code"
       this.$store.dispatch('signup/getSameCodeErrorMsg', msg)
        return;
      }
      this.$store.dispatch('signup/getVerification', this.compCode)

    }
  }
  
}
</script>

<style lang="scss">
     
</style>