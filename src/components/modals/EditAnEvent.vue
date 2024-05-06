<template>
  <div class="modal-overlap waitingcompanyapproval z-10">
    <div
      class="
        modal-dialog modal-dialog-centered
        relative
        w-auto
        pointer-events-none
      "
    >
      <div
        class="
          modal-content
          border-none
          shadow-lg
          relative
          flex flex-col
          w-full
          pointer-events-auto
          bg-white bg-clip-padding
          rounded-md
          outline-none
          text-current
        "
      >
        <div
          class="
            modal-header
            flex flex-shrink-0
            items-center
            justify-between
            p-4
            rounded-t-md
          "
        >
          <h5 class="text-xl font-medium leading-normal text-gray-800">
            일정 수정하기
          </h5>
          <button
            type="button"
            class="
              btn-close
              box-content
              w-4
              h-4
              p-1
              text-black
              border-none
              rounded-none
              opacity-50
              focus:shadow-none focus:outline-none focus:opacity-100
              hover:text-black hover:opacity-75 hover:no-underline
            "
            aria-label="Close"
            @click="close"
          ></button>
        </div>
        <div class="modal-body relative">
          <div class="calender-modal">
            <div class="title_wrap">
              <h4>일정 제목</h4>
              <input
                type="text"
                placeholder="일정 제목"
                v-model="schedule_title"
              />
              <span class="error-msg">{{ error.schedule_title }}</span>
              <div class="flex items-center checkbox-wrap">
                <input
                  id="link-checkbox2"
                  type="checkbox"
                  @change="updateEventTypeStatus"
                  :checked="schedule_type == 'common' ? true : false"
                  class="
                    w-4
                    h-4
                    text-blue-600
                    bg-gray-100
                    rounded
                    border-gray-300
                    dark:ring-offset-gray-800
                    dark:bg-gray-700 dark:border-gray-600
                  "
                />
                <label
                  for="link-checkbox2"
                  class="
                    ml-2
                    text-sm
                    font-medium
                    text-gray-900
                    dark:text-gray-300
                  "
                  >공통</label
                >
              </div>
            </div>
            <div class="date-wrap">
              <div class="start-date">
                <h4>시작 날짜</h4>
                <div class="input-group">
                  <!-- <input
                    type="date"
                    @change="changeStartDate"
                    onfocus="this.min=new Date().toISOString().split('T')[0]"
                    v-model="schedule_start_date"
                    placeholder="DD/MM/YYYY"
                    onkeydown="return false"
                  /> -->
                  <Datepicker
                    v-model="schedule_start_date"
                    :enableTimePicker="false"
                    placeholder="선택"
                    format="yyyy-MM-dd"
                    type="date"
                    :minDate="new Date()"
                    locale="ko"
                    cancelText="취소"
                    selectText="선택"
                    @click="changeStartDate"
                  />
                  <input
                    type="time"
                    :disabled="
                      schedule_event_type2 == 'all_day' ||
                      schedule_event_type == 'all_day'
                    "
                    v-model="schedule_start_time"
                    placeholder=""
                    onkeydown="return false"
                  />
                </div>
                <span class="error-msg">{{ error.schedule_start_date }}</span>
              </div>
              <div class="start-date">
                <h4>종료 날짜</h4>
                <div class="input-group">
                  <!-- <input
                    type="date"
                    :min="schedule_start_date"
                    :disabled="
                      schedule_event_type2 == 'all_day' ||
                      schedule_event_type == 'all_day'
                    "
                    v-model="schedule_end_date"
                    placeholder="DD/MM/YYYY"
                    onkeydown="return false"
                  /> -->
                  <Datepicker
                    v-model="schedule_end_date"
                    :enableTimePicker="false"
                    placeholder="선택"
                    format="yyyy-MM-dd"
                    type="date"
                    :minDate="schedule_start_date"
                    locale="ko"
                    cancelText="취소"
                    selectText="선택"
                    :disabled="
                      schedule_event_type2 == 'all_day' ||
                      schedule_event_type == 'all_day'
                    "
                  />
                  <input
                    type="time"
                    :disabled="
                      schedule_event_type2 == 'all_day' ||
                      schedule_event_type == 'all_day'
                    "
                    placeholder=""
                    v-model="schedule_end_time"
                    onkeydown="return false"
                  />
                </div>
                <span class="error-msg">{{ error.schedule_end_date }}</span>
              </div>
              <div class="flex items-center checkbox-wrap">
                <input
                  id="link-checkbox"
                  type="checkbox"
                  :checked="schedule_event_type == 'all_day' ? true : false"
                  @change="updateEventStatus"
                  class="
                    w-4
                    h-4
                    text-blue-600
                    bg-gray-100
                    rounded
                    border-gray-300
                    dark:ring-offset-gray-800
                    dark:bg-gray-700 dark:border-gray-600
                  "
                />
                <label
                  for="link-checkbox"
                  class="
                    ml-2
                    text-sm
                    font-medium
                    text-gray-900
                    dark:text-gray-300
                  "
                  >하루 종일</label
                >
              </div>
            </div>
            <div class="notificetion_wrap">
              <h4>알림설정</h4>
              <div class="radio_wrap">
                <div class="flex items-center radio">
                  <input
                    :checked="schedule_notification_type == 'notify_message'"
                    v-model="schedule_notification_type"
                    id="notification-radio-1"
                    type="radio"
                    value="notify_message"
                    class="
                      w-4
                      h-4
                      text-blue-600
                      bg-gray-100
                      border-gray-300
                      dark:ring-offset-gray-800
                      dark:bg-gray-700 dark:border-gray-600
                    "
                  />
                  <label
                    for="notification-radio-1"
                    class="
                      ml-2
                      text-sm
                      font-medium
                      text-gray-900
                      dark:text-gray-300
                    "
                    >알림 메시지</label
                  >
                </div>
                <div class="flex items-center radio">
                  <input
                    :checked="schedule_notification_type == 'mail_send'"
                    v-model="schedule_notification_type"
                    id="notification-radio-2"
                    type="radio"
                    value="mail_send"
                    class="
                      w-4
                      h-4
                      text-blue-600
                      bg-gray-100
                      border-gray-300
                      dark:ring-offset-gray-800
                      dark:bg-gray-700 dark:border-gray-600
                    "
                  />
                  <label
                    for="notification-radio-2"
                    class="
                      ml-2
                      text-sm
                      font-medium
                      text-gray-900
                      dark:text-gray-300
                    "
                    >이메일</label
                  >
                </div>
              </div>
            </div>
            <div class="details_wrap">
              <h4>일정 상세 내용</h4>
              <textarea
                placeholder="일정 상세 내용"
                v-model="schedule_details"
              ></textarea>
              <span class="error-msg">{{ error.schedule_details }}</span>
            </div>
            <div class="notificetion_wrap">
              <h4>색상 설정</h4>
              <div class="radio_wrap">
                <div class="flex items-center radio-color">
                  <input
                    :checked="schedule_notification_color_setting == '#ec3007'"
                    v-model="schedule_notification_color_setting"
                    id="default-radio-1"
                    type="radio"
                    value="#ec3007"
                    name="default-radio"
                    class="
                      w-4
                      h-4
                      text-blue-600
                      bg-gray-100
                      border-gray-300
                      dark:ring-offset-gray-800
                      dark:bg-gray-700 dark:border-gray-600
                    "
                  />
                  <label
                    for="default-radio-1"
                    class="
                      ml-2
                      text-sm
                      font-medium
                      text-gray-900
                      dark:text-gray-300
                      color
                      red
                    "
                  ></label>
                </div>
                <div class="flex items-center radio-color">
                  <input
                    :checked="schedule_notification_color_setting == '#fb8832'"
                    v-model="schedule_notification_color_setting"
                    id="default-radio-2"
                    type="radio"
                    value="#fb8832"
                    name="default-radio"
                    class="
                      w-4
                      h-4
                      text-blue-600
                      bg-gray-100
                      border-gray-300
                      dark:ring-offset-gray-800
                      dark:bg-gray-700 dark:border-gray-600
                    "
                  />
                  <label
                    for="default-radio-2"
                    class="
                      ml-2
                      text-sm
                      font-medium
                      text-gray-900
                      dark:text-gray-300
                      color
                      orange
                    "
                  ></label>
                </div>
                <div class="flex items-center radio-color">
                  <input
                    :checked="schedule_notification_color_setting == '#f5c739'"
                    v-model="schedule_notification_color_setting"
                    id="default-radio-3"
                    type="radio"
                    value="#f5c739"
                    name="default-radio"
                    class="
                      w-4
                      h-4
                      text-blue-600
                      bg-gray-100
                      border-gray-300
                      dark:ring-offset-gray-800
                      dark:bg-gray-700 dark:border-gray-600
                    "
                  />
                  <label
                    for="default-radio-3"
                    class="
                      ml-2
                      text-sm
                      font-medium
                      text-gray-900
                      dark:text-gray-300
                      color
                      yellow
                    "
                  ></label>
                </div>
                <div class="flex items-center radio-color">
                  <input
                    :checked="schedule_notification_color_setting == '#51c434'"
                    v-model="schedule_notification_color_setting"
                    id="default-radio-4"
                    type="radio"
                    value="#51c434"
                    name="default-radio"
                    class="
                      w-4
                      h-4
                      text-blue-600
                      bg-gray-100
                      border-gray-300
                      dark:ring-offset-gray-800
                      dark:bg-gray-700 dark:border-gray-600
                    "
                  />
                  <label
                    for="default-radio-4"
                    class="
                      ml-2
                      text-sm
                      font-medium
                      text-gray-900
                      dark:text-gray-300
                      color
                      green
                    "
                  ></label>
                </div>
                <div class="flex items-center radio-color">
                  <input
                    :checked="schedule_notification_color_setting == '#007aff'"
                    v-model="schedule_notification_color_setting"
                    id="default-radio-5"
                    type="radio"
                    value="#007aff"
                    name="default-radio"
                    class="
                      w-4
                      h-4
                      text-blue-600
                      bg-gray-100
                      border-gray-300
                      dark:ring-offset-gray-800
                      focus:ring-
                      dark:bg-gray-700 dark:border-gray-600
                    "
                  />
                  <label
                    for="default-radio-5"
                    class="
                      ml-2
                      text-sm
                      font-medium
                      text-gray-900
                      dark:text-gray-300
                      color
                      blue
                    "
                  ></label>
                </div>
                <div class="flex items-center radio-color">
                  <input
                    :checked="schedule_notification_color_setting == '#8c26dd'"
                    v-model="schedule_notification_color_setting"
                    id="default-radio-6"
                    type="radio"
                    value="#8c26dd"
                    name="default-radio"
                    class="
                      w-4
                      h-4
                      text-blue-600
                      bg-gray-100
                      border-gray-300
                      dark:ring-offset-gray-800
                      dark:bg-gray-700 dark:border-gray-600
                    "
                  />
                  <label
                    for="default-radio-6"
                    class="
                      ml-2
                      text-sm
                      font-medium
                      text-gray-900
                      dark:text-gray-300
                      color
                      perple
                    "
                  ></label>
                </div>
              </div>
            </div>
            <div class="share_wrap">
              <h4>일정 공유하기</h4>
              <div class="addition">
                <input
                  v-if="userEmail.length == 0"
                  v-model="userEmail3"
                  placeholder="공유자 입력"
                  readonly
                />
                <input
                  v-else
                  v-model="userEmail"
                  placeholder="공유자 입력"
                  readonly
                />
                <button
                  type="button"
                  class="grey bordered"
                  @click="addCalender"
                >
                  추가하기
                </button>
              </div>
            </div>
          </div>
        </div>
        <div
          class="
            modal-footer
            flex flex-shrink-0
            items-center
            justify-center
            p-4
            rounded-b-md
          "
        >
          <button
            type="button"
            class="
              gray
              full-button
              px-6
              py-2.5
              text-white
              font-medium
              text-xs
              leading-tight
              uppercase
              rounded
              focus:outline-none focus:ring-0
              transition
              duration-150
              ease-in-out
            "
            @click="editAnEvent"
            v-if="
              permission == 'edit' ||
              this.$store.state.signin.is_user_admin == 'y'
            "
          >
            수정완료
          </button>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import moment from "moment";
