<template>
  <div class="info_protection">
    <div class="breadcrumb">
      <Breadcrumb link="dashboard" text1="Home" text2="관리자" />
    </div>
    <div class="heading flex justify-between align-end">
      <h4>부가기능 설정</h4>
    </div>

    <div class="managmenttable">
      <div class="setting_wrap">
        <div class="password_policy">
          <span>비밀번호 정책</span>

          <div class="password_wrap">
            <div class="input_wrap m-t-0">
              <label>비밀번호 최대 사용기간 : </label>
              <input
                v-model="maximum_password_period"
                type="text"
                placeholder="비밀번호 최대 사용기간"
              />
            </div>
            <div class="input_wrap2 m-t-0">
              <label>일</label>
              <button
                @click="setMaximumPasswordPeriod"
                type="button"
                v-if="
                  permission == 'edit' ||
                  this.$store.state.signin.is_user_admin == 'y'
                "
              >
                설정
              </button>
              <p class="error-msg">{{ errors.passwordPeriod }}</p>
            </div>
          </div>
          <div class="password_wrap">
            <div class="input_wrap">
              <label>로그인 시도 제한 횟수 : </label>
              <input
                v-model="number_of_login_attempts"
                type="text"
                placeholder="로그인 시도 제한 횟수"
              />
            </div>

            <div class="input_wrap2">
              <label>회</label>
              <button
                @click="setLoginAttempts"
                type="button"
                v-if="
                  permission == 'edit' ||
                  this.$store.state.signin.is_user_admin == 'y'
                "
              >
                설정
              </button>
              <p class="error-msg">{{ errors.loginAttempts }}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="setting_wrap">
        <div class="password_policy">
          <span>심사기간 설정</span>
          <div class="audit_wrap">
            <p>인증심사 기간</p>
            <div class="select_main_wrap">
              <div class="select-wrap">
                <!-- <input class="date" type="date" v-model="review_period_from" onkeydown="return false" /> -->
                <Datepicker
                  v-model="review_period_from"
                  :enableTimePicker="false"
                  placeholder="선택"
                  format="yyyy-MM-dd"
                  type="date"
                  locale="ko"
                  cancelText="취소"
                  selectText="선택"
                />
                <small>-</small>
                <Datepicker
                  v-model="review_period_to"
                  :enableTimePicker="false"
                  placeholder="선택"
                  format="yyyy-MM-dd"
                  :minDate="review_period_from"
                  type="date"
                  locale="ko"
                  cancelText="취소"
                  selectText="선택"
                />
                <!-- <input
                  class="date"
                  type="date"
                  :min="review_period_from"
                  v-model="review_period_to"
                  onkeydown="return false"
                /> -->
              </div>
              <div class="buttons_wrap">
                <button
                  @click="updateReviewPeriod"
                  type="button"
                  v-if="
                    permission == 'edit' ||
                    this.$store.state.signin.is_user_admin == 'y'
                  "
                >
                  설정
                </button>
                <button
                  @click="resetDate"
                  type="button"
                  v-if="
                    permission == 'edit' ||
                    this.$store.state.signin.is_user_admin == 'y'
                  "
                >
                  초기화
                </button>
              </div>
            </div>
            <p class="error-msg">{{ errors.review_period_from }}</p>
          </div>
        </div>
      </div>
      <div class="setting_wrap">
        <div class="password_policy">
          <span>데이터 백업</span>
          <div class="checkbox_wrap">
            <div class="flex items-center mb-4">
              <input
                id="default-checkbox"
                @click="selectAll"
                v-model="allSelected"
                type="checkbox"
                value=""
                class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                for="default-checkbox"
                class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >전체선택 (메신저, 게시판, 일정은 백업이 불가능합니다.)</label
              >
            </div>
            <div class="sub-checkbox">
              <div class="flex items-center mb-4">
                <input
                  id="default-checkbox"
                  type="checkbox"
                  v-model="selectedItem"
                  @click="selectSingle"
                  value="asset_ledger"
                  class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  for="default-checkbox"
                  class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >자산대장</label
                >
              </div>
              <div class="flex items-center mb-4">
                <input
                  id="default-checkbox"
                  type="checkbox"
                  v-model="selectedItem"
                  @click="selectSingle"
                  value="network_diagram"
                  class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  for="default-checkbox"
                  class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >네트워크 구성도</label
                >
              </div>
              <div class="flex items-center mb-4">
                <input
                  id="default-checkbox"
                  type="checkbox"
                  v-model="selectedItem"
                  @click="selectSingle"
                  value="management_diagnosis"
                  class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  for="default-checkbox"
                  class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >진단관리 결과보고서
                </label>
              </div>
              <div class="flex items-center mb-4">
                <input
                  id="default-checkbox"
                  type="checkbox"
                  v-model="selectedItem"
                  @click="selectSingle"
                  value="risk"
                  class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  for="default-checkbox"
                  class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >위험관리 결과 보고서</label
                >
              </div>
              <div class="flex items-center mb-4">
                <input
                  id="default-checkbox"
                  type="checkbox"
                  v-model="selectedItem"
                  @click="selectSingle"
                  value="full_trace"
                  class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  for="default-checkbox"
                  class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >전체 증적</label
                >
              </div>
              <button
                type="button"
                @click="downloadDataBackup"
                :class="{ no_cursor: selectedItem.length == 0 }"
                :disabled="selectedItem.length == 0"
              >
                <img src="@/assets/icon/Download.svg" />다운로드
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <Loading
    :active="isLoading"
    :can-cancel="true"
    :on-cancel="onCancel"
    :is-full-page="fullPage"
  ></Loading>
