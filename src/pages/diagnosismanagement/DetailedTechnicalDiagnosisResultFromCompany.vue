<template>
    <div class="info_protection">
         <div class="breadcrumb">
           <p><a href="#">Home </a><span>></span> diagnosis management<span>></span> technical diagnosis</p>
       </div>
            <div class="heading flex justify-between align-end">
                <h4>Detailed technical diagnosis result (server system)</h4>
                <div class="history_wrap ">
                    <ul class="server_system">
                            <li>(Initial diagnosis)  <span class="skyblue m-l-10">All items</span>: 000</li>
                            <li> <span class="blue">Good</span>: 000</li>  
                            <li> <span class="red">Weak</span>: 000</li>  
                            <li> <span class="skyblue">N/A</span>: 000 </li>   
                            <li> <span class="orange">Manual</span>: 000</li>
                    </ul> 
                    <button type="button" class="blue">Detailed result</button>             
                </div>
            </div>
            <div class="datatable_wrap big_table border_wrap">
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
                                                   code <img src="@/assets/icon/DownSquare.svg">
                                                </th>
                                                <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4">
                                                    Item <img src="@/assets/icon/DownSquare.svg">
                                                </th>
                                                <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4">
                                                    Grade <img src="@/assets/icon/DownSquare.svg">
                                                </th>
                                                <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4">
                                                    Result <img src="@/assets/icon/DownSquare.svg">
                                                </th>
                                                <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4">
                                                    Explain <img src="@/assets/icon/DownSquare.svg">
                                                </th>
                                                <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4">
                                                    Note <img src="@/assets/icon/DownSquare.svg">
                                                </th>
                                                
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr class="bg-white border-b">
                                               
                                                <td class="text-sm text-gray-900 font-light px-6 py-4 ">
                                                    WIN-101
                                                </td>
                                                <td class="text-sm text-gray-900 font-light px-6 py-4 ">
                                                    Rename the Administrator account
                                                </td>
                                                <td class="text-sm text-gray-900 font-light px-6 py-4 ">
                                                    High
                                                </td>
                                                <td class="text-sm text-gray-900 font-light px-6 py-4 ">
                                                    <Select>
                                                        <option>Good</option>
                                                        <option>Manual</option>
                                                        <option>weak</option>
                                                        <option>Good</option>
                                                    </select>
                                                </td>
                                                <td class="text-sm text-gray-900 font-light px-6 py-4 ">
                                                    standard : Administrator Good if the account name is changed and used or not used<br>
                                                    current situation  Administrator Account active : no
                                                </td>
                                                <td class="text-sm text-gray-900 font-light px-6 py-4 ">
                                                    -
                                                </td>
                                                </tr>
                                                <tr class="bg-white border-b">
                                                
                                                <td class="text-sm text-gray-900 font-light px-6 py-4 ">
                                                    WIN-101
                                                </td>
                                                <td class="text-sm text-gray-900 font-light px-6 py-4 ">
                                                    Rename the Administrator account
                                                </td>
                                                <td class="text-sm text-gray-900 font-light px-6 py-4 ">
                                                    High
                                                </td>
                                                <td class="text-sm text-gray-900 font-light px-6 py-4 ">
                                                    <Select>
                                                        <option>Good</option>
                                                        <option>Manual</option>
                                                        <option>weak</option>
                                                        <option>Good</option>
                                                    </select>
                                                </td>
                                                <td class="text-sm text-gray-900 font-light px-6 py-4 ">
                                                    standard : Administrator Good if the account name is changed and used or not used<br>
                                                    current situation  Administrator Account active : no
                                                </td>
                                                <td class="text-sm text-gray-900 font-light px-6 py-4 ">
                                                    -
                                                </td>
                                                </tr>
                                                <tr class="bg-white border-b">
                                                
                                                <td class="text-sm text-gray-900 font-light px-6 py-4 ">
                                                    WIN-101
                                                </td>
                                                <td class="text-sm text-gray-900 font-light px-6 py-4 ">
                                                    Rename the Administrator account
                                                </td>
                                                <td class="text-sm text-gray-900 font-light px-6 py-4 ">
                                                    High
                                                </td>
                                                <td class="text-sm text-gray-900 font-light px-6 py-4 ">
                                                    <Select>
                                                        <option>Good</option>
                                                        <option>Manual</option>
                                                        <option>weak</option>
                                                        <option>Good</option>
                                                    </select>
                                                </td>
                                                <td class="text-sm text-gray-900 font-light px-6 py-4 ">
                                                    standard : Administrator Good if the account name is changed and used or not used<br>
                                                    current situation  Administrator Account active : no
                                                </td>
                                                <td class="text-sm text-gray-900 font-light px-6 py-4 ">
                                                    -
                                                </td>
                                                </tr>
                                                <tr class="bg-white border-b">
                                                
                                                <td class="text-sm text-gray-900 font-light px-6 py-4 ">
                                                    WIN-101
                                                </td>
                                                <td class="text-sm text-gray-900 font-light px-6 py-4 ">
                                                    Rename the Administrator account
                                                </td>
                                                <td class="text-sm text-gray-900 font-light px-6 py-4 ">
                                                    High
                                                </td>
                                                <td class="text-sm text-gray-900 font-light px-6 py-4 ">
                                                    <Select>
                                                        <option>Good</option>
                                                        <option>Manual</option>
                                                        <option>weak</option>
                                                        <option>Good</option>
                                                    </select>
                                                </td>
                                                <td class="text-sm text-gray-900 font-light px-6 py-4 ">
                                                    standard : Administrator Good if the account name is changed and used or not used<br>
                                                    current situation  Administrator Account active : no
                                                </td>
                                                <td class="text-sm text-gray-900 font-light px-6 py-4 ">
                                                    -
                                                </td>
                                                </tr>
                                                <tr class="bg-white border-b">
                                               
                                                <td class="text-sm text-gray-900 font-light px-6 py-4 ">
                                                    WIN-101
                                                </td>
                                                <td class="text-sm text-gray-900 font-light px-6 py-4 ">
                                                    Rename the Administrator account
                                                </td>
                                                <td class="text-sm text-gray-900 font-light px-6 py-4 ">
                                                    High
                                                </td>
                                                <td class="text-sm text-gray-900 font-light px-6 py-4 ">
                                                    <Select>
                                                        <option>Good</option>
                                                        <option>Manual</option>
                                                        <option>weak</option>
                                                        <option>Good</option>
                                                    </select>
                                                </td>
                                                <td class="text-sm text-gray-900 font-light px-6 py-4 ">
                                                    standard : Administrator Good if the account name is changed and used or not used<br>
                                                    current situation  Administrator Account active : no
                                                </td>
                                                <td class="text-sm text-gray-900 font-light px-6 py-4 ">
                                                    -
                                                </td>
                                                </tr>
                                                <tr class="bg-white border-b">
                                                
                                                <td class="text-sm text-gray-900 font-light px-6 py-4 ">
                                                    WIN-101
                                                </td>
                                                <td class="text-sm text-gray-900 font-light px-6 py-4 ">
                                                    Rename the Administrator account
                                                </td>
                                                <td class="text-sm text-gray-900 font-light px-6 py-4 ">
                                                    High
                                                </td>
                                                <td class="text-sm text-gray-900 font-light px-6 py-4 ">
                                                    <Select>
                                                        <option>Good</option>
                                                        <option>Manual</option>
                                                        <option>weak</option>
                                                        <option>Good</option>
                                                    </select>
                                                </td>
                                                <td class="text-sm text-gray-900 font-light px-6 py-4 ">
                                                    standard : Administrator Good if the account name is changed and used or not used<br>
                                                    current situation  Administrator Account active : no
                                                </td>
                                                <td class="text-sm text-gray-900 font-light px-6 py-4 ">
                                                    -
                                                </td>
                                                </tr>
                                               <tr class="bg-white border-b">
                                                
                                                <td class="text-sm text-gray-900 font-light px-6 py-4 ">
                                                    WIN-101
                                                </td>
                                                <td class="text-sm text-gray-900 font-light px-6 py-4 ">
                                                    Rename the Administrator account
                                                </td>
                                                <td class="text-sm text-gray-900 font-light px-6 py-4 ">
                                                    High
                                                </td>
                                                <td class="text-sm text-gray-900 font-light px-6 py-4 ">
                                                    <Select>
                                                        <option>Good</option>
                                                        <option>Manual</option>
                                                        <option>weak</option>
                                                        <option>Good</option>
                                                    </select>
                                                </td>
                                                <td class="text-sm text-gray-900 font-light px-6 py-4 ">
                                                    standard : Administrator Good if the account name is changed and used or not used<br>
                                                    current situation  Administrator Account active : no
                                                </td>
                                                <td class="text-sm text-gray-900 font-light px-6 py-4 ">
                                                    -
                                                </td>
                                                </tr>
                                                <tr class="bg-white border-b">
                                                
                                                <td class="text-sm text-gray-900 font-light px-6 py-4 ">
                                                    WIN-101
                                                </td>
                                                <td class="text-sm text-gray-900 font-light px-6 py-4 ">
                                                    Rename the Administrator account
                                                </td>
                                                <td class="text-sm text-gray-900 font-light px-6 py-4 ">
                                                    High
                                                </td>
                                                <td class="text-sm text-gray-900 font-light px-6 py-4 ">
                                                    <Select>
                                                        <option>Good</option>
                                                        <option>Manual</option>
                                                        <option>weak</option>
                                                        <option>Good</option>
                                                    </select>
                                                </td>
                                                <td class="text-sm text-gray-900 font-light px-6 py-4 ">
                                                    standard : Administrator Good if the account name is changed and used or not used<br>
                                                    current situation  Administrator Account active : no
                                                </td>
                                                <td class="text-sm text-gray-900 font-light px-6 py-4 ">
                                                    -
                                                </td>
                                                </tr>
                                                <tr class="bg-white border-b">
                                                
                                                <td class="text-sm text-gray-900 font-light px-6 py-4 ">
                                                    WIN-101
                                                </td>
                                                <td class="text-sm text-gray-900 font-light px-6 py-4 ">
                                                    Rename the Administrator account
                                                </td>
                                                <td class="text-sm text-gray-900 font-light px-6 py-4 ">
                                                    High
                                                </td>
                                                <td class="text-sm text-gray-900 font-light px-6 py-4 ">
                                                    <Select>
                                                        <option>Good</option>
                                                        <option>Manual</option>
                                                        <option>weak</option>
                                                        <option>Good</option>
                                                    </select>
                                                </td>
                                                <td class="text-sm text-gray-900 font-light px-6 py-4 ">
                                                    standard : Administrator Good if the account name is changed and used or not used<br>
                                                    current situation  Administrator Account active : no
                                                </td>
                                                <td class="text-sm text-gray-900 font-light px-6 py-4 ">
                                                    -
                                                </td>
                                                </tr>
                                                <tr class="bg-white border-b">
                                                
                                                <td class="text-sm text-gray-900 font-light px-6 py-4 ">
                                                    WIN-101
                                                </td>
                                                <td class="text-sm text-gray-900 font-light px-6 py-4 ">
                                                    Rename the Administrator account
                                                </td>
                                                <td class="text-sm text-gray-900 font-light px-6 py-4 ">
                                                    High
                                                </td>
                                                <td class="text-sm text-gray-900 font-light px-6 py-4 ">
                                                    <Select>
                                                        <option>Good</option>
                                                        <option>Manual</option>
                                                        <option>weak</option>
                                                        <option>Good</option>
                                                    </select>
                                                </td>
                                                <td class="text-sm text-gray-900 font-light px-6 py-4 ">
                                                    standard : Administrator Good if the account name is changed and used or not used<br>
                                                    current situation  Administrator Account active : no
                                                </td>
                                                <td class="text-sm text-gray-900 font-light px-6 py-4 ">
                                                    -
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

export default {
  name: "DetailedTechnicalDiagnosisResultFromCompany",
  
};
</script>


<style lang="scss">
    
</style>