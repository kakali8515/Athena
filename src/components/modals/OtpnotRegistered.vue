<template>
    <div class="modal-overlap waitingcompanyapproval">
        <div class="modal-dialog modal-dialog-centered relative w-auto pointer-events-none">
            <div
                class="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
                <div class="modal-header flex flex-shrink-0 items-center justify-between p-4 rounded-t-md">
                    <h5 class="text-xl font-medium leading-normal text-gray-800">
                        OTP 미등록
                    </h5>
                    <button type="button"
                        class="btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
                        aria-label="Close" @click="close"></button>
                </div>
                <div class="modal-body relative">

                    <div class="completedinfo">
                        <p>OTP가 등록되지 않았습니다.<br>
                            등록 후 로그인이 가능합니다.</p>
                    </div>

                </div>
                <div class="modal-footer flex flex-shrink-0 items-center justify-center p-4 rounded-b-md">
                    <button type="button" @click="confirm"
                        class="solid full_button px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">
                        등록
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
export default {
    name: 'OtpnotRegistered',
    methods: {
        close() {
            this.$emit("close")
        },

        confirm() {
            this.$emit("confirm")
        }
    }

}
</script>

