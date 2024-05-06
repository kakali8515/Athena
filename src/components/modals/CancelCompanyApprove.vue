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
            class="
              text-xl
              font-medium
              leading-normal
              text-black-800 text-center
            "
            id="exampleModalScrollableLabel"
          >
          기업승인 취소
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
          <div class="cancel_info_wrap">
            <p>
              기업승인 취소를 하시면 ATHENA를 사용하실 수 없으며, 사용하시기 위해선 기업승인을 다시 요청해주셔야 합니다.
            </p>

            <h5>인증을 취소하시겠습니까?</h5>
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
            @click="goToLogin"
          >
          아니요
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
              shadow-md
              hover:bg-blue-700 hover:shadow-lg
              focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0
              active:bg-blue-800 active:shadow-lg
              transition
              duration-150
              ease-in-out
            "
            @click="confirm"
          >
          네
          </button>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  name: "CancelCompanyApprove",
  methods: {
    close() {
      this.$emit("close");
    },
    confirm() {
      this.$emit("confirm");
    },
    goToLogin() {
      this.$emit("close");
      this.$router.push("/login");
    },
  },
};
</script>

<style lang="scss">
</style>