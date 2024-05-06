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
            비밀번호 확인
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
              focus:outline-none focus:opacity-100
              hover:text-black hover:opacity-75 hover:no-underline
            "
            data-bs-dismiss="modal"
            aria-label="Close"
            @click="close"
          ></button>
        </div>
        <div class="modal-body relative">
          <div class="verify_password" :class="passerror ? 'field-error' : ''">
            <h4>비밀번호</h4>
            <input
              type="password"
              placeholder="비밀번호"
              v-model="current_password"
            />
            <span>{{ passerror }}</span>
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
              rounded
              focus:outline-none focus:ring-0
              transition
              duration-150
              ease-in-out
            "
            @click="verfiyPassWord"
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
export default {
  name: "VerifyPasswordWithTheCurrentPassword",
  props: ["ispasswordVerified"],
  data() {
    return {
      current_password: "",
      passerror: "",
    };
  },
  created() {
    this.ChangeUserInfoService = new ChangeUserInfoService();
  },
  methods: {
    close() {
      this.$emit("close");
    },
    verfiyPassWord() {
      if (this.current_password == "") {
        this.passerror = errorMsg.emptyPassword;
      } else {
        this.ChangeUserInfoService.verifyCurrentPassword(this.current_password)
          .then((res) => {
            if (res.status == 200) {
              this.$emit("currentPassword", this.current_password);
              this.$emit("ispasswordVerified");
              this.$emit("close");
            } else if (res.response.status == 400) {
              this.passerror = "비밀번호가 일치하지 않습니다";
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