<template>
    <div class="modal-overlap waitingcompanyapproval z-10">
        <div class="modal-dialog modal-dialog-centered relative w-auto pointer-events-none">
            <div class="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
            <div class="modal-header flex flex-shrink-0 items-center justify-between p-4 rounded-t-md">
                <h5 class="text-xl font-medium leading-normal text-gray-800" id="exampleModalScrollableLabel">
                   업로드 불가
                </h5>
                <button type="button"
                 @click="this.$emit('openUnableToUploadModal')"
                class="btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
                data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body relative">
                <div class="info">
                    <p>20 MB이상의 파일은 업로드가 불가능합니다.</p>
                </div>
            </div>
            <div
                class="modal-footer flex flex-shrink-0 items-center justify-center p-4 rounded-b-md">
                <button type="button"
                @click="this.$emit('openUnableToUploadModal')"
                class="full_button blue_bordered px-6 py-2.5 text-white font-medium text-xs leading-tight uppercase rounded focus:outline-none focus:ring-0 transition duration-150 ease-in-out" style="font-size:18px;">
                확인
                </button>
                <!-- <button type="button"
                class="full_button bordered px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out" >
                Delete
                </button>  -->
                
                </div>
            </div>
        </div>
        </div>
</template>


<script>
export default {
  name: 'UnableToUpload',
  
}
</script>


<style lang="scss">
    
</style>