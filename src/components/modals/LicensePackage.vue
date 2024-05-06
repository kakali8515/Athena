<template>
    <div class="modal-overlap waitingcompanyapproval">
  <div class="modal-dialog modal-dialog-centered relative w-auto pointer-events-none">
    <div class="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
      <div class="modal-header flex flex-shrink-0 items-center justify-between p-4 rounded-t-md">
        <h5 class="text-xl font-medium leading-normal text-gray-800">
         라이선스 업데이트
        </h5>
        <button type="button"
          class="btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
           aria-label="Close"></button>
      </div>
      <div class="modal-body relative">
         <div class="license_info">
            <div class="license_wrap">
                <p>사용하는 라이선스</p>
                <div class="form_wrap">
                    <input type="text" placeholder="라이선스명">
                    <div class="flex items-center radio_wrap">
                        <input checked id="default-radio-2" type="radio" value="" name="default-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                        <label for="default-radio-2" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">라이선스 연장</label>
                    </div>
                </div>
                <div class="form_wrap change_wrap">
                    <div class="flex items-center radio_wrap">
                        <input id="default-radio-3" type="radio" value="" name="default-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                        <label for="default-radio-3" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Change the license package</label>
                    </div>
                    <div class="flex items-center radio_wrap">
                        <input id="default-radio-4" type="radio" value="" name="default-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                        <label for="default-radio-4" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"> 옵션 추가</label>
                    </div>
                </div>
            </div>
            <div class="license_wrap package_wrap">
                <p>License package</p>
                <div class="form_wrap">
                    <select>
                        <Option>To Choose</Option>
                        <Option>Option 1</Option>
                        <Option>Option 2</Option>
                        <Option>Option 3</Option>
                    </select>
                    <div class="flex items-center radio_wrap">
                        <input checked id="default-radio-2" type="radio" value="" name="default-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                        <label for="default-radio-2" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"> 옵션 추가</label>
                    </div>
                </div>
            </div>
            <div class="license_wrap package_wrap storage">
                <p>스토리지 옵션</p>
                <div class="form_wrap">
                    <select>
                        <Option>To Choose</Option>
                        <Option>Option 1</Option>
                        <Option>Option 2</Option>
                        <Option>Option 3</Option>
                    </select>
                </div>
            </div>
         </div>
          
      </div>
      <div
        class="modal-footer  flex flex-shrink-0 items-center justify-center p-4 rounded-b-md">
        
        <button type="button"
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
  name: 'LicensePackage',
  
}
</script>

<style lang="scss">
       
</style>