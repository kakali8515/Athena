<template>
    <div class="modal-overlap waitingcompanyapproval">
  <div class="modal-dialog modal-dialog-centered relative w-auto pointer-events-none">
    <div class="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
      <div class="modal-header flex flex-shrink-0 items-center justify-between p-4 rounded-t-md">
        <h5 class="text-xl font-medium leading-normal text-gray-800" id="exampleModalScrollableLabel">
          백업취소
        </h5>
        <button type="button" @click="close"
          class="btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
          data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body relative">
          <div class="cancel_backup_info">
              <h5> 라이선스 만료일 기준 30일까지만 백업 데이터를 다운받으 실 수 있으며 라이선스 종료 30일 이후에는 백업을 받으 실 수 없습니다.</h5>
              <h5>취소하시겠습니까?</h5>
          </div>
          
      </div>
      <div
        class="modal-footer flex flex-shrink-0 items-center justify-center p-4 rounded-b-md">
        <button type="button" @click="previous"
          class="bordered px-6 py-2.5 text-white font-medium text-xs leading-tight uppercase rounded focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
          data-bs-dismiss="modal">
          이전
        </button>
        <button type="button" @click="close"
          class="solid px-6 py-2.5 text-white font-medium text-xs leading-tight uppercase rounded focus:outline-none focus:ring-0 transition duration-150 ease-in-out">
          취소
        </button>
      </div>
    </div>
  </div>
</div>
</template>


<script>
export default {
  name: 'CancelDataBackup',
  data(){
    return{

    }
  },
  methods : {
    close(){
      this.$emit("close");
    },

    previous(){
      this.$emit("previous")
    }
  }
}
</script>

<style lang="scss">
   
</style>