import ScheduleManagementService from "@/services/ScheduleManagementService";
import scheduleValidation from "@/validation/scheduleValidation";

export default {
  name: "EditAnEvent",
  // props: ['id', 'details','userId','userEmail'],
  props: {
    id: Number,
    details: Object,
    userId: Array,
    userEmail: Array,
  },
  data() {
    return {
      schedule_title: this.details.schedule_title,
      schedule_type: this.details.schedule_type,
      schedule_event_type: this.details.schedule_event_type,
      schedule_start_date: this.dateformat(this.details.schedule_start_date),
      schedule_end_date: this.dateformat(this.details.schedule_end_date),
      schedule_start_time: this.dateformat2(this.details.schedule_start_date),
      schedule_end_time: this.dateformat2(this.details.schedule_end_date),
      schedule_notification_type: this.details.schedule_notification_type,
      schedule_details: this.details.schedule_details,
      schedule_notification_color_setting:
        this.details.schedule_notification_color_setting,
      selected_user_id: [],
      selected_user_email: this.details.exist_share_users,
      userEmail3: [],
      newUserEmail: "",
      newUserId: [],
      error: {},
      schedule_event_type2: "",
      schedule_type2: "",
    };
  },
  created() {
    this.ScheduleManagementService = new ScheduleManagementService();
  },
  computed: {
    permission() {
      return this.$store.state.sideBar.permission.schedule_management;
    },
  },
  beforeMount() {
    for (let i = 0; i < this.selected_user_email.length; i++) {
      this.userEmail3.push(this.selected_user_email[i].email);
      this.selected_user_id.push(this.selected_user_email[i].user_id);
    }
  },
  mounted() {
    this.dateformat();
    this.dateformat2();
  },
  methods: {
    dateformat(value) {
      if (value) {
        return moment(String(value)).utc().format("YYYY-MM-DD");
      }
    },
    dateformat2(value) {
      if (value) {
        return moment(String(value)).utc().format("HH:mm");
      }
    },
    close() {
      this.$emit("close");
    },
    addCalender() {
      this.$emit("isaddCalnder");
      if (this.userId.length == 0) {
        this.$emit("updatedCalendarUserId", this.selected_user_id);
        this.$emit("updatedCalendarUserEmail", this.userEmail3);
      } else {
        this.$emit("updatedCalendarUserId", this.userId);
        this.$emit("updatedCalendarUserEmail", this.userEmail);
      }
    },
    changeStartDate() {
      this.schedule_end_date = "";
    },
    checkError() {
      let event_data = {
        schedule_title: this.schedule_title,
        schedule_details: this.schedule_details,
        schedule_start_date: this.schedule_start_date,
        schedule_end_date: this.schedule_end_date,
        schedule_start_time: this.schedule_start_time,
        schedule_end_time: this.schedule_end_time,
        schedule_event_type: this.schedule_event_type,
      };

      const { isInvalid, error } = scheduleValidation(event_data);

      if (isInvalid) {
        this.error = error;
        return false;
      } else {
        this.error = {};
        return true;
      }
    },
    updateEventStatus(e) {
      if (e.target.checked) {
        this.schedule_event_type2 = "all_day";
        this.schedule_event_type = false;
      } else {
        this.schedule_event_type2 = "time_period";
        this.schedule_event_type = "";
      }
    },
    updateEventTypeStatus(e) {
      if (e.target.checked) {
        this.schedule_type2 = "common";
      } else {
        this.schedule_type2 = "individual";
      }
    },
    editAnEvent() {
      if (!this.checkError()) {
        return;
      } else {
        if (this.userEmail.length > 0) {
          this.newUserEmail = this.userEmail.join();
        } else {
          if (this.userEmail3.length > 0) {
            this.newUserEmail = this.userEmail3.join();
          } else {
            this.newUserEmail = " ";
          }
        }

        if (this.userId.length > 0) {
          this.newUserId = this.userId;
        } else {
          this.newUserId = this.selected_user_id;
        }

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

        let event_data = {
          id: this.id,
          schedule_title: this.schedule_title,
          schedule_type: this.schedule_type2
            ? this.schedule_type2
            : this.schedule_type,
          schedule_event_type: this.schedule_event_type2
            ? this.schedule_event_type2
            : this.schedule_event_type,
          schedule_start_date:
          getFormatedDate(this.schedule_start_date) + " " + this.schedule_start_time,
          schedule_end_date:
            this.schedule_event_type2 == "all_day"
              ? getFormatedDate(this.schedule_start_date) + " " + this.schedule_start_time
              : getFormatedDate(this.schedule_end_date) + " " + this.schedule_end_time,
          schedule_notification_type: this.schedule_notification_type,
          schedule_details: this.schedule_details,
          schedule_notification_color_setting:
            this.schedule_notification_color_setting,
          selected_user_id: this.newUserId,
          selected_user_email: this.newUserEmail,
        };
        console.log(event_data);
        console.log(this.schedule_end_date);

        this.ScheduleManagementService.editEvent(event_data).then((res) => {
          if (res.status == 200) {
            this.$emit("updateList");
            this.$emit("close");
          }
        });
      }
    },
  },
};
</script>

<style lang="scss">
</style>