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
                   <p>Current Password</p>
                   <div class="input_wrap">
                       <input type="password" >
                   </div>
               </div>
               <div class="form">
                   <p>New Password</p>
                   <div class="input_wrap">
                       <input type="password" >
                   </div>
               </div>
               <div class="form">
                   <p>Confirm Password</p>
                   <div class="input_wrap">
                       <input type="password" >
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
                                <thead class="bg-gray-50">
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
                   <button type="button" class="save">Save</button>
               </div>
           </form>
       </div>
    </div>
</template>


<script>
export default {
  name: 'ChangeUserInformationPasswordReset',
  
}
</script>


<style lang="scss">
   
</style>