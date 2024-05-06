<template>
  <div class="change_user_info_wrap">
    <Breadcrumb text1="사용자" text2="사용자 정보 변경" />
    <div class="heading">
      <h4>사용자 정보 변경</h4>
    </div>
    <div class="form_wrap">
      <form>
        <div class="form">
          <p>이메일</p>
          <span>{{ email }}</span>
        </div>
        <div class="form">
          <p>비밀번호</p>
          <div class="input_wrap">
            <input
              type="password"
              placeholder="******"
              readonly
              v-model="currentPassword"
            />
            <button
              type="button"
              @click="verifyPassword"
              v-if="ispasswordVerified == false"
            >
              초기화
            </button>
          </div>
        </div>
        <div
          class="form"
          :class="error.newPassword ? 'field-error' : ''"
          v-if="ispasswordVerified"
        >
          <p>비밀번호</p>
          <div class="input_wrap">
            <input type="password" placeholder="******" v-model="newPassword" />
          </div>
          <span class="error-msg">{{ error.newPassword }}</span>
        </div>
        <div
          class="form"
          :class="error.confirmPassword ? 'field-error' : ''"
          v-if="ispasswordVerified"
        >
          <p>비밀번호 확인</p>
          <div class="input_wrap">
            <input
              type="password"
              placeholder="******"
              v-model="confirmPassword"
            />
          </div>
          <span class="error-msg">{{ error.confirmPassword }}</span>
        </div>
        <div class="form" :class="error.username ? 'field-error' : ''">
          <p>이름</p>
          <div class="input_wrap">
            <input type="text" v-model="username" />
          </div>
          <span class="error-msg">{{ error.username }}</span>
        </div>
        <div class="form" :class="error.mobile ? 'field-error' : ''">
          <p>휴대폰 번호</p>
          <!-- <div class="input_wrap phone_wrap">
            <select>
              <option>91</option>
              <option>91</option>
              <option>91</option>
              <option>91</option>
            </select>
            <span>-</span>
            <input type="text" placeholder="12345" />
            <span>-</span>
            <input type="text" placeholder="67890" />
            <button type="button">Reset</button>
          </div> -->
          <div class="input_wrap">
            <input
              type="text"
              placeholder=""
              readonly
              v-model="mobile"
              v-if="mobileotpConfirmed == false"
            />
            <input
              type="text"
              placeholder=""
              v-model="mobile"
              v-if="mobileotpConfirmed"
            />
            <button
              type="button"
              @click="verifyMobileOTP"
              v-if="mobileotpConfirmed == false"
            >
              초기화
            </button>
          </div>
          <span class="error-msg">{{ error.mobile }}</span>
        </div>
        <div class="form" :class="error.department ? 'field-error' : ''">
          <p>부서</p>
          <div class="input_wrap">
            <input type="text" placeholder="부서" v-model="department" />
          </div>
          <span class="error-msg">{{ error.department }}</span>
        </div>
        <div class="form" :class="error.rank ? 'field-error' : ''">
          <p>직급</p>
          <div class="input_wrap">
            <input type="text" placeholder="직급" v-model="rank" />
          </div>
          <span class="error-msg">{{ error.rank }}</span>
        </div>
        <div class="form">
          <div class="name_head">
            <h4>등록된 기업</h4>
            <button type="button" @click="addCompany">
              <img src="@/assets/icon/add.svg" />기업추가
            </button>
          </div>
          <div class="flex flex-col">
            <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div class="py-4 inline-block min-w-full sm:px-6 lg:px-8">
                <div class="overflow-hidden table_wrap">
                  <table class="min-w-full text-center">
                    <thead class="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          class="text-sm font-medium text-gray-900 px-6 py-4"
                        >
                          기업명
                        </th>
                        <th
                          scope="col"
                          class="text-sm font-medium text-gray-900 px-6 py-4"
                        >
                          상태
                        </th>
                        <th
                          scope="col"
                          class="text-sm font-medium text-gray-900 px-6 py-4"
                        >
                        활동
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        class="bg-white border-b"
                        v-for="(company, index) in registerCompanyList"
                        :key="index"
                        :id="'company' + index"
                      >
                        <td class="text-sm text-gray-900 font-light px-6 py-4">
                          {{ company.company_name }}
                        </td>
                        <td class="text-sm text-gray-900 font-light px-6 py-4">
                          {{ company.status }}
                        </td>
                        <td class="text-sm text-gray-900 font-light px-6 py-4">
                          <a v-if="company.status!=='deleted'"
                            @click="
                              getDeletedId(
                                company.mapping_id,
                                company.id,
                                index
                              )
                            "
                            ><img src="@/assets/icon/action.svg"
                          /></a>
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
          <p>접속 설정하기</p>
          <div class="input_wrap">
            <div class="flex justify-center">
              <div>
                <div class="form-check">
                  <input
                    class="
                      form-check-input
                      appearance-none
                      rounded-full
                      h-4
                      w-4
                      border border-gray-300
                      bg-white
                      checked:bg-blue-600 checked:border-blue-600
                      focus:outline-none
                      transition
                      duration-200
                      mt-1
                      align-top
                      bg-no-repeat bg-center bg-contain
                      float-left
                      cursor-pointer
                    "
                    type="radio"
                    name="flexRadioDefault"
                    id="flexRadioDefault1"
                    v-model="access_company_type"
                    value="last_joined_company"
                    @click="getLastCompanyId"
                    :checked="get_access_company_type == 'last_joined_company'"
                    ref="radio"
                  />
                  <label
                    class="form-check-label inline-block text-gray-800"
                    for="flexRadioDefault1"
                  >
                    마지막 사용 기업 유지
                  </label>
                </div>
                <div class="form-check">
                  <input
                    class="
                      form-check-input
                      appearance-none
                      rounded-full
                      h-4
                      w-4
                      border border-gray-300
                      bg-white
                      checked:bg-blue-600 checked:border-blue-600
                      focus:outline-none
                      transition
                      duration-200
                      mt-1
                      align-top
                      bg-no-repeat bg-center bg-contain
                      float-left
                      cursor-pointer
                    "
                    type="radio"
                    name="flexRadioDefault"
                    id="flexRadioDefault2"
                    v-model="access_company_type"
                    value="company_selection_screen_exposure"
                    @click="getCurrentCompanyId"
                    :checked="
                      get_access_company_type ==
                      'company_selection_screen_exposure'
                    "
                    ref="radio"
                  />
                  <label
                    class="form-check-label inline-block text-gray-800"
                    for="flexRadioDefault2"
                  >
                    기업 선택 화면 노출
                  </label>
                </div>
                <div class="form-check">
                  <input
                    class="
                      form-check-input
                      appearance-none
                      rounded-full
                      h-4
                      w-4
                      border border-gray-300
                      bg-white
                      checked:bg-blue-600 checked:border-blue-600
                      focus:outline-none
                      transition
                      duration-200
                      mt-1
                      align-top
                      bg-no-repeat bg-center bg-contain
                      float-left
                      cursor-pointer
                    "
                    type="radio"
                    name="flexRadioDefault"
                    id="flexRadioDefault3"
                    value="our_choice"
                    v-model="access_company_type"
                    :checked="get_access_company_type == 'our_choice'"
                    ref="radio"
                  />
                  <label
                    class="form-check-label inline-block text-gray-800"
                    for="flexRadioDefault3"
                  >
                    선택한 기업 유지
                  </label>
                </div>
                <span class="error-msg">{{ error.access_company_type }}</span>
              </div>
            </div>
          </div>
          <div
            class="input_wrap"
            :class="error.selectCompany ? 'field-error' : ''"
            v-if="access_company_type == 'our_choice'"
          >
            <select v-model="approve_company_id">
              <option value="" disabled>회사명</option>
              <option
                v-for="item in approveRegisterCompanyList"
                :value="item.id"
                :key="item.index"
                :selected="item.id == access_company_id"
              >
                {{ item.company_name }}
              </option>
            </select>
          </div>
          <span class="error-msg">{{ error.selectCompany }}</span>
        </div>
        <div class="form">
          <button type="button" class="save" @click="checkProfile">
            변경완료
          </button>
        </div>
      </form>
    </div>
  </div>

  <!-- verify password modal -->
  <VerifyModal
    v-show="isVerifyModal"
    @close="closeModal"
    @ispasswordVerified="passwordVerified"
    @currentPassword="current_Password($event)"
  />

  <!-- verify mobile modal -->
  <VerifyOTPModal
    v-show="isVerifyMobileOTPMOdal"
    @close="closeModal"
    @isMobileOTPConfirm="mobileOTPConfirm"
  />

  <!-- add company modal -->
  <RegisterAdditionalCompany
    v-show="isAddModal"
    @close="closeModal"
    @updateCompany="updateCompanyList"
  />

  <StartDiagnosisButtonSelectedWithoutAnyPreviousResult
    v-show="isDeletedAll"
    headerText="알림!"
    firstBtn="아니오"
    secondBtn="네"
    bodyText="해당 기업을 삭제하시는 경우 계정이 삭제 될 수 있습니다. <br/>
    진행하시겠습니까? "
    @confirm="closeCompleteDiagnosisModal"
    @close="closeCompleteDiagnosisModal"
    @cancel="save"
  />

  <StartDiagnosisButtonSelectedWithoutAnyPreviousResult
    v-show="isLogoutModal"
    headerText="알림!"
    firstBtn="아니오"
    secondBtn="네"
    bodyText="해당 기업을 삭제하시는 경우 로그아웃 될 수 있습니다. <br/>
    진행하시겠습니까? "
    @confirm="closeCompleteDiagnosisModal"
    @close="closeCompleteDiagnosisModal"
    @cancel="save"
  />
