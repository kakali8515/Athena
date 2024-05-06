<template>

    <div class="modal-overlap waitingcompanyapproval critariamodal">

    <div class="modal-overlap waitingcompanyapproval z-10">

        <div class="modal-dialog modal-dialog-centered relative w-auto pointer-events-none">
            <div class="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
            <div class="modal-header flex flex-shrink-0 items-center justify-between p-4 rounded-t-md">
                <h5 class="text-xl font-medium leading-normal text-gray-800" id="exampleModalScrollableLabel">
                   정보자산 중요도 평가 기준
                </h5>
                <button type="button"
                @click="this.$emit('closeAssetMaterialityAssessmentCriteria')"
                class="btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
                data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body relative">
                
                <div class="dtls">
                    <div class="wrap">
                        <h4>1. 정보자산 중요도 기준</h4>
                         <p>정보자산의 중요도는 기밀성, 무결성, 가용성의 측면에서 각 자산이 보안 위협에 노출되었을 경우 예상되는 잠재적 손실 규모를 반영하여 측정되며, 이를 바탕으로 기밀성, 무결성, 가용성의 침해 시 예상되는 손실에 대하여 정성적인 가치를 부여함 각 등급에 대한 기준요소는 다음과 같음</p>
                    </div>
                    <div class="modal-table">
                        <div class="head border-0">
                            <p>가용성</p>
                        </div>
                        
                        <div class="relative overflow-x-auto ">
                            <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        <th scope="col" class="px-6 py-3">
                                            등급
                                        </th>
                                        <th scope="col" class="px-6 py-3">
                                            Value
                                        </th>
                                        <th scope="col" class="px-6 py-3">
                                            설명
                                        </th>
                                        
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr class="bg-white border-b dark:border-gray-700">
                                        <td scope="row" class="px-6 py-4 font-medium text-gray-900 dark:text-white ">
                                            
                                            H

                                        </td>
                                        <td class="px-6 py-4">
                                            3
                                        </td>
                                        <td class="px-6 py-4">
                                            '- 자산(정보) 변조 시, 업무수행 또는 서비스에 중대한 장애를 유발하거나 조직전체에 중대한 손실을 입히는 경우
                                            - 자산(정보) 변조의 가능성이 높고 변조 시 데이터의 무결성을 검증하기 힘든 경우
                                        </td>
                                        
                                    </tr>
                                    <tr class="bg-white border-b dark:border-gray-700">
                                        <td scope="row" class="px-6 py-4 font-medium text-gray-900 dark:text-white ">
                                            M
                                        </td>
                                        <td class="px-6 py-4">
                                            2
                                        </td>
                                        <td class="px-6 py-4">
                                            '- 자산이 유출되는 경우 조직의 부분적인 손실을 미치는 경우
                                             - 자산소유부서/담당자 이외에 관련부서 등 조직 내부에 국한하여 접근 및 열람이 가능한 정보를 가지고 있는 자산
                                        </td>
                                        
                                    </tr>
                                    <tr class="bg-white">
                                        <td scope="row" class="px-6 py-4 font-medium text-gray-900 dark:text-white ">
                                            L
                                        </td>
                                        <td class="px-6 py-4">
                                            1
                                        </td>
                                        <td class="px-6 py-4">
                                            '- 자산이 유출되어도 관계없거나 손실을 거의 발생시키지 않는 경우
                                             - 외부인이 접근 및 열람이 가능한 정보를 담고 있는 자원
                                        </td>
                                        
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                    </div>
                    <div class="modal-table">
                        <div class="head border-0">
                            <p>가용성</p>
                        </div>
                        
                        <div class="relative overflow-x-auto ">
                            <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        <th scope="col" class="px-6 py-3">
                                            등급
                                        </th>
                                        <th scope="col" class="px-6 py-3">
                                            Value
                                        </th>
                                        <th scope="col" class="px-6 py-3">
                                            설명
                                        </th>
                                        
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr class="bg-white border-b dark:border-gray-700">
                                        <td scope="row" class="px-6 py-4 font-medium text-gray-900 dark:text-white ">
                                            
                                            H

                                        </td>
                                        <td class="px-6 py-4">
                                            3
                                        </td>
                                        <td class="px-6 py-4">
                                            '- 자산(정보) 변조 시, 업무수행 또는 서비스에 중대한 장애를 유발하거나 조직전체에 중대한 손실을 입히는 경우
                                            - 자산(정보) 변조의 가능성이 높고 변조 시 데이터의 무결성을 검증하기 힘든 경우
                                        </td>
                                        
                                    </tr>
                                    <tr class="bg-white border-b dark:border-gray-700">
                                        <td scope="row" class="px-6 py-4 font-medium text-gray-900 dark:text-white ">
                                            M
                                        </td>
                                        <td class="px-6 py-4">
                                            2
                                        </td>
                                        <td class="px-6 py-4">
                                            '- 자산이 유출되는 경우 조직의 부분적인 손실을 미치는 경우
                                             - 자산소유부서/담당자 이외에 관련부서 등 조직 내부에 국한하여 접근 및 열람이 가능한 정보를 가지고 있는 자산
                                        </td>
                                        
                                    </tr>
                                    <tr class="bg-white">
                                        <td scope="row" class="px-6 py-4 font-medium text-gray-900 dark:text-white ">
                                            L
                                        </td>
                                        <td class="px-6 py-4">
                                            1
                                        </td>
                                        <td class="px-6 py-4">
                                            '- 자산이 유출되어도 관계없거나 손실을 거의 발생시키지 않는 경우
                                             - 외부인이 접근 및 열람이 가능한 정보를 담고 있는 자원
                                        </td>
                                        
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                    </div>
                    <div class="modal-table">
                        <div class="head border-0">
                            <p>가용성</p>
                        </div>
                        
                        <div class="relative overflow-x-auto ">
                            <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        <th scope="col" class="px-6 py-3">
                                            등급
                                        </th>
                                        <th scope="col" class="px-6 py-3">
                                            Value
                                        </th>
                                        <th scope="col" class="px-6 py-3">
                                            설명
                                        </th>
                                        
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr class="bg-white border-b dark:border-gray-700">
                                        <td scope="row" class="px-6 py-4 font-medium text-gray-900 dark:text-white ">
                                            
                                            H

                                        </td>
                                        <td class="px-6 py-4">
                                            3
                                        </td>
                                        <td class="px-6 py-4">
                                            '- 자산(정보) 변조 시, 업무수행 또는 서비스에 중대한 장애를 유발하거나 조직전체에 중대한 손실을 입히는 경우
                                            - 자산(정보) 변조의 가능성이 높고 변조 시 데이터의 무결성을 검증하기 힘든 경우
                                        </td>
                                        
                                    </tr>
                                    <tr class="bg-white border-b dark:border-gray-700">
                                        <td scope="row" class="px-6 py-4 font-medium text-gray-900 dark:text-white ">
                                            M
                                        </td>
                                        <td class="px-6 py-4">
                                            2
                                        </td>
                                        <td class="px-6 py-4">
                                            '- 자산이 유출되는 경우 조직의 부분적인 손실을 미치는 경우
                                             - 자산소유부서/담당자 이외에 관련부서 등 조직 내부에 국한하여 접근 및 열람이 가능한 정보를 가지고 있는 자산
                                        </td>
                                        
                                    </tr>
                                    <tr class="bg-white">
                                        <td scope="row" class="px-6 py-4 font-medium text-gray-900 dark:text-white ">
                                            L
                                        </td>
                                        <td class="px-6 py-4">
                                            1
                                        </td>
                                        <td class="px-6 py-4">
                                            '- 자산이 유출되어도 관계없거나 손실을 거의 발생시키지 않는 경우
                                             - 외부인이 접근 및 열람이 가능한 정보를 담고 있는 자원
                                        </td>
                                        
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                    </div>
                    <div class="wrap  bordered m-t-30">
                         <p class="m-t-0">정보자산의 중요도는 기밀성, 무결성, 가용성의 측면에서 각 자산이 보안 위협에 노출되었을 경우 예상되는 잠재적 손실 규모를 반영하여 측정되며, 이를 바탕으로 기밀성, 무결성, 가용성의 침해 시 예상되는 손실에 대하여 정성적인 가치를 부여함 각 등급에 대한 기준요소는 다음과 같음</p>
                    </div>
                    <div class="wrap m-t-30">
                        <h4>2. 정보자산 중요도 평가 방법</h4>
                         <p>정보자산의 중요도는 주요 업무 수행 내용을 기반으로 한 기능을 고려하여 자산의 소유자와 관리자의 의견을 반영하여 등급을 결정함 이러한 등급은 각 항목에서 제시하고 있는 표와 같이 3등급(H, M, L)으로 구분됨</p>
                    </div>
                    <div class="wrap text-center m-t-30">
                        <h5>자산중요도 등급 = 가용성 + 무결성 + 기밀성</h5>
                    </div>
                    <div class="modal-table">
                        <div class="head border-0">
                            <p>정보자산 중요도 평가 등급</p>
                        </div>
                        
                        <div class="relative overflow-x-auto ">
                            <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                <thead class="text-xs border-b text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        <th scope="col" colspan="2" class="px-6 py-3">
                                            기밀성
                                        </th>
                                        <th scope="col" colspan="3"  class="px-6 py-3">
                                            L(1)
                                        </th>
                                        <th scope="col" colspan="3"  class="px-6 py-3">
                                            M(2)
                                        </th>
                                        <th scope="col" colspan="3"  class="px-6 py-3">
                                            H(3)
                                        </th>
                                    </tr>
                                </thead>
                                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        <th scope="col" colspan="2"  class="px-6 py-3">
                                            무결성
                                        </th>
                                        <th scope="col" class="px-6 py-3">
                                            L(1)
                                        </th>
                                        <th scope="col" class="px-6 py-3">
                                            M(2)
                                        </th>
                                        <th scope="col" class="px-6 py-3">
                                            H(3)
                                        </th>
                                        <th scope="col" class="px-6 py-3">
                                            L(1)
                                        </th>
                                        <th scope="col" class="px-6 py-3">
                                            M(2)
                                        </th>
                                        <th scope="col" class="px-6 py-3">
                                            H(3)
                                        </th>
                                        <th scope="col" class="px-6 py-3">
                                            L(1)
                                        </th>
                                        <th scope="col" class="px-6 py-3">
                                            M(2)
                                        </th>
                                        <th scope="col" class="px-6 py-3">
                                            H(3)
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr class="bg-white border-b dark:border-gray-700">
                                        <td scope="row" rowspan="3" class="px-6 py-4 border-r font-medium text-gray-900 dark:text-white ">
                                            가용성
                                        </td>
                                        <td class="px-6 py-4">
                                            
                                            L(1)
                                        </td>
                                        <td class="px-6 py-4">
                                            3
                                        </td>
                                        <td class="px-6 py-4">
                                            4
                                        </td>
                                        <td class="px-6 py-4">
                                            5
                                        </td>
                                        <td class="px-6 py-4">
                                            4
                                        </td>
                                         <td class="px-6 py-4">
                                            5
                                        </td>
                                        <td class="px-6 py-4">
                                            6
                                        </td>
                                        <td class="px-6 py-4">
                                            5
                                        </td>
                                        <td class="px-6 py-4">
                                            6
                                        </td>
                                        <td class="px-6 py-4">
                                            7
                                        </td>
                                    </tr>
                                    <tr class="bg-white border-b dark:border-gray-700">
                                        <!-- <td scope="row" class="px-6 py-4 font-medium text-gray-900 dark:text-white ">
                                            
                                            

                                        </td> -->
                                        <td class="px-6 py-4">
                                            
                                            M(2)
                                        </td>
                                        <td class="px-6 py-4">
                                            4
                                        </td>
                                        <td class="px-6 py-4">
                                            5
                                        </td>
                                        <td class="px-6 py-4">
                                            6
                                        </td>
                                        <td class="px-6 py-4">
                                            5
                                        </td>
                                         <td class="px-6 py-4">
                                            6
                                        </td>
                                        <td class="px-6 py-4">
                                            7
                                        </td>
                                        <td class="px-6 py-4">
                                            6
                                        </td>
                                        <td class="px-6 py-4">
                                            7
                                        </td>
                                        <td class="px-6 py-4">
                                            8
                                        </td>
                                    </tr>
                                    <tr class="bg-white">
                                        <!-- <td scope="row" class="px-6 py-4 font-medium text-gray-900 dark:text-white ">
                                            

                                        </td> -->
                                        <td class="px-6 py-4">
                                            
                                            H(3)
                                        </td>
                                        <td class="px-6 py-4">
                                            5
                                        </td>
                                        <td class="px-6 py-4">
                                            6
                                        </td>
                                        <td class="px-6 py-4">
                                            7
                                        </td>
                                        <td class="px-6 py-4">
                                            6
                                        </td>
                                         <td class="px-6 py-4">
                                            7
                                        </td>
                                        <td class="px-6 py-4">
                                            8
                                        </td>
                                        <td class="px-6 py-4">
                                            7
                                        </td>
                                        <td class="px-6 py-4">
                                            8
                                        </td>
                                        <td class="px-6 py-4">
                                            9
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                    </div>
                    <div class="modal-table">
                        <div class="head border-0">
                            <p>정보자산 중요도</p>
                        </div>
                        
                        <div class="relative overflow-x-auto ">
                            <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        <th scope="col" class="px-6 py-3">
                                            구분 
                                        </th>
                                        <th scope="col" class="px-6 py-3">
                                            등급 
                                        </th>
                                        <th scope="col" class="px-6 py-3">
                                            Value 
                                        </th>
                                        <th scope="col" class="px-6 py-3">
                                            평가 값 범위
                                        </th>
                                        <th scope="col" class="px-6 py-3">
                                           내용
                                        </th>
                                        <th scope="col" class="px-6 py-3">
                                            비고(문서 분류)
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr class="bg-white border-b dark:border-gray-700">
                                        <td scope="row" rowspan="3" class="border-r px-6 py-4 font-medium text-gray-900 dark:text-white ">
                                          정보자산 중요도
                                        </td>
                                        <td class="px-6 py-4">
                                            H
                                        </td>
                                        <td class="px-6 py-4">
                                            3
                                        </td>
                                        <td class="px-6 py-4">
                                            8~9점
                                        </td>
                                        <td class="px-6 py-4">
                                            비즈니스 수행에 필요한 핵심자산
                                        </td>
                                        <td class="px-6 py-4">
                                           기밀(Secret)
                                        </td>
                                        
                                    </tr>
                                    <tr class="bg-white border-b dark:border-gray-700">
                                        <!-- <td scope="row" class="px-6 py-4 font-medium text-gray-900 dark:text-white ">
                                          
                                        </td> -->
                                        <td class="px-6 py-4">
                                            M
                                        </td>
                                        <td class="px-6 py-4">
                                            2
                                        </td>
                                        <td class="px-6 py-4">
                                           5~7점
                                        </td>
                                        <td class="px-6 py-4">
                                            비즈니스 수행에 영향을 주는 주요자산
                                        </td>
                                        <td class="px-6 py-4">
                                            대외비(Confidential)
                                        </td>
                                        
                                    </tr>
                                    <tr class="bg-white">
                                        <!-- <td scope="row"  class="px-6 py-4 font-medium text-gray-900 dark:text-white ">
                                          
                                        </td> -->
                                        <td class="px-6 py-4">
                                            L
                                        </td>
                                        <td class="px-6 py-4">
                                            1
                                        </td>
                                        <td class="px-6 py-4">
                                            3~4점
                                        </td>
                                        <td class="px-6 py-4">
                                            핵심자산과 주요자산을 지원하는 일반자산
                                        </td>
                                        <td class="px-6 py-4">
                                            일반(Unclassified)
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
  name: 'AssetMaterialityAssessmentCriteria',
}
</script>


<style lang="scss">
   
</style>