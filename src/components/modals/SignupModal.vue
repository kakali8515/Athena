<template>
            <ul class=" findidtab nav nav-tabs flex justify-start flex-col md:flex-row flex-wrap list-none border-b-0 pl-0 mb-4" id="tabs-tab"
            role="tablist">
            <li class="nav-item" role="presentation">
                <a href="#tabs-home" class="
                findid_nav
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
                focus:border-transparent
                active
                " id="tabs-home-tab" data-bs-toggle="pill" data-bs-target="#tabs-home" role="tab" aria-controls="tabs-home"
                aria-selected="true">Find your email</a>
            </li>
            <li class="nav-item" role="presentation">
                <a href="#tabs-profile" class="
                findid_nav
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
                focus:border-transparent
                " id="tabs-profile-tab" data-bs-toggle="pill" data-bs-target="#tabs-profile" role="tab"
                aria-controls="tabs-profile" aria-selected="false">Find Password</a>
            </li>
            
            
            </ul>
            <div class="tab-content" id="tabs-tabContent">
            <div class="tab-pane fade show active" id="tabs-home" role="tabpanel" aria-labelledby="tabs-home-tab">
               <div class="login_base_wrap">
                    <div class="wraper">
                        <p>E-mail Find</p>
                        <form class="form_wrap">
                            <div class="form">
                                <p>Name</p>
                                <input class="form-control" type="text" placeholder="Input text">
                            </div>
                            <div class="form">
                                <p>Phone number</p>
                                <div class="f-wrap">
                                    <input type="text" placeholder="Input text">
                                    <button type="button">Re-send</button>
                                </div>
                            </div>
                            
                            <div class="form ">
                                <p>Certification number input</p>
                                <div class="f-wrap">
                                    <div class="time_wrap">
                                        <input type="text" placeholder="Input text">
                                        <div class="timer">
                                            <p>03:00</p>
                                        </div>
                                    </div>
                                    <button type="button">Authenticate</button>
                                </div>
                            </div>
                            
                            <div class="form">
                                <button type="button">
                                    Find ID
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div class="tab-pane fade" id="tabs-profile" role="tabpanel" aria-labelledby="tabs-profile-tab">
                <div class="login_base_wrap">
                    <div class="wraper">
                        <p>Find Password</p>
                        <form class="form_wrap">
                            <div class="form">
                                <p>Find Password</p>
                                <input class="form-control" type="text" placeholder="Input text">
                            </div>
                            <div class="form">
                                <p>Name</p>
                                <input class="form-control" type="text" placeholder="Input text">
                            </div>
                            <div class="form">
                                <p>Phone Number</p>
                                <input class="form-control" type="text" placeholder="Input text">
                            </div>
                            
                            
                            <div class="form">
                                <button type="button">
                                    Send email
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            
            </div>

            <!-- <div>Modal 1</div> -->
            
            <div class="modal-overlap waitingcompanyapproval" >
                <div class="modal-dialog modal-dialog-centered relative w-auto pointer-events-none">
                    <div class="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
                    <div class="modal-header flex flex-shrink-0 items-center justify-between p-4 rounded-t-md">
                        <h5 class="text-xl font-medium leading-normal text-gray-800" id="exampleModalScrollableLabel">
                        Sign Up
                        </h5>
                        <button type="button"
                        class="btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
                        data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body relative">
                        <div class="cancel_info_wrap">
                            <p>Athena Sign up is complete.
                                It can be used after approval by the company representative.</p>
                            
                        </div>
                    </div>
                    <div
                        class="modal-footer flex flex-shrink-0 items-center justify-center p-4 rounded-b-md">
                        
                        <button type="button"
                        class="solid graysolid w-full px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">
                            to login page
                        </button>
                    </div>
                    </div>
                </div>
            </div>
                
</template>

<script>
export default {
  name: 'SignupModal',
  
}
</script>


<style lang="scss">
  
</style>