<template>
    <div class="modal-overlap waitingcompanyapproval">
        <div class="modal-dialog modal-dialog-centered relative w-auto pointer-events-none">
            <div
                class="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
                <div class="modal-header flex flex-shrink-0 items-center justify-between p-4 rounded-t-md">
                    <h5 class="text-xl font-medium leading-normal text-gray-800" id="exampleModalScrollableLabel">
                        결재완료
                    </h5>
                    <button type="button"
                        class="btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
                        data-bs-dismiss="modal" aria-label="Close" @click="close"></button>
                </div>
                <div class="modal-body relative">
                    <div class="payment_completed">
                        <p>결재완료 되었습니다.</p>
                    </div>
                </div>
                <div class="modal-footer flex flex-shrink-0 items-center justify-center p-4 rounded-b-md">
                    <button type="button" @click="close"
                        class="full_button px-6 py-2.5 bg-gray-600 text-white font-medium text-xs leading-tight uppercase rounded hover:bg-gray-700 focus:bg-gray-700 focus:outline-none focus:ring-0 active:bg-gray-800 transition duration-150 ease-in-out">
                        확인
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
import CommonService from "@/services/CommonService";

export default {
    name: 'PaymentCompleted',
    props: ['evd_id', 'tranc_id'],
    created() {
        this.commonService = new CommonService();
    },
    methods: {
        close() {
            this.$emit("close");
            this.$router.push({ name: "ElectronicPayment" });
        },
        // getEvidenceApprove() {
        //     console.log("kkkkk")
        //     this.commonService.evidenceApprove(this.evd_id, this.tranc_id)
        //         .then((res) => {
        //             if (res.status == 200) {
        //                 console.log(res);
        //                 this.$emit("close");
        //             }
        //         })
        //         .catch((err) => {
        //             console.log(err)
        //         })
        // },
    }
}
</script>

<style lang="scss">
</style>