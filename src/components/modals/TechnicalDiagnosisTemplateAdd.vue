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
          <h5
            class="text-xl font-medium leading-normal text-gray-800"
            id="exampleModalScrollableLabel"
          >
          기술진단 템플릿 추가하기
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
            aria-label="Close" @click="close"
          ></button>
        </div>
        <div class="modal-body relative">
          <div class="verify_password v-otp">
            <div class="form_wrapper">
              <h4>템플릿명을 입력해주세요</h4>
              <div class="inputwrap flex" >
                <input type="text" v-model="template_name" placeholder="템플릿명을 입력해주세요" />
              </div>
              <span class="error-msg">{{ template_err }}</span>
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
              blue_bordered blue_bordered_full
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
            @click="addTemplate"
          >
          추가
          </button>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import userAdmin from "@/services/userAdmin";
import { errorMsg } from "@/config/Message";
export default {
  name: "TechnicalDiagnosisTemplateAdd",
  data() {
    return {
      template_name: "",
      template_err:''
    };
  },
  created() {
    this.userAdmin = new userAdmin();
  },

   methods: {

       close() {
      this.$emit("close");
    },

addTemplate() {

        if(this.template_name=='') {
            this.template_err=errorMsg.emptyTemplate;
        }
        else{

             this.userAdmin
          .templateAdd(this.template_name)
          .then((res) => {
            if(res.status==200) {
                this.$emit("close");
                localStorage.setItem("template_name", this.template_name);
                this.$router.push(`/TechnicalDiagnosisTemplateAdd/${res.data.id}`);
            }
            else if (res.response.status == 400) {
                this.template_err=res.response.data.error;
            }
          })
          .catch((error) => {
            console.log(error);
          });

        }
    }

}
}
</script>


<style lang="scss">
</style>