</template>


<script>
import ChangeUserInfoService from "@/services/ChangeUserInfoService";
import VerifyModal from "@/pages/changeuserinformation/VerifyPasswordWithTheCurrentPassword.vue";
import { errorMsg } from "@/config/Message";
import ChangeUserInfoValidation from "@/validation/ChangeUserInfoValidation";
import RegisterAdditionalCompany from "@/components/modals/RegisterAdditionalCompany.vue";
import VerifyOTPModal from "@/components/modals/VerifyOtp.vue";
import Toast from "@/alert/alert.js";
import validator from "validator";
import Breadcrumb from "@/components/Breadcrumb.vue";
import StartDiagnosisButtonSelectedWithoutAnyPreviousResult from "@/components/modals/StartDiagnosisButtonSelectedWithoutAnyPreviousResult.vue";
export default {
  name: "ChangeUserInformation",
  components: {
    VerifyModal,
    RegisterAdditionalCompany,
    VerifyOTPModal,
    Breadcrumb,
    StartDiagnosisButtonSelectedWithoutAnyPreviousResult,
  },
  data() {
    return {
      email: "",
      currentPassword: "********",
      username: "",
      department: "",
      rank: "",
      access_company_type: "our_choice",
      mobile: "",
      user_id: localStorage.getItem("uid"),
      registerCompanyList: [],
      isVerifyModal: false,
      ispasswordVerified: false,
      newPassword: "",
      confirmPassword: "",
      error: {},
      isAddModal: false,
      access_company_id: localStorage.getItem("compid"),
      deleted_register_company_ids: [],
      approveRegisterCompanyList: [],
      approve_company_id: localStorage.getItem("compid"),
      isVerifyMobileOTPMOdal: false,
      mobileotpConfirmed: false,
      last_joind_company_id: "",
      get_access_company_type: "our_choice",
      isDeletedAll: false,
      isLogoutModal: false,
      temporary_company_id: [],
      activeCompanyList:0
    };
  },
  created() {
    this.ChangeUserInfoService = new ChangeUserInfoService();
  },
  mounted() {
    this.getUserInfo();
    this.getRegisterCompanyList();
    this.getApproveRegisterCompanyList();
  },
  methods: {
    mobileOTPConfirm() {
      this.mobileotpConfirmed = true;
      this.mobile = "";
    },
    updateCompanyList() {
      this.getRegisterCompanyList();
    },
    // get user info

    getUserInfo() {
      this.ChangeUserInfoService.getUserInfo()
        .then((res) => {
          if (res.status == 200) {
            this.email = res.data.email;
            this.username = res.data.name;
            this.department = res.data.department ? res.data.department : "";
            this.rank = res.data.rank ? res.data.rank : "";
            this.mobile = res.data.mobile;
            this.last_joind_company_id = res.data.access_company_id;
            this.get_access_company_type = res.data.access_company_type;
            this.access_company_type = res.data.access_company_type;

            if (this.access_company_type == "last_joined_company") {
              this.access_company_id = res.data.access_company_id;
            }
            if (
              this.access_company_type == "company_selection_screen_exposure"
            ) {
              this.access_company_id = localStorage.getItem("compid");
            }
            if (this.access_company_type == null || this.access_company_type=="" ) {
              this.access_company_type = "our_choice";
              this.get_access_company_type = "our_choice"
              this.access_company_id = localStorage.getItem("compid");
            }
            this.$store.state.companyAccess = res.data.access_company_type;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },

    // get register company list

    getRegisterCompanyList() {
      this.ChangeUserInfoService.getRegisterCompanyList(this.user_id)
        .then((res) => {
          if (res.status == 200) {
            this.registerCompanyList = res.data.company_list;
            this.activeCompanyList= res.data.company_count;
            // console.log(res.data.company_list);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },

    // get approve register company list

    getApproveRegisterCompanyList() {
      this.ChangeUserInfoService.getRegisterApproveCompanyList(this.user_id)
        .then((res) => {
          if (res.status == 200) {
            this.approveRegisterCompanyList = res.data.company_list;
            // console.log(res.data.company_list);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },

    verifyPassword() {
      this.isVerifyModal = true;
    },
    closeModal() {
      this.isVerifyModal = false;
      this.isAddModal = false;
      this.isVerifyMobileOTPMOdal = false;
    },
    passwordVerified() {
      this.ispasswordVerified = true;
    },
    current_Password(e) {
      this.currentPassword = e;
    },
    addCompany() {
      this.isAddModal = true;
    },
    verifyMobileOTP() {
      this.isVerifyMobileOTPMOdal = true;
    },
    getDeletedId(id, company_id, e) {
      document.querySelector("#company" + e).style.display = "none";
      this.deleted_register_company_ids.push(id);
      this.temporary_company_id.push(company_id);
    },
    getLastCompanyId() {
      this.access_company_id = this.last_joind_company_id;
    },
    getCurrentCompanyId() {
      this.access_company_id = localStorage.getItem("compid");
    },

    // update profile

    checkError() {
      let credential = {
        newPassword: this.newPassword,
        confirmPassword: this.confirmPassword,
        currentPassword: this.currentPassword,
        mobile: this.mobile,
        username: this.username,
        department: this.department,
        rank: this.rank,
      };
      const { isInvalid, error } = ChangeUserInfoValidation(credential);
      if (isInvalid) {
        this.error = error;
        return false;
      } else {
        this.error = {};
        return true;
      }
    },

    checkProfile() {
      let obj = this.temporary_company_id.find(
        (x) => x == localStorage.getItem("compid")
      );
      if (this.access_company_type == "" || this.access_company_type == null) {
        this.error.access_company_type = "Please select any access";
      } else {
        if (this.access_company_type == "our_choice") {
          if (this.approve_company_id == "") {
            this.error = {};
            this.error.selectCompany = "Please select a company";
          } else {
            this.error = {};
            this.access_company_id = this.approve_company_id;
            // console.log(this.access_company_id);
            if (
              this.deleted_register_company_ids.length ==
              this.activeCompanyList
            ) {
              this.isDeletedAll = true;
            } else if (
              this.deleted_register_company_ids.length <
                this.activeCompanyList &&
              obj
            ) {
              this.isLogoutModal = true;
            } else {
              this.updateProfile();
            }
          }
        } else {
          this.error = {};
          if (
            this.deleted_register_company_ids.length ==
            this.activeCompanyList
          ) {
            this.isDeletedAll = true;
          } else if (
            this.deleted_register_company_ids.length <
              this.activeCompanyList &&
            obj
          ) {
            this.isLogoutModal = true;
          } else {
            this.updateProfile();
          }
        }
      }
    },

    userCheckError() {
      if (validator.isEmpty(this.mobile)) {
        this.error.mobile = errorMsg.emptyPhone;
        return true;
      }
      if (validator.isEmpty(this.username)) {
        this.error.username = errorMsg.emptyName;
        return true;
      }
      // if (validator.isEmpty(this.department)) {
      //   this.error.department = errorMsg.emptyDepartment;
      //   return true;
      // }
      // if (validator.isEmpty(this.rank)) {
      //   this.error.rank = errorMsg.emptyRank;
      //   return true;
      // } 
      else {
        return false;
      }
    },

    updateProfile() {
      if (this.ispasswordVerified == false) {
        if (this.userCheckError()) {
          return;
        } else {
          this.ChangeUserInfoService.updateProfilewithoutPassword(
            this.username,
            this.department,
            this.rank,
            this.mobile,
            this.access_company_type,
            this.access_company_id,
            this.deleted_register_company_ids
          )
            .then((res) => {
              if (res.status == 200) {
                if (res.data.account_deleted == "y") {
                  Toast.fire({ title: res.data.message });
                  localStorage.clear();
                  this.$store.dispatch("signin/updateUserCredential", {
                    user_id: "",
                    company_id: "",
                    company_name: "",
                    is_user_admin: "",
                  });
                  this.$store.dispatch("header/getToken", "");
                  this.$router.push({ name: "LogIn" });
                } else if ((this.isLogoutModal == true)) {
                  localStorage.clear();
                  this.$store.dispatch("signin/updateUserCredential", {
                    user_id: "",
                    company_id: "",
                    company_name: "",
                    is_user_admin: "",
                  });
                  this.$store.dispatch("header/getToken", "");
                  this.$router.push({ name: "LogIn" });
                } else {
                  this.getUserInfo();
                  this.getRegisterCompanyList();
                  this.getApproveRegisterCompanyList();
                  Toast.fire({ title: "수정이 완료되었습니다." });
                  this.deleted_register_company_ids = [];
                  this.temporary_company_id = [];
                }
              }
            })
            .catch((error) => {
              return false;
            });
        }
      } else {
        if (!this.checkError()) {
          return;
        } else {
          this.ChangeUserInfoService.updateProfilewithPassword(
            this.username,
            this.department,
            this.rank,
            this.mobile,
            this.newPassword,
            this.access_company_type,
            this.access_company_id,
            this.deleted_register_company_ids
          )
            .then((res) => {
              if (res.status == 200) {
                if (res.data.account_deleted == "y") {
                  Toast.fire({ title: res.data.message });
                  localStorage.clear();
                  this.$store.dispatch("signin/updateUserCredential", {
                    user_id: "",
                    company_id: "",
                    company_name: "",
                    is_user_admin: "",
                  });
                  this.$store.dispatch("header/getToken", "");
                  this.$router.push({ name: "LogIn" });
                } else if ((this.isLogoutModal == true)) {
                  localStorage.clear();
                  this.$store.dispatch("signin/updateUserCredential", {
                    user_id: "",
                    company_id: "",
                    company_name: "",
                    is_user_admin: "",
                  });
                  this.$store.dispatch("header/getToken", "");
                  this.$router.push({ name: "LogIn" });
                } else {
                  this.getUserInfo();
                  this.getRegisterCompanyList();
                  this.getApproveRegisterCompanyList();
                  Toast.fire({ title: "수정이 완료되었습니다." });
                  this.deleted_register_company_ids = [];
                  this.temporary_company_id = [];
                }
              }
            })
            .catch((error) => {
              return false;
            });
        }
      }
    },
    closeCompleteDiagnosisModal() {
      this.isDeletedAll = false;
      this.isLogoutModal = false;
    },

    save() {
      this.updateProfile();
    },
  },
};
</script>


<style lang="scss">
</style>