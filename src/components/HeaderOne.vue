<template>
  <div v-click-outside="onClickOutside">
    <header>
      <div class="main-header flex">
        <div class="header_left flex">
          <div class="hamburger_icon" @click="hide">
            <a href="#"><img src="@/assets/icon/hamburger.svg" /></a>
          </div>
          <div class="logo" @click="hideSidebar">
            <router-link :to="{ name: 'HomeVue' }"
              ><img src="@/assets/images/logo.png"
            /></router-link>
          </div>
          <ul class="select_wrap flex" v-show="islogin" @click="hideSidebar">
            <!-- add this if you need to active company dropdown conditonally :disabled="isChoice == 'our_choice' ? false : true" -->
            <li>
              <select @change="selectCompany($event)">
                <option
                  :selected="item.id == $store.state.signin.company_id"
                  v-for="(item, index) of companyNameList"
                  :key="index"
                  :value="item.id"
                  :disabled="item.company_status == 'active' ? false : true"
                >
                  {{ item.company_name }}
                </option>
              </select>
            </li>
            <li>
              <select @change="setCertification($event)">
                <option
                  v-for="(item, index) of certificationNameList"
                  :selected="
                    item.certification == $store.state.header.certificate
                  "
                  :value="item.certification"
                  :key="index"
                >
                  {{ item.certification }}
                </option>
              </select>
            </li>
          </ul>
        </div>
        <div class="header_right flex" @click="hideSidebar">
          <!-- if user loged in -->
          <template v-if="islogin">
            <div class="certification_wrap">
              <a href="#"
                >인증심사: D-{{ certificationRemainingDays }} ({{ startDate }} -
                {{ endDate }})</a
              >
            </div>

            <div class="notification_wrap" id="myDropdown">
              <a
                href="#"
                id="dropdownMenuButton1"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <img
                  src="@/assets/icon/notifiction.svg"
                  v-if="updatedNotifications.length"
                />
                <img src="@/assets/icon/no-notification.svg" v-else />
              </a>
              <div
                class="dropdown-menu min-w-max absolute hidden bg-white text-base z-50 float-left list-none text-left mt-1 hidden m-0 bg-clip-padding border-none"
              >
                <div class="data_show" v-if="updatedNotifications.length">
                  <ul
                    class="notification-dropdown"
                    aria-labelledby="dropdownMenuButton1"
                    @scroll="handleScroll"
                  >
                    <li
                      v-for="(item, index) of updatedNotifications"
                      :key="index"
                    >
                      <a
                        class="dropdown-item w-full notification_main_wrap flex"
                        @click="$router.push(`/${item.link}`)"
                      >
                        <div class="inner_wrap">
                          <div class="notification_head flex">
                            <div class="left_wrap flex">
                              <img
                                src="@/assets/icon/n_1.svg"
                                v-if="item.iconType == 'announcement'"
                              />
                              <img
                                src="@/assets/icon/n_2.svg"
                                v-if="item.iconType == 'schedule'"
                              />
                              <img
                                src="@/assets/icon/n_3.svg"
                                v-if="item.iconType == 'message'"
                              />
                              <img
                                src="@/assets/icon/n_4.svg"
                                v-if="item.iconType == 'classification'"
                              />
                              <p>{{ item.title }}</p>
                            </div>
                            <div class="time">
                              <p>{{ timeFormat(item.time) }}</p>
                            </div>
                          </div>
                          <div class="notification_sub">
                            <p>{{ item.text }}</p>
                          </div>
                        </div>
                        <div
                          class="cancel_wrap"
                          @click="notificationDelete(item, index)"
                        >
                          <img src="@/assets/icon/cut.svg" />
                        </div>
                      </a>
                    </li>
                  </ul>
                  <div class="notif_button">
                    <button type="button" @click="getReadNotification">
                      모두 읽음
                    </button>
                  </div>
                </div>
                <div class="no_data_show" v-else>
                  <p>새로온 알림이 없습니다.</p>
                </div>
              </div>
            </div>
            <div class="profile_wrap flex">
              <img src="@/assets/icon/profile.svg" />
              <button
                type="button"
                class="dropdown-toggle profiledropdown flex"
                id="dropdownMenuButton1"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {{
                  this.$store.state.header.email
                    ? this.$store.state.header.email
                    : "user@email.com"
                }}
                <img src="@/assets/icon/dropdown.svg" />
              </button>
              <ul
                class="mail_dropdown dropdown-menu min-w-max absolute hidden bg-white text-base z-50 float-left py-2 list-none text-left rounded-lg shadow-lg mt-1 hidden m-0 bg-clip-padding border-none"
                aria-labelledby="dropdownMenuButton1"
              >
                <li>
                  <a
                    class="dropdown-item text-sm py-2 px-4 font-normal block w-full bg-transparent text-gray-700"
                    href="#"
                    @click="
                      if (this.$route.name != 'ChangeUserInformation') {
                        isVerifyModal = true;
                      }
                    "
                    >정보변경</a
                  >
                </li>
                <li>
                  <a
                    class="dropdown-item text-sm py-2 px-4 font-normal block w-full bg-transparent text-gray-700"
                    href="#"
                    @click="this.$router.push({ name: 'ElectronicPayment' })"
                    >전자 결재</a
                  >
                </li>
                <li>
                  <router-link
                    class="dropdown-item text-sm py-2 px-4 font-normal block w-full bg-transparent text-gray-700"
                    :to="{ name: 'UserClickMessage' }"
                    >메시지</router-link
                  >
                </li>
                <li>
                  <router-link
                    class="dropdown-item text-sm py-2 px-4 font-normal block w-full bg-transparent text-gray-700"
                    to
                    @click="logout"
                    >로그아웃</router-link
                  >
                </li>
              </ul>
            </div>
          </template>
          <!-- if user loged in -->

          <!-- if no user login -->
          <template v-if="!islogin">
            <div class="btn_wrap flex style-1">
              <button
                type="button"
                class="gray signup_button mr-4"
                @click="this.$router.push({ name: 'SignUpCompanyCode' })"
              >
                회원가입
              </button>
              <button
                type="button"
                class="blue-outline signin_button"
                @click="this.$router.push({ name: 'LogIn' })"
              >
                로그인
              </button>
            </div>
          </template>
          <!-- if no user login -->
        </div>
      </div>
    </header>
    <SideBarVue v-show="isShow && $store.state.header.token" />
  </div>
  <!-- verify password modal -->
  <VerifyModal
    v-show="isVerifyModal"
    @close="closeModal"
    @currentPassword="current_Password($event)"
  />
  <!-- <VerifyModal
    v-show="isVerifyModal"
    @close="closeModal"
    @ispasswordVerified="passwordVerified"
    @currentPassword="current_Password($event)"
  /> -->
