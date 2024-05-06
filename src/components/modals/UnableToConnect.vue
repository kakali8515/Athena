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
            접속불가
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
              focus:opacity-100
              hover:text-black hover:opacity-75 hover:no-underline
            "
            aria-label="Close"
            @click="close"
          ></button>
        </div>
        <div class="modal-body relative">
          <p>ATHENA 접속하실 수 있는 기업이 존재하지 않습니다.</p>
          <div class="nopermission_wrap mt-30">
            <p>{{companyName}} : <a href="#">{{licenceName}}</a></p>
            <button v-if="userAdmin=='y'" type="button" @click="openLicenceExpiration">더보기</button>
          </div>
          <div class="info">
            <h5 v-if="is_license_paid =='completed'">
              라이선스 만료 까지 29일 남았습니다. 기간은 연장하고 싶으신 경우 하단 기간 연장 버튼을 통해 연장하실 수 있습니다.
            </h5>

            <h5 v-if="is_license_paid =='completed'">
              라이선스 만료일 기준 30일까지만 백업 데이터를 다운받으 실 수 있으며 라이선스 종료 30일 이후에는 백업을 받으 실 수 없습니다.
            </h5>
            <p>
              기업코드를 입력하여 기업인증을 요청 하실 수 있습니다.
            </p>
          </div>
          <div
            class="code_wrap"
            :class="$store.state.signup.errorCodeMsg ? 'field-error' : ''"
          >
            <p>기업코드</p>
            <div class="input_wrap">
              <input
                type="text"
                placeholder="123-123"
                v-model="compCode"
                maxlength="20"
                @keyup="checkCompanyCodeInputValue"
              />
              <a
                href="#"
                :style="{
                  pointerEvents: isActiveCertification,
                  color: certificationColor,
                }"
                @click="$store.dispatch('signup/getVerification', compCode)"
                >인증</a
              >
            </div>
            <span v-if="$store.state.signup.errorCodeMsg">{{ $store.state.signup.errorCodeMsg }}</span>
            <div class="cmpny_name" v-if="$store.state.signup.company_name">
              <p>기업명: <span class="cmp-name">{{$store.state.signup.company_name}}</span></p>
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
            type="button" @click="approve"
            class="
              solid
              full_button
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
            :disabled="$store.state.signup.isCodeVerified"
          >
          승인요청
          </button>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  name: "UnableToConnect",
  props : ["companyName", "licenceName", "userAdmin","is_license_paid"],
  data() {
    return {
      compCode: "",
      isActiveCertification: "none",
      certificationColor: "#828282",
    };
  },

  watch : {
     companyName : function(newVal, oldVal){
          if(newVal != oldVal){
              return newVal;
          }
     }
  },

  methods: {
    close() {
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
      }
    },

    openLicenceExpiration(){
      this.$emit("openLicenceExpiration")
    }
  },
};
</script>

<style lang="scss">
</style>