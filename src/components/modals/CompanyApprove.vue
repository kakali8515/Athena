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
            기업승인 대기중 입니다.
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
            aria-label="Close"
            @click="close"
          ></button>
        </div>
        <div class="modal-body relative">
          <div class="code_wrap">
            <p>기업코드</p>
            <input
              type="text"
              placeholder="123-123"
              disabled
              v-model="companyCode"
            />
            <div class="cmpny_name">
              <p>기업명: <span class="cmp-name">{{companyName}}</span></p>
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
              bordered
              px-6
              py-2.5
              bg-purple-600
              text-white
              font-medium
              text-xs
              leading-tight
              uppercase
              rounded
              shadow-md
              hover:bg-purple-700 hover:shadow-lg
              focus:bg-purple-700
              focus:shadow-lg
              focus:outline-none
              focus:ring-0
              active:bg-purple-800 active:shadow-lg
              transition
              duration-150
              ease-in-out
            "
            @click="confirm"
          >
          승인취소
          </button>
          <button
            type="button"
            class="
              solid
              px-6
              py-2.5
              bg-blue-600
              text-white
              font-medium
              text-xs
              leading-tight
              uppercase
              rounded
              hover:bg-blue-700
              focus:bg-blue-700 focus:outline-none focus:ring-0
              active:bg-blue-800
              transition
              duration-150
              ease-in-out
            "
           @click="goToLogin"
          >
          확인
          </button>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  name: "CompanyApprove",
  props : ["companyName", "companyCode"],
  data() {
    return {
      company_code: "",
      company_name: "",
    };
  },
  updated() {
    this.company_code = localStorage.getItem('company_code');
    this.company_name = localStorage.getItem('company_name');
  },
  methods: {
    close() {
      this.$emit("close");
    },
    goToLogin() {
      this.$emit("close");
      this.$router.push("/login");
      this.company_code = "";
    },
    confirm(){
      this.$emit("confirm");
    }
  },
};
</script>


<style lang="scss">
  .cmp-name{
    color: #3780E6;
  }
</style>