<template>

    <div class="modal-overlap waitingcompanyapproval">
        <div class="modal-dialog modal-dialog-centered relative w-auto pointer-events-none">
            <div class="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
            <div class="modal-header flex flex-shrink-0 items-center justify-between p-4 rounded-t-md">
                <h5 class="text-xl font-medium leading-normal text-gray-800" id="exampleModalScrollableLabel">
                   첨부파일 확인
                </h5>
                <button type="button"
                @click="this.$emit('closeCheckAttechmentModal')"
                class="btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
                data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body relative">
                <div class="info">
                    <p>첨부된 구성도 이미지가 존재하지 않습니다. 이미지를 업로드 후 선택해주세요</p>
                </div>
            </div>
            <div
                class="modal-footer flex flex-shrink-0 items-center justify-center p-4 rounded-b-md">
                <button type="button"
                @click="this.$emit('closeCheckAttechmentModal')"
                class="full_button blue_bordered px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded hover:bg-blue-700 focus:bg-blue-700 focus:outline-none focus:ring-0 active:bg-blue-800 transition duration-150 ease-in-out" style="font-size:18px;">
                확인
                </button>
                </div>
            </div>
        </div>
        </div>
</template>


<script>
export default {
  name: 'CheckAttachment',
  
}
</script>


<style lang="scss">
   
</style>