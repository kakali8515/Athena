<template>
    <div class="modal waitingcompanyapproval">
  <div class="modal-dialog modal-dialog-centered relative w-auto pointer-events-none">
    <div class="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
      <div class="modal-header flex flex-shrink-0 items-center justify-between p-4 rounded-t-md">
        <h5 class="text-xl font-medium leading-normal text-gray-800">
         License Expiration
        </h5>
        <button type="button"
          class="btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
           aria-label="Close"></button>
      </div>
      <div class="modal-body relative">
         <div class="license_info">
             <h4>AAtelecom License Expiration D-3</h4>
             <p>License Expiration 29It is the other day. If you wish to extend the period, please contact customer service@</p>

             <p>When the license expires, up to <b>30backup for days</b> It is possible and you cannot get a backup after that@ Pay attention to the contents and before termination Be sure to back up please do.</p>
         </div>
          
      </div>
      <div
        class="modal-footer lisence-wrap flex flex-shrink-0 items-center justify-center p-4 rounded-b-md">
        <button type="button"
          class="gray_borderd px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">
            data backup
        </button>
        <button type="button"
          class="blue_bordered px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">
            license extension
        </button>
        <button type="button"
          class="blue_solid px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">
            Confirm
        </button>
      </div>
    </div>
  </div>
</div>
</template>


<script>
export default {
  name: 'LicenseExpirationD3',
  
}
</script>

<style lang="scss">
      
</style>