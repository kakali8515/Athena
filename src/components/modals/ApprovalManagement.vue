<template>
    <!-- <div class="login_base_wrap">
        <div class="wraper">
            <img src="@/assets/images/Logo.svg">
            <p>You must be logged in to use Athena.</p>
            <form class="form_wrap">
                <div class="form">
                    <p>Email Address</p>
                    <input class="form-control" type="text" placeholder="Input email address">
                </div>
                <div class="form">
                    <p>Password</p>
                    <input class="form-control" type="password" placeholder="Enter Password">
                </div>
                <div class="form">
                    <div class="flex justify-start">
                        <div>
                            <div class="form-check">
                                <input
                                    class="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 align-top bg-no-repeat bg-center bg-contain float-left cursor-pointer"
                                    type="checkbox" value="" id="flexCheckDefault">
                                <label class="form-check-label inline-block text-gray-800" for="flexCheckDefault">
                                    Save ID
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="form">
                    <button type="button" data-bs-toggle="modal" data-bs-target="#waitingcompanyapproval">
                        LOGIN
                    </button>
                </div>
            </form>
            <div class="forgot_wrap flex">
                <div class="left flex justify-start">
                    <ul>
                        <li><a href="#">Do you have an ATHENA membership code?</a></li>
                        <li><a href="#">Forgot ID / Password?</a></li>
                    </ul>
                </div>
                <div class="right flex justify-end">
                    <ul>
                        <li><a href="#">Sign Up</a></li>
                        <li><a href="#">Find ID/Password</a></li>
                    </ul>
                </div>
            </div>
        </div>
    </div> -->

    <div class="modal-overlap waitingcompanyapproval">
        <div class="modal-dialog modal-dialog-centered relative w-auto pointer-events-none">
            <div
                class="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
                <div class="modal-header flex flex-shrink-0 items-center justify-between p-4 rounded-t-md">
                    <h5 class="text-xl font-medium leading-normal text-gray-800" id="exampleModalScrollableLabel">
                        결재 관리
                    </h5>
                    <button type="button"
                        class="btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
                        data-bs-dismiss="modal" aria-label="Close" @click="close"></button>
                </div>
                <div class="modal-body relative">
                    <div class="approval_management">
                        <p>모달 중 타이틀</p>
                        <textarea placeholder="모달안의 텍스트" v-model="reasonText"></textarea>
                        <span>{{ error.reasonText }}</span>
                    </div>
                </div>
                <div class="modal-footer flex flex-shrink-0 items-center justify-center p-4 rounded-b-md">
                    <button type="button" @click="getEvidenceReject"
                        class="full_button px-6 py-2.5 bg-gray-600 text-white font-medium text-xs leading-tight uppercase rounded  hover:bg-gray-700 focus:bg-gray-700 focus:outline-none focus:ring-0 active:bg-gray-800 transition duration-150 ease-in-out">
                        확인
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
import CommonService from "@/services/CommonService";
import validator from "validator";
import { errorMsg } from "@/config/Message";

export default {
    name: 'ApprovalManagement',
    props: ['evd_id', 'tranc_id'],
    data() {
        return {
            reasonText: '',
            error: {},
        }
    },
    created() {
        this.commonService = new CommonService();
    },
    methods: {
        close() {
            this.$emit("close");
        },
        // textarea validation
        checkRegection() {
            if (validator.isEmpty(this.reasonText)) {
                console.log("empty")
                this.error.reasonText = errorMsg.reasonText;
            } else {
                return false;
            }
        },
        getEvidenceReject() {
            if (this.checkRegection()) {
                return;
            }
            else {
                this.commonService.evidenceReject(this.evd_id, this.tranc_id, this.reasonText)
                    .then((res) => {
                        if (res.status == 200) {
                            this.$emit("close");
                            this.$router.push({ name: "ElectronicPayment" });
                        }
                        // this.paymentDetails = res.data.data;
                        // this.referanceData = this.paymentDetails.manager_information.map((item) => {
                        //     return item.name
                        // })
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            }

        },
    }
}
</script>

<style lang="scss">
</style>