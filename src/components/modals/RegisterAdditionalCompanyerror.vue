<template>
    <div class="change_user_info_wrap">
         <div class="breadcrumb">
           <p>user <span>></span> Change user information</p>
       </div>
       <div class="heading">
           <h4>Change user information</h4>
       </div>
       <div class="form_wrap">
           <form>
               <div class="form">
                   <p>Email</p>
                   <span>user@example.com</span>
               </div>
               <div class="form">
                   <p>Password</p>
                   <div class="input_wrap">
                       <input type="password" >
                       <button type="button">Reset</button>
                   </div>
               </div>
               <div class="form">
                   <p>Name</p>
                   <div class="input_wrap">
                       <input type="password" >
                   </div>
               </div>
               <div class="form">
                   <p>Phone number</p>
                   <div class="input_wrap phone_wrap">
                       <select>
                           <option>91</option>
                           <option>91</option>
                           <option>91</option>
                           <option>91</option>
                       </select>
                       <span>-</span>
                       <input type="text" placeholder="12345">
                       <span>-</span>
                       <input type="text" placeholder="67890">
                       <button type="button">Reset</button>
                   </div>
               </div>
               <div class="form">
                   <p>Department</p>
                   <div class="input_wrap">
                       <input type="text" placeholder="Internal Security">
                   </div>
               </div>
               <div class="form">
                   <p>Rank</p>
                   <div class="input_wrap">
                       <input type="text" placeholder="Manager">
                   </div>
               </div>
               <div class="form">
                   <div class="name_head">
                       <h4>Registered company</h4>
                       <button type="button"><img src="@/assets/icon/add.svg">Add Company</button>
                   </div>
                   <div class="flex flex-col">
                        <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
                            <div class="py-4 inline-block min-w-full sm:px-6 lg:px-8">
                            <div class="overflow-hidden table_wrap">
                                <table class="min-w-full text-center">
                                <thead class=" bg-gray-50">
                                    <tr>
                                    <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4">
                                       company name
                                    </th>
                                    <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4">
                                        Status
                                    </th>
                                    <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4">
                                        Action
                                    </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr class="bg-white border-b">
                                       
                                        <td class="text-sm text-gray-900 font-light px-6 py-4 ">
                                           Company Abc
                                        </td>
                                        <td class="text-sm text-gray-900 font-light px-6 py-4 ">
                                            Complete
                                        </td>
                                        <td class="text-sm text-gray-900 font-light px-6 py-4 ">
                                           <a href="#"><img src="@/assets/icon/action.svg"></a>
                                        </td>
                                    </tr>
                                    <tr class="bg-white border-b">
                                        
                                        <td class="text-sm text-gray-900 font-light px-6 py-4 ">
                                            Company XYZ
                                        </td>
                                        <td class="text-sm text-gray-900 font-light px-6 py-4 ">
                                            Atmosphere
                                        </td>
                                        <td class="text-sm text-gray-900 font-light px-6 py-4 ">
                                             <a href="#"><img src="@/assets/icon/action.svg"></a>
                                        </td>
                                    </tr>
                                    <tr class="bg-white border-b">
                                       
                                        <td class="text-sm text-gray-900 font-light px-6 py-4 ">
                                           Company 123
                                        </td>
                                        <td class="text-sm text-gray-900 font-light px-6 py-4 ">
                                           Company 123
                                        </td>
                                        <td class="text-sm text-gray-900 font-light px-6 py-4 ">
                                            <a href="#"><img src="@/assets/icon/action.svg"></a>
                                        </td>
                                    </tr>
                                </tbody>
                                </table>
                            </div>
                            </div>
                        </div>
                        </div>
               </div>
               <div class="form">
                   <p>Access Settings</p>
                   <div class="input_wrap">
                       <div class="flex justify-center">
                        <div>
                            <div class="form-check">
                            <input class="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left cursor-pointer" type="radio" name="flexRadioDefault" id="flexRadioDefault1">
                            <label class="form-check-label inline-block text-gray-800" for="flexRadioDefault1">
                               Last-Use Enterprise Retention
                            </label>
                            </div>
                            <div class="form-check">
                            <input class="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left cursor-pointer" type="radio" name="flexRadioDefault" id="flexRadioDefault2" checked>
                            <label class="form-check-label inline-block text-gray-800" for="flexRadioDefault2">
                                Company selection screen exposure
                            </label>
                            </div>
                            <div class="form-check">
                            <input class="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left cursor-pointer" type="radio" name="flexRadioDefault" id="flexRadioDefault3" checked>
                            <label class="form-check-label inline-block text-gray-800" for="flexRadioDefault3">
                                Keep the company of your choice
                            </label>
                            </div>
                        </div>
                        </div>
                   </div>
                   <div class="input_wrap">
                       <select>
                            <option>Select company</option>
                            <option>Select company</option>
                            <option>Select company</option>
                        </select>
                   </div>
               </div>
               <div class="form">
                   <button type="button" class="save"  data-bs-toggle="modal" data-bs-target="#waitingcompanyapproval">Save</button>
               </div>
           </form>
       </div>
    </div>
     <div class="modal waitingcompanyapproval fade fixed top-0 left-0 hidden w-full h-full outline-none overflow-x-hidden overflow-y-auto" id="waitingcompanyapproval" tabindex="-1" aria-labelledby="waitingcompanyapproval" aria-modal="true" role="dialog">
        <div class="modal-dialog modal-dialog-centered relative w-auto pointer-events-none">
            <div class="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
            <div class="modal-header flex flex-shrink-0 items-center justify-between p-4 rounded-t-md">
                <h5 class="text-xl font-medium leading-normal text-gray-800" id="exampleModalScrollableLabel">
                Register as an additional company
                </h5>
                <button type="button"
                class="btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
                data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body relative">
                <p>You can request company authentication by entering the company code.</p>
                <div class="verify_password company_code">
                    <h4>Company code</h4>
                    <input type="text" placeholder="text" class="error">
                    <span>This is a company code that does not exist.</span>
                </div>
                
            </div>
            <div
                class="modal-footer flex flex-shrink-0 items-center justify-center p-4 rounded-b-md">
                
                <button type="button"
                class="gray_solid blue_bordered_full px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">
                   Confirm
                </button>
                
            </div>
            </div>
        </div>
        </div>
</template>


<script>
export default {
  name: 'RegisterAdditionalCompanyerror',
  
}
</script>


<style lang="scss">
   
</style>