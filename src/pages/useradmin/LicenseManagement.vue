<template>
  <div class="info_protection block height-full">
    <Breadcrumb link="dashboard" text1="Home" text2="관리자" />
    <!-- <div class="breadcrumb">
      <p><a href="#">Home </a><span>></span> Manager</p>
    </div> -->
    <div class="heading flex justify-between align-end">
      <h4>라이선스 관리</h4>
    </div>

    <div class="managmenttable">
      <div class="setting_wrap fixed-width">
        <div class="rightbar full-width">
          <div class="form_wrap">
            <div class="wrap">
              <div class="form">
                <p>라이선스</p>
                <input
                  type="text"
                  placeholder="6 months"
                  v-model="licence_name"
                  readonly
                />
              </div>
              <div class="form">
                <p>저장소 (사용량/제공량)</p>
                <input
                  type="text"
                  placeholder="0.2/1 (GB)"
                  v-model="used_storage"
                  readonly
                />
              </div>
            </div>
            <div class="wrap">
              <div class="form">
                <p>시작일</p>
                <input
                  type="text"
                  placeholder="2020-05-06"
                  v-model="start_date"
                  readonly
                />
              </div>
              <div class="form">
                <p>종료일</p>
                <input
                  type="text"
                  placeholder="2021-01-06"
                  v-model="end_date"
                  readonly
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="button_wrap fixed-button-wrap flex justify-between">
      <div class="buttons flex justify-start">
        <button
          type="button"
          @click="isRefundRequest = true"
          v-if="
            permission == 'edit' ||
            this.$store.state.signin.is_user_admin == 'y'
          "
        >
          환불요청
        </button>
      </div>
      <div class="buttons flex justify-end">
        <button
          type="button"
          class="gray"
          @click="openLicenseListModal"
          v-if="
            permission == 'edit' ||
            this.$store.state.signin.is_user_admin == 'y'
          "
        >
          라이선스 목록 보기
        </button>
        <button
          type="button"
          class="gray"
          @click="isUpdateLicenseModal = true"
          v-if="
            permission == 'edit' ||
            this.$store.state.signin.is_user_admin == 'y'
          "
        >
          라이선스 연장 신청
        </button>
      </div>
    </div>

    <!-- Update licence common modal -->

    <LicenseExtension
      @licenseStatus="openNextLicenseModal"
      v-if="isUpdateLicenseModal"
      @close="closeUpdateLicenseModal"
    />

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

    <LicenseList
      :licenseList="companyLicenseList"
      v-show="isLicenseList"
      @close="closeLicenseListModal"
    />
    <RefundRequest
      v-show="isRefundRequest"
      :refundAccount="refundAccount"
      @refund="refundLicenseRequest"
      @close="closeRefundRequestModal"
      :refundStat="isRefund"
    />

    <StartDiagnosisButtonSelectedWithoutAnyPreviousResult
      v-show="isRefundRequestComplete"
      headerText="환불요청완료"
      firstBtn="확인"
      bodyText="환불요청이 완료되었습니다"
      @confirm="isRefundRequestComplete = false"
      @close="isRefundRequestComplete = false"
    />
  </div>
</template>

<script>
// import UserAdminSidebar from '@/components/UserAdminSidebar.vue';
import Breadcrumb from "@/components/Breadcrumb.vue";

// Modals
import LicenseExtension from "@/components/modals/LicenseExtension.vue";
import UpdateLicensePackage from "@/components/modals/UpdateLicensePackage.vue";
import ChangeLicensePackage from "@/components/modals/ChangeLicensePackage.vue";
import LicenseList from "@/components/modals/LicenseList.vue";
import RefundRequest from "@/components/modals/RefundRequest.vue";
import StartDiagnosisButtonSelectedWithoutAnyPreviousResult from "@/components/modals/StartDiagnosisButtonSelectedWithoutAnyPreviousResult.vue";

// API services
import UserAdminLicenseService from "@/services/UserAdminLicenseService";
import CompanyLicenceService from "@/services/companyLicenceService";

