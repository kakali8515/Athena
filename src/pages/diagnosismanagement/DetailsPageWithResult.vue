<template>
    <div class="info_protection">
         <div class="breadcrumb">
           <p><a href="#">Home </a><span>></span> Diagnosis management</p>
       </div>
       <div class="heading flex justify-between align-end">
           <h4>Establishment and operation of management system</h4>
           <div class="history_wrap">
                <div class="flex items-center mr-50">
                    <input id="default-checkbox" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600">
                    <label for="default-checkbox" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Compare</label>
                </div>
                <span>Upload History</span>
                    <select>
                        <option>2022-01-06</option>
                        <option>2022-01-06</option>
                        <option>2022-01-06</option>
                        <option>2022-01-06</option>
                    </select>
           </div>
       </div>
       <div class="policy_setting_wrap no-padding">
           <div class="datatable_head flex justify-between m-t-0">
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
        <div class="button_wrap fixed-button-wrap flex justify-between">
            <div class="buttons flex justify-start">
                <button type="button" class="gray">Download result report</button>
            </div>
            <div class="buttons flex justify-end">
                <button type="button">Start Diagnosis</button>
                <button type="button">save</button>
            </div>
        </div>
    </div>
</template>


<script>
export default {
  name: 'DetailsPageWithResult',
  
}
</script>


<style lang="scss">
    
</style>