<template>
    <div class="modal-overlap waitingcompanyapproval">
    <div class="modal-dialog modal-dialog-centered relative w-auto pointer-events-none">
      <div
        class="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current"
      >
        <div class="modal-header flex flex-shrink-0 items-center justify-between p-4 rounded-t-md">
          <h5
            class="text-xl font-medium leading-normal text-gray-800"
            id="exampleModalScrollableLabel"
          >변경사항확인</h5>
          <button
            type="button"
            class="btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
            data-bs-dismiss="modal"
            aria-label="Close"
            @click="close"
          ></button>
        </div>
        <div class="modal-body relative">
          <div class="payment_completed">
            <p>변경사항이 존재합니다 <br>
저장 하시겠습니까?</p>
        </div>
        </div>
        <div
                class="modal-footer flex flex-shrink-0 items-center justify-center p-4 rounded-b-md">
                <button type="button" @click="close"
                class="full_button bordered px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded hover:bg-blue-700 focus:bg-blue-700 focus:outline-none focus:ring-0 active:bg-blue-800 transition duration-150 ease-in-out" >
                아니요
                </button>
                <button type="button" @click="saveEvaluation"
                class="full_button solid px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded hover:bg-blue-700 focus:bg-blue-700 focus:outline-none focus:ring-0 active:bg-blue-800 transition duration-150 ease-in-out" style="font-size:18px;">
                네
                </button>
                </div>
      </div>
    </div>
  </div>
</template>


<script>
import TechnicalDiagnosticResultsService from "@/services/TechnicalDiagnosticResultsService";
export default {
  name: "ConfirmChangesModal",
  props:['edit','diagnosis_status','tid','asset_id','automatic','category_id'],
  data() {
    return {
        array:this.edit,
    }
  },
  created() {
    this.TechnicalDiagnosticResultsService =
      new TechnicalDiagnosticResultsService();
  },
  methods: {
    close() {
      this.$emit("close");
    },
    saveEvaluation() {
        this.TechnicalDiagnosticResultsService.saveEvaluation(
        this.array,
        this.diagnosis_status,
        Number(this.tid),
        this.asset_id,
        this.$store.state.header.certificate,
        this.automatic,
        this.category_id
      )
        .then((res) => {
          if (res.status == 200) {
            this.$emit("close");
            this.$router.push('/detailedResult')
          }
          else {
              Toast.fire({ title: res.response.data.error });
            }
        })
        .catch((err) => {
          return;
        });
    }
  }
  
};
</script>


<style lang="scss">
    
</style>