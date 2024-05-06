<template>
    <div class="modal-overlap waitingcompanyapproval">
  <div class="modal-dialog modal-dialog-centered relative w-auto pointer-events-none">
    <div class="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
      <div class="modal-header flex flex-shrink-0 items-center justify-between p-4 rounded-t-md">
        <h5 class="text-xl font-medium leading-normal text-gray-800">
          라이선스 만료
        </h5>
        <button type="button"
          class="btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
           aria-label="Close" @click="close"></button>
      </div>
      <div class="modal-body relative">
         <div class="license_info">
             <h4>{{companyName}} 기간 만료 D-{{30 - licenceExpTime}}</h4>
             <p>라이선스 만료 까지 [{{30 - licenceExpTime}}]일 남았습니다. 기간은 연장하고 싶으신 경우 하단 기간 연장 버튼을 통해 연장하실 수 있습니다.</p>

             <p>라이선스 만료일 기준 30일까지만 백업 데이터를 다운받으 실 수 있으며 라이선스 종료 30일 이후에는 백업을 받으 실 수 없습니다.</p>
         </div>
          
      </div>
      <div
        class="modal-footer lisence-wrap flex flex-shrink-0 items-center justify-center p-4 rounded-b-md">
        <button type="button" @click="dataBackup" :disabled="DataBackupEnable"
          class="max-width gray_borderd px-6 py-2.5 text-white font-medium text-xs leading-tight uppercase rounded focus:outline-none focus:ring-0 transition duration-150 ease-in-out">
          데이터 백업
        </button>
        <button type="button" @click="openLicense"
          class="max-width blue_bordered px-6 py-2.5 text-white font-medium text-xs leading-tight uppercase focus:outline-none focus:ring-0 transition duration-150 ease-in-out">
          라이선스 연장
        </button>
        <!-- <button type="button" @click="confirm"
          class="max-width blue_solid px-6 py-2.5 text-white font-medium text-xs leading-tight uppercase rounded focus:outline-none focus:ring-0 transition duration-150 ease-in-out">
          확인
        </button> -->
        <button type="button" @click="confirm"
          class="max-width blue_bordered px-6 py-2.5 text-white font-medium text-xs leading-tight uppercase rounded focus:outline-none focus:ring-0 transition duration-150 ease-in-out">
          확인
        </button>
      </div>
    </div>
  </div>
</div>
</template>


<script>
export default {
  name: 'LicenseExpiration',
  props :["licenceExpTime", "LicenseName", "companyName","DataBackupEnable"],
  data(){
    return{
      licenseTime : (30 - this.licenceExpTime)
    }
  },
  methods : {
     close() {
      this.$emit("close");
    },
    openLicense(){
      this.$emit("openLicense");
    },

    dataBackup(){
     this.$emit("dataBackup")
    },

    confirm(){
      if(this.licenceExpTime == 1) {
        this.$emit("close");
      }
      else {
        this.$emit("confirm");
      }
    }
  }
  
}
</script>

<style lang="scss">
    .max-width{
      min-width:150px;
    }   
</style>