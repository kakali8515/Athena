<template>
   <div class="modal-overlap waitingcompanyapproval">
        <div class="modal-dialog modal-dialog-centered relative w-auto pointer-events-none">
            <div class="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
            <div class="modal-header flex flex-shrink-0 items-center justify-between p-4 rounded-t-md">
                <h5 class="text-xl font-medium leading-normal text-gray-800" id="exampleModalScrollableLabel">
                   자산대장 다운로드
                </h5>
                <button type="button"
                @click="this.$emit('closeAssetLedgerDownload')"
                class="btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
                data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body relative">
                <div class="document_pssword">
                    <p>문서 비밀번호를 설정해주세요.</p>
                    <input type="password" placeholder="Enter password" v-model="password">
                    <span class="error-msg" v-show="error_msg">{{error_msg}}</span>
                </div>
            </div>
            <div
                class="modal-footer flex flex-shrink-0 items-center justify-center p-4 rounded-b-md">
                <button type="button" @click="getSetting"
                class="full_button bordered px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight rounded hover:bg-blue-700 focus:bg-blue-700 focus:outline-none focus:ring-0 active:bg-blue-800 transition duration-150 ease-in-out">
                설정
                </button>
                <!-- <button type="button"
                class="full_button blue_bordered px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out" style="font-size:18px;">
                Cancel
                </button>  -->
                
            </div>
            </div>
        </div>
        </div>
</template>


<script>
import { errorMsg } from '@/config/Message.js';
export default {
  name: 'AssetLedgerDownload',
  data(){
    return{
      password : "",
      error_msg : "",
    }
  },
  methods : {
    getSetting(){
        if(this.password == ""){
          this.error_msg = errorMsg.emptyPassword
          return;
        }
        this.error_msg = "";
        this.$emit("ledger", this.password)
    }
  }
}
</script>


<style lang="scss">
   
</style>