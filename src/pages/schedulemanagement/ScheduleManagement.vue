<template>
  <div class="info_protection">
    <div class="calender_wrap_main">
      <div class="schedule_main_wrap">
        <div class="tab-style-two">
          <TabWrapper @getResponseTitle="getTitle($event)">
            <Tabs title="전체">
              <template v-if="eventlist.length > 0">
                <div
                  class="schedule_wrap"
                  :style="{
                    'background-color':
                      item.schedule_notification_color_setting,
                  }"
                  v-for="(item, index) in eventlist"
                  :key="index"
                >
                  <div class="title">
                    <h4>{{ item.schedule_title }}</h4>
                  </div>
                  <div class="schedule">
                    <div class="date">
                      <p>{{ dateformat(item.schedule_start_date) }}</p>
                      <span>-</span>
                      <p>{{ dateformat(item.schedule_end_date) }}</p>
                    </div>
                    <div class="time">
                      <p>{{ dateformat2(item.schedule_start_date) }}</p>
                      <span>-</span>
                      <p>{{ dateformat2(item.schedule_end_date) }}</p>
                    </div>
                  </div>
                  <div class="link-button-wrap">
                    <a href="#" @click="EditSchedule(item.id)"
                      >일정 상세내용 <img src="@/assets/icon/arrow_right.svg"
                    /></a>
                    <button type="button">
                      {{ item.schedule_type == "individual" ? "개인" : "공통" }}
                    </button>
                  </div>
                </div>
              </template>
              <template v-else> 현재 등록된 일정이 없습니다. </template>
            </Tabs>
            <Tabs title="공통">
              <template v-if="eventlist.length > 0">
              <div
                class="schedule_wrap"
                :style="{
                  'background-color': item1.schedule_notification_color_setting,
                }"
                v-for="(item1, index) in eventlist"
                :key="index"
              >
                <div class="title">
                  <h4>{{ item1.schedule_title }}</h4>
                </div>
                <div class="schedule">
                  <div class="date">
                    <p>{{ dateformat(item1.schedule_start_date) }}</p>
                    <span>-</span>
                    <p>{{ dateformat(item1.schedule_end_date) }}</p>
                  </div>
                  <div class="time">
                    <p>{{ dateformat2(item1.schedule_start_date) }}</p>
                    <span>-</span>
                    <p>{{ dateformat2(item1.schedule_end_date) }}</p>
                  </div>
                </div>
                <div class="link-button-wrap">
                  <a href="#"
                    >일정 상세내용 <img src="@/assets/icon/arrow_right.svg"
                  /></a>
                  <button type="button">
                    {{ item1.schedule_type == "individual" ? "개인" : "공통" }}
                  </button>
                </div>
              </div>
            </template>
              <template v-else> 현재 등록된 일정이 없습니다. </template>
            </Tabs>
            <Tabs title="개인">
              <template v-if="eventlist.length > 0">
              <div
                class="schedule_wrap"
                :style="{
                  'background-color': item2.schedule_notification_color_setting,
                }"
                v-for="(item2, index) in eventlist"
                :key="index"
              >
                <div class="title">
                  <h4>{{ item2.schedule_title }}</h4>
                </div>
                <div class="schedule">
                  <div class="date">
                    <p>{{ dateformat(item2.schedule_start_date) }}</p>
                    <span>-</span>
                    <p>{{ dateformat(item2.schedule_end_date) }}</p>
                  </div>
                  <div class="time">
                    <p>{{ dateformat2(item2.schedule_start_date) }}</p>
                    <span>-</span>
                    <p>{{ dateformat2(item2.schedule_end_date) }}</p>
                  </div>
                </div>
                <div class="link-button-wrap">
                  <a href="#" @click="EditSchedule(item2.id)"
                    >일정 상세내용 <img src="@/assets/icon/arrow_right.svg"
                  /></a>
                  <button type="button">
                    {{ item2.schedule_type == "individual" ? "개인" : "공통" }}
                  </button>
                </div>
              </div>
            </template>
              <template v-else> 현재 등록된 일정이 없습니다. </template>
            </Tabs>
          </TabWrapper>
        </div>
        <!-- <div class="add-schedule" v-if="permission=='edit' || this.$store.state.signin.is_user_admin == 'y'">
          <button type="button" class="bordered" @click="addEvent">
           일정추가
          </button>
        </div> -->
      </div>
      <div class="calender">
        <div class="heading flex justify-between align-end">
          <h4>달력</h4>
          <div
            class="add-schedule"
            v-if="
              permission == 'edit' ||
              this.$store.state.signin.is_user_admin == 'y'
            "
          >
            <button type="button" class="bordered" @click="addEvent">
              일정추가
            </button>
          </div>
        </div>
        <FullCalendar :options="calendarOptions" />
      </div>
    </div>
  </div>

  <!-- edit event modal -->
  <AddAnEvent
    v-if="isAddEventModal"
    @updateList="updatedList"
    @close="closeModal"
    @isaddCalnder="addCalender"
    :userId="selected_user_id"
    :userEmail="selected_user_email"
    @updatedCalendarUserId="updatedUserId($event)"
    @updatedCalendarUserEmail="updatedUserEmail($event)"
  />

  <!-- edit event modal -->
  <EditAnEvent
    v-if="isEditEventModal"
    @close="closeModal"
    :id="eventId"
    :details="scheduleDetails"
    @isaddCalnder="addCalender"
    :userId="selected_user_id"
    :userEmail="selected_user_email"
    @updateList="updatedList"
    @updatedCalendarUserId="updatedUserId($event)"
    @updatedCalendarUserEmail="updatedUserEmail($event)"
  />

  <!-- CalenderSharing modal -->
  <CalenderSharing
    v-if="isCalenderSharingModal"
    @close="closeModal2"
    @getUserId="selectedUserId($event)"
    @getUserEmail="selectedUserEmail($event)"
    :userId="selected_user_id"
    :userEmail="selected_user_email"
  />
