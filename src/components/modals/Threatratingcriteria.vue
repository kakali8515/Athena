<template>

    <div class="modal-overlap waitingcompanyapproval threatmodal">

    <div class="modal-overlap waitingcompanyapproval z-10">

        <div class="modal-dialog modal-dialog-centered relative w-auto pointer-events-none">
            <div class="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
            <div class="modal-header flex flex-shrink-0 items-center justify-between p-4 rounded-t-md">
                <h5 class="text-xl font-medium leading-normal text-gray-800" id="exampleModalScrollableLabel">
                   위협 등급 평가 기준
                </h5>
                <button type="button"
                @click="this.$emit('closeAssetMaterialityAssessmentCriteria')"
                class="btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
                data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body relative">
                
                <div class="dtls">
                    <div class="wrap">
                        <h4>자산 등급</h4>
                    </div>
                    <div class="modal-table">                       
                        <div class="relative overflow-x-auto ">
                            <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        <th scope="col" class="px-6 py-3">
                                            위협 등급
                                        </th>
                                        <th scope="col" class="px-6 py-3">
                                            등급 평가 기준
                                        </th>
                                       
                                        
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr class="bg-white border-b dark:border-gray-700">
                                        <td scope="row" class="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                                         H (3)
                                        </td>
                                        <td class="px-6 py-4">
                                         가능성 높음 (70% 정도의 확률) / 위협의 영향 높음
                                        </td>
                                    </tr>
                                    <tr class="bg-white border-b dark:border-gray-700">
                                        <td scope="row" class="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                                            M (2)
                                        </td>
                                        <td class="px-6 py-4">
                                           가능성 높음 (40% 정도의 확률) / 위협의 영향 보통
                                        </td>
                                    </tr>
                                    <tr class="bg-white">
                                        <td scope="row" class="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                                            L (1)
                                        </td>
                                        <td class="px-6 py-4">
                                           가능성 높음 (10% 정도의 확률) / 위협의 영향 낮음
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                    </div>
                    
                    
                </div>
            </div>
            <div
                class="modal-footer flex flex-shrink-0 items-center justify-center p-4 rounded-b-md">
                <!-- <button type="button"
                class="full_button bordered px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">
                Update
                </button>
                <button type="button"
                class="full_button blue_bordered px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out" style="font-size:18px;">
                Cancel
                </button> -->
                
            </div>
            </div>
        </div>
        </div>
        </div>
</template>


<script>
export default {
  name: 'Threatratingcriteria',
}
</script>


<style lang="scss">
   
</style>