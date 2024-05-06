<template>
    <div class="modal-overlap big-modal waitingcompanyapproval">
  <div class="modal-dialog modal-dialog-centered relative w-auto pointer-events-none">
    <div class="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
      <div class="modal-header flex flex-shrink-0 items-center justify-between p-4 rounded-t-md">
       
        <button type="button"
          class="btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
          data-bs-dismiss="modal" aria-label="Close"  @click="$emit('close')"></button>
      </div>
      <div class="modal-body system-modal">
        <div class="info-wrap">
        <h4>6. 위험관리 수준 및 관리방안</h4>
        <h5 class="m-t-16"> 》 위험관리 수준 선정 개요</h5>
        <p>"도출된 모든 위험을 통제하는 것은 불가능하므로 조직의 보안 목표 수준 등을 고려하여 보호해야 할 필요성이 있는 위험에 대해 선별적 및  차등적으로 대응하기 위하여 위험평가 결과를 검토하여 회사에서 필요로 하는 위험관리 수준(DoA : Degree of Assurance)을 결정한다.
        비즈니스 수행 시 필수적으로 요구되는 보안성 보장 및 대내∙외적인 보안 요구 사항을 충족하는 수준까지만 위험을 관리하기 위한 위험 관리의 수준을 의미한다.
        이때, 위험관리 수준보다 낮은 수준의 위험은 Acceptable Risk라 하여 위험을 감수하겠다는 것을 의미하며, 위험관리 수준보다 높게 나타난 위험을 Unacceptable Risk라 하여 위험을 관리하기 위한 보호대책을 검토하여 수립하겠다는 것을 의미한다."								
        </p>
        </div>
         <div class="table-wrap">
          <h5> 》 위험평가 결과 요약</h5>
          <div class="overflow-x-auto relative">
              <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                  <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  
                      <tr>
                          <th scope="col" class="white-space">
                            영역
                          </th>
                          <th scope="col" class="white-space">
                              위험도 3
                          </th>
                          <th scope="col" class="white-space">
                              위험도 4
                          </th>
                          <th scope="col" class="white-space">
                             위험도 5
                          </th>
                          <th scope="col" class="white-space">
                             위험도 6
                          </th>
                          <th scope="col" class="white-space">
                             위험도 7
                          </th>
                          <th scope="col" class="white-space">
                             위험도 8
                          </th>
                          <th scope="col" class="white-space">
                             위험도 9
                          </th>
                          <th scope="col" class="white-space">
                             총 위험 개수
                          </th>
                      </tr>
                  </thead>
                  <tbody>
                      <tr class="bg-white border-b dark:border-gray-700">
                          <th class="white-space">
                              관리영역
                          </th>
                          <td class="white-space">
                              1 건
                          </td>
                          <td class="white-space">
                              10 건
                          </td>
                          <td class="white-space">
                             20 건
                          </td>
                          <td class="white-space">
                             30 건
                          </td>
                          <td class="white-space">
                             1 건
                          </td>
                          <td class="white-space">
                            4 건
                          </td>
                          <td class="white-space">
                             5 건
                          </td>
                          <td class="white-space">
                             71 건
                          </td>
                      </tr>
                      <tr class="bg-white border-b dark:border-gray-700">
                         
                          <th class="white-space">
                             기술영역
                          </th>
                          <td class="white-space">
                              20 건
                          </td>
                          <td class="white-space">
                             30 건
                          </td>
                          <td class="white-space">
                             50 건
                          </td>
                          <td class="white-space">
                             200 건
                          </td>
                          <td class="white-space">
                            150 건
                          </td>
                          <td class="white-space">
                            210 건
                          </td>
                          <td class="white-space">
                             40 건
                          </td>
                          <td class="white-space">
                             700 건
                          </td>
                      </tr>                     
                  </tbody>
              </table>
          </div>

         </div>
         <div class="image-wrap m-t-15">
            <img src="@/assets/images/graph.png">
         </div>
         <div class="info-wrap">
        <h5> 》 위험관리 수준 선정 개요</h5>
        <a href="">위험관리 수준(DoA) = 6	</a>
        <p>"발견된 위험의 정도와 가용한 리소스를 고려하여 위험도를 6으로 선정하였음<br>
            - 또한 DoA 이하의 기술보안 위험에 대해서도 보안사고 예방 차원에서 취약점 제거 및 보호대책 적용<br>
            - 실무 관점에서 업무 필요성에 초점을 두어 DoA를 선정하였고, 본 보고서의 CISO 승인으로 DoA가 설정된 것으로 본다."																
        </p>
        </div>
        <div class="info-wrap">
        
        <h5 class="m-t-16">  》 위험관리 수준 선정 개요</h5>
        <p>"본 보고서에서는 위험 식별 및 평가를 통해 DoA를 6으로 선정하였다.<br>
            즉, 위험도가 6 미만인 경우에는 위험을 수용하고 위험도가 6 이상인 경우에 위험경감의 전략 적용을 위해 보호대책을 선정한다.또한, 관리적/기술적 취약성에 대한 위험관리 수준을 위험도 6 이상인 것을 우선적으로 조치하고, 단기간 내에 조치가 가능하다고 판단되는 위험에 대해서는 위험도 6 미만의 항목에 대해서도 조치를 수행한다.<br>
            보호대책 선정 및 단기/중기/장기 조치 가능한 위험에 대한 사항을 정리하여 『정보보호 계획서』를 작성하여 위험을 조치 · 관리한다."																
        </p>
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
  name: 'CalculationStandardmodaltwo',
  
}
</script>

<style lang="scss">
   
</style>