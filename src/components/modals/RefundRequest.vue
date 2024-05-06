<template>
  <div class="modal-overlap waitingcompanyapproval z-10">
    <div
      class="modal-dialog modal-dialog-centered relative w-auto pointer-events-none"
    >
      <div
        class="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current"
      >
        <div
          class="modal-header flex flex-shrink-0 items-center justify-between p-4 rounded-t-md"
        >
          <h5 class="text-xl font-medium leading-normal text-gray-800">
            환불 요청
          </h5>
          <button
            type="button"
            @click="close"
            class="btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body relative">
          <div class="calender-modal">
            <div class="refund-policy" v-if="refundStat == false">
              <ul>
                <li>환불은 1개월 단위로 가능합니다.</li>
                <li>환불 금액은 부가가치세(10%)를 제외한 후 환불됩니다.</li>
              </ul>
            </div>
            <div class="asking_wrap">
              <h4>환불을 요청 하시겠습니까?</h4>
              <p>Athena 관리자가 확인 후 환불절차가 진행됩니다</p>
            </div>
            <div class="title_wrap">
              <h4>환불계좌</h4>
              <textarea
                type="text"
                placeholder="환불계좌"
                v-model="account_no"
              />
              <span class="error-msg">{{ emptyAccount }}</span>
            </div>
            <div class="title_wrap m-30">
              <h4>환불사유</h4>
              <input
                type="text"
                placeholder="환불사유"
                v-model="refundReason"
                :disabled="refundStat == false"
              />
              <span class="error-msg">{{ emptyReason }}</span>
            </div>
          </div>
        </div>
        <div
          class="modal-footer flex flex-shrink-0 items-center justify-center p-4 rounded-b-md"
        >
          <button
            type="button"
            @click="close"
            class="gray full-button px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded hover:bg-blue-700 focus:bg-blue-700 focus:outline-none focus:ring-0 active:bg-blue-800 transition duration-150 ease-in-out"
          >
            취소
          </button>
          <button
            type="button"
            @click="refund"
            :disabled="refundStat == false"
            class="solid blue full-button px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded hover:bg-blue-700 focus:bg-blue-700 focus:outline-none focus:ring-0 active:bg-blue-800 transition duration-150 ease-in-out"
          >
            환불하겠습니다
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { errorMsg } from "@/config/Message";
import { ref } from "@vue/reactivity";
import { onMounted } from "@vue/runtime-core";

const props = defineProps(["refundAccount", "refundStat"]);
const emit = defineEmits(["refund", "close"]);

const refundReason = ref("");
const emptyReason = ref("");
const emptyAccount = ref("");
const account_no = ref(props.refundAccount);

onMounted(() => {
  getValue();
});
const refund = () => {
  if (!account_no.value) {
    emptyAccount.value = errorMsg.emptyAccount;
    emptyReason.value = "";
    return;
  } else if (!refundReason.value) {
    emptyReason.value = errorMsg.emptyReason;
    emptyAccount.value = "";
    return;
  } else {
    emptyReason.value = "";
    emptyAccount.value = "";
  }

  emit("refund", refundReason.value, account_no.value);
};
const close = () => {
  emptyReason.value = "";
  emptyAccount.value = "";
  refundReason.value = "";
  emit("close");
};
const getValue = () => {
  setTimeout(() => {
    account_no.value = props.refundAccount;
  }, 1000);
};
</script>

<style lang="scss" scoped>
textarea {
  width: 100%;
  height: 45px;
  margin-top: 10px;
  border: 1px solid #a4a4a4;
  border-radius: 5px;
  padding: 10px 20px;
}
</style>
