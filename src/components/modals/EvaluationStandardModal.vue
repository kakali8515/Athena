<template>
    <div class="modal-overlap waitingcompanyapproval">
  <div class="modal-dialog modal-dialog-centered relative w-auto pointer-events-none">
    <div class="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
      <div class="modal-header flex flex-shrink-0 items-center justify-between p-4 rounded-t-md">
       <h5 class="text-xl font-medium leading-normal text-gray-800">위험도 산정기준</h5>
        <button type="button"
          class="btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
          data-bs-dismiss="modal" aria-label="Close" @click="$emit('close')"></button>
      </div>
      <div class="modal-body system-modal">
         <div class="table-wrap">
         <h4>자산 등급</h4>
          <div class="overflow-x-auto relative modal-bordered-table">
              <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                  <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                      <tr>
                          <th scope="col" class="white-space">
                            관리적 영역
                          </th>
                          <th scope="col" class="white-space">
                              기술적 영역
                          </th>
                          
                      </tr>
                  </thead>
                  <tbody>
                      <tr class="bg-white border-b ">
                          <td class="white-space">
                             체크리스트 기반 통제항목의 중요도 동급
                          </td>
                          <td class="white-space">
                            개별 정보자산의 보안등급
                          </td>
                          
                      </tr>
                     
                  </tbody>
              </table>
          </div>

         </div>
         <div class="table-wrap m-t-15">
         <h4>취약성 등급</h4>
          <div class="overflow-x-auto relative modal-bordered-table">
              <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                  <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                      <tr>
                          <th scope="col" class="white-space">
                           취약성 등급
                          </th>
                          <th scope="col" class="white-space">
                            관리적 영역
                          </th>
                          <th scope="col" class="white-space">
                            기술적 영역
                          </th>
                      </tr>
                  </thead>
                  <tbody>
                      <tr class="bg-white border-b ">
                          <td class="white-space">
                            H (3)
                          </td>
                          <td class="white-space">
                             평가점수 : 0 ~ 1 점 (보안통제 취약
                          </td>
                          <td class="white-space">
                              점검항목 중요도 : 상
                          </td>
                          
                      </tr>
                      <tr class="bg-white border-b ">
                          <td class="white-space">
                            M (2)
                          </td>
                          <td class="white-space">
                             평가점수 : 2 ~ 3 점 (보안통제 미흡)
                          </td>
                          <td class="white-space">
                              점검항목 중요도 :중
                          </td>
                          </tr>
                      <tr class="bg-white border-b ">
                          <td class="white-space">
                            L (1)
                          </td>
                          <td class="white-space">
                           평가점수 : 3 ~ 4 점 (보안통제 일부 미흡)
                          </td>
                          <td class="white-space">
                           점검항목 중요도 : 하
                          </td>
                      </tr>                    
                  </tbody>
              </table>
          </div>

         </div>
         <div class="table-wrap m-t-15">
         <h4>위험도 = 자산 등급 + 위험 등급 + 취약성 등급</h4>
          
         </div>
          
      </div>
      <div
        class="modal-footer flex flex-shrink-0 items-center justify-center p-4 rounded-b-md">
        
      </div>
    </div>
  </div>
</div>
</template>


<script>
export default {
  name: 'EvaluationStandardModal',
  
}
</script>

<style lang="scss">
   
</style>