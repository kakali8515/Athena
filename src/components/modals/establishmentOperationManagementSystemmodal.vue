<template>
    <div class="modal-overlap waitingcompanyapproval evolutionmodal">
  <div class="modal-dialog modal-dialog-centered relative w-auto pointer-events-none">
    <div class="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
      <div class="modal-header flex flex-shrink-0 items-center justify-between p-4 rounded-t-md">
        <h5 class="text-xl font-medium leading-normal text-gray-800" id="exampleModalScrollableLabel">
           평가기준
        </h5>
        <button type="button"
          class="btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
          data-bs-dismiss="modal" aria-label="Close" @click="$emit('close')"></button>
      </div>
      <div class="modal-body system-modal">
         <div class="table-wrap">
          <h4>정보보호 관리체계 수준 평가 기준</h4>
          <div class="overflow-x-auto relative">
              <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                  <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                      <tr>
                          <th scope="col" class="white-space">
                             준수도
                          </th>
                          <th scope="col" class="white-space">
                              % 환산
                          </th>
                          <th scope="col" colspan="2" class="white-space">
                              의미
                          </th>
                          <th scope="col" class="white-space">
                              기준
                          </th>
                      </tr>
                  </thead>
                  <tbody>
                      <tr class="bg-white border-b  dark:border-gray-700">
                          <td class="white-space">
                              5
                          </td>
                          <td class="white-space">
                              100%
                          </td>
                          <td class="white-space">
                              Perfectly Yes
                          </td>
                          <td class="white-space">
                             완전하게 준수되고 있음
                          </td>
                          <td class="white-space">
                             문서화, 모두 이행(개선)
                          </td>
                      </tr>
                      <tr class="bg-white border-b  dark:border-gray-700">
                          <td class="white-space">
                              4
                          </td>
                          <td class="white-space">
                              80%
                          </td>
                          <td class="white-space">
                              Perfectly Yes
                          </td>
                          <td class="white-space">
                             완전하게 준수되고 있음
                          </td>
                          <td class="white-space">
                             문서화, 대부분 이행(일부미흡) / 문서화(일부미흡), 전체적용
                          </td>
                      </tr>
                      <tr class="bg-white border-b  dark:border-gray-700">
                          <td class="white-space">
                              3
                          </td>
                          <td class="white-space">
                              60%
                          </td>
                          <td class="white-space">
                              Partly Yes
                          </td>
                          <td class="white-space">
                             부분적으로 준수되고 있음
                          </td>
                          <td class="white-space">
                             문서화, 일부적용 / 문서 없이 전체적용
                          </td>
                      </tr>
                      <tr class="bg-white border-b  dark:border-gray-700">
                          <td class="white-space">
                              2
                          </td>
                          <td class="white-space">
                              40%
                          </td>
                          <td class="white-space">
                              Slightly Yes
                          </td>
                          <td class="white-space">
                             아주 미약하게 준수되고 있음
                          </td>
                          <td class="white-space">
                             문서화, 미준수 / 문서 없이 일부적용
                          </td>
                      </tr>
                      <tr class="bg-white border-b  dark:border-gray-700">
                          <td class="white-space">
                              1
                          </td>
                          <td class="white-space">
                              20%
                          </td>
                          <td class="white-space">
                               Plan Yes
                          </td>
                          <td class="white-space">
                             준수를 위한 계획이 있음
                          </td>
                          <td class="white-space">
                            계획 있음, 미준수
                          </td>
                      </tr>
                      <tr class="bg-white border-b  dark:border-gray-700">
                          <td class="white-space">
                              0
                          </td>
                          <td class="white-space">
                              0%
                          </td>
                          <td class="white-space">
                              No
                          </td>
                          <td class="white-space">
                             준수되고 있지 않음
                          </td>
                          <td class="white-space">
                             문서 없음, 미준수
                          </td>
                      </tr>
                      <tr class="bg-white border-b  dark:border-gray-700">
                          <td class="white-space">
                              N/A
                          </td>
                          <td class="white-space">
                              -
                          </td>
                          <td class="white-space">
                              Not Applicable
                          </td>
                          <td class="white-space">
                             해당사항 없음
                          </td>
                          <td class="white-space">
                             이행여부가 불필요한 경우
                          </td>
                      </tr>
                  </tbody>
              </table>
          </div>

         </div>
         <div class="image-wrap">
          <h4>정보보호 관리체계 수준 산정 방법</h4>
          <img src="@/assets/images/modalimg.jpg" />
         </div>
         <div class="table-wrap">
          <h4>정보보호 관리체계 수준 평가 기준</h4>
          <div class="overflow-x-auto relative">
              <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                  <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                      <tr>
                          <th scope="col" class="white-space">
                             수준
                          </th>
                          <th scope="col" class="white-space">
                              준수도	
                          </th>
                          <th scope="col" class="white-space">
                              기준
                          </th>
                          
                      </tr>
                  </thead>
                  <tbody>
                      <tr class="bg-white border-b  dark:border-gray-700">
                          <th class="white-space">
                              우수
                          </th>
                          <td class="white-space">
                              90~100
                          </td>
                          <td class="white-space">
                              문서화된 정책과 지침을 통한 체계적인 업무수행 및 증적관리가 이루어지며 점진적인 개선도 이루어지고 있음<br>
                              지속적인 측정과 관리를 통하여 정보보호 통제가 구현되어 실행되고 있으며 새로운 위험도 대응할 수 있는 단계로서 매우 양호한 수준
                          </td>
                          
                      </tr>
                      <tr class="bg-white border-b  dark:border-gray-700">
                          <th class="white-space">
                              양호
                          </th>
                          <td class="white-space">
                              80~89
                          </td>
                          <td class="white-space">
                              대부분의 정책과 지침이 문서화되어 있으며 업무 수행시 대부분 적용하고 있음<br>
                              보안위험을 측정하고 관리하며, 보안대책의 계획 및 이행을 지속화 할 수 있으며, 부분적인 개선이 필요한 수준
                          </td>
                          
                      </tr>
                      <tr class="bg-white border-b  dark:border-gray-700">
                          <th class="white-space">
                              보통
                          </th>
                          <td class="white-space">
                              70~79
                          </td>
                          <td class="white-space">
                              정책 및 지침의 문서화가 대체로 이루어져 있으나 업무 적용에 일관성이 부족함<br>
                              기본적인 기준을 가지고 핵심 보안위험에 대응하고 있으며, 다양한 개선이 필요한 수준
                          </td>
                          
                      </tr>
                      <tr class="bg-white border-b  dark:border-gray-700">
                          <th class="white-space">
                              미흡
                          </th>
                          <td class="white-space">
                              50~69	
                          </td>
                          <td class="white-space">
                              정책 및 지침의 문서화가 일부만 이루어지고 있으며 업무수행에도 적절히 반영되지 못하고 있음<br>
                              보안위험에 일부 대응하나 명확한 기준 없이 임의대로 대응하여 전체적인 개선이 필요한 수준
                          </td>
                          
                      </tr>
                      <tr class="bg-white border-b  dark:border-gray-700">
                          <th class="white-space">
                              취약
                          </th>
                          <td class="white-space">
                              0~49	
                          </td>
                          <td class="white-space">
                              정책 및 지침의 문서화가 거의 이루어져 있지 않으며 업무 수행에도 거의 반영되지 못하고 있음<br>
                              정보보호 통제가 거의 이루어지지 않아 전혀 보안위험에 대응하지 않는 수준
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
  name: 'establishmentOperationManagementSystemmodal',
  
}
</script>

<style lang="scss">
   
</style>