</template>

<script>
import ChangeUserInfoService from "@/services/ChangeUserInfoService";
import { inject } from "vue";
import SideBarVue from "./SideBar.vue";
import CommonService from "@/services/CommonService";
import moment from "moment";
import vClickOutside from "click-outside-vue3";
import Toast from "@/alert/alert.js";
import VerifyModal from "@/pages/changeuserinformation/VerifyPasswordWithTheCurrentPassword.vue";

export default {
  name: "HeaderOne",
  components: {
    SideBarVue,
    VerifyModal,
  },
  data() {
    return {
      isShow: false,
      islogin: localStorage.getItem("token"),
      companyId: localStorage.getItem("compid"),
      compName: localStorage.getItem("compName"),
      startDate: "",
      endDate: "",
      companyNameList: [],
      certificationNameList: [],
      certification_name: "",
      npage: 1,
      nlimit: 5,
      notifications: [],
      updatedNotifications: [],
      // newNotifications: this.$store.state.notificationList,
      certificationRemainingDays: "",
      isChoice: "",
      isVerifyModal: false,
      currentPassword: "********",
    };
  },
  setup() {
    const common = inject("common");
    return { common };
  },
  created() {
    this.commonService = new CommonService();
    this.ChangeUserInfoService = new ChangeUserInfoService();
  },
  watch: {
    "$store.state.header.token": function (newVal, oldVal) {
      this.islogin = newVal;
      // console.log(this.islogin)
      if (this.islogin) {
        this.getReviewDate();
        this.getCompanyName();
        this.getCertificationName();
        this.getUserInfo();
      }
    },
    "$store.state.header.certificationAudit": function (newVal, oldVal) {
      if (newVal != oldVal && newVal) {
        this.getReviewDate();
      }
    },
    "$store.state.signin.company_id": function (newVal, oldVal) {
      if (newVal != oldVal && newVal) {
        // console.log('header-copany id', newVal)
        this.companyId = newVal;
        this.getReviewDate();
        this.getCertificationName();
      }
    },
    "$store.state.notificationList": function (value) {
      if (value) {
        // console.log('value', value);
        this.updatedNotifications.unshift(value);
      } else {
        // this.localMessages=[];
        console.log("no value", value);
      }
    },
    "$store.state.companyAccess": function (newVal, oldVal) {
      if (newVal != oldVal && newVal) {
        this.getUserInfo();
      }
    },
  },
  mounted() {
    this.getIp();
    this.getUserInfo();
    this.getReviewDate();
    this.getCompanyName();
    this.getCertificationName();
    this.getNotifications(this.npage);
    // console.log(this.newNotifications)
    // this.updatedNotifications.push(this.$store.state.notificationList)
    $("#myDropdown .dropdown-menu").on({
      click: function (e) {
        e.stopPropagation();
      },
    });
  },
  updated() {
    this.islog();
  },
  directives: {
    clickOutside: vClickOutside.directive,
  },
  methods: {
    getIp() {
      fetch("https://api.ipify.org?format=json")
        .then((response) => response.json())
        .then((response) => {
          localStorage.setItem("ip_address", response.ip);
          // console.log("ip address", response.ip);
        });
    },

    getUserInfo() {
      this.ChangeUserInfoService.getUserInfo()
        .then((res) => {
          if (res.status == 200) {
            this.isChoice = res.data.access_company_type;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },

    islog() {
      if (localStorage.token) {
        // alert(localStorage.token);
        this.islogin = true;
      }
    },

    // sidebar show hide

    hide() {
      this.isShow ? (this.isShow = false) : (this.isShow = true);
    },
    onClickOutside(event) {
      // console.log('Clicked outside. Event: ', event)
      if (this.isShow == true) {
        this.isShow = false;
      }
    },
    hideSidebar() {
      if (this.isShow == true) {
        this.isShow = false;
      }
    },
    // dropdown
    selectCompany(event) {
      localStorage.setItem("compid", event.target.value);
      let company = this.companyNameList.find(
        (i) => i.id == event.target.value
      );
      localStorage.setItem("compName", company.company_name);
      this.$store.dispatch("signin/updateUserCredential", {
        user_id: localStorage.getItem("uid"),
        company_id: event.target.value,
        company_name: company.company_name,
      });
      this.userChangeCompany(event.target.value);
    },

    // change compnay
    userChangeCompany(company_id) {
      this.commonService
        .changeCompnay(company_id)
        .then((res) => {
          // console.log(res)
          if (res.status == 200) {
            if (res.data.lisence_expiration_remaining_date < 2) {
              Toast.fire({ title: "Unable to connect. Please check license." });
              setTimeout(() => {
                this.logout();
              }, 2600);
            }
            localStorage.setItem("tokenExpiry", res.data.access_token_expiry);
            localStorage.setItem("userAdmin", res.data.is_user_admin);
            localStorage.setItem("uEmail", res.data.email);
            localStorage.setItem("compName", res.data.company_name);
            localStorage.setItem("compid", res.data.company_id);
            localStorage.setItem("uid", res.data.user_id);
            localStorage.setItem("token", res.data.access_token);
            window.location.href = "";
          } else if (res.response.status == 400) {
            if (res.response.data.error.password_expired == "y") {
              Toast.fire({ title: res.response.data.error.message });
              this.$router.push(
                `/PasswordResetPage/${localStorage.getItem("uid")}`
              );
              localStorage.clear();
              this.$store.dispatch("signin/updateUserCredential", {
                user_id: "",
                company_id: "",
                company_name: "",
                is_user_admin: "",
              });
              this.$store.dispatch("header/getToken", "");
            }
          }
        })
        .catch((err) => {
          return false;
        });
    },
    // get date api
    getReviewDate() {
      if (this.$store.state.signin.company_id) {
        this.commonService
          .companyReviewDate(this.$store.state.signin.company_id)
          .then((res) => {
            if (res.status == 200) {
              this.startDate = res.data.review_start_date
                ? moment(String(res.data.review_start_date)).format(
                    "YYYY년 M월 D일"
                  )
                : "";
              this.endDate = res.data.review_end_date
                ? moment(String(res.data.review_end_date)).format(
                    "YYYY년 M월 D일"
                  )
                : "";
              this.$store.state.header.certificationAudit = "";
              this.certificationRemainingDays = res.data.remaining_counts;
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    // get company name list api
    getCompanyName() {
      if (this.$store.state.signin.company_id) {
        this.commonService
          .companyName()
          .then((res) => {
            if (res.status == 200) {
              this.companyNameList = res.data.company_list;
              // this.companyNameList.filter((x) => {
              //   if (x.id == this.companyId) {
              //     // console.log(x.company_name)
              //     // console.log(this.companyNameList[0].company_name)
              //     this.companyNameList[0].company_name = x.company_name;
              //   }
              // })
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    // get certification name list api
    getCertificationName() {
      if (this.$store.state.signin.company_id) {
        this.commonService
          .certificationName(this.$store.state.signin.company_id)
          .then((res) => {
            if (res.status == 200) {
              this.certificationNameList = res.data.certification_list;

              if (!localStorage.getItem("certificationName")) {
                this.certification_name =
                  res.data.certification_list[0].certification;
                localStorage.setItem(
                  "certificationName",
                  this.certification_name
                );
                this.$store.dispatch(
                  "header/getCertificate",
                  this.certification_name
                );
              }
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    logout() {
      localStorage.clear();
      this.$store.dispatch("signin/updateUserCredential", {
        user_id: "",
        company_id: "",
        company_name: "",
        is_user_admin: "",
      });
      this.$store.dispatch("header/getToken", "");
      this.$router.push({ name: "LogIn" });
      this.getIp();
      // setTimeout(() => {
      //   this.$router.replace({ name: 'LogIn' });
      // }, 2000);
    },

    setCertification(event) {
      localStorage.setItem("certificationName", event.target.value);
      this.$store.dispatch("header/getCertificate", event.target.value);
      window.location.href = "";
    },

    // notificatios

    // get notifications on scroll
    handleScroll(el) {
      if (
        el.srcElement.offsetHeight + el.srcElement.scrollTop >=
        el.srcElement.scrollHeight
      ) {
        let newPage = ++this.npage;
        this.getNotifications(newPage);
      }
    },
    // get notifications
    getNotifications(npage) {
      this.commonService
        .notification(npage, this.nlimit)
        .then((res) => {
          if (res.status == 200) {
            this.notifications = res.data.user_notification;
            // console.log('this.notifications-----', this.notifications)
            this.updatedNotifications.push(...this.notifications);
            for (let i = 0; i < this.notifications.length; i++) {
              this.notifications[i]["title"] = "";
              if (this.notifications[i].iconType == "announcement") {
                this.notifications[i].title = "공지사항";
              } else if (this.notifications[i].iconType == "schedule") {
                this.notifications[i].title = "오늘의 일정";
              } else if (this.notifications[i].iconType == "message") {
                this.notifications[i].title = "메시지";
              } else if (this.notifications[i].iconType == "classification") {
                this.notifications[i].title = "알림";
              }
            }
            // console.log(this.updatedNotifications)
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // read all notification
    getReadNotification() {
      this.commonService
        .readAll()
        .then((res) => {
          if (res.status == 200) {
            this.updatedNotifications = [];
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // delete notification
    notificationDelete(item, index) {
      // console.log('deleted---------------------->', item)
      // alert(index)
      this.commonService
        .deleteNotification(item.id)
        .then((res) => {
          console.log("deleted", res.response);
          if (res.status == 200) {
            this.updatedNotifications.splice(index, 1);
            this.getNotifications(this.npage);
          } else if (res.response.status == 400) {
            Toast.fire({ title: res.response.data.error });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    timeFormat(value) {
      if (value) {
        let todayDate = moment(String(new Date())).format("YYYY-MM-DD HH:mm");
        let newDate = moment(String(value)).format("YYYY-MM-DD HH:mm");

        // let getDiff = (Math.abs(new Date(todayDate) - new Date(newDate))) / (1000 * 60 * 60)
        // console.log(Math.floor(getDiff))

        // if (Math.floor(getDiff) > 24 && todayDate !=newDate) {
        //   return moment(String(value)).format("YYYY-MM-DD");
        // }
        // else if (Math.floor(getDiff) <= 24 && todayDate !=newDate) {
        //   return value = `${Math.floor(getDiff)}H ago`
        // }
        // else if (Math.floor(getDiff) < 24 && todayDate !=newDate) {
        //   return value = `yesterday ${moment(String(value)).format("HH:mm")}`
        // }
        // else if (Math.floor(getDiff) == 24) {
        //   return value = '24H ago'
        // }
        if (todayDate != newDate) {
          return moment(String(value)).format("YYYY-MM-DD");
        } else {
          return moment(String(value)).format("HH:mm");
        }
      }
    },
    closeModal() {
      this.isVerifyModal = false;
    },
    current_Password(e) {
      this.currentPassword = e;
      if (e) {
        this.$router.push({ name: "ChangeUserInformation" });
      }
    },
  },
};
</script>
