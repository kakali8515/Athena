<template>
  <div class="login_base_wrap">
    <div class="wraper">
      <img src="@/assets/images/logo.png" />
      <p>Athena를 사용하시려면 로그인이 필요합니다.</p>
      <form class="form_wrap">
        <div
          class="form"
          :class="
            error.email || $store.state.signin.errorEmail ? 'field-error' : ''
          "
        >
          <p>이메일 주소</p>
          <input
            class="form-control"
            type="text"
            placeholder="이메일 주소 입력"
            v-model="email"
          />
          <span>{{ error.email }}</span>
          <span v-if="$store.state.signin.errorEmail">{{
            $store.state.signin.errorEmail
          }}</span>
        </div>
        <div
          class="form"
          :class="
            error.password || $store.state.signin.errorPassword
              ? 'field-error'
              : ''
          "
        >
          <p>비밀번호</p>
          <input
            class="form-control"
            type="password"
            placeholder="비밀번호 입력"
            v-model="password"
          />
          <span>{{ error.password }}</span>
          <span v-if="$store.state.signin.errorPassword">{{
            $store.state.signin.errorPassword
          }}</span>
        </div>
        <div class="form">
          <div class="flex justify-start">
            <div>
              <div class="form-check">
                <input
                  class="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 align-top bg-no-repeat bg-center bg-contain float-left cursor-pointer"
                  type="checkbox"
                  value=""
                  id="flexCheckDefault"
                  v-model="saveCredentials"
                />
                <label
                  class="form-check-label inline-block text-gray-800"
                  for="flexCheckDefault"
                >
                  아이디 저장
                </label>
              </div>
            </div>
          </div>
        </div>
        <div class="form">
          <button type="button" @click="userLogin">로그인</button>

          <!-- <div style="background-color: #aaa; padding: 10px; color: #fff">
            <h1>user_id: {{ $store.state.signin.user_id }}</h1>
            <h1>
              authenticator_secret_key:
              {{ $store.state.signin.authenticator_secret_key }}
            </h1>
            <h1>
              is_default_password_reset:
              {{ $store.state.signin.is_default_password_reset }}
            </h1>
            <h1>
              login_otp_enabled: {{ $store.state.signin.login_otp_enabled }}
            </h1>
            <h1>qr_code_url: {{ $store.state.signin.qr_code_url }}</h1>
            <h1>
              isOTPRegisterConfirm:
              {{ $store.state.signin.isOTPRegisterConfirm }}
            </h1>
            <h1>
              isOTPRegisterFailed: {{ $store.state.signin.isOTPRegisterFailed }}
            </h1>
          </div> -->
        </div>
      </form>
      <div class="forgot_wrap flex">
        <div class="left flex justify-start">
          <ul>
            <li><a href="#">ATHENA 회원가입 코드를 가지고 계신가요?</a></li>
            <li><a href="#">ID / 비밀번호를 잊으셨나요?</a></li>
          </ul>
        </div>
        <div class="right flex justify-end">
          <ul>
            <li>
              <a href="#" @click="$router.push({ name: 'SignUpCompanyCode' })"
                >회원가입</a
              >
            </li>
            <li>
              <a href="#" @click="$router.push({ name: 'FindId' })"
                >ID/비밀번호 찾기</a
              >
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- OTP confirm Register modal -->
    <OtpnotRegistered
      v-show="$store.state.signin.isOTPRegisterConfirm"
      @close="closeOtpconfirmModal"
      @confirm="registerOtpconfirmSubmit"
    />
    <!-- OTP Register modal -->
    <RegisterOtp
      v-show="isRegisterOtp"
      :qrCode="qrCode"
      @close="closeOtpModal"
      @confirm="verifyRegOTP"
      :errorMsg="otpError"
    />
    <!-- OTP Register Complete modal -->
    <OtpRegistrationCompleted
      v-show="isOTPRegisterCompleted"
      @close="closeOtpCompletedModal"
      @confirmed="confirmRegistrationComplete"
    />
    <!-- OTP Register faild or direct without scan modal -->
    <OtpRegistrationFailed
      v-show="$store.state.signin.isOTPRegisterFailed"
      @close="closeOtpFailedModal"
      @confirm="verifyOTP"
      :errorMsg="otpError"
      @reset="reset"
    />

    <!-- company choose modal -->
    <ChooseCompany
      v-show="isCompanyChoose"
      @close="closeModal"
      @confirm="choosenCompanySubmit"
      :companyLists="companyLists"
      :accessCompanyType="accessCompanyType"
      :approvedCompanyList="approvedCompanyList"
      @companyID="getCompanyId"
      @companyChoice="getCompanyChoice"
      @addList="addNewCompany"
      @dataBackup="companyDownloadDataBackup"
    />

    <!-- company approval modal -->
    <CompanyApprove
      v-show="isCompanyApprove"
      @close="closeCompanyApprove"
      @confirm="closeAwaitingCompanyApproval"
      :companyName="company_name"
      :companyCode="company_code"
    />

    <!-- cancle approval modal -->
    <CancelCompanyApproveVue
      v-show="isCompanyCancle"
      @close="CompanyCancle"
      @confirm="cancleCompanyApproval"
    />

    <!-- corporate approve denied -->
    <CorporateApproveDenied
      v-show="isCorporateApproveDenied"
      :companyCode="company_code"
      :rejectReason="rejection_reason"
      @close="closeCorporateApproveDeniedModal"
      @approve="corporateApproveRequest"
    />
    <!-- Completion of company approval request -->
    <CompletionCompanyApprovalRequest
      v-show="isApprovalComplete"
      @close="closeApprovalComplete"
    />

    <!-- UnableToConnect--Licence package -->
    <UnableToConnect
      v-show="isUnableToConnectModal"
      @close="closeUnableToConnectModal"
      @openLicenceExpiration="openLicenceExpirationModal"
      @approve="corporateApproveRequest"
      :companyName="company_name"
      :licenceName="licence_name"
      :userAdmin="is_user_admin"
      :is_license_paid="is_license_paid"
    />

    <!-- Register additional modal -->
    <RegisterAdditionalCompanyLogin
      v-show="isAddModal"
      @close="closeRegisterAdditionalCompanyModal"
      @updateCompany="updateCompanyList"
    />

    <!-- Licence Expiration modal -->
    <LicenseExpiration
      v-show="isLicenceExpirationModal"
      @close="closeLicenceExpirationModal"
      @openLicense="OpenLicenseModal"
      @confirm="confirmLicenseExpiration"
      :licenceExpTime="licence_expiry_time"
      :LicenseName="licence_name"
      @dataBackup="openDataBackup"
      :companyName="company_name"
      :DataBackupEnable="isDataBackupEnable"
    />

    <!-- Data Backup -->
    <DataBackupAvailable
      v-if="isDataBackup"
      @close="isDataBackup = false"
      @confirm="downloadDataBackup"
      @cancellation="cancelDataBackup"
    />
    <CancelDataBackup
      v-if="isCancelDataBackup"
      @close="isCancelDataBackup = false"
      @previous="previousDataBackup"
    />

    <!-- Update licence common modal -->

    <LicenseExtension
      @licenseStatus="openNextLicenseModal"
      v-if="isUpdateLicenseModal"
      @close="closeUpdateLicenseModal"
    />

    <!-- Licence package Modal -->
    <!-- <LicensePackage v-show="isLicensePackageModal"/> -->

    <UpdateLicensePackage
      v-if="isUpdateLicensePackageModal"
      :licensePackage="license_package"
      :licenseName="licence_name"
      @storageCapacity="getStorageCapacity"
      @request="makeLicenseRequest"
      @close="closeUpdateLicensePackageModal"
      @addStorage="changePackageType"
    />

    <ChangeLicensePackage
      v-if="isChangeLicensePackage"
      :licensePackage="licensePackage"
      :licenseLists="license_package"
      @storage="addPackage"
      @request="changePackageRequest"
      @close="closeChangeLicensePackageModal"
    />

    <StartDiagnosisButtonSelectedWithoutAnyPreviousResult
      v-if="isAttemptFailed"
      :headerText="
        '비밀번호 시도 횟수 초과 (' +
        $store.state.signin.errorPasswordAttempts +
        '회)'
      "
      :bodyText="
        '비밀번호가 ' +
        $store.state.signin.errorPasswordAttempts +
        '회 이상 맞지 않아 비밀번호 변경이 필요합니다'
      "
      firstBtn="확인"
      @close="closeLoginAttemptFailedModal"
      @confirm="toLogin"
    />

    <StartDiagnosisButtonSelectedWithoutAnyPreviousResult
      v-if="isPasswordExpired"
      headerText="알림!"
      bodyText="비밀번호가 만료되었습니다."
      firstBtn="비밀번호 변경"
      @close="closePasswordExpiredModal"
      @confirm="toResetPassword"
    />
    <Loading
      :active="isLoading"
      :can-cancel="true"
      :on-cancel="onCancel"
      :is-full-page="fullPage"
    ></Loading>
  </div>
