<template>
    <div class="modal-overlap waitingcompanyapproval ">
        <div class="modal-dialog modal-dialog-centered relative w-auto pointer-events-none">
            <div
                class="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
                <div class="modal-header flex flex-shrink-0 items-center justify-between p-4 rounded-t-md">
                    <h5 class="text-xl font-medium leading-normal text-black-800 text-center"
                        id="exampleModalScrollableLabel">
                        회원가입
                    </h5>
                    <button type="button"
                        class="btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
                        aria-label="Close" @click="close"></button>
                </div>
                <div class="modal-body relative">
                    <div class="cancel_info_wrap">
                        <p>Athena 가입이 완료되었습니다.
                            기업 담당자가 사용 승인을 한 이후에 사용 가능합니다.</p>

                    </div>
                </div>
                <div class="modal-footer flex flex-shrink-0 items-center justify-center p-4 rounded-b-md">

                    <button type="button" @click="close2(link)"
                        class="graysolid w-full px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight capitalize rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">
                        로그인
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "RegistrationModal",
    props: ["link"],
    data() {
        return {

        }
    },

    methods: {
        close() {
            this.$emit("close")
        },

        close2(link) {
            this.$router.push(link)
        }
    }
}

</script>

<style scoped>

</style>