</template>

<script>
import TabWrapper from "@/components/TabWrapper.vue";
import Tabs from "@/components/Tabs.vue";
import FullCalendar from "@fullcalendar/vue3";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import AddAnEvent from "@/components/modals/AddAnEvent.vue";
import EditAnEvent from "@/components/modals/EditAnEvent.vue";
import ScheduleManagementService from "@/services/ScheduleManagementService";
import CalenderSharing from "@/components/modals/CalenderSharing.vue";
import koLocale from "@fullcalendar/core/locales/ko";
import moment from "moment";
export default {
  name: "ScheduleManagement",
  components: {
    Tabs,
    TabWrapper,
    FullCalendar,
    AddAnEvent,
    EditAnEvent,
    CalenderSharing,
  },
  data: function () {
    return {
      isAddEventModal: false,
      isEditEventModal: false,
      isCalenderSharingModal: false,
      calendarOptions: {
        plugins: [
          dayGridPlugin,
          timeGridPlugin,
          interactionPlugin, // needed for dateClick
        ],
        headerToolbar: {
          left: "prev,next",
          center: "title",
          right: "dayGridMonth,dayGridWeek,timeGridDay",
        },
        locale: koLocale,
        initialView: "dayGridMonth",
        timeZone: "UTC",
        events: [],
        editable: true,
        selectable: true,
        selectMirror: true,
        dayMaxEvents: true,
        weekends: true,
        select: this.handleDateSelect,
        eventClick: this.handleEventClick,
        eventsSet: this.handleEvents,
        displayEventEnd: true,
      },
      currentEvents: [],
      schedule_type: "all",
      eventlist: "",
      eventlist2: "",
      eventlist3: "",
      eventId: "",
      scheduleDetails: "",
      selected_user_id: [],
      selected_user_email: [],
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
  mounted() {
    this.scheduleList();
    this.dateformat();
    this.dateformat2();
  },
  methods: {
    handleEventClick(clickInfo) {
      console.log(clickInfo.event.id);
      this.eventId = clickInfo.event.id;
      this.ScheduleManagementService.scheduleDetails(this.eventId)
        .then((res) => {
          if (res.status == 200) {
            console.log(res.data);
            this.scheduleDetails = res.data;
            this.isEditEventModal = true;
            document.querySelector(".fc-popover").style.display = "none";
          }
        })
        .catch((err) => {
          return;
        });
    },
    handleEvents(events) {
      this.currentEvents = events;
      // console.log(events)
    },

    scheduleList() {
      this.ScheduleManagementService.scheduleList(this.schedule_type)
        .then((res) => {
          if (res.status == 200) {
            // console.log(res.data.eventlist);
            this.eventlist = res.data.eventlist;
            this.calendarOptions.events = [];
            for (let i = 0; i < res.data.eventlist.length; i++) {
              this.calendarOptions.events.push({
                id: res.data.eventlist[i].id,
                title: res.data.eventlist[i].schedule_title,
                start: res.data.eventlist[i].schedule_start_date,
                end: res.data.eventlist[i].schedule_end_date,
                color:
                  res.data.eventlist[i].schedule_notification_color_setting,
              });
            }
          }
        })
        .catch((err) => {
          return;
        });
    },
    getcommonList() {
      this.schedule_type = "common";
      console.log(this.schedule_type);
    },
    EditSchedule(id) {
      this.eventId = id;

      this.ScheduleManagementService.scheduleDetails(this.eventId)
        .then((res) => {
          if (res.status == 200) {
            // console.log(res.data);
            this.scheduleDetails = res.data;
            this.isEditEventModal = true;
          }
        })
        .catch((err) => {
          return;
        });
    },
    addEvent() {
      this.isAddEventModal = true;
    },
    addCalender() {
      this.isCalenderSharingModal = true;
    },
    closeModal() {
      this.isEditEventModal = false;
      this.isAddEventModal = false;
      this.selected_user_email = [];
      this.selected_user_id = [];
    },
    closeModal2() {
      this.isCalenderSharingModal = false;
    },

    updatedUserId(e) {
      this.selected_user_id = e;
    },
    updatedUserEmail(e) {
      this.selected_user_email = e;
    },

    selectedUserId(e) {
      this.selected_user_id = e;
      console.log(this.selected_user_id);
    },

    selectedUserEmail(e) {
      this.selected_user_email = e;
      console.log(this.selected_user_email);
    },

    updatedList() {
      this.scheduleList();
      this.dateformat();
      this.dateformat2();
    },

    getTitle(e) {
      if (e == "공통") {
        this.schedule_type = "common";
        this.scheduleList();
      }
      if (e == "개인") {
        this.schedule_type = "individual";
        this.scheduleList();
      }
      if (e == "전체") {
        this.schedule_type = "all";
        this.scheduleList();
      }
    },

    dateformat(value) {
      if (value) {
        return moment(String(value)).utc().format("MM/DD");
      }
    },
    dateformat2(value) {
      if (value) {
        return moment(String(value)).utc().format("h:mm A");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.add-schedule {
  button {
    padding: 11px 37px !important;
  }
}
</style>