export default {
  name: "LicenseManagement",
  components: {
    // UserAdminSidebar,
    LicenseExtension,
    UpdateLicensePackage,
    ChangeLicensePackage,
    LicenseList,
    RefundRequest,
    StartDiagnosisButtonSelectedWithoutAnyPreviousResult,
    Breadcrumb,
  },

  data() {
    return {
      isUpdateLicenseModal: false,
      isUpdateLicensePackageModal: false,
      isChangeLicensePackage: false,
      isLicenseList: false,
      isRefundRequest: false,
      isRefundRequestComplete: false,
      license_package: [],
      licensePackage: [],
      licence_name: "",
      company_id: localStorage.getItem("compid"),
      addOption: false,
      user_id: localStorage.getItem("uid"),
      storageCapacity: "",
      package_type: "period",
      packageID: "",
      used_storage: "",
      start_date: "",
      end_date: "",
      refundAccount: "",
      companyLicenseList: [],
      isRefund: true,
    };
  },

  created() {
    this.CompanyLicenceService = new CompanyLicenceService();
    this.userAdminLicenseService = new UserAdminLicenseService();
  },
  computed: {
    permission() {
      return this.$store.state.sideBar.permission.license;
    },
  },

  mounted() {
    this.getCurrentLicenseDetails();
  },

  methods: {
    // Open next License Modal

    openNextLicenseModal(val) {
      if (val == "current") {
        this.isUpdateLicensePackageModal = true;
        this.isUpdateLicenseModal = false;
        this.getLicensePackageList();
        //this. getCompanyLicence();
      }

      if (val == "change") {
        this.isChangeLicensePackage = true;
        this.isUpdateLicenseModal = false;
        this.getLicensePackageList();
      }
    },

    // get storage capacity value

    getStorageCapacity(value) {
      this.storageCapacity = value;
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

    // Company Licence Lists
    getCompanyLicence() {
      this.CompanyLicenceService.companyLicenceList(this.company_id).then(
        (res) => {
          console.log(res.data);
          let resp = res.data;
          this.licence_name = resp.lisence_list.license_name;
        }
      );
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

    // Change Package Request
    changePackageRequest(value1, value2, value3) {
      this.addOption = value1;
      this.packageID = value2;
      this.storageCapacity = value3;
      this.requestChangeLicensePackage();
      this.package_type = "period";
    },

    // To get package lists for change license modal based on package type
    getPackageforChangeLicense() {
      if (this.package_type == "period") {
        //alert(this.package_type)
        this.CompanyLicenceService.packageList(this.package_type).then(
          (res) => {
            console.log(res);
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
            console.log(res);
            if (res.status == 200) {
              this.licensePackage = res.data.package_list;
            }
          }
        );
      }
    },

    // API function to refund request
    refundLicenseRequest(reason, accountNo) {
      if ((accountNo, reason)) {
        this.userAdminLicenseService
          .refundRequest(accountNo, reason)
          .then((res) => {
            console.log("refund", res);
            if (res.status == 200) {
              this.isRefundRequest = false;
              this.isRefundRequestComplete = true;
            }
          });
      }
    },

    // API Function for current license
    getCurrentLicenseDetails() {
      this.userAdminLicenseService.currentLicenseDetails().then((res) => {
        console.log("currentLicense :", res);
        if (res.status == 200) {
          this.licence_name = res.data.license_name;
          this.used_storage = res.data.used_storage;
          this.start_date = res.data.start_date;
          this.end_date = res.data.end_date;
          this.refundAccount = res.data.refund_account;
          if (res.data.lisence_expires_remaining_days < 30) {
            this.isRefund = false;
          }
        }
      });
    },

    // API Function for company license list
    getCompanyLicense() {
      this.userAdminLicenseService.companyLicenseList().then((res) => {
        console.log("license-list", res);
        if (res.status == 200) {
          this.companyLicenseList = res.data.lisence_list;
        }
      });
    },

    // API function for License-Extension
    getLicenseExtension() {
      let credentials = {
        company_id: this.company_id,
        user_id: this.user_id,
        add_on: this.addOption.toString(),
      };
      if (this.addOption)
        Object.assign(credentials, { storage_capacity: this.storageCapacity });
      this.CompanyLicenceService.licenseExtension(credentials).then((res) => {
        console.log(res);
        if (res.status == 200) {
          // this.$router.push({ name: "" });
          this.isUpdateLicensePackageModal = false;
        }
      });
    },

    // API function for add-on package
    getAddOnLicensePackage() {
      let credentials = {
        company_id: this.company_id,
        user_id: this.user_id,
        add_on: "true",
        storage_capacity: this.storageCapacity,
      };
      this.CompanyLicenceService.addOnPackage(credentials).then((res) => {
        console.log(res);
        if (res.status == 200) {
          //this.$router.push({ name: "" });
          this.isUpdateLicensePackageModal = false;
        }
      });
    },

    //API function for change package
    requestChangeLicensePackage() {
      let credentials = {
        company_id: this.company_id,
        user_id: this.user_id,
        add_on: this.addOption.toString(),
        package_id: this.packageID,
      };
      if (this.addOption)
        Object.assign(credentials, { storage_capacity: this.storageCapacity });
      this.CompanyLicenceService.changePackage(credentials).then((res) => {
        console.log("change license package :", res);
        if (res.status == 200) {
          //this.$router.push({ name: "LogIn" });
          this.closeChangeLicensePackageModal();
        }
      });
    },

    // API function for Package-List

    getLicensePackageList() {
      this.CompanyLicenceService.packageList(this.package_type).then((res) => {
        console.log(res);
        if (res.status == 200) {
          this.license_package = res.data.package_list;
        }
      });
    },

    openLicenseListModal() {
      this.getCompanyLicense();
      this.isLicenseList = true;
    },

    // Function for revert states
    revertAllStates() {
      this.license_package = [];
      this.licensePackage = [];
      this.addOption = false;
      this.storageCapacity = "";
      this.package_type = "period";
      this.packageID = "";
      this.companyLicenseList = [];
    },

    /** Functions for closing Modals
     * ===============================
     */

    closeUpdateLicensePackageModal() {
      this.package_type = "period";
      this.isUpdateLicensePackageModal = false;
      this.revertAllStates();
    },

    closeUpdateLicenseModal() {
      this.isUpdateLicenseModal = false;
      this.revertAllStates();
    },

    closeChangeLicensePackageModal() {
      this.package_type = "period";
      this.isChangeLicensePackage = false;
      this.revertAllStates();
    },

    closeLicenseListModal() {
      this.isLicenseList = false;
    },

    closeRefundRequestModal() {
      this.isRefundRequest = false;
    },
  },
};
</script>

<style lang="scss">
.block {
  display: block !important;
}
.fixed-width {
  max-width: 502px;
}
</style>
