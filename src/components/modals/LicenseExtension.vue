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
            라이선스 업데이트
          </h5>
          <button
          @click="close"
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
          ></button>
        </div>
        <div class="modal-body relative">
          <div class="license_info">
            <div class="license_wrap">
              <div class="form_wrap change_wrap flex-direction">
                <div class="flex items-center radio_wrap">
                  <input
                  ref="currentInput"
                  checked
                    
                    id="default-radio-3"
                    type="radio"
                    v-model="license_status"
                    value="current"
                    name="default-radio"
                    class="
                      w-4
                      h-4
                      text-blue-600
                      bg-gray-100
                      border-gray-300
                      dark:ring-offset-gray-800
                      dark:bg-gray-700 dark:border-gray-600
                    "
                  />
                  <label
                    for="default-radio-3"
                    class="
                      ml-2
                      text-sm
                      font-medium
                      text-gray-900
                      dark:text-gray-300
                    "
                    >기존 라이선스</label
                  >
                </div>
                <div class="flex items-center radio_wrap">
                  <input
                  
                    id="default-radio-4"
                    type="radio"
                    v-model="license_status"
                    value="change"
                    name="default-radio"
                    class="
                      w-4
                      h-4
                      text-blue-600
                      bg-gray-100
                      border-gray-300
                      dark:ring-offset-gray-800
                      dark:bg-gray-700 dark:border-gray-600
                    "
                  />
                  <label
                    for="default-radio-4"
                    class="
                      ml-2
                      text-sm
                      font-medium
                      text-gray-900
                      dark:text-gray-300
                    "
                    >라이선스 변경</label
                  >
                </div>
              </div>
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
          @click="toLicense"
            type="button"
            class="
              blue_bordered
              full-button
              px-6
              py-2.5
              text-white
              font-medium
              text-xs
              leading-tight
              uppercase
              rounded
              transition
              duration-150
              ease-in-out
            "
          >
          다음
          </button>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  name: "LicenseExtension",
  data() {
    return {
      // current : "",
      license_status: "",
    };
  },
  mounted(){
   console.log(this.$refs.currentInput.value)
   this.license_status = "current"
  },
 
  methods : {

    close() {
      // this.license_status = "";
      this.$emit("close");
    },

    toLicense(){
      //alert(this.license_status)
      this.$emit("licenseStatus", this.license_status);
    }
  }
};
</script>

<style lang="scss">
</style>