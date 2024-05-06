<template>
    <div class="info_protection">
         <div class="breadcrumb">
           <p><a href="#">Home </a><span>></span> diagnosis management<span>></span> technical diagnosis</p>
       </div>
       <div class="heading flex justify-between align-end">
           <h4>Detailed technical diagnosis result (server system)</h4>
           <div class="history_wrap ">
               <ul>
                    <li>(Initial diagnosis)  <span class="skyblue m-l-10">All items</span>: 000</li>
                    <li> <span class="blue">Good</span>: 000</li>  
                    <li> <span class="red">Weak</span>: 000</li>  
                    <li> <span class="skyblue">N/A</span>: 000 </li>   
                    <li> <span class="orange">Manual</span>: 000</li>
               </ul> 
               <div class="flex items-center">
                    <input id="link-checkbox" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600">
                    <label for="link-checkbox" class="text-sm font-medium text-gray-900 dark:text-gray-300 checkbox-element">Import previous status</label>
                </div>             
           </div>
       </div>
       <div class="policy_setting_wrap">
           <div class="datatable_head mb0 flex justify-between m-t-0">
               <div class="oneside flex justify-start">
               <div class="select_wrap">
                    <label>Asset Classification</label>
                    <select>
                    <option>All</option>
                    <option>Asset Classification</option>
                    <option>Asset Classification</option>
                    <option>Asset Classification</option>
                    </select>
               </div>
               <div class="select_wrap">
                    <label>Asset Code</label>
                    <select>
                    <option>All</option>
                    <option>Asset Code</option>
                    <option>Asset Code</option>
                    <option>Asset Code</option>
                    </select>
               </div>
               <div class="select_wrap">
                    <label>Checklist</label>
                    <select>
                    <option>All</option>
                    <option>Checklist</option>
                    <option>Checklist</option>
                    <option>Checklist</option>
                    </select>
               </div>
               <div class="select_wrap">
                    <label>Test Result</label>
                    <select>
                    <option>All</option>
                    <option>Test Result</option>
                    <option>Test Result</option>
                    <option>Test Result</option>
                    </select>
               </div>
               
                   
               </div>
               <div class="oneside flex justify-end">
                   <button type="button">View guidelines</button>
                   
               </div>
           </div>
       </div>
       <div class="datatable_wrap">
               <ul class="nav nav-tabs flex flex-col md:flex-row flex-wrap list-none border-b-0 pl-0 mb-4" id="tabs-tab"
                    role="tablist">
                    <li class="nav-item" role="presentation">
                        <a href="#tabs-one" class="
                        nav-link
                        block
                        font-medium
                        text-xs
                        leading-tight
                        uppercase
                        border-x-0 border-t-0 border-b-2 border-transparent
                        px-6
                        py-3
                        my-2
                        hover:border-transparent hover:bg-gray-100
                        focus:border-transparent
                        active
                        " id="tabs-one-tab" data-bs-toggle="pill" data-bs-target="#tabs-one" role="tab" aria-controls="tabs-one"
                        aria-selected="true">Ongoing diagnosis (initial diagnosis completed -> transition diagnosis)</a>
                    </li>
                    <li class="nav-item" role="presentation">
                        <a href="#tabs-two" class="
                        nav-link
                        block
                        font-medium
                        text-xs
                        leading-tight
                        uppercase
                        border-x-0 border-t-0 border-b-2 border-transparent
                        px-6
                        py-3
                        my-2
                        hover:border-transparent hover:bg-gray-100
                        focus:border-transparent
                        " id="tabs-two-tab" data-bs-toggle="pill" data-bs-target="#tabs-two" role="tab"
                        aria-controls="tabs-two" aria-selected="false">Completed re-diagnosis (fulfillment diagnosis completed -> implementation diagnosis)</a>
                    </li>
                    </ul>
                    <div class="tab-content" id="tabs-tabContent">
                    <div class="tab-pane fade show active" id="tabs-one" role="tabpanel" aria-labelledby="tabs-one-tab">
                        <div class="flex flex-col">
                    <div class="overflow-x-auto protection_table">
                        <div class="inline-block min-w-full">
                        <div class="overflow-hidden">
                            <table class="min-w-full text-center">
                                <thead class="bg-gray-50">
                                    <tr>
                                    <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4">
                                        Asset classification <img src="@/assets/icon/DownSquare.svg">
                                    </th>
                                    <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4">
                                        Asset code <img src="@/assets/icon/DownSquare.svg">
                                    </th>
                                    <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4">
                                        Host name <img src="@/assets/icon/DownSquare.svg">
                                    </th>
                                    <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4">
                                        Item code <img src="@/assets/icon/DownSquare.svg">
                                    </th>
                                    <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4">
                                        Item Name <img src="@/assets/icon/DownSquare.svg">
                                    </th>
                                    <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4">
                                        Importance <img src="@/assets/icon/DownSquare.svg">
                                    </th>
                                    <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4">
                                        Result <img src="@/assets/icon/DownSquare.svg">
                                    </th>
                                    <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4">
                                        Current situation <img src="@/assets/icon/DownSquare.svg">
                                    </th>
                                    <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4">
                                        Progress result <img src="@/assets/icon/DownSquare.svg">
                                    </th>
                                    </tr>
                                </thead>
                                <tbody>
                                     <tr class="bg-white border-b">
                                    <td class="text-sm text-gray-900 font-light px-6 py-4 ">1</td>
                                    <td class="text-sm text-gray-900 font-light px-6 py-4 ">
                                        운영
                                    </td>
                                    <td class="text-sm text-gray-900 font-light px-6 py-4 ">
                                        운영
                                    </td>
                                    <td class="text-sm text-gray-900 font-light px-6 py-4 ">
                                        S-02
                                    </td>
                                    <td class="text-sm text-gray-900 font-light px-6 py-4 ">
                                        웹서버
                                    </td>
                                    <td class="text-sm text-gray-900 font-light px-6 py-4 ">
                                        IDC
                                    </td>
                                    <td class="text-sm text-gray-900 font-light px-6 py-4 ">
                                        이운영
                                    </td>
                                    <td class="text-sm text-gray-900 font-light px-6 py-4 ">
                                       아테나
                                    </td>
                                    <td class="text-sm text-gray-900 font-light px-6 py-4 ">
                                        <Select>
                                            <option>Good</option>
                                            <option>Manual</option>
                                            <option>weak</option>
                                            <option>Good</option>
                                        </select>
                                    </td>
                                    </tr>
                                    <tr class="bg-white border-b">
                                    <td class="text-sm text-gray-900 font-light px-6 py-4 ">2</td>
                                    <td class="text-sm text-gray-900 font-light px-6 py-4 ">
                                        운영
                                    </td>
                                    <td class="text-sm text-gray-900 font-light px-6 py-4 ">
                                        운영
                                    </td>
                                    <td class="text-sm text-gray-900 font-light px-6 py-4 ">
                                        S-02
                                    </td>
                                    <td class="text-sm text-gray-900 font-light px-6 py-4 ">
                                        웹서버
                                    </td>
                                    <td class="text-sm text-gray-900 font-light px-6 py-4 ">
                                        IDC
                                    </td>
                                    <td class="text-sm text-gray-900 font-light px-6 py-4 ">
                                        이운영
                                    </td>
                                    <td class="text-sm text-gray-900 font-light px-6 py-4 ">
                                       아테나
                                    </td>
                                    <td class="text-sm text-gray-900 font-light px-6 py-4 ">
                                        <Select>
                                            <option>Good</option>
                                            <option>Manual</option>
                                            <option>weak</option>
                                            <option>Good</option>
                                        </select>
                                    </td>
                                   
                                    
                                    </tr>
                                     <tr class="bg-white border-b">
                                    <td class="text-sm text-gray-900 font-light px-6 py-4 ">3</td>
                                    <td class="text-sm text-gray-900 font-light px-6 py-4 ">
                                        운영
                                    </td>
                                    <td class="text-sm text-gray-900 font-light px-6 py-4 ">
                                        운영
                                    </td>
                                    <td class="text-sm text-gray-900 font-light px-6 py-4 ">
                                        S-02
                                    </td>
                                    <td class="text-sm text-gray-900 font-light px-6 py-4 ">
                                        웹서버
                                    </td>
                                    <td class="text-sm text-gray-900 font-light px-6 py-4 ">
                                        IDC
                                    </td>
                                    <td class="text-sm text-gray-900 font-light px-6 py-4 ">
                                        이운영
                                    </td>
                                    <td class="text-sm text-gray-900 font-light px-6 py-4 ">
                                       아테나
                                    </td>
                                    <td class="text-sm text-gray-900 font-light px-6 py-4 ">
                                        <Select>
                                            <option>Good</option>
                                            <option>Manual</option>
                                            <option>weak</option>
                                            <option>Good</option>
                                        </select>
                                    </td>
                                   
                                    
                                    </tr>
                                    <tr class="bg-white border-b">
                                    <td class="text-sm text-gray-900 font-light px-6 py-4 ">4</td>
                                    <td class="text-sm text-gray-900 font-light px-6 py-4 ">
                                        운영
                                    </td>
                                    <td class="text-sm text-gray-900 font-light px-6 py-4 ">
                                        운영
                                    </td>
                                    <td class="text-sm text-gray-900 font-light px-6 py-4 ">
                                        S-02
                                    </td>
                                    <td class="text-sm text-gray-900 font-light px-6 py-4 ">
                                        웹서버
                                    </td>
                                    <td class="text-sm text-gray-900 font-light px-6 py-4 ">
                                        IDC
                                    </td>
                                    <td class="text-sm text-gray-900 font-light px-6 py-4 ">
                                        이운영
                                    </td>
                                    <td class="text-sm text-gray-900 font-light px-6 py-4 ">
                                       아테나
                                    </td>
                                    <td class="text-sm text-gray-900 font-light px-6 py-4 ">
                                        <Select>
                                            <option>Good</option>
                                            <option>Manual</option>
                                            <option>weak</option>
                                            <option>Good</option>
                                        </select>
                                    </td>
                                    
                                    
                                    </tr>
                                     <tr class="bg-white border-b">
                                    <td class="text-sm text-gray-900 font-light px-6 py-4 ">5</td>
                                    <td class="text-sm text-gray-900 font-light px-6 py-4 ">
                                        운영
                                    </td>
                                    <td class="text-sm text-gray-900 font-light px-6 py-4 ">
                                        운영
                                    </td>
                                    <td class="text-sm text-gray-900 font-light px-6 py-4 ">
                                        S-02
                                    </td>
                                    <td class="text-sm text-gray-900 font-light px-6 py-4 ">
                                        웹서버
                                    </td>
                                    <td class="text-sm text-gray-900 font-light px-6 py-4 ">
                                        IDC
                                    </td>
                                    <td class="text-sm text-gray-900 font-light px-6 py-4 ">
                                        이운영
                                    </td>
                                    <td class="text-sm text-gray-900 font-light px-6 py-4 ">
                                       아테나
                                    </td>
                                    <td class="text-sm text-gray-900 font-light px-6 py-4 ">
                                        <Select>
                                            <option>Good</option>
                                            <option>Good</option>
                                            <option>weak</option>
                                            <option>Good</option>
                                        </select>
                                    </td>
                                    
                                    
                                    </tr>
                                     <tr class="bg-white border-b">
                                    <td class="text-sm text-gray-900 font-light px-6 py-4 ">6</td>
                                    <td class="text-sm text-gray-900 font-light px-6 py-4 ">
                                        운영
                                    </td>
                                    <td class="text-sm text-gray-900 font-light px-6 py-4 ">
                                        운영
                                    </td>
                                    <td class="text-sm text-gray-900 font-light px-6 py-4 ">
                                        S-02
                                    </td>
                                    <td class="text-sm text-gray-900 font-light px-6 py-4 ">
                                        웹서버
                                    </td>
                                    <td class="text-sm text-gray-900 font-light px-6 py-4 ">
                                        IDC
                                    </td>
                                    <td class="text-sm text-gray-900 font-light px-6 py-4 ">
                                        이운영
                                    </td>
                                    <td class="text-sm text-gray-900 font-light px-6 py-4 ">
                                       아테나
                                    </td>
                                    <td class="text-sm text-gray-900 font-light px-6 py-4 ">
                                        <Select>
                                            <option>Manual</option>
                                            <option>Manual</option>
                                            <option>weak</option>
                                            <option>Good</option>
                                        </select>
                                    </td>
                                    
                                    
                                    </tr>
                                     <tr class="bg-white border-b">
                                    <td class="text-sm text-gray-900 font-light px-6 py-4 ">7</td>
                                    <td class="text-sm text-gray-900 font-light px-6 py-4 ">
                                        운영
                                    </td>
                                    <td class="text-sm text-gray-900 font-light px-6 py-4 ">
                                        운영
                                    </td>
                                    <td class="text-sm text-gray-900 font-light px-6 py-4 ">
                                        S-02
                                    </td>
                                    <td class="text-sm text-gray-900 font-light px-6 py-4 ">
                                        웹서버
                                    </td>
                                    <td class="text-sm text-gray-900 font-light px-6 py-4 ">
                                        IDC
                                    </td>
                                    <td class="text-sm text-gray-900 font-light px-6 py-4 ">
                                        이운영
                                    </td>
                                    <td class="text-sm text-gray-900 font-light px-6 py-4 ">
                                       아테나
                                    </td>
                                    <td class="text-sm text-gray-900 font-light px-6 py-4 ">
                                        <Select>
                                            <option>Good</option>
                                            <option>Good</option>
                                            <option>Good</option>
                                            <option>Good</option>
                                        </select>
                                    </td>
                                    
                                    
                                    </tr>
                                     <tr class="bg-white border-b">
                                    <td class="text-sm text-gray-900 font-light px-6 py-4 ">8</td>
                                    <td class="text-sm text-gray-900 font-light px-6 py-4 ">
                                        운영
                                    </td>
                                    <td class="text-sm text-gray-900 font-light px-6 py-4 ">
                                        운영
                                    </td>
                                    <td class="text-sm text-gray-900 font-light px-6 py-4 ">
                                        S-02
                                    </td>
                                    <td class="text-sm text-gray-900 font-light px-6 py-4 ">
                                        웹서버
                                    </td>
                                    <td class="text-sm text-gray-900 font-light px-6 py-4 ">
                                        IDC
                                    </td>
                                    <td class="text-sm text-gray-900 font-light px-6 py-4 ">
                                        이운영
                                    </td>
                                    <td class="text-sm text-gray-900 font-light px-6 py-4 ">
                                       아테나
                                    </td>
                                    <td class="text-sm text-gray-900 font-light px-6 py-4 ">
                                        <Select>
                                            <option>weak</option>
                                            <option>weak</option>
                                            <option>weak</option>
                                            <option>Good</option>
                                        </select>
                                    </td>
                                    
                                    
                                    </tr>
                                     <tr class="bg-white border-b">
                                    <td class="text-sm text-gray-900 font-light px-6 py-4 ">9</td>
                                    <td class="text-sm text-gray-900 font-light px-6 py-4 ">
                                        운영
                                    </td>
                                    <td class="text-sm text-gray-900 font-light px-6 py-4 ">
                                        운영
                                    </td>
                                    <td class="text-sm text-gray-900 font-light px-6 py-4 ">
                                        S-02
                                    </td>
                                    <td class="text-sm text-gray-900 font-light px-6 py-4 ">
                                        웹서버
                                    </td>
                                    <td class="text-sm text-gray-900 font-light px-6 py-4 ">
                                        IDC
                                    </td>
                                    <td class="text-sm text-gray-900 font-light px-6 py-4 ">
                                        이운영
                                    </td>
                                    <td class="text-sm text-gray-900 font-light px-6 py-4 ">
                                       아테나
                                    </td>
                                    <td class="text-sm text-gray-900 font-light px-6 py-4 ">
                                        <Select>
                                            <option>Manual</option>
                                            <option>Manual</option>
                                            <option>Manual</option>
                                            <option>Good</option>
                                        </select>
                                    </td>
                                   
                                    
                                    </tr>
                                     <tr class="bg-white border-b">
                                    <td class="text-sm text-gray-900 font-light px-6 py-4 ">10</td>
                                    <td class="text-sm text-gray-900 font-light px-6 py-4 ">
                                        운영
                                    </td>
                                    <td class="text-sm text-gray-900 font-light px-6 py-4 ">
                                        운영
                                    </td>
                                    <td class="text-sm text-gray-900 font-light px-6 py-4 ">
                                        S-02
                                    </td>
                                    <td class="text-sm text-gray-900 font-light px-6 py-4 ">
                                        웹서버
                                    </td>
                                    <td class="text-sm text-gray-900 font-light px-6 py-4 ">
                                        IDC
                                    </td>
                                    <td class="text-sm text-gray-900 font-light px-6 py-4 ">
                                        이운영
                                    </td>
                                    <td class="text-sm text-gray-900 font-light px-6 py-4 ">
                                       아테나
                                    </td>
                                    <td class="text-sm text-gray-900 font-light px-6 py-4 ">
                                        <Select>
                                            <option>Good</option>
                                            <option>Good</option>
                                            <option>Good</option>
                                            <option>Good</option>
                                        </select>
                                    </td>
                                    
                                    
                                    </tr>
                                     
                                    
                                </tbody>
                                </table>
                            </div>
                            </div>
                        </div>
                        </div>
                        <div class="flex justify-center">
                        <nav aria-label="Page navigation example">
                            <ul class="flex list-style-none">
                            <li class="page-item"><a
                                class="page-link relative block py-1.5 px-3 rounded border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 focus:shadow-none"
                                href="#" aria-label="Previous">
                                <span aria-hidden="true">&laquo;</span>
                                </a></li>
                            <li class="page-item"><a
                                class="page-link relative block py-1.5 px-3 rounded border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
                                href="#">1</a></li>
                            <li class="page-item"><a
                                class="page-link relative block py-1.5 px-3 rounded border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
                                href="#">2</a></li>
                            <li class="page-item"><a
                                class="page-link relative block py-1.5 px-3 rounded border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
                                href="#">3</a></li>
                            <li class="page-item"><a
                                class="page-link relative block py-1.5 px-3 rounded border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
                                href="#" aria-label="Next">
                                <span aria-hidden="true">&raquo;</span>
                                </a></li>
                            </ul>
                        </nav>
                        </div>
                    </div>
                    <div class="tab-pane fade" id="tabs-two" role="tabpanel" aria-labelledby="tabs-two-tab">
                        Tab 2 content
                    </div>
                    <div class="tab-pane fade" id="tabs-three" role="tabpanel" aria-labelledby="tabs-three-tab">
                        Tab 3 content
                    </div>
                     <div class="tab-pane fade" id="tabs-four" role="tabpanel" aria-labelledby="tabs-four-tab">
                        Tab 4 content
                    </div>
                     <div class="tab-pane fade" id="tabs-five" role="tabpanel" aria-labelledby="tabs-five-tab">
                        Tab 5 content
                    </div>
                    
                </div>
        </div>
        <div class="button_wrap fixed-button-wrap flex justify-between">
            <div class="buttons flex justify-start">
                <button type="button" class="gray">Upload result report</button>
                
            </div>
            <div class="buttons flex justify-end">
                <!-- <button type="button">My Revision History</button> -->
                <button type="button">Save</button>
            </div>
        </div>
    </div>
</template>


<script>
// import DonutChart from "./Donatchart.vue";
// import radarchart from "./radarchart.vue";
// import stackchart from "./stackchart.vue";
export default {
  name: "DetailedTechnicalDiagnosisResult",
  components: {
    //   DonutChart,
    //   radarchart,
    // stackchart
  }
};
</script>


<style lang="scss">
    
</style>