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
            일정 추가하기
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
              <div
                class="form"
                :class="error.schedule_title ? 'field-error' : ''"
              >
                <h4>일정 제목</h4>
                <input
                  type="text"
                  placeholder="일정 제목"
                  v-model="schedule_title"
                />
                <span>{{ error.schedule_title }}</span>
              </div>
              <div class="flex items-center checkbox-wrap">
                <input
                  id="link-checkbox"
                  type="checkbox"
                  v-model="schedule_type"
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
                    onfocus="this.min=new Date().toISOString().split('T')[0]"
                    @click="changeStartDate"
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
                    v-model="schedule_start_time"
                    :disabled="schedule_event_type == true"
                    onkeydown="return false"
                  />
                </div>
                <span class="error-msg">{{ error.schedule_start_date }}</span>
              </div>
              <div class="start-date m-t-30">
                <h4>종료 날짜</h4>
                <div class="input-group">
                  <!-- <input
                    type="date"
                    :min="schedule_start_date"
                    v-model="schedule_end_date"
                    placeholder="DD/MM/YYYY"
                    :disabled="!schedule_start_date || schedule_event_type==true"
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
                      !schedule_start_date || schedule_event_type == true
                    "
                  />
                  <input
                    type="time"
                    v-model="schedule_end_time"
                    :disabled="
                      !schedule_start_date || schedule_event_type == true
                    "
                    onkeydown="return false"
                  />
                </div>
                <span class="error-msg">{{ error.schedule_end_date }}</span>
              </div>
              <div class="flex items-center checkbox-wrap">
                <input
                  id="link-checkbox"
                  type="checkbox"
                  v-model="schedule_event_type"
                  value="all_day"
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
                    checked
                    id="default-radio-1"
                    type="radio"
                    value="notify_message"
                    v-model="schedule_notification_type"
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
                    "
                    >알림 메시지</label
                  >
                </div>
                <div class="flex items-center radio">
                  <input
                    id="default-radio-2"
                    type="radio"
                    value="mail_send"
                    v-model="schedule_notification_type"
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
                    "
                    >이메일</label
                  >
                </div>
              </div>
            </div>
            <div
              class="details_wrap"
              :class="error.schedule_details ? 'field-error' : ''"
            >
              <h4>일정 상세 내용</h4>
              <textarea
                placeholder="일정 상세 내용"
                v-model="schedule_details"
              ></textarea>
              <span>{{ error.schedule_details }}</span>
            </div>
            <div class="notificetion_wrap">
              <h4>색상 설정</h4>
              <div class="radio_wrap">
                <div class="flex items-center radio-color">
                  <input
                    checked
                    id="default-radio-1"
                    type="radio"
                    value="#ec3007"
                    v-model="schedule_notification_color_setting"
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
                    id="default-radio-2"
                    type="radio"
                    value="#fb8832"
                    v-model="schedule_notification_color_setting"
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
                    id="default-radio-3"
                    type="radio"
                    value="#f5c739"
                    v-model="schedule_notification_color_setting"
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
                    id="default-radio-4"
                    type="radio"
                    value="#51c434"
                    v-model="schedule_notification_color_setting"
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
                    id="default-radio-5"
                    type="radio"
                    value="#007aff"
                    v-model="schedule_notification_color_setting"
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
                    id="default-radio-6"
                    type="radio"
                    value="#8c26dd"
                    v-model="schedule_notification_color_setting"
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
                <input :value="userEmail" placeholder="공유자 입력" readonly />
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
              transition
              duration-150
              ease-in-out
            "
            @click="addAnEvent"
          >
            추가하기
          </button>
          <span class="error-msg">{{ error.permission }}</span>
        </div>
      </div>
    </div>
  </div>
  <!-- CalenderSharing modal -->
  <!-- <CalenderSharing v-show="isCalenderSharingModal" @close2="closeModal2" /> -->
</template>


<script>
import moment from "moment";
import scheduleValidation from "@/validation/scheduleValidation";
import ScheduleManagementService from "@/services/ScheduleManagementService";
import CalenderSharing from "@/components/modals/CalenderSharing.vue";

export default {
  name: "AddAnEvent",
  components: {
    CalenderSharing,
  },
  props: ["userId", "userEmail"],
  data() {
    return {
      isCalenderSharingModal: false,
      schedule_title: "",
      schedule_type: "",
      schedule_event_type: "time_period",
      schedule_start_date: "",
      schedule_end_date: "",
      schedule_notification_type: "notify_message",
      schedule_details: "",
      schedule_notification_color_setting: "#ec3007",
      selected_user_id: [], // Optional
      selected_user_email: [],
      error: {},
      schedule_start_time: "",
      schedule_end_time: "",
    };
  },
  created() {
    this.ScheduleManagementService = new ScheduleManagementService();
  },
  methods: {
    close() {
      this.$emit("close");
    },
    addCalender() {
      this.$emit("isaddCalnder");
      this.$emit("updatedCalendarUserId", this.userId);
      this.$emit("updatedCalendarUserEmail", this.userEmail);
    },
    calendarSharing() {
      this.isCalenderSharingModal = true;
    },
    closeModal2() {
      this.isCalenderSharingModal = false;
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
    addAnEvent() {
      if (!this.checkError()) {
        return;
      } else {
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

        if (this.userEmail.length == 0) {
          this.selected_user_email = " ";
        } else {
          this.selected_user_email = this.userEmail.join();
        }
        let event_data = {
          schedule_title: this.schedule_title,
          schedule_type: this.schedule_type === true ? "common" : "individual",
          schedule_event_type:
            this.schedule_event_type === true ? "all_day" : "time_period",
          schedule_start_date:
            getFormatedDate(this.schedule_start_date) +
            " " +
            this.schedule_start_time,
          schedule_end_date:
            this.schedule_event_type === true
              ? getFormatedDate(this.schedule_start_date) +
                " " +
                this.schedule_start_time
              : getFormatedDate(this.schedule_end_date) +
                " " +
                this.schedule_end_time,
          schedule_notification_type: this.schedule_notification_type,
          schedule_details: this.schedule_details,
          schedule_notification_color_setting:
            this.schedule_notification_color_setting,
          selected_user_id: this.userId,
          selected_user_email: this.selected_user_email,
        };
        console.log(event_data);
        console.log(this.schedule_event_type);
        //  this.ScheduleManagementService.addEvent(event_data)
        this.ScheduleManagementService.addEvent(event_data).then((res) => {
          if (res.status == 200) {
            this.$emit("updateList");
            this.$emit("close");
          } else if (res.response.status == 401) {
            this.error.permission = res.response.data.error;
          }
        });
      }
    },
  },
};
</script>

<style lang="scss">
.dp__main {
  width: 50%;
  height: 45px;
}
.dp__input {
      height: 45px !important;
    }
 .dp__input_icon_pad {
  padding-top: 6px;
 }

  
</style>