</template>

<script>
import AddOnSettingService from "@/services/AddOnSettingService";
import validator from "validator";
import { errorMsg } from "@/config/Message";
import moment from "moment";
import Breadcrumb from "@/components/Breadcrumb.vue";
import Toast from "@/alert/alert.js";
import CommonService from "@/services/CommonService";
export default {
  name: "AddOnSetting",
  components: {
    Breadcrumb,
  },
  data() {
    return {
      number_of_login_attempts: "",
      errors: {},
      maximum_password_period: "",
      review_period_from: "",
      review_period_to: "",
      companyId: localStorage.getItem("compid"),
      allSelected: false,
      selectedItem: [],
      isLoading: false,
    };
  },
  created() {
    this.AddOnSettingService = new AddOnSettingService();
    this.commonService = new CommonService();
  },
  mounted() {
    this.addOnDetails();
    this.dateformat();
  },
  computed: {
    permission() {
      return this.$store.state.sideBar.permission.add_on_settings;
    },
  },
  methods: {
    addOnDetails() {
      this.AddOnSettingService.addOnDetails()
        .then((res) => {
          if (res.status == 200) {
            this.number_of_login_attempts = res.data.number_of_login_attempts;
            this.maximum_password_period = res.data.maximum_password_period;
            this.review_period_from = this.dateformat(
              res.data.review_period_from
            );
            this.review_period_to = this.dateformat(res.data.review_period_to);
          }
        })
        .catch((err) => {
          return;
        });
    },

    setLoginAttempts() {
      if (!validator.isNumeric(this.number_of_login_attempts.toString())) {
        this.errors.loginAttempts = errorMsg.numericCheck;
      } else {
        this.AddOnSettingService.setLoginAttempts(this.number_of_login_attempts)
          .then((res) => {
            if (res.status == 200) {
              this.addOnDetails();
              this.errors.loginAttempts = "";
              Toast.fire({ title: "수정이 완료되었습니다." });
            }
          })
          .catch((err) => {
            return;
          });
      }
    },
    setMaximumPasswordPeriod() {
      if (!validator.isNumeric(this.maximum_password_period.toString())) {
        this.errors.passwordPeriod = errorMsg.numericCheck;
      } else {
        this.AddOnSettingService.setMaxPasswordPeriod(
          this.maximum_password_period
        )
          .then((res) => {
            if (res.status == 200) {
              this.addOnDetails();
              this.errors.passwordPeriod = "";
              Toast.fire({ title: "수정이 완료되었습니다." });
            }
          })
          .catch((err) => {
            return;
          });
      }
    },
    updateReviewPeriod() {
      const getFormatedDate = (dt) => {
        const date = new Date(dt);
        return (
          date.getFullYear() +
          "-" +
          (date.getMonth() > 8
            ? date.getMonth() + 1
            : "0" + (date.getMonth() + 1)) +
          "-" +
          (date.getDate() > 9 ? date.getDate() : "0" + date.getDate())
        );
      };

      if (this.review_period_from == "") {
        this.errors.review_period_from = "시작일시를 입력해주세요";
      } else if (this.review_period_to == "") {
        this.errors.review_period_from = "종료일시를 입력해주세요";
      } else if (this.review_period_from > this.review_period_to) {
        this.errors.review_period_from =
          "'From' date should be less than 'to' Date";
      } else {
        this.AddOnSettingService.updateReviewPeriod(
          getFormatedDate(this.review_period_from),
          getFormatedDate(this.review_period_to)
        )
          .then((res) => {
            if (res.status == 200) {
              this.addOnDetails();
              this.errors.review_period_from = "";
              Toast.fire({ title: "수정이 완료되었습니다." });
              this.$store.state.header.certificationAudit = "updated";
            }
          })
          .catch((err) => {
            return;
          });
      }
    },
    dateformat(value) {
      if (value) {
        return moment(String(value)).format("YYYY-MM-DD");
      }
    },
    resetDate() {
      this.review_period_from = "";
      this.review_period_to = "";
    },
    // get date api
    getReviewDate() {
      if (this.companyId) {
        this.commonService
          .companyReviewDate(this.companyId)
          .then((res) => {
            if (res.status == 200) {
              this.startDate = moment(
                String(res.data.review_start_date)
              ).format("YYYY/MM/DD");
              this.endDate = moment(String(res.data.review_end_date)).format(
                "YYYY/MM/DD"
              );
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },

    // all threat select check box
    selectAll() {
      if (!this.allSelected) {
        const selected = [
          "asset_ledger",
          "network_diagram",
          "full_trace",
          "risk",
          "management_diagnosis",
        ];
        this.selectedItem = selected;
      } else {
        this.selectedItem = [];
      }
    },

    // checkbox select event
    selectSingle(event) {
      this.allSelected = false;
      const value = event.target.value;
      const click = event.target.checked;
      if (click) {
        this.selectedItem.push(value);
      } else {
        this.selectedItem.splice(this.selectedItem.indexOf(value), 1);
      }
    },

    downloadDataBackup() {
      this.isLoading = true;
      this.AddOnSettingService.dataBackup(
        localStorage.getItem("uid"),
        localStorage.getItem("compid"),
        this.selectedItem
      ).then((res) => {
        if (res.status == 200) {
          const url = `${process.env.VUE_APP_API_BASE_URL}/download/file?url=${res.data.path}&type=unlink`; // later required base url to dynamic
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", "DataBackup");
          document.body.appendChild(link);
          link.click();
          this.isLoading = false;
        } else if (res.response.status == 401) {
          this.isLoading = false;
          Toast.fire({ title: res.response.data.error });
        } else {
          this.isLoading = false;
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.date {
  width: 100%;
  height: 45px;
  border: 1px solid #a4a4a4;
  /* background: url(http://localhost:8080/img/dropdown.e4a705e7.svg) no-repeat center right 15px; */
  border-radius: 5px;
  padding: 0 20px;
}
</style>
