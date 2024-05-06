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
    
</template>

<script>
export default {
  name: 'FindEmailOtpVerification',
  
}
</script>


<style lang="scss">
    
    
    
</style>