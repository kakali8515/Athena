<template>
    

    <div class="modal-overlap waitingcompanyapproval assetmodal">
    <div class="modal-overlap waitingcompanyapproval z-10">

        <div class="modal-dialog modal-dialog-centered relative w-auto pointer-events-none">
            <div class="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
            <div class="modal-header flex flex-shrink-0 items-center justify-between p-4 rounded-t-md">
                <h5 class="text-xl font-medium leading-normal text-gray-800" id="exampleModalScrollableLabel">
                   자산 분류기준
                </h5>
                <button type="button"
                @click="this.$emit('closeAssetClassificationCriteriaModal')"
                class="btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
                data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body relative border-0">
                
                <div class="dtls">
                    <div class="wrap">
                        <h4>1. 목적</h4>
                         <p>정보자산 분류는 정보자산 중요도에 따른 보호수준을 구분하여 자산을 효율적으로 관리하도록 하는 것에 목적이 있다.</p>
                    </div>
                    <div class="wrap m-t-30">
                        <h4> 2.  분류기준</h4>
                         <p>자산 분류는 조직의 자산에 대한 보안을 지속적으로 유지할 수 있는 전제가 된다. 따라서 자산을 유형, 속성 및 관리의 편의성 등을 고려하여 아래와 같은 유형으로 분류하였다.</p>
                    </div>
                    <div class="modal-table">
                        <div class="relative overflow-x-auto">
                            <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        
                                        <th scope="col" class="px-6 py-4">
                                            분류
                                        </th>
                                        <th scope="col" class="px-6 py-4">
                                            설명
                                        </th>
                                        <!-- <th scope="col" class="px-6 py-3">
                                            비고
                                        </th> -->
                                        
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr class="bg-white border-b dark:border-gray-700" v-for="(criteria, i) in classificationCriteriaData" :key="i">
                                    
                                        <td scope="row" class="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                                            {{criteria.category_name}}
                                        </td>
                                        <td scope="row" class="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                                            {{criteria.description}}
                                        </td>
                                        <!-- <td scope="row" class="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap" @click="showInput = true">
                                            <input type="text" :value="criteria.remark" v-if="showInput" @blur="showInput = false" @change="($e)=> saveAssetClassificationCriteria(criteria.id, $e.target.value)">
                                            <span v-else>{{criteria.remark}}</span>
                                        </td> -->
                                        <!-- <td scope="row" class="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                                          서버시스템
                                        </td>
                                        <td class="px-6 py-4">
                                           업무를 위하여 대/내외적으로 사용되고 있는 운영체계가 설치된 서버 장비
                                        </td>
                                        <td class="px-6 py-4">
                                           
                                        </td> -->
                                        
                                    </tr>
                                    <!-- <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700" v-for="(criteria, i) in criteriaData" :key="i">
                                        
                                       <td scope="row" class="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                                          서버시스템
                                        </td>
                                        <td class="px-6 py-4">
                                           업무를 위하여 대/내외적으로 사용되고 있는 운영체계가 설치된 서버 장비
                                        </td>
                                        <td class="px-6 py-4">
                                           
                                        </td>
                                        
                                    </tr> -->
                                    <!-- <tr class="bg-white dark:bg-gray-800">
                                       <td scope="row" class="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                                          서버시스템
                                        </td>
                                        <td class="px-6 py-4">
                                           업무를 위하여 대/내외적으로 사용되고 있는 운영체계가 설치된 서버 장비
                                        </td>
                                        <td class="px-6 py-4">
                                           
                                        </td>
                                        
                                    </tr> -->
                                </tbody>
                            </table>
                        </div>

                    </div>
                    
                </div>
            </div>
            <div
          class="modal-footer p-t-0 flex flex-shrink-0 items-center justify-center p-4 rounded-b-md"
        ></div>
            </div>
        </div>
    </div>
    </div>
</template>


<script>
import AssetManagementService from "@/services/AssetManagementService";

export default {
  name: 'AssetClassificationCriteria',
//   props : {
//     criteriaData : Array,
//   },
  data(){
    return {
        classificationCriteriaData : [],
        showInput : false,
        inputValue : "",
    }
  },

  created() {
    this.AssetManagementService = new AssetManagementService();
  },
  beforeMount(){
    this.getAssetClassificationCriteria();
  },
  methods : {
    getAssetClassificationCriteria(){
     this.AssetManagementService.assetClassificationCriteria().then(res => {
              console.log("classification-criteria", res)
              this.classificationCriteriaData = res.data.assets_category_list;
     })
    },

    saveAssetClassificationCriteria(id, remark){
        this.AssetManagementService.saveClassificationCriteria(id, remark).then(res => {
                   console.log("save-classification", res)
                   if(res.status == 200){
                      this.getAssetClassificationCriteria();
                   }
        })
        
    }
    }
  
}
</script>


<style lang="scss">
</style>