<template>
    <div class="modal-overlap waitingcompanyapproval">
  <div class="modal-dialog modal-dialog-centered relative w-auto pointer-events-none">
    <div class="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
      <div class="modal-header flex flex-shrink-0 items-center justify-between p-4 rounded-t-md">
       
        <button type="button"
          class="btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
          data-bs-dismiss="modal" aria-label="Close"  @click="$emit('close')"></button>
      </div>
      <div class="modal-body system-modal">
         <div class="table-wrap">
          
          <div class="overflow-x-auto relative modal-bordered-table">
              <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                  <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:text-gray-400">
                    <tr>
                        <th colspan="5" scope="col" class="white-space">정보자산 중요도</th>
                    </tr>
                      <tr>
                          <th scope="col" class="white-space">
                            구분
                          </th>
                          <th scope="col" class="white-space">
                              등급
                          </th>
                          <th scope="col" class="white-space">
                              Value
                          </th>
                          <th scope="col" class="white-space">
                              평가 값 범위
                          </th>
                          <th scope="col" class="white-space">
                              내용
                          </th>
                      </tr>
                  </thead>
                  <tbody>
                      <tr class="bg-white border-b dark:border-gray-700">
                          <td class="white-space" rowspan="3">
                              정보자산 중요도)
                          </td>
                          <td class="white-space">
                              H
                          </td>
                          <td class="white-space">
                              3
                          </td>
                          <td class="white-space">
                             8~9점
                          </td>
                          <td class="white-space">
                             비즈니스 수행에 필요한 핵심자산
                          </td>
                      </tr>
                      <tr class="bg-white border-b dark:border-gray-700">
                         
                          <td class="white-space">
                              M
                          </td>
                          <td class="white-space">
                              2
                          </td>
                          <td class="white-space">
                             5~7점
                          </td>
                          <td class="white-space">
                             비즈니스 수행에 영향을 주는 주요자산
                          </td>
                      </tr>
                      <tr class="bg-white border-b dark:border-gray-700">
                          
                          <td class="white-space">
                              L
                          </td>
                          <td class="white-space">
                             1
                          </td>
                          <td class="white-space">
                            3~4점
                          </td>
                          <td class="white-space">
                             핵심자산과 주요자산을 지원하는 일반자산
                          </td>
                      </tr>
                     
                  </tbody>
              </table>
          </div>

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
  name: 'CalculationStandardmodal',
  
}
</script>

<style lang="scss">
   
</style>