</template>

<script>
import logInValidation from "@/validation/logInValidation";
import { useCookies } from "vue3-cookies";
import { errorMsg } from "@/config/Message";

//API Services :
import AuthService from "@/services/AuthService";
import CompanyApprovalService from "@/services/companyApprovalService";
import ChooseCompanyService from "@/services/ChooseCompanyService";
import ChangeUserInfoService from "@/services/ChangeUserInfoService";
import CompanyLicenceService from "@/services/companyLicenceService";
import DataBackupService from "@/services/DataBackupService";

// Modals :
import OtpnotRegistered from "@/components/modals/OtpnotRegistered.vue";
import RegisterOtp from "@/components/modals/RegisterOtp.vue";
import OtpRegistrationFailed from "@/components/modals/OtpRegistrationFailed.vue";
import OtpRegistrationCompleted from "@/components/modals/OtpRegistrationCompleted.vue";
import CompanyApprove from "@/components/modals/CompanyApprove.vue";
import CancelCompanyApproveVue from "@/components/modals/CancelCompanyApprove.vue";
import CorporateApproveDenied from "@/components/modals/CorporateApprovedenied.vue";
import CompletionCompanyApprovalRequest from "@/components/modals/CompletionCompanyApprovalRequest.vue";
import ChooseCompany from "@/components/modals/ChooseCompany.vue";
import UnableToConnect from "@/components/modals/UnableToConnect.vue";
import RegisterAdditionalCompanyLogin from "@/components/modals/RegisterAdditionalCompanyLogin.vue";
import LicenseExpiration from "@/components/modals/LicenseExpiration.vue";
import DataBackupAvailable from "@/components/modals/DataBackupAvailable.vue";
import CancelDataBackup from "@/components/modals/CancelDataBackup.vue";
import LicensePackage from "@/components/modals/LicensePackage.vue";
import UpdateLicensePackage from "@/components/modals/UpdateLicensePackage.vue";
import ChangeLicensePackage from "@/components/modals/ChangeLicensePackage.vue";
import LicenseExtension from "@/components/modals/LicenseExtension.vue";
import StartDiagnosisButtonSelectedWithoutAnyPreviousResult from "@/components/modals/StartDiagnosisButtonSelectedWithoutAnyPreviousResult.vue";

