<template>
    <div class="info_protection">
         <div class="breadcrumb">
           <p><a href="#">Home </a><span>></span> Diagnosis management</p>
       </div>
       <div class="heading flex justify-between align-end">
           <h4>Establishment and operation of management system</h4>
       </div>
       <div class="policy_setting_wrap no-padding">
           <div class="datatable_head flex justify-between">
               <div class="oneside flex justify-start">
                   <span>Control area</span>
                   <select class="small_select">
                       <option>All</option>
                       <option>All</option>
                       <option>All</option>
                   </select>
                   <div class="datepicker flex justify-between">
                       <input type="date"
                            class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                            placeholder="Select a date" />
                       <button type="button">Lookup</button>
                   </div>
               </div>
               <div class="oneside flex justify-end">
                   <button type="button">Evaluation standard</button>
               </div>
           </div>
       </div>
       <div class="tab-content">
                <div class="flex flex-col">
                    <div class="overflow-x-auto protection_table">
                        <div class="inline-block min-w-full">
                        <div class="overflow-hidden">
                            <table class="min-w-full text-center">
                                <thead class="bg-gray-50">
                                    <tr>
                                    <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4">
                                        Item number <img src="@/assets/icon/DownSquare.svg">
                                    </th>
                                    <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4">
                                        Check list <img src="@/assets/icon/DownSquare.svg">
                                    </th>
                                    <th scope="col" class="extra_width text-sm font-medium text-gray-900 px-6 py-4">
                                        Previous status<img src="@/assets/icon/DownSquare.svg">
                                    </th>
                                    <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4">
                                       Previous score<img src="@/assets/icon/DownSquare.svg">
                                    </th>
                                    <th scope="col" class="extra_width text-sm font-medium text-gray-900 px-6 py-4">
                                       Current status<img src="@/assets/icon/DownSquare.svg">
                                    </th>
                                    <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4">
                                        Now score <img src="@/assets/icon/DownSquare.svg">
                                    </th>
                                    
                                    
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr class="bg-white border-b">
                                    
                                    <td class=" text-sm text-gray-900 font-light px-6 py-4 ">
                                        1.1.1.1
                                    </td>
                                    <td class="text-sm text-gray-900 font-light px-6 py-4 ">
                                       Ultrices urna varius tempus vestibulum.
                                    </td>
                                    <td class="extra_width text-sm text-gray-900 font-light px-6 py-4 ">
                                       Augue phasellus arcu fermentum tristique ultricies aliquam.
                                    </td>
                                     <td class=" text-sm text-gray-900 font-light px-6 py-4 ">
                                       4
                                    </td>
                                     <td class="extra_width text-sm text-gray-900 font-light px-6 py-4 ">
                                       
                                    </td>
                                    <td class="text-sm text-gray-900 font-light px-6 py-4 ">
                                         <select>
                                            <option>5</option>
                                            <option>6</option>
                                            <option>7</option>
                                        </select>
                                    </td>
                                    
                                    
                                    </tr>
                                   <tr class="bg-white border-b">
                                    
                                    <td class=" text-sm text-gray-900 font-light px-6 py-4 ">
                                        1.1.1.1
                                    </td>
                                    <td class="text-sm text-gray-900 font-light px-6 py-4 ">
                                       Ultrices urna varius tempus vestibulum.
                                    </td>
                                    <td class="extra_width text-sm text-gray-900 font-light px-6 py-4 ">
                                       Augue phasellus arcu fermentum tristique ultricies aliquam.
                                    </td>
                                     <td class=" text-sm text-gray-900 font-light px-6 py-4 ">
                                       4
                                    </td>
                                     <td class="extra_width text-sm text-gray-900 font-light px-6 py-4 ">
                                       
                                    </td>
                                    <td class="text-sm text-gray-900 font-light px-6 py-4 ">
                                         <select>
                                            <option>5</option>
                                            <option>6</option>
                                            <option>7</option>
                                        </select>
                                    </td>
                                    
                                    
                                    </tr>
                                     <tr class="bg-white border-b">
                                    
                                    <td class=" text-sm text-gray-900 font-light px-6 py-4 ">
                                        1.1.1.1
                                    </td>
                                    <td class="text-sm text-gray-900 font-light px-6 py-4 ">
                                       Ultrices urna varius tempus vestibulum.
                                    </td>
                                    <td class="extra_width text-sm text-gray-900 font-light px-6 py-4 ">
                                       Augue phasellus arcu fermentum tristique ultricies aliquam.
                                    </td>
                                     <td class=" text-sm text-gray-900 font-light px-6 py-4 ">
                                       4
                                    </td>
                                     <td class="extra_width text-sm text-gray-900 font-light px-6 py-4 ">
                                       
                                    </td>
                                    <td class="text-sm text-gray-900 font-light px-6 py-4 ">
                                         <select>
                                            <option>5</option>
                                            <option>6</option>
                                            <option>7</option>
                                        </select>
                                    </td>
                                    
                                    
                                    </tr>
                                    <tr class="bg-white border-b">
                                    
                                    <td class=" text-sm text-gray-900 font-light px-6 py-4 ">
                                        1.1.1.1
                                    </td>
                                    <td class="text-sm text-gray-900 font-light px-6 py-4 ">
                                       Ultrices urna varius tempus vestibulum.
                                    </td>
                                    <td class="extra_width text-sm text-gray-900 font-light px-6 py-4 ">
                                       Augue phasellus arcu fermentum tristique ultricies aliquam.
                                    </td>
                                     <td class=" text-sm text-gray-900 font-light px-6 py-4 ">
                                       4
                                    </td>
                                     <td class="extra_width text-sm text-gray-900 font-light px-6 py-4 ">
                                       
                                    </td>
                                    <td class="text-sm text-gray-900 font-light px-6 py-4 ">
                                         <select>
                                            <option>5</option>
                                            <option>6</option>
                                            <option>7</option>
                                        </select>
                                    </td>
                                    
                                    
                                    </tr>
                                     <tr class="bg-white border-b">
                                    
                                    <td class=" text-sm text-gray-900 font-light px-6 py-4 ">
                                        1.1.1.1
                                    </td>
                                    <td class="text-sm text-gray-900 font-light px-6 py-4 ">
                                       Ultrices urna varius tempus vestibulum.
                                    </td>
                                    <td class="extra_width text-sm text-gray-900 font-light px-6 py-4 ">
                                       Augue phasellus arcu fermentum tristique ultricies aliquam.
                                    </td>
                                     <td class=" text-sm text-gray-900 font-light px-6 py-4 ">
                                       4
                                    </td>
                                     <td class="extra_width text-sm text-gray-900 font-light px-6 py-4 ">
                                       
                                    </td>
                                    <td class="text-sm text-gray-900 font-light px-6 py-4 ">
                                         <select>
                                            <option>5</option>
                                            <option>6</option>
                                            <option>7</option>
                                        </select>
                                    </td>
                                    
                                    
                                    </tr>
                                     <tr class="bg-white border-b">
                                    
                                    <td class=" text-sm text-gray-900 font-light px-6 py-4 ">
                                        1.1.1.1
                                    </td>
                                    <td class="text-sm text-gray-900 font-light px-6 py-4 ">
                                       Ultrices urna varius tempus vestibulum.
                                    </td>
                                    <td class="extra_width text-sm text-gray-900 font-light px-6 py-4 ">
                                       Augue phasellus arcu fermentum tristique ultricies aliquam.
                                    </td>
                                     <td class=" text-sm text-gray-900 font-light px-6 py-4 ">
                                       4
                                    </td>
                                     <td class="extra_width text-sm text-gray-900 font-light px-6 py-4 ">
                                       
                                    </td>
                                    <td class="text-sm text-gray-900 font-light px-6 py-4 ">
                                         <select>
                                            <option>5</option>
                                            <option>6</option>
                                            <option>7</option>
                                        </select>
                                    </td>
                                    
                                    
                                    </tr>
                                     <tr class="bg-white border-b">
                                    
                                    <td class=" text-sm text-gray-900 font-light px-6 py-4 ">
                                        1.1.1.1
                                    </td>
                                    <td class="text-sm text-gray-900 font-light px-6 py-4 ">
                                       Ultrices urna varius tempus vestibulum.
                                    </td>
                                    <td class="extra_width text-sm text-gray-900 font-light px-6 py-4 ">
                                       Augue phasellus arcu fermentum tristique ultricies aliquam.
                                    </td>
                                     <td class=" text-sm text-gray-900 font-light px-6 py-4 ">
                                       4
                                    </td>
                                     <td class="extra_width text-sm text-gray-900 font-light px-6 py-4 ">
                                       
                                    </td>
                                    <td class="text-sm text-gray-900 font-light px-6 py-4 ">
                                         <select>
                                            <option>5</option>
                                            <option>6</option>
                                            <option>7</option>
                                        </select>
                                    </td>
                                    
                                    
                                    </tr>
                                     <tr class="bg-white border-b">
                                    
                                    <td class=" text-sm text-gray-900 font-light px-6 py-4 ">
                                        1.1.1.1
                                    </td>
                                    <td class="text-sm text-gray-900 font-light px-6 py-4 ">
                                       Ultrices urna varius tempus vestibulum.
                                    </td>
                                    <td class="extra_width text-sm text-gray-900 font-light px-6 py-4 ">
                                       Augue phasellus arcu fermentum tristique ultricies aliquam.
                                    </td>
                                     <td class=" text-sm text-gray-900 font-light px-6 py-4 ">
                                       4
                                    </td>
                                     <td class="extra_width text-sm text-gray-900 font-light px-6 py-4 ">
                                       
                                    </td>
                                    <td class="text-sm text-gray-900 font-light px-6 py-4 ">
                                         <select>
                                            <option>5</option>
                                            <option>6</option>
                                            <option>7</option>
                                        </select>
                                    </td>
                                    
                                    
                                    </tr>
                                     <tr class="bg-white border-b">
                                    
                                    <td class=" text-sm text-gray-900 font-light px-6 py-4 ">
                                        1.1.1.1
                                    </td>
                                    <td class="text-sm text-gray-900 font-light px-6 py-4 ">
                                       Ultrices urna varius tempus vestibulum.
                                    </td>
                                    <td class="extra_width text-sm text-gray-900 font-light px-6 py-4 ">
                                       Augue phasellus arcu fermentum tristique ultricies aliquam.
                                    </td>
                                     <td class=" text-sm text-gray-900 font-light px-6 py-4 ">
                                       4
                                    </td>
                                     <td class="extra_width text-sm text-gray-900 font-light px-6 py-4 ">
                                       
                                    </td>
                                    <td class="text-sm text-gray-900 font-light px-6 py-4 ">
                                         <select>
                                            <option>5</option>
                                            <option>6</option>
                                            <option>7</option>
                                        </select>
                                    </td>
                                    
                                    
                                    </tr>
                                     <tr class="bg-white border-b">
                                    
                                    <td class=" text-sm text-gray-900 font-light px-6 py-4 ">
                                        1.1.1.1
                                    </td>
                                    <td class="text-sm text-gray-900 font-light px-6 py-4 ">
                                       Ultrices urna varius tempus vestibulum.
                                    </td>
                                    <td class="extra_width text-sm text-gray-900 font-light px-6 py-4 ">
                                       Augue phasellus arcu fermentum tristique ultricies aliquam.
                                    </td>
                                     <td class=" text-sm text-gray-900 font-light px-6 py-4 ">
                                       4
                                    </td>
                                     <td class="extra_width text-sm text-gray-900 font-light px-6 py-4 ">
                                       
                                    </td>
                                    <td class="text-sm text-gray-900 font-light px-6 py-4 ">
                                         <select>
                                            <option>5</option>
                                            <option>6</option>
                                            <option>7</option>
                                        </select>
                                    </td>
                                    
                                    
                                    </tr>
                                     <tr class="bg-white border-b">
                                    
                                    <td class=" text-sm text-gray-900 font-light px-6 py-4 ">
                                        1.1.1.1
                                    </td>
                                    <td class="text-sm text-gray-900 font-light px-6 py-4 ">
                                       Ultrices urna varius tempus vestibulum.
                                    </td>
                                    <td class="extra_width text-sm text-gray-900 font-light px-6 py-4 ">
                                       Augue phasellus arcu fermentum tristique ultricies aliquam.
                                    </td>
                                     <td class=" text-sm text-gray-900 font-light px-6 py-4 ">
                                       4
                                    </td>
                                     <td class="extra_width text-sm text-gray-900 font-light px-6 py-4 ">
                                       
                                    </td>
                                    <td class="text-sm text-gray-900 font-light px-6 py-4 ">
                                         <select>
                                            <option>5</option>
                                            <option>6</option>
                                            <option>7</option>
                                        </select>
                                    </td>
                                    
                                    
                                    </tr>
                                    <tr class="bg-white border-b">
                                    
                                    <td class=" text-sm text-gray-900 font-light px-6 py-4 ">
                                        1.1.1.1
                                    </td>
                                    <td class="text-sm text-gray-900 font-light px-6 py-4 ">
                                       Ultrices urna varius tempus vestibulum.
                                    </td>
                                    <td class="extra_width text-sm text-gray-900 font-light px-6 py-4 ">
                                       Augue phasellus arcu fermentum tristique ultricies aliquam.
                                    </td>
                                     <td class=" text-sm text-gray-900 font-light px-6 py-4 ">
                                       4
                                    </td>
                                     <td class="extra_width text-sm text-gray-900 font-light px-6 py-4 ">
                                       
                                    </td>
                                    <td class="text-sm text-gray-900 font-light px-6 py-4 ">
                                         <select>
                                            <option>5</option>
                                            <option>6</option>
                                            <option>7</option>
                                        </select>
                                    </td>
                                    
                                    
                                    </tr>
                                    
                                </tbody>
                                </table>
                            </div>
                            </div>
                        </div>
                        </div>
               
                   
        </div>
        <div class="button_wrap flex justify-between">
            <div class="buttons flex justify-start">
                <button type="button" class="gray">Download result report</button>
            </div>
            <div class="buttons flex justify-end">
                <button type="button">Start Diagnosis</button>
                <button type="button" data-bs-toggle="modal" data-bs-target="#waitingcompanyapproval">save</button>
            </div>
        </div>
    </div>
    <div class="modal waitingcompanyapproval fade fixed top-0 left-0 hidden w-full h-full outline-none overflow-x-hidden overflow-y-auto" id="waitingcompanyapproval" tabindex="-1" aria-labelledby="waitingcompanyapproval" aria-modal="true" role="dialog">
        <div class="modal-dialog modal-dialog-centered relative w-auto pointer-events-none">
            <div class="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
            <div class="modal-header flex flex-shrink-0 items-center justify-between p-4 rounded-t-md">
                <h5 class="text-xl font-medium leading-normal text-gray-800" id="exampleModalScrollableLabel">
                   Failed to complete diagnosis
                </h5>
                <button type="button"
                class="btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
                data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body relative">
                <div class="info m-t-0">
                    <p>Item number NNNN except NSuggestion status has not been written</p>
                </div>
            </div>
            <div
                class="modal-footer flex flex-shrink-0 items-center justify-center p-4 rounded-b-md">
                <!-- <button type="button"
                class="full_button blue_bordered px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out" style="font-size:18px;">
                No
                </button> -->
                <button type="button"
                class="full_button solid px-6 py-2.5 text-white font-medium text-xs leading-tight uppercase rounded focus:outline-none focus:ring-0 transition duration-150 ease-in-out" >
                Confirm
                </button> 
                
                </div>
            </div>
        </div>
        </div>
</template>


<script>
export default {
  name: 'DiagnosisComplete',
  
}
</script>


<style lang="scss">
  
</style>