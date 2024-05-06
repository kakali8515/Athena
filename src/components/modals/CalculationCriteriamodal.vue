<template>
    <div class="modal-overlap big-modal waitingcompanyapproval">
  <div class="modal-dialog modal-dialog-centered relative w-auto pointer-events-none">
    <div class="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
      <div class="modal-header flex flex-shrink-0 items-center justify-between p-4 rounded-t-md">
       
        <button type="button"
          class="btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
          data-bs-dismiss="modal" aria-label="Close" @click="$emit('close')"></button>
      </div>
      <div class="modal-body system-modal">
        <div class="list-wrap">
            <ul>
                <li>시급성 : 정보보호대책 이행 시기</li>
                <li>구현 비용 : 정보보호대책 이행 시 필요한 예상</li>
                <li>구현 난이도 : 정보보호대책 이행 시 난이도(용이성)</li>
            </ul>
        </div>
         <div class="table-wrap">
          <div class="overflow-x-auto relative modal-bordered-table">
              <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                  <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                      <tr>
                          <th scope="col" class="white-space">
                            기준
                          </th>
                          <th scope="col" class="white-space">
                              시급성
                          </th>
                          <th scope="col" class="white-space">
                              구현 비용
                          </th>
                          <th scope="col" class="white-space">
                              기준
                          </th>
                      </tr>
                  </thead>
                  <tbody>
                      <tr class="bg-white border-b  ">
                          <td class="white-space">
                              5
                          </td>
                          <td class="white-space">
                             취약점이 매우 심각하여 긴급히 조치 필요<br>
                            [위험도 9, 8 : ‘매우 높음(5)’
                          </td>
                          <td class="white-space">
                              3비용 없이 구현 가능<br>
                              [‘매우 낮음(5)’으로 선택]
                          </td>
                          <td class="white-space">
                             담당 부서에서 자체적으로 구현 가능<br>
                                [‘매우 낮음(5)’으로 선택]
                          </td>
                      </tr>
                      <tr class="bg-white border-b  ">
                         <td class="white-space">
                              4
                          </td>
                          <td class="white-space">
                             취약점이 심각하여 단기적으로 보호대책 수립 적용 필요<br>
                            [위험도 7 : ‘높음(4)’
                          </td>
                          <td class="white-space">
                            1천만원 이하의 비용으로 구현 가능<br>
                            [‘낮음(4)’으로 선택]
                          </td>
                          <td class="white-space">
                             담당 부서 외 타 부서와의 협조를 통해 구현 가능<br>
                                [‘낮음(4)’으로 선택]
                          </td>
                      </tr>
                      <tr class="bg-white border-b  ">
                          <td class="white-space">
                              3
                          </td>
                          <td class="white-space">
                            취약점이 심각도가 보통으로 보호대책 수립 적용 필요<br>
                            [위험도 6 : ‘보통(3)’
                          </td>
                          <td class="white-space">
                            1천만원 ~ 5천만원 이하의 비용으로 구현 가능<br>
                            [‘보통(3)’으로 선택]
                          </td>
                          <td class="white-space">
                             외주업체와의 협조를 통해 구현 가능<br>
                            [‘보통(3)’으로 선택]
                          </td>
                      </tr>
                      <tr class="bg-white border-b  ">
                          <td class="white-space" >
                              2
                          </td>
                          <td class="white-space">
                            취약점이 심각도가 낮으나 장기적인 보호 대책 수립 적용 필요<br>
                            [위험도 5 : ‘낮음(2)’
                          </td>
                          <td class="white-space">
                            5천만원 ~ 1억 이하의 비용으로 구현 가능<br>
                            [‘높음(2)’으로 선택]
                          </td>
                          <td class="white-space">
                             충분한 검증 없을 경우 문제 발생 가능<br>
                            [‘높음(2)’으로 선택]
                          </td>
                      </tr>
                      <tr class="bg-white border-b  ">
                          <td class="white-space" >
                              1
                          </td>
                          <td class="white-space">
                            취약점이 심각도가 현저하게 낮아 대책을 수립하지 않을 정도<br>
                            [위험도 3,4 : ‘매우 낮음(1)’
                          </td>
                          <td class="white-space">
                           1억원을 초과하는 비용으로 구현 가능<br>
                            [‘매우 높음(1)’으로 선택]
                          </td>
                          <td class="white-space">
                            충분한 검증 없을 경우 상당한 문제 발생 가능<br>
                            [‘매우 높음(1)’으로 선택]
                          </td>
                      </tr>
                     
                  </tbody>
              </table>
          </div>

         </div>
         <div class="table-wrap m-t-15">
         <h4>위험도 = 자산 등급 + 위험 등급 + 취약성 등급</h4>
          <div class="overflow-x-auto relative modal-bordered-table">
              <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                  <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                      <tr>
                          <th scope="col" class="white-space">
                            구분
                          </th>
                          <th scope="col" class="white-space">
                            우선순위
                          </th>
                          <th scope="col" class="white-space">
                            내용
                          </th>
                          
                      </tr>
                  </thead>
                  <tbody>
                      <tr class="bg-white border-b  ">
                          <td class="white-space">
                            단기
                          </td>
                          <td class="white-space">
                             12 ~ 15
                          </td>
                          <td class="white-space">
                              3개월 이내에 조치가 가능한 보호대책<br>
                              <ul>
                                <li>•시급하게 제거되어야 할 보안 취약성 및 위협과 관련한 과제</li>
                                <li>•보유 자원(인력, 솔루션)을 투입하여 바로 해결 가능한 과제</li>
                                <li>•조기 추진을 통하여 단기간에 보안효과를 기대할 수 있는 과제</li>
                              </ul>
                          </td>
                          
                      </tr>
                      <tr class="bg-white border-b  ">
                          <td class="white-space">
                            중기
                          </td>
                          <td class="white-space">
                             7 ~ 11
                          </td>
                          <td class="white-space">
                              6개월 이내에 조치가 가능한 보호대책(단기 이후)<br>
                              <ul>
                                <li>•전사 수준에서 문제로 파악된 보안 취약점/위험 요소의 제거를 위한 과제</li>
                                <li>• 과제 수행 대상 및 범위가 넓고 보호대책의 구축 및 적용을 위해 일정 수준 이상의 준비 기간과 자원 투입이 요구되는 과제</li>
                              </ul>
                          </td>
                          </tr>
                      <tr class="bg-white border-b  ">
                          <td class="white-space">
                              장기
                          </td>
                          <td class="white-space">
                            3 ~ 6
                          </td>
                          <td class="white-space">
                           1년 이상의 기간이 소요되는 보호대책(중기 이후)<br>
                           <ul>
                           <li>•중/장기적으로 전사 정보보호 수준을 향상시키기 위해 전략적이고 단계적으로 추진되어야 하는 과제</li>
                           <li>•위험 발생가능성이 적고 위험발생으로 인한 피해 심각성이 낮은 보안 취약점과 관련한 과제</li>
                           </ul>
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
  name: 'CalculationCriteriamodal',
  
}
</script>

<style lang="scss">
   
</style>