export default {
  setup() {
    const { cookies } = useCookies();
    return { cookies };
  },
  name: "LogIn",
  components: {
    ChooseCompany,
    OtpnotRegistered,
    RegisterOtp,
    OtpRegistrationFailed,
    OtpRegistrationCompleted,
    CompanyApprove,
    CancelCompanyApproveVue,
    CorporateApproveDenied,
    CompletionCompanyApprovalRequest,
    UnableToConnect,
    RegisterAdditionalCompanyLogin,
    LicenseExpiration,
    DataBackupAvailable,
    CancelDataBackup,
    LicensePackage,
    UpdateLicensePackage,
    ChangeLicensePackage,
    LicenseExtension,
    StartDiagnosisButtonSelectedWithoutAnyPreviousResult,
  },
  data() {
    return {
      isLoading: false,
      email: "",
      password: "",
      isCompanyChoose: false,
      error: {},
      saveCredentials: "",
      user_id: "",
      user_email: "",
      // companyData: {
      //   user_id: "",
      //   company_id: "3",
      //   access_company_type: "our_choice",
      // },
      attemptFailedMsg: "",
      accessCompanyType: "",
      access_token: "",
      access_token_expiry: "",
      company_id: "",
      company_name: "",
      licence_name: "",
      licence_expiry_time: "",
      companyLists: [],
      approvedCompanyList: [],
      package_type: "period",
      packageID: "",
      license_package: [],
      licenseLists: [],
      licensePackage: [],
      storageCapacity: "",
      addOption: false,
      isRegisterOtp: false,
      qrCode: "",
      // otp verification
      otpError: "",
      // company approve and cancle
      isCompanyApprove: false,
      isCompanyCancle: false,
      company_code: "",
      rejection_reason: "",
      isCorporateApproveDenied: false,
      isApprovalComplete: false,
      isUnableToConnectModal: false,
      isUserSettings: false,
      isAddModal: false,
      isLicenceExpirationModal: false,
      isDataBackup: false,
      isCancelDataBackup: false,
      isOTPRegisterCompleted: false,
      isUpdateLicenseModal: false,
      isUpdateLicensePackageModal: false,
      isChangeLicensePackage: false,
      isAttemptFailed: false,
      isOTPRegistrationConfirm: false,
      unableConnectStatus: true,
      is_user_admin: "",
      isPasswordExpired: false,
      isDataBackupEnable: true,
      is_license_paid: "",
    };
  },
  created() {
    this.authService = new AuthService();
    this.ChooseCompanyService = new ChooseCompanyService();
    this.companyApprovalService = new CompanyApprovalService();
    this.ChangeUserInfoService = new ChangeUserInfoService();
    this.CompanyLicenceService = new CompanyLicenceService();
    this.dataBackupService = new DataBackupService();

    if (this.cookies) {
      //const rememberUserPasswordCookie = this.cookies.get("rememberUserPassword");
      const rememberUserEmailCookie = this.cookies.get("rememberUserEmail");

      if (rememberUserEmailCookie) {
        this.email = rememberUserEmailCookie;
        //this.password = rememberUserPasswordCookie;
      }
    }
    this.$store.state.signin.errorPassword = "";
    this.$store.state.signin.errorEmail = "";
    this.$store.state.signin.errorPasswordAttempts = "";
    this.$store.state.signup.errorCodeMsg = "";
    this.$store.state.signup.company_name = "";
  },

  watch: {
    accessCompanyType(newVal) {
      if (newVal == "our_choice") {
        this.showMyCompany = true;
        this.getApprovedCompanyList();
        return;
      }
    },

    "$store.state.signin.passwordExpired": {
      handler(newVal, oldVal) {
        if (newVal != oldVal && newVal) {
          this.isPasswordExpired = true;
          this.user_id = this.$store.state.signin.PasswordExpiredUserId;
          this.isCompanyChoose = false;
        }
      },
    },
  },

  methods: {
    checkError() {
      let credential = {
        email: this.email,
        password: this.password,
      };

      const { isInvalid, error } = logInValidation(credential);

      if (isInvalid) {
        this.error = error;
        return false;
      } else {
        this.error = {};
        return true;
      }
    },
    userLogin() {
      if (!this.checkError()) {
        return;
      } else {
        this.$store
          .dispatch("signin/userLogin", {
            email: this.email,
            password: this.password,
            saveCredentials: this.saveCredentials,
          })
          .then((response) => {
            console.log("rsponse", response);
            // when use has permission to bypass qr code and otp registration
            if (
              this.$store.state.signin.isAuthenticatorEnable == false &&
              this.$store.state.signin.status == 200
            ) {
              //alert("False");
              this.error.password = "";
              let resp = this.$store.state.signin;
              console.log("resp-", resp);
              this.user_id = resp.user_id;
              this.is_user_admin = resp.is_user_admin;
              // this.closeOtpFailedModal();
              this.licence_expiry_time = resp.lisence_expiration_remaining_date;
              // Condition 1 When you have no active company "total_company": 0
              if (resp.total_company == 0) {
                if (resp.pending_company_status.status == "inactive") {
                  //alert("inactive")
                  this.company_id = resp.pending_company_status.id;
                  this.company_code = resp.pending_company_status.company_code;
                  this.company_name = resp.pending_company_status.company_name;

                  this.$store.dispatch(
                    "signin/modalotpRegfailedClose",
                    this.company_id
                  );
                  this.isCompanyApprove = true;
                }
                if (resp.pending_company_status.status == "rejected") {
                  //alert("rejected")
                  this.company_id = resp.pending_company_status.id;
                  this.company_code = resp.pending_company_status.company_code;
                  //this.$store.dispatch("signup/getCompanyID", this.company_)
                  this.rejection_reason = resp.pending_company_status.note;
                  this.isCorporateApproveDenied = true;
                }
              }

              // Condition 2 When you have only one active company

              if (
                resp.total_company == 1 &&
                resp.lisence_expiration_remaining_date > 0
              ) {
                this.company_id = resp.company_id;
                this.company_name = resp.company_name;

                if (resp.lisence_expiration_remaining_date <= 30) {
                  if (resp.is_user_admin == "y") {
                    this.isDataBackupEnable = false;
                  }
                  if (resp.lisence_expiration_remaining_date == 1) {
                    this.unableConnectStatus = false;
                    this.isUnableToConnectModal = true;
                    this.company_id = resp.company_id;
                    this.user_id = resp.user_id;
                    this.is_license_paid = resp.is_license_paid;
                    this.getCompanyLicence();
                  } else {
                    this.isLicenceExpirationModal = true;
                    this.access_token = resp.access_token;
                    this.access_token_expiry = resp.access_token_expiry;
                    this.user_id = resp.user_id;
                    this.user_email = resp.email;
                    this.company_id = resp.company_id;
                    this.company_name = resp.company_name;
                    this.is_user_admin = resp.is_user_admin;
                    this.getCompanyLicence();
                  }
                } else {
                  console.log("ressss--", resp);
                  localStorage.setItem("token", resp.access_token);
                  this.$store.dispatch("header/getToken", resp.access_token);
                  localStorage.setItem("tokenExpiry", resp.access_token_expiry);
                  localStorage.setItem("uid", resp.user_id);
                  localStorage.setItem("uEmail", resp.user_email);
                  this.$store.dispatch("header/getUemail", resp.user_email);
                  localStorage.setItem("compid", resp.company_id);
                  localStorage.setItem("compName", resp.company_name);
                  localStorage.setItem("userAdmin", resp.is_user_admin);
                  this.$store.dispatch("signin/updateUserCredential", {
                    user_id: resp.user_id,
                    company_id: resp.company_id,
                    company_name: resp.company_name,
                    is_user_admin: resp.is_user_admin,
                  });

                  this.$router.replace({ name: "DashboardOne" });
                }
              }

              // Condition 3 When you have more than one active company

              if (resp.total_company > 1) {
                this.getUserSettings(resp.company_list);
              }

              // Condition 4 When you have one active company and its expiration date is 0

              if (
                resp.total_company == 1 &&
                resp.lisence_expiration_remaining_date == 0
              ) {
                this.company_id = resp.company_id;
                this.company_name = resp.company_name;
                this.user_id = resp.user_id;
                this.is_license_paid = resp.is_license_paid;
                this.getCompanyLicence();
                this.unableConnectStatus = true;
                this.isUnableToConnectModal = true;
              }

              // .catch((error) => {
              //   console.log(error);
              // });
            }

            //if login attempts failed
            if (this.$store.state.signin.errorPasswordAttempts) {
              this.isAttemptFailed = true;
            }
          });
      }
    },

    getUserSettings(_companyList) {
      this.ChooseCompanyService.userSettings(this.$store.state.signin.user_id)
        .then((res) => {
          console.log(res);
          if (res.status == 200) {
            this.accessCompanyType = res.data.user_settings.access_company_type;
            this.company_id = res.data.user_settings.company_id;
            this.user_id = res.data.user_settings.user_id;
            if (
              this.accessCompanyType == "last_joined_company" ||
              this.accessCompanyType == "our_choice"
            ) {
              //alert(this.accessCompanyType);
              this.choosenCompanySubmit();
            } else {
              this.isCompanyChoose = true;
              this.companyLists = _companyList;
            }
          } else {
            console.log(res);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },

    // To get package lists for change license modal based on package type
    getPackageforChangeLicense() {
      if (this.package_type == "period") {
        //alert(this.package_type)
        this.CompanyLicenceService.packageList(this.package_type).then(
          (res) => {
            console.log("license_package--period", res);
            if (res.status == 200) {
              this.license_package = res.data.package_list;
            }
          }
        );
      }

      if (this.package_type == "storage") {
        //alert(this.package_type)
        this.CompanyLicenceService.packageList(this.package_type).then(
          (res) => {
            console.log("license_package--storage", res);
            if (res.status == 200) {
              this.licensePackage = res.data.package_list;
            }
          }
        );
      }
    },

    // API function for Package-List

    getLicensePackageList() {
      this.CompanyLicenceService.packageList(this.package_type).then((res) => {
        console.log("license_package--package-list", res);
        if (res.status == 200) {
          this.license_package = res.data.package_list;
          this.company_name = res.data.company_name;
        }
      });
    },

    //API call for License List

    getCompanyLicenseList() {
      this.CompanyLicenceService.companyLicenceList(this.company_id).then(
        (res) => {
          console.log("license_package--storage-list", res);
          if (res.status == 200) {
            this.licenseLists = res.data;
          }
        }
      );
    },

    // API function for License-Extension
    getLicenseExtension() {
      let credentials = {
        company_id: this.company_id,
        user_id: this.user_id ? this.user_id : this.$store.state.signin.user_id,
        add_on: this.addOption.toString(),
        //storage_capacity: (this.addOption) ? this.storageCapacity : "",
      };
      if (this.addOption)
        Object.assign(credentials, { storage_capacity: this.storageCapacity });
      this.CompanyLicenceService.licenseExtension(credentials).then((res) => {
        console.log(res);
        if (res.status == 200) {
          this.$router.push({ name: "LogIn" });
          this.isUpdateLicensePackageModal = false;
        }
      });
    },

    // API function for add-on package
    getAddOnLicensePackage() {
      let credentials = {
        company_id: this.company_id,
        user_id: this.user_id ? this.user_id : this.$store.state.signin.user_id,
        add_on: "true",
        storage_capacity: this.storageCapacity,
      };
      this.CompanyLicenceService.addOnPackage(credentials).then((res) => {
        console.log(res);
        if (res.status == 200) {
          this.$router.push({ name: "LogIn" });
          this.isUpdateLicensePackageModal = false;
        }
      });
    },

    //API function for change package
    requestChangeLicensePackage() {
      let credentials = {
        company_id: this.company_id,
        user_id: this.user_id ? this.user_id : this.$store.state.signin.user_id,
        add_on: this.addOption.toString(),
        package_id: this.packageID,
      };
      if (this.addOption)
        Object.assign(credentials, { storage_capacity: this.storageCapacity });
      this.CompanyLicenceService.changePackage(credentials).then((res) => {
        console.log("change license package :", res);
        if (res.status == 200) {
          this.$router.push({ name: "LogIn" });
          this.closeChangeLicensePackageModal();
        }
      });
    },

    //change package option on change license option
    changePackageType(value) {
      this.package_type = value;
      this.getLicensePackageList();
    },

    // Add package in change license modal
    addPackage() {
      this.package_type = "storage";
      this.getPackageforChangeLicense();
    },

    //Register additional company modal open
    addNewCompany() {
      this.isAddModal = true;
    },

    updateCompanyList() {
      this.getRegisterCompanyList();
    },

    // get register company list

    getRegisterCompanyList() {
      console.log("add-userid", this.$store.state.signin.user_id);
      this.ChangeUserInfoService.getRegisterCompanyList(
        this.$store.state.signin.user_id
      )
        .then((res) => {
          if (res.status == 200) {
            this.companyLists = res.data.company_list;
            console.log("updated list", res.data.company_list);
            this.isAddModal = false;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },

    getApprovedCompanyList() {
      this.ChooseCompanyService.keepApprovedCompany(
        this.$store.state.signin.user_id
      ).then((res) => {
        if (res.status == 200) {
          console.log(res);
          this.approvedCompanyList = res.data.company_list;
        } else {
          console.log(res);
        }
      });
    },

    getCompanyId(id) {
      this.company_id = id;
    },

    getCompanyChoice(companyType) {
      this.accessCompanyType = companyType;
      //alert(this.accessCompanyType)
    },

    // Company Licence Lists
    getCompanyLicence() {
      this.CompanyLicenceService.companyLicenceList(this.company_id).then(
        (res) => {
          console.log(res.data);
          let resp = res.data;
          this.company_name = resp.company_name;
          this.licence_name = resp.lisence_list.license_name;
        }
      );
    },

    // register OTP
    closeOtpconfirmModal() {
      this.$store.dispatch("signin/modalotpRegClose");
    },
    registerOtpconfirmSubmit() {
      this.closeOtpconfirmModal();
      this.authService
        .doRegisterQRCode(
          this.$store.state.signin.user_id,
          this.$store.state.signin.authenticator_secret_key
        )
        .then((res) => {
          console.log(res);
          if (res.status == 200) {
            this.isRegisterOtp = true;
            this.qrCode = this.$store.state.signin.qr_code_url;
          }
        });
    },

    // Open License Modal

    OpenLicenseModal() {
      this.isUpdateLicenseModal = true;
      this.isLicenceExpirationModal = false;
    },

    // Open next License Modal

    openNextLicenseModal(val) {
      if (val == "current") {
        this.isUpdateLicensePackageModal = true;
        this.isUpdateLicenseModal = false;
        this.getLicensePackageList();
      }

      if (val == "change") {
        this.isChangeLicensePackage = true;
        this.isUpdateLicenseModal = false;
        this.getLicensePackageList();
      }
    },

    // Make license request
    makeLicenseRequest(value, option) {
      if (option == "extension") {
        this.addOption = value;
        this.getLicenseExtension();
      }

      if (option == "storage") {
        this.getAddOnLicensePackage();
      }

      this.package_type = "period";
    },

    // Change Package Request
    changePackageRequest(value1, value2, value3) {
      this.addOption = value1;
      this.packageID = value2;
      this.storageCapacity = value3;
      this.requestChangeLicensePackage();
      this.package_type = "period";
    },

    // get storage capacity value

    getStorageCapacity(value) {
      this.storageCapacity = value;
    },

    // Approve unable to connect

    unableToConnectApprove() {
      this.isUnableToConnectModal = false;
      this.$router.push({ name: "LogIn" });
    },

    // closing license expiration and to dashboard
    confirmLicenseExpiration() {
      localStorage.setItem("token", this.access_token);
      this.$store.dispatch("header/getToken", this.access_token);
      localStorage.setItem("tokenExpiry", this.access_token_expiry);
      localStorage.setItem("uid", this.user_id);
      localStorage.setItem("uEmail", this.user_email);
      localStorage.setItem("compid", this.company_id);
      localStorage.setItem("compName", this.company_name);
      localStorage.setItem("userAdmin", this.is_user_admin);
      this.isLicenceExpirationModal = false;
      this.$store.dispatch("signin/updateUserCredential", {
        user_id: this.user_id,
        company_id: this.company_id,
        company_name: this.company_name,
        is_user_admin: this.is_user_admin,
      });
      this.$router.replace({ name: "DashboardOne" });
    },

    // otp verification
    // otp enabled : yes
    async verifyOTP(verifyToken) {
      if (!verifyToken) {
        this.otpError = errorMsg.validOTP;
        return;
      } else {
        this.authService
          .doVerifyAuth(this.$store.state.signin.user_id, verifyToken)
          .then((res) => {
            console.log(res.data);
            const resp = res.data;
            if (res.status == 200) {
              this.error.password = "";
              this.is_user_admin = resp.is_user_admin;
              this.closeOtpFailedModal();
              this.licence_expiry_time = resp.lisence_expiration_remaining_date;
              // Condition 1 When you have no active company "total_company": 0
              if (resp.total_company == 0) {
                if (resp.pending_company_status.status == "inactive") {
                  // localStorage.setItem(
                  //   "company_code",
                  //   resp.pending_company_status.company_code
                  // );
                  // localStorage.setItem(
                  //   "company_name",
                  //   resp.pending_company_status.company_name
                  // );
                  // localStorage.setItem(
                  //   "company_id",
                  //   resp.pending_company_status.company_id
                  // );
                  this.company_id = resp.pending_company_status.id;
                  this.company_code = resp.pending_company_status.company_code;
                  this.company_name = resp.pending_company_status.company_name;

                  this.$store.dispatch(
                    "signin/modalotpRegfailedClose",
                    this.company_id
                  );
                  this.isCompanyApprove = true;
                }
                if (resp.pending_company_status.status == "rejected") {
                  this.company_id = resp.pending_company_status.id;
                  this.company_code = resp.pending_company_status.company_code;
                  //this.$store.dispatch("signup/getCompanyID", this.company_)
                  this.rejection_reason = resp.pending_company_status.note;
                  this.isCorporateApproveDenied = true;
                }
              }

              // Condition 2 When you have only one active company

              if (
                resp.total_company == 1 &&
                resp.lisence_expiration_remaining_date > 0
              ) {
                this.company_id = resp.company_id;
                this.company_name = resp.company_name;

                if (resp.lisence_expiration_remaining_date <= 30) {
                  if (resp.is_user_admin == "y") {
                    this.isDataBackupEnable = false;
                  }
                  if (resp.lisence_expiration_remaining_date == 1) {
                    this.unableConnectStatus = false;
                    this.isUnableToConnectModal = true;
                    this.company_id = resp.company_id;
                    this.user_id = resp.user_id;
                    this.is_license_paid = resp.is_license_paid;
                    this.getCompanyLicence();
                  } else {
                    this.access_token = resp.access_token;
                    this.access_token_expiry = resp.access_token_expiry;
                    this.user_id = resp.user_id;
                    this.user_email = resp.email;
                    this.company_id = resp.company_id;
                    this.company_name = resp.company_name;
                    this.is_user_admin = resp.is_user_admin;
                    this.isLicenceExpirationModal = true;
                    this.getCompanyLicence();
                  }
                } else {
                  localStorage.setItem("token", res.data.access_token);
                  this.$store.dispatch(
                    "header/getToken",
                    res.data.access_token
                  );
                  localStorage.setItem(
                    "tokenExpiry",
                    res.data.access_token_expiry
                  );
                  localStorage.setItem("uid", res.data.user_id);
                  localStorage.setItem("uEmail", res.data.email);
                  this.$store.dispatch("header/getUemail", res.data.email);
                  localStorage.setItem("compid", res.data.company_id);
                  localStorage.setItem("compName", res.data.company_name);
                  localStorage.setItem("userAdmin", res.data.is_user_admin);
                  this.$store.dispatch("signin/updateUserCredential", {
                    user_id: res.data.user_id,
                    company_id: res.data.company_id,
                    company_name: res.data.company_name,
                    is_user_admin: res.data.is_user_admin,
                  });

                  this.$router.replace({ name: "DashboardOne" });
                }

                // let verifyRegOtpData = {
                //   access_token: res.data.access_token,
                //   access_token_expiry: res.data.access_token_expiry,
                //   name: "",
                //   email: "",
                //   is_default_password_reset: "",
                //   lisence_expiration_remaining_date: res.data.lisence_expiration_remaining_date,
                //   company_name: res.data.company_name,
                //   company_id: res.data.company_id,
                //   only_backup_available: res.data.only_backup_available,
                //   total_company: res.data.total_company
                // }

                // this.$store.dispatch("signin/otpResData", verifyRegOtpData);
                // console.table(verifyRegOtpData);
              }

              // Condition 3 When you have more than one active company

              if (resp.total_company > 1) {
                this.getUserSettings(resp.company_list);
              }

              // Condition 4 When you have one active company and its expiration date is 0

              if (
                resp.total_company == 1 &&
                resp.lisence_expiration_remaining_date == 0
              ) {
                this.company_id = resp.company_id;
                this.company_name = resp.company_name;
                this.user_id = resp.user_id;
                this.is_license_paid = resp.is_license_paid;
                this.getCompanyLicence();
                this.unableConnectStatus = true;
                this.isUnableToConnectModal = true;
              }

              // Condition 4 When you have one active company and its expiration date ends within one day
              if (resp.total_company == 1) {
                let verifyRegOtpData = {
                  only_backup_available: "",
                  company_id: "",
                  user_id: "",
                  total_company: "",
                };

                this.$store.dispatch("signin/otpResData", verifyRegOtpData);
                console.table(verifyRegOtpData);
              }
            } else if (res.response.status == 400) {
              if (res.response.data.error) {
                this.otpError = res.response.data.error;
                if (res.response.data.error == "Password failed 5 attempts") {
                  this.attemptFailedMsg = res.response.data.error;
                  this.isAttemptFailed = true;
                }
                if (res.response.data.error.password_expired == "y") {
                  this.isPasswordExpired = true;
                  this.isCompanyChoose = false;
                }
              }
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
    // otp enabled : no
    async verifyRegOTP(verifyToken) {
      if (!verifyToken) {
        this.otpError = errorMsg.validOTP;
        return;
      } else {
        this.authService
          .doVerifyAuth(this.$store.state.signin.user_id, verifyToken)
          .then((res) => {
            console.log(res.data);
            const resp = res.data;
            if (res.status == 200) {
              this.error.password = "";
              this.is_user_admin = resp.is_user_admin;
              this.isRegisterOtp = false;
              this.isOTPRegisterCompleted = true;
              this.licence_expiry_time = resp.lisence_expiration_remaining_date;
              this.otpError = "";

              // Condition 1 When you have no active company "total_company": 0

              if (resp.total_company == 0) {
                if (resp.pending_company_status.status == "inactive") {
                  // localStorage.setItem(
                  //   "company_code",
                  //   resp.pending_company_status.company_code
                  // );
                  // localStorage.setItem(
                  //   "company_name",
                  //   resp.pending_company_status.company_name
                  // );
                  // localStorage.setItem(
                  //   "company_id",
                  //   resp.pending_company_status.id
                  // );

                  this.company_id = resp.pending_company_status.id;
                  this.company_code = resp.pending_company_status.company_code;
                  this.company_name = resp.pending_company_status.company_name;

                  this.isCompanyApprove = true;
                  // let verifyRegOtpData = {
                  //   company_id: resp.pending_company_status.id,
                  //   company_name: resp.pending_company_status.company_name,
                  //   company_code: resp.pending_company_status.company_code,
                  //   company_registration_number:
                  //     resp.pending_company_status.company_registration_number,
                  //   waiting_for_approval: resp.waiting_for_approval,
                  // };
                  // this.$store.dispatch("signin/otpResData", verifyRegOtpData);
                  // console.table(verifyRegOtpData);
                }
                if (resp.pending_company_status.status == "rejected") {
                  this.company_id = resp.pending_company_status.id;
                  this.company_code = resp.pending_company_status.company_code;
                  this.rejection_reason = resp.pending_company_status.note;
                  this.isCorporateApproveDenied = true;
                }
              }

              // Condition 2 When you have only one active company

              if (
                resp.total_company == 1 &&
                resp.lisence_expiration_remaining_date > 0
              ) {
                this.company_id = resp.company_id;
                this.company_name = resp.company_name;

                if (resp.lisence_expiration_remaining_date <= 30) {
                  if (resp.is_user_admin == "y") {
                    this.isDataBackupEnable = false;
                  }
                  if (resp.lisence_expiration_remaining_date == 1) {
                    this.unableConnectStatus = false;
                    this.isUnableToConnectModal = true;
                    this.company_id = resp.company_id;
                    this.user_id = resp.user_id;
                    this.is_license_paid = resp.is_license_paid;
                    this.getCompanyLicence();
                  } else {
                    this.access_token = resp.access_token;
                    this.access_token_expiry = resp.access_token_expiry;
                    this.user_id = resp.user_id;
                    this.user_email = resp.email;
                    this.company_id = resp.company_id;
                    this.company_name = resp.company_name;
                    this.is_user_admin = resp.is_user_admin;
                    this.isLicenceExpirationModal = true;
                    this.getCompanyLicence();
                  }
                } else {
                  localStorage.setItem("token", res.data.access_token);
                  this.$store.dispatch(
                    "header/getToken",
                    res.data.access_token
                  );
                  localStorage.setItem(
                    "tokenExpiry",
                    res.data.access_token_expiry
                  );
                  localStorage.setItem("uid", res.data.user_id);
                  localStorage.setItem("uEmail", res.data.email);
                  this.$store.dispatch("header/getUemail", res.data.email);
                  localStorage.setItem("compid", res.data.company_id);
                  localStorage.setItem("compName", res.data.company_name);
                  // this.isOTPRegisterCompleted = true;
                  localStorage.setItem("userAdmin", res.data.is_user_admin);
                  this.$store.dispatch("signin/updateUserCredential", {
                    user_id: res.data.user_id,
                    company_id: res.data.company_id,
                    company_name: res.data.company_name,
                    is_user_admin: res.data.is_user_admin,
                  });
                  this.$router.replace({ name: "DashboardOne" });
                }

                // let verifyRegOtpData = {
                //   access_token: res.data.access_token,
                //   access_token_expiry: res.data.access_token_expiry,
                //   name: "",
                //   email: "",
                //   is_default_password_reset: "",
                //   lisence_expiration_remaining_date: res.data.lisence_expiration_remaining_date,
                //   company_name: res.data.company_name,
                //   company_id: res.data.company_id,
                //   only_backup_available: res.data.only_backup_available,
                //   total_company: res.data.total_company
                // }

                // this.$store.dispatch("signin/otpResData", verifyRegOtpData);
                // console.table(verifyRegOtpData);
              }

              // Condition 3 When you have more than one active company

              if (resp.total_company > 1) {
                this.getUserSettings(resp.company_list);
              }

              // Condition 4 When you have one active company and its expiration date is 0

              if (
                resp.total_company == 1 &&
                resp.lisence_expiration_remaining_date == 0
              ) {
                this.company_id = resp.company_id;
                this.company_name = resp.company_name;
                this.user_id = resp.user_id;
                this.is_license_paid = resp.is_license_paid;
                this.getCompanyLicence();
                this.unableConnectStatus = true;
                this.isUnableToConnectModal = true;
              }

              // Condition 4 When you have one active company and its expiration date ends within one day

              if (resp.total_company == 1) {
                let verifyRegOtpData = {
                  only_backup_available: "",
                  company_id: "",
                  user_id: "",
                  total_company: "",
                };

                this.$store.dispatch("signin/otpResData", verifyRegOtpData);
                console.table(verifyRegOtpData);
              }
            } else if (res.response.status == 400) {
              if (res.response.data.error) {
                this.otpError = res.response.data.error;
              }

              if (res.response.data.error == "Password failed 5 attempts") {
                this.attemptFailedMsg = res.response.data.error;
                this.isAttemptFailed = true;
              }
              if (res.response.data.error.password_expired == "y") {
                this.isPasswordExpired = true;
                this.isCompanyChoose = false;
              }
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
    reset() {
      this.authService
        .reset(this.$store.state.signin.user_id)
        .then((res) => {
          if (res.status == 200) {
            this.closeOtpFailedModal();
            this.$store.state.signin.qr_code_url = res.data.qr_code_url;
            this.$store.state.signin.authenticator_secret_key =
              res.data.secret_code;
            console.log(this.$store.state.signin.authenticator_secret_key);

            this.authService
              .doRegisterQRCode(
                this.$store.state.signin.user_id,
                this.$store.state.signin.authenticator_secret_key
              )
              .then((res) => {
                console.log(res);
                if (res.status == 200) {
                  this.isRegisterOtp = true;
                  this.qrCode = this.$store.state.signin.qr_code_url;
                }
              });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },

    // API function login auth:

    // getSignInVerifyAuth() {},

    // getLastJoinedCompany() {
    //   if (this.accessCompanyType == "last_joined_company") {
    //     alert(this.accessCompanyType);
    //     this.choosenCompanySubmit();
    //     return true;
    //   } else {
    //     return false;
    //     // this.isCompanyChoose = true;
    //     // this.companyLists = resp.company_list;
    //     // this.accessCompanyType = resp.access_company_type;
    //   }
    // },

    // cancle company approval

    async cancleCompanyApproval() {
      alert("cancleCompanyApproval");
      this.companyApprovalService
        .cancelApproval(this.$store.state.signin.user_id, this.company_id)
        .then((res) => {
          console.log("cancel company", res);

          if (res.status == 200) {
            this.isCompanyCancle = false;
            this.$router.push("/login");
          } else if (res.response.status == 400) {
            console.warn(res.response.data.message);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },

    // Approval of company request

    async corporateApproveRequest() {
      console.log("rdcfgvhbjnkddfcghj");
      this.companyApprovalService
        .completionApproval(
          this.$store.state.signin.user_id,
          this.$store.state.signup.company_id
        )
        .then((res) => {
          console.log(res);

          if (res.status == 200) {
            this.isCorporateApproveDenied = false;
            this.isUnableToConnectModal = false;
            this.isApprovalComplete = true;
          }
        });
    },

    // API function for data backup

    downloadDataBackup() {
      this.isLoading = true;
      console.log('isloading',this.isLoading);
      this.dataBackupService
        .getDataBackup(this.user_id, this.company_id, [])
        .then((res) => {
          console.log("databackup", res);
          if (res.status == 200) {
            let path = res.data.path;
            path = path + "type=unlink";
            let data = { url: path, fileName: "DataBackup" };
            this.$store.dispatch(
              "diagnosisManagement/createDownloadFiles",
              data
            );
            this.isDataBackup = false;
            this.isLoading = false;
          } else if (res.response.status == 401) {
            this.isLoading = false;
            Toast.fire({ title: res.response.data.error });
          } else {
            this.isLoading = false;
          }
        });
    },

    // data backup choosing company
    companyDownloadDataBackup(compID) {
      this.company_id = compID;
      //console.log("data-uid", this.user_id)
      this.downloadDataBackup();
    },

    // To reset password on login attempt failure
    toLogin() {
      this.$router.push("/LogIn");
      this.isAttemptFailed = false;
      this.$store.state.signin.errorPasswordAttempts = "";
    },

    // to choose company of choice
    choosenCompanySubmit() {
      let companyData = {
        user_id: this.$store.state.signin.user_id,
        company_id: this.company_id,
        access_company_type: this.accessCompanyType,
      };
      this.ChooseCompanyService.chooseCompany(companyData)
        .then((res) => {
          console.log("company submit :", res.data);
          if (res.status == 200) {
            this.error.password = "";
            let response = res.data;
            this.licence_expiry_time =
              response.lisence_expiration_remaining_date;
            this.is_user_admin = response.is_user_admin;
            if (response.lisence_expiration_remaining_date == 0) {
              this.isCompanyChoose = false;
              this.company_id = response.company_id;
              this.company_name = response.company_name;
              this.user_id = response.user_id;
              this.is_license_paid = response.is_license_paid;
              this.getCompanyLicence();
              this.unableConnectStatus = true;
              this.isUnableToConnectModal = true;
            }

            if (response.lisence_expiration_remaining_date > 0) {
              if (response.lisence_expiration_remaining_date <= 30) {
                if (response.is_user_admin == "y") {
                  this.isDataBackupEnable = false;
                }
                if (response.lisence_expiration_remaining_date == 1) {
                  this.unableConnectStatus = false;
                  this.isUnableToConnectModal = true;
                  this.company_id = response.company_id;
                  this.user_id = response.user_id;
                  this.company_name = response.company_name;
                  this.is_license_paid = response.is_license_paid;
                  this.getCompanyLicence();
                } else {
                  this.access_token = response.access_token;
                  this.access_token_expiry = response.access_token_expiry;
                  this.user_id = response.user_id;
                  this.user_email = response.email;
                  this.company_id = response.company_id;
                  this.company_name = response.company_name;
                  this.is_user_admin = response.is_user_admin;
                  this.isCompanyChoose = false;
                  this.isLicenceExpirationModal = true;
                  this.getCompanyLicence();
                }
              } else {
                this.is_user_admin = res.data.is_user_admin;
                localStorage.setItem("token", res.data.access_token);
                this.$store.dispatch("header/getToken", res.data.access_token);
                localStorage.setItem(
                  "tokenExpiry",
                  res.data.access_token_expiry
                );
                localStorage.setItem("uid", res.data.user_id);
                localStorage.setItem("uEmail", res.data.email);
                this.$store.dispatch("header/getUemail", res.data.email);
                localStorage.setItem("compid", res.data.company_id);
                localStorage.setItem("compName", res.data.company_name);
                localStorage.setItem("userAdmin", res.data.is_user_admin);
                this.$router.replace({ name: "DashboardOne" });
                this.$store.dispatch("signin/updateUserCredential", {
                  user_id: res.data.user_id,
                  company_id: res.data.company_id,
                  company_name: res.data.company_name,
                  is_user_admin: res.data.is_user_admin,
                });
                this.isCompanyChoose = false;
              }
            }
          }

          if (res.response.status == 400) {
            console.warn(res.response.data.message);
            if (res.response.data.message == "License has expired") {
              this.isCompanyChoose = false;
              this.isUnableToConnectModal = true;
              this.is_license_paid = "expired";
            }
            if (res.response.data.error.password_expired == "y") {
              this.isPasswordExpired = true;
              this.isCompanyChoose = false;
            }
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },

    /**  Functions for closing modals
     * =================================
     */

    closeModal() {
      this.isCompanyChoose = false;
    },

    closeUnableToConnectModal() {
      console.log("closeUnableToConnectModal");
      this.isUnableToConnectModal = false;
    },

    closeRegisterAdditionalCompanyModal() {
      this.isAddModal = false;
    },
    openDataBackup() {
      this.isLicenceExpirationModal = false;
      this.isDataBackup = true;
    },

    cancelDataBackup() {
      this.isDataBackup = false;
      this.isCancelDataBackup = true;
    },

    previousDataBackup() {
      this.isCancelDataBackup = false;
      this.isDataBackup = true;
    },

    closeLicenceExpirationModal() {
      this.isLicenceExpirationModal = false;
      this.$router.push({ name: "LogIn" });
    },

    closeChangeLicensePackageModal() {
      this.package_type = "period";
      this.isChangeLicensePackage = false;
    },

    closeUpdateLicensePackageModal() {
      this.package_type = "period";
      this.isUpdateLicensePackageModal = false;
    },

    closeUpdateLicenseModal() {
      this.isUpdateLicenseModal = false;
    },

    closeOtpCompletedModal() {
      this.isOTPRegisterCompleted = false;
    },

    openLicenceExpirationModal() {
      this.closeUnableToConnectModal();
      // this.isLicenceExpirationModal = true;
      if (this.unableConnectStatus) {
        this.isUpdateLicenseModal = true;
      } else {
        this.isLicenceExpirationModal = true;
      }
    },
    closeOtpModal() {
      this.otpError = "";
      this.isRegisterOtp = false;
    },
    registerOtpSubmit() {
      this.closeOtpModal();
    },
    closeOtpFailedModal() {
      this.$store.dispatch("signin/modalotpRegfailedClose");
    },
    registerOtpFailedSubmit() {
      this.closeOtpFailedModal();
    },
    closeCompanyApprove() {
      this.isCompanyApprove = false;
    },
    CompanyCancle() {
      this.isCompanyCancle = false;
    },
    closeAwaitingCompanyApproval() {
      this.isCompanyApprove = false;
      this.isCompanyCancle = true;
    },
    closeCorporateApproveDeniedModal() {
      this.isCorporateApproveDenied = false;
    },
    closeApprovalComplete() {
      this.isApprovalComplete = false;
    },

    closeLoginAttemptFailedModal() {
      this.isAttemptFailed = false;
      this.$store.state.signin.errorPasswordAttempts = "";
    },
    confirmRegistrationComplete() {
      this.isOTPRegistrationConfirm = true;
      this.isOTPRegisterCompleted = false;
    },
    closePasswordExpiredModal() {
      this.isPasswordExpired = false;
    },
    toResetPassword() {
      this.$router.push(`/PasswordResetPage/${this.user_id}`);
      this.$store.state.signin.passwordExpired = false;
    },
  },
};
</script>

<style lang="scss">
.modal-overlap{
  z-index: 99 !important;
}
</style>
