<template>
    <div class="modal-overlap waitingcompanyapproval z-10">
  <div class="modal-dialog modal-dialog-centered relative w-auto pointer-events-none">
    <div class="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
      <div class="modal-header flex flex-shrink-0 items-center justify-between p-4 rounded-t-md">
        <h5 class="text-xl font-medium leading-normal text-gray-800">
        라이선스 목록
        </h5>
        <button type="button" @click="close"
          class="btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
           aria-label="Close"></button>
      </div>
      <div class="modal-body relative">
        <div class="bulletin_modal">
           <div class="flex flex-col">
                    <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div class="py-4 inline-block min-w-full sm:px-6 lg:px-8">
                        <div class="overflow-hidden border-table">
                            <table class="min-w-full text-center">
                            <thead class="bg-gray-50">
                                <tr>
                                
                                <th scope="col" class="justify-center text-sm font-medium text-gray-900 px-6 py-4">
                                   패키지 명
                                </th>
                                <th scope="col" class="justify-center text-sm font-medium text-gray-900 px-6 py-4">
                                    기간
                                </th>
                                <th scope="col" class="justify-center text-sm font-medium text-gray-900 px-6 py-4">
                                    옵션
                                </th>
                               
                                
                                </tr>
                            </thead>
                            <tbody>
                                <tr class="bg-white border-b" v-for="(license, index) in licenseList" :key="index">
                                
                                <td class="text-sm text-gray-900 font-light px-6 py-4 ">
                                    {{ license.license_name}}
                                </td>
                                <td class="text-sm text-gray-900 font-light px-6 py-4 ">
                                    {{ license.license_duration}}
                                </td>
                                <td class="text-sm text-gray-900 font-light px-6 py-4 ">
                                   {{ license.storage_capacity}}
                                </td>
                                
                                </tr>
                            </tbody>
                            </table>
                        </div>
                        </div>
                    </div>
                </div>
        </div>
       </div>
      
    </div>
  </div>
</div>
</template>


<script setup>
// export default {
//   name: 'LicenseList',  
// }

 const props = defineProps(["licenseList"]);
 const emit = defineEmits(["close"]);

 const close = ()=> emit("close");
 
</script>

<style lang="scss">
       
</style>