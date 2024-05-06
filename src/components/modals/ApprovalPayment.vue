<template>
  <div class="modal-overlap waitingcompanyapproval">
    <div
      class="modal-dialog modal-dialog-centered relative w-auto pointer-events-none"
    >
      <div
        class="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current"
      >
        <div
          class="modal-header flex flex-shrink-0 items-center justify-between p-4 rounded-t-md"
        >
          <h5
            class="text-xl font-medium leading-normal text-gray-800"
            id="exampleModalScrollableLabel"
          >
            결재
          </h5>
          <button
            type="button"
            class="btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
            data-bs-dismiss="modal"
            aria-label="Close"
            @click="$emit('closeModal', false)"
          ></button>
        </div>
        <div class="modal-body relative">
          <div class="cancel_backup_info">
            <h4>결재 하시겠습니까?</h4>
            <h5>결재 이후에는 수정하실 수 없습니다.</h5>
          </div>
        </div>
        <div
          class="modal-footer flex flex-shrink-0 items-center justify-center p-4 rounded-b-md"
        >
          <button
            type="button"
            class="bordered px-6 py-2.5 bg-purple-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-purple-700 hover:shadow-lg focus:bg-purple-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-800 active:shadow-lg transition duration-150 ease-in-out"
            data-bs-dismiss="modal"
            @click="$emit('closeModal', false)"
          >
            취소
          </button>
          <button
            type="button"
            class="solid px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
            @click="approved"
          >
            결재
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import EvidenceManagement from "@/services/EvidenceManagement";
import Toast from "@/alert/alert.js";
export default {
  name: "ApprovalPayment",
  created() {
    this.evidenceManagement = new EvidenceManagement();
  },
  props: {
    EvidenceId: String,
    TransactionId: String,
  },
  methods: {
    approved() {
      this.evidenceManagement
        .approveEvidence({
          id: this.EvidenceId,
          transaction_id: this.TransactionId,
        })
        .then((res) => {
          if (res.status === 200) {
            Toast.fire("Approved");
            this.$emit("reStart");
          }
        });
    },
  },
};
</script>

<style lang="scss"></style>
