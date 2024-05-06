<template>
    <div class="modal-overlap waitingcompanyapproval">
  <div class="modal-dialog modal-dialog-centered relative w-auto pointer-events-none">
    <div class="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
      <div class="modal-header flex flex-shrink-0 items-center justify-between p-4 rounded-t-md">
        <h5 class="text-xl font-medium leading-normal text-gray-800" id="exampleModalScrollableLabel">
           증적 목록 삭제
        </h5>
        <button type="button"
          class="btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
          data-bs-dismiss="modal" aria-label="Close" @click="$emit('closeModal',false)"></button>
      </div>
      <div class="modal-body relative">
          <div class="cancel_backup_info">
              <h4>증적을 삭제 하시겠습니까?</h4>
              <h5>삭제 하시면 증적 목록에서 삭제됩니다</h5>
          </div>
          
      </div>
      <div
        class="modal-footer flex flex-shrink-0 items-center justify-center p-4 rounded-b-md">
        <button type="button"
          class="bordered px-6 py-2.5 bg-purple-600 text-white font-medium text-xs leading-tight uppercase rounded hover:bg-purple-700 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
          data-bs-dismiss="modal" @click="$emit('closeModal',false)">
          취소
        </button>
        <button type="button"
          class="solid px-6 py-2.5 text-white font-medium text-xs leading-tight uppercase rounded focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
          @click="$emit('deleteEvidenceList')"  
        >
          삭제
        </button>
      </div>
    </div>
  </div>
</div>
</template>


<script>
export default {
  name: 'EvidenceDelete',
  
}
</script>

<style lang="scss">
   
</style>