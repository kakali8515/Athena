<template>
    <div class="modal-overlap waitingcompanyapproval">
  <div class="modal-dialog modal-dialog-centered relative w-auto pointer-events-none">
    <div class="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
      <div class="modal-header flex flex-shrink-0 items-center justify-between p-4 rounded-t-md">
        <h5 class="text-xl font-medium leading-normal text-gray-800">
         라이선스 업데이트
        </h5>
        <button type="button" @click="close"
          class="btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
           aria-label="Close"></button>
      </div>
      <div class="modal-body relative">
         <div class="license_info">
            <div class="license_wrap">
                <p>사용하는 라이선스</p>
                <div class="form_wrap storage">
                    <input type="text" placeholder="License name" v-model="licenseName" readonly>
                    
                     
                </div>
                <div class="form_wrap change_wrap">
                    <div class="flex items-center radio_wrap">
                        <input  checked id="default-radio-3" v-model="licenseOption" type="radio" value="extension" name="default-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600">
                        <label for="default-radio-3" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">라이선스 연장</label>
                    </div>
                    <div class="flex items-center radio_wrap">
                        <input  id="default-radio-2" type="radio" v-model="licenseOption" value="storage" name="default-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 dark:ring-offset-gray-800  dark:bg-gray-700 dark:border-gray-600">
                        <label for="default-radio-2" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">옵션 추가</label>
                    </div>
                </div>
            </div>
            <!-- <div class="license_wrap package_wrap" v-show="isLicensePackage">
                <p>License package</p>
                <div class="form_wrap">
                  <input type="text" placeholder="License name" v-model="licenseName">
                    <div class="flex items-center radio_wrap">
                        <input ref="addOption" @change="isAddOption" id="default-radio-2" type="radio" value="addOption" name="default-license" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                        <label for="default-radio-2" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Add Option</label>
                    </div>
                </div>
            </div> -->
            <div class="license_wrap package_wrap storage">
                <p>스토리지 옵션</p>
                <div class="form_wrap">
                    <select v-model="selectPackage" @change="getSelectedPackage" ref="storageOption">
                        <Option value=0 selected disabled>라이선스를 선택해주세요</Option>
                        <Option v-for="pack in licensePackage" :key="pack.id" :value="pack.id">{{pack.package_name}}</Option>
                        <!-- <Option>Option 2</Option>
                        <Option>Option 3</Option> -->
                    </select>
                </div>
            </div>
         </div>
          
      </div>
      <div
        class="modal-footer  flex flex-shrink-0 items-center justify-center p-4 rounded-b-md">
        
        <button type="button" :disabled="isDisabled"
        @click="request"
          class="blue_bordered full-button px-6 py-2.5 text-white font-medium text-xs leading-tight uppercase rounded focus:outline-none focus:ring-0 transition duration-150 ease-in-out">
          라이선스 업데이트 요청
        </button>
        
      </div>
    </div>
  </div>
</div>
</template>


<script>
export default {
  name: 'ChangeLicensePackage',
  props : ["licensePackage", "licenseName"],
  data(){
    return{
        licenseOption : "",
        isLicensePackage : false,
        selectPackage : "",
        isDisabled : true,
        addOption : false,
    }
  },

  mounted(){
        this.licenseOption = "extension";
        this.isLicensePackage = false;
        this.selectPackage = "";
        this.isDisabled = true;
        this.addOption = false;
  },

  watch : {
    licenseOption(newVal, oldVal){
        let value;
       if(newVal == "extension"){
         this.isLicensePackage = true;
         this.isDisabled = false;
         this.selectPackage = 0;
         value = "period";
       }

        if(newVal == "storage"){
         this.isLicensePackage = false;
         this.isDisabled = false;
         this.selectPackage = 0;
         value = "storage";
       }

       this.$emit("addStorage", value);
    }
  },

  methods : {
    getSelectedPackage(){
      this.$emit("storageCapacity", this.selectPackage)
    },

    request(){

      this.addOption = (this.selectPackage && this.licenseOption == "extension") ? true : false;
      this.$emit("request", this.addOption, this.licenseOption)
    },

    close(){
      this.$emit("close")
    }
  }
  
}
</script>

<style lang="scss">
       
</style>