<template>
   <div class="login_base_wrap">
        <div class="wraper">
            <img src="@/assets/images/logo.png">
            <p>You must be logged in to use Athena.</p>
            <form class="form_wrap">
                <div class="form">
                    <p>Email Address</p>
                    <input class="form-control" type="text" placeholder="Input email address">
                </div>
                <div class="form">
                    <p>Password</p>
                    <input class="form-control" type="password" placeholder="Enter Password">
                </div>
                <div class="form">
                    <div class="flex justify-start">
                        <div>
                            <div class="form-check">
                            <input class="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 align-top bg-no-repeat bg-center bg-contain float-left cursor-pointer" type="checkbox" value="" id="flexCheckDefault">
                            <label class="form-check-label inline-block text-gray-800" for="flexCheckDefault">
                                Save ID
                            </label>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="form">
                    <button type="button" data-bs-toggle="modal" data-bs-target="#waitingcompanyapproval">
                        LOGIN
                    </button>
                </div>
            </form>
            <div class="forgot_wrap flex">
                <div class="left flex justify-start">
                    <ul>
                        <li><a href="#">Do you have an ATHENA membership code?</a></li>
                        <li><a href="#">Forgot ID / Password?</a></li>
                    </ul>
                </div>
                <div class="right flex justify-end">
                    <ul>
                        <li><a href="#">Sign Up</a></li>
                        <li><a href="#">Find ID/Password</a></li>
                    </ul>
                </div>
            </div>
        </div>
    </div>

    <div class="modal waitingcompanyapproval fade fixed top-0 left-0 hidden w-full h-full outline-none overflow-x-hidden overflow-y-auto" id="waitingcompanyapproval" tabindex="-1" aria-labelledby="waitingcompanyapproval" aria-modal="true" role="dialog">
  <div class="modal-dialog modal-dialog-centered relative w-auto pointer-events-none">
    <div class="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
      <div class="modal-header flex flex-shrink-0 items-center justify-between p-4 rounded-t-md">
        <h5 class="text-xl font-medium leading-normal text-gray-800" id="exampleModalScrollableLabel">
          Choose a company
        </h5>
        <button type="button"
          class="btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
          data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body relative">
          <div class="choose_company_wrap">
              <p>You can connect to the server by selecting it.</p>
              <div class="company_data">
                  <ul>
                      <li><a href="#">Company A 000000</a></li>
                      <li><a href="#">Company B 000000</a></li>
                      <li><a href="#">Company C 000000</a></li>
                  </ul>
                  <div class="data_backup">
                      <button type="button">Data Backup</button>
                  </div>
              </div>
              <div class="addmore">
                  <button type="button"><img src="@/assets/icon/plus.svg">Add company</button>
              </div>
          </div>
          <div class="access_company_wrap">
              <p>Setting up an access company</p>
                <div class="company_data">
                  <div class="flex justify-start">
                    <div>
                        <div class="form-check">
                        <input class="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" name="flexRadioDefault" id="flexRadioDefault1">
                        <label class="form-check-label inline-block text-gray-800" for="flexRadioDefault1">
                            Last-joined company
                        </label>
                        </div>
                        <div class="form-check">
                        <input class="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" name="flexRadioDefault" id="flexRadioDefault2" checked>
                        <label class="form-check-label inline-block text-gray-800" for="flexRadioDefault2">
                            Company selection screen exposure
                        </label>
                        </div>
                        <div class="form-check">
                        <input class="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" name="flexRadioDefault" id="flexRadioDefault3" checked>
                        <label class="form-check-label inline-block text-gray-800" for="flexRadioDefault3">
                            Keep the company of your choice
                        </label>
                        </div>
                    </div>
                    </div>
                    <select>
                        <option>Company name</option>
                        <option>Company name</option>
                        <option>Company name</option>
                    </select>
                </div>
                <h5>Company settings can be changed in Change My Information.</h5>
          </div>
      </div>
      <div
        class="modal-footer flex flex-shrink-0 items-center justify-center p-4 rounded-b-md">
        <button type="button"
          class="full_button px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded hover:bg-blue-700 focus:bg-blue-700 focus:outline-none focus:ring-0 active:bg-blue-800 transition duration-150 ease-in-out">
          확인
        </button>
      </div>
    </div>
  </div>
</div>
</template>


<script>
export default {
  name: 'KeepCompanyOfYourChoice',
  
}
</script>

<style lang="scss">
    
</style>