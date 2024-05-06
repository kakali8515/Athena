<template>
            <div class="tab-content" id="tabs-tabContent">
            <div class="tab-pane fade show active" id="tabs-profile" role="tabpanel" aria-labelledby="tabs-profile-tab">
                <div class="login_base_wrap">
                    <div class="wraper">
                        <p>비밀번호 변경</p>
                        <form class="form_wrap">
                            <div class="form" :class="error.currentPassword ? 'field-error' : ''">
                                <p>기존 비밀번호</p>
                                <input v-model="currentPassword" class="form-control" type="password" placeholder="기존 비밀번호">
                                <span class="error-msg">{{ error.currentPassword }}</span>
                            </div>
                            <div class="form" :class="error.newPassword ? 'field-error' : ''">
                                <p>새로운 비밀번호</p>
                                <input v-model="newPassword" class="form-control" type="password" placeholder="새로운 비밀번호">
                                 <span class="error-msg">{{ error.newPassword }}</span>
                            </div>
                            <div class="form" :class="error.confirmPassword ? 'field-error' : ''">
                                <p>새로운 비밀번호 재입력</p>
                                <input v-model="confirmPassword" class="form-control" type="password" placeholder="새로운 비밀번호 재입력">
                                <span class="error-msg">{{ error.confirmPassword }}</span>
                            </div>
                            
                            <div class="form">
                                <button type="button" @click="changePassword">
                                    변경
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            
            </div>
    
</template>

<script>
import resetPasswordValidation from "@/validation/resetPasswordValidation";
import ChangeUserInfoService from "@/services/ChangeUserInfoService";
import Toast from "@/alert/alert.js";
import { errorMsg } from "@/config/Message";
export default {
  name: 'PasswordResetPage',
  data() {
    return {
        currentPassword:"",
        newPassword:"",
        confirmPassword:"",
        error: {},
    }
    },
    created() {
    this.ChangeUserInfoService = new ChangeUserInfoService();
  },
    methods: {
        checkError() {
      let credential = {
        newPassword: this.newPassword,
        confirmPassword: this.confirmPassword,
        currentPassword: this.currentPassword,
      };
      const { isInvalid, error } = resetPasswordValidation(credential);
      if (isInvalid) {
        this.error = error;
        return false;
      } else {
        this.error = {};
        return true;
      }
    },

    changePassword() {
        if (!this.checkError()) {
          return;
        } else {
          this.ChangeUserInfoService.resetPassword(this.$route.params.id,this.currentPassword,this.newPassword,this.confirmPassword)
        .then((res) => {
          if (res.status == 200) {
            this.$router.push({ name: "LogIn" });
             Toast.fire({ title: res.data.message });
             this.$store.state.signin.PasswordExpiredUserId="";
          }
          else if (res.response.status == 400) {
              return (this.error.currentPassword = errorMsg.matchPassword);
            }
        })
        .catch((error) => {
          console.log(error);
        });
        }
    }

    }
  
}
</script>


<style lang="scss">
   
</style>