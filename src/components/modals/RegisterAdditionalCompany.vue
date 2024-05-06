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
          기업 추가하기
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
          <p>
            기업코드를 입력하시면 해당 기업담당자에게 요청을 전달합니다.
          </p>
          <div class="verify_password company_code">
            <h4>기업 코드</h4>
            <div class="input_wrap" :class="error ? 'field-error' : ''">
              <input type="text" placeholder="기업 코드" v-model="company_code" />
              <button @click="verifyCompany" type="button">인증</button>
            </div>
            <span>{{ error }}</span>
            <p v-if="isCodeVerified" class="company_name">
             기업정보:<a href="#">**{{ company_name }}</a>
            </p>
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
              solid
              graysolid
              full_button
              w-full
              px-6
              py-2.5
              bg-blue-600
              text-white
              font-medium
              text-xs
              leading-tight
              rounded
              hover:bg-blue-700
              focus:bg-blue-700 focus:outline-none focus:ring-0
              active:bg-blue-800
              transition
              duration-150
              ease-in-out
            "
            @click="approveCompany"
          >
            승인 요청
          </button>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import ChangeUserInfoService from "@/services/ChangeUserInfoService";
import { errorMsg } from "@/config/Message";
export default {
  name: "RegisterAdditionalCompany",
  data() {
    return {
      company_code: "",
      error: "",
      isCodeVerified: false,
      company_name: "",
      company_id: "",
      user_id: localStorage.getItem('uid'),
    };
  },
  created() {
    this.ChangeUserInfoService = new ChangeUserInfoService();
  },
  methods: {
    close() {
      this.$emit("close");
    },
    verifyCompany() {
      if (this.company_code == "") {
        this.error = errorMsg.emptyCompanyCode;
      } else {
        this.ChangeUserInfoService.verifyCompanyCode(this.company_code)
          .then((res) => {
            if (res.status == 200) {
              this.error = "";
              this.isCodeVerified = true;
              this.company_name = res.data.company_name;
              this.company_id = res.data.company_id;
            } else if (res.response.status == 400) {
              this.error = errorMsg.companyCodeExist;
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
    approveCompany() {
      if (this.company_code == "") {
        this.error = errorMsg.emptyCompanyCode;
      }
      if (this.isCodeVerified == false) {
        this.error = errorMsg.verifyCompanyCode;
      } else {
        this.ChangeUserInfoService.companyCodeApproval(
          this.user_id,
          this.company_id
        )
          .then((res) => {
            if (res.status == 200) {
              this.$emit("close");
              this.$emit("updateCompany");
            } else if (res.response.status == 400) {
              this.error = res.response.data.error;
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