<template>
  <div class="main_chat_wrap">
    <h4>메시지</h4>
    <!-- {{  'crid-' + currentRoomId  }} -->
    <div class="message_wrap">
      <div class="msg_people">
        <div class="chat_list" v-if="latestChatUsers.length">
          <div
            class="chat_person"
            v-for="(item, index) of latestChatUsers"
            :key="index"
            @click="selectLatestChat(item, $event)"
          >
            <div class="wrap-i">
              <span
                :class="
                  item.has_read == 'y' || item.has_read == ''
                    ? 'dot'
                    : 'dot onlline'
                "
              ></span>
              <div class="short">
                <h5>{{ item.department }} {{ item.room_name }}</h5>
                <p v-if="item.attachment" class="with_attatchment">
                  <img src="@/assets/icon/attached_send.svg" />{{
                    item.attachment
                  }}
                </p>
                <p v-if="item.message" class="msg-desc">{{ item.message }}</p>
              </div>
            </div>
          </div>
        </div>
        <div class="no_message" v-else>
          <p>메시지가 존재하지 않습니다.</p>
        </div>
        <div
          class="button_wrap"
          :class="
            latestChatUsers.length ? 'button_wrap' : 'button_wrap single_btn'
          "
        >
          <button
            type="button"
            :class="
              latestChatUsers.length
                ? 'gray_bordered'
                : 'gray_bordered disabled'
            "
            @click="getReadAll"
            :disabled="latestChatUsers.length ? false : true"
          >
            모두 읽음
          </button>
          <button type="button" class="blue_bordered" @click="newMessage">
            새메시지
          </button>
        </div>
      </div>
      <div class="chat_box">
        <div class="main_wrap">
          <!-- <template v-if="latestChatUsers.length"> -->
          <div
            class="header"
            v-if="
              latestChatUsers.length ||
              selectMsg ||
              defaultUserList ||
              chooseUserList
            "
          >
            <div class="choose_message flex justify-between">
              <div class="user_wrap">
                <div class="user_dropdown_wrap" v-if="selectMsg">
                  <div class="select_msg_wrap">
                    <div class="select_user_list">
                      <a href="javscript:void(0)" class="remove_arrow">메세지가 없습니다</a>
                      <!-- <a @click="() => (showMsgDropdown = !showMsgDropdown)" >메세지를 선택해주세요.</a>
                      <div
                        class="dropdown_wrap"
                        v-if="showMsgDropdown"
                        v-click-outside="onClickOutside"
                      >
                        <input
                          type="text"
                          placeholder="Search"
                          v-model="msgSearch"
                          @keyup="getAllChatRoom"
                        />
                        <ul class="search_dropdown">
                          <li
                            v-for="(item, index) of allChatUsers"
                            :key="index"
                            @click="setMsgList(item)"
                          >
                            <h5>{{ item.department }} {{ item.name }}</h5>
                            <p v-if="item.attachment" class="with_attatchment">
                              <img src="@/assets/icon/attached_send.svg" />{{
                                item.attachment
                              }}
                            </p>
                            <p v-if="item.message" class="msg-desc">
                              {{ item.message }}
                            </p>
                          </li>
                        </ul>
                      </div> -->
                    </div>
                  </div>
                </div>
                <div class="user_dropdown_wrap">
                  <div class="selected_user_name" v-if="defaultUserList">
                    <span @click="goBack"
                      ><img src="@/assets/icon/arwLeft.svg" alt="go to home"
                    /></span>
                    <p class="user-name" v-if="defaultUserList != ''">
                      {{ defaultUserList }}
                    </p>
                  </div>
                  <div class="select_user_list" v-if="chooseUserList">
                    <a @click="() => (showUserDropdown = !showUserDropdown)"
                      >사용자 선택</a
                    >
                    <div
                      class="dropdown_wrap"
                      v-if="showUserDropdown"
                      v-click-outside="onClickOutside"
                    >
                      <input
                        type="text"
                        placeholder="Search"
                        v-model="userSearch"
                        @keyup="getUserList"
                      />
                      <ul class="search_dropdown">
                        <li
                          v-for="(item, index) of userList"
                          :key="index"
                          @click="setUserList(item)"
                        >
                          {{ item.department
                          }}<span v-if="item.department">_</span>{{ item.rank
                          }}<span v-if="item.rank">_</span>{{ item.name }}
                        </li>
                      </ul>
                    </div>
                  </div>
                  <!-- <div class="back_icon" v-if="isHome" @click="goHome">
                  <img src="@/assets/icon/icon1.svg" />
                </div> -->
                </div>
              </div>
              <div class="back_icon" @click="goHome">
                <img src="@/assets/icon/icon1.svg" />
              </div>
            </div>
          </div>
          <template v-if="showChat && isChatroomOpen">
            <div class="all_chat" @scroll="handleScroll" id="scroll_div">
              <div class="chat_wrap">
                <div class="chat">
                  <!-- <p>{{ uTimeStamp }}</p>
                  <p>{{ localMessages }}</p> -->
                  <div
                    class="date"
                    v-for="(hdate, index) of uTimeStamp"
                    :key="index"
                  >
                    <div class="devider"></div>
                    <span>{{ hdate }}</span>

                    <div v-for="(item, index) of localMessages" :key="index">
                      <div
                        v-if="hdate == dateformat(item.timestamp)"
                        :class="
                          item.user_id != userId ? 'left_box' : 'right_box'
                        "
                      >
                        <div class="text">
                          <div class="message">
                            <div
                              :class="
                                item.content_type != 'text'
                                  ? 'message_inner with_attach'
                                  : 'message_inner'
                              "
                            >
                              <span
                                class="attach"
                                v-if="item.content_type != 'text'"
                                @click="
                                  fileDownload(
                                    item.attachments,
                                    item.original_file_name
                                  )
                                "
                              >
                                <img src="@/assets/icon/attached_send.svg" />{{
                                  item.original_file_name
                                }}
                              </span>
                              <p class="msg-text">{{ item.message }}</p>
                            </div>
                            <div class="delete" v-if="item.has_read != 'y'">
                              <PopperWrapper
                                arrow
                                placement="right"
                                v-if="item.user_id == userId"
                              >
                                <img
                                  src="@/assets/icon/kebabMenu.svg"
                                  alt="delete chat"
                                  class="kebabMenu"
                                />
                                <template #content>
                                  <div class="btn_wrap" @click="deleted">
                                    <img
                                      src="@/assets/icon/DeleteWhite.svg"
                                      alt="delete chat"
                                    />
                                    <button
                                      class="btn"
                                      @click="showDelete($event, item)"
                                    >
                                      Delete
                                    </button>
                                  </div>
                                </template>
                              </PopperWrapper>
                            </div>
                          </div>
                          <div class="time_wrap">
                            <div class="dot_wrap" v-if="item.has_read != 'y'">
                              <div
                                class="active_dot"
                                v-if="item.user_id == userId"
                              ></div>
                            </div>
                            <span>{{ timeformat(item.timestamp) }}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="type_box">
              <div class="send_box_wrap" v-click-outside="inputOutside">
                <input
                  type="text"
                  @click="writeMsg"
                  v-model="msgText"
                  @keydown="sentMsg($event, msgText)"
                />
                <div class="send_box">
                  <div class="attach_wrap">
                    <input
                      type="file"
                      placeholder="Select a file"
                      @change="getFile($event)"
                      :disabled="isSend ? disabled : ''"
                    />
                    <img v-if="isSend" src="@/assets/icon/attatch_blue.svg" />
                    <img v-else src="@/assets/icon/attached.svg" />
                  </div>
                  <div class="send">
                    <button
                      type="button"
                      :disabled="isSend ? disabled : ''"
                      :class="isSend ? 'active' : ''"
                      @click="sendMessage(msgText)"
                    >
                      <img src="@/assets/icon/sendbutton.svg" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </template>
          <!-- </template> -->
        </div>
      </div>
    </div>
  </div>
  <!-- <div :class="showUserDropdown ? 'overlay-click-out-side' : ''" @click="showUserDropdown = false"></div> -->
</template>

<script>
import CommonService from "@/services/CommonService";
import moment from "moment";
import PopperWrapper from "@/components/Popper.vue";
import SocketioService from "../../services/SocketIoService";
import vClickOutside from "click-outside-vue3";
import Toast from "@/alert/alert.js";

export default {
  name: "UserClickMessage",
  components: {
    PopperWrapper,
  },
  data() {
    return {
      companyId: localStorage.getItem("compid"),
      room_id: 1,
      page: 1,
      chatLimit: 10,
      latestChatUsers: [],
      allChatUsers: [],
      userList: [],
      defaultUserList: "",
      showUserDropdown: false,
      showMsgDropdown: false,
      showChat: false,
      chatHistory: [],
      userId: localStorage.getItem("uid"),
      chooseUserList: false,
      userSearch: "",
      msgSearch: "",
      selectMsg: false,
      roomLimit: 5,
      friend_id: "",
      isSend: false,
      isAttatchement: false,
      connection: null,
      isConnected: false,
      updateMsg: null,
      msgText: null,
      msgFile: null,
      contentType: "",
      createRoomObj: null,
      localMessages: [],
      roomId: "",
      uRoomId: "",
      latestChatHistory: [],
      allTimeStamp: [],
      uTimeStamp: [],
      lastChatDate: "",
      msgHasread: "",
      ownread: false,
      currentRoomId: "",
      currentsenderUserId: "",
      isRoomIdupdated: false,
      oldRoomId: "",
      isChatroomOpen: false,
      el: "",
    };
  },

  directives: {
    clickOutside: vClickOutside.directive,
  },

  created() {
    // SocketioService.setupSocketConnection();
    // SocketioService.socketConnection();
    this.commonService = new CommonService();

    // Get Messages
    SocketioService.socket.on("acknowledgement", (data) => {
      console.log("msg acknowledgement------", data);
      console.log("socket data------", SocketioService.socket);
      console.log(
        "condition-view===",
        data.room_id,
        this.currentRoomId,
        this.isChatroomOpen
      );
      if (data.conversation_id) {
        this.getLatestChatRoom();
      }
      if (data.room_id == this.currentRoomId && this.isChatroomOpen) {
        this.updateMsg = data;
        // this.localMessages.push(this.updateMsg);
        console.log("SocketioService.socket msg-", this.updateMsg);
        this.ownread = true;

        let readmdata = {
          room_id: parseInt(this.currentRoomId),
          user_id: parseInt(this.currentsenderUserId),
        };
        // console.log('readmdata', readmdata)
        SocketioService.readMessage(readmdata);

        SocketioService.socket.on("hasRead", (data) => {
          console.log("hasRead data------------", data);
          // this.$store.state.notificationList = data
          this.msgHasread = data.has_read;
          this.localMessages.map((item, i) => {
            console.log("socket hasRead---", data.room_id, item.room_id);
            if (data.room_id == item.room_id && this.isChatroomOpen) {
              console.log("condsit item", item);
              Object.assign(item, { has_read: data.has_read });
            }
          });
          // this.getLatestChatRoom();
        });
      }
    });

    // Get Notifications
    SocketioService.socket.on("notification", (data) => {
      // console.log('notification data------------', data);
      this.$store.state.notificationList = data;
    });

    // hasMsgDeleted
    SocketioService.socket.on("hasMsgDeleted", (data) => {
      console.log("delete data------------", data);
      this.getLatestChatRoom();
    });

    // Get Notifications
    // SocketioService.socket.on('hasRead', (data) => {
    //   console.log('hasRead data------------', data);
    //   this.msgHasread = data.has_read;
    //   // this.$store.state.notificationList = data
    //   // let lastElement = this.localMessages[this.localMessages.length - 1];
    //   // console.log('lastElement---', lastElement);
    //   // Object.assign(lastElement, {has_read:data.has_read});
    //   this.localMessages.map((item, i) => {
    //     Object.assign(item, { has_read: data.has_read });
    //   });
    // });
  },

  mounted() {
    this.getLatestChatRoom();
    this.getAllChatRoom();
    this.getUserList();
    this.dateformat();
  },

  // unmounted() {
  //   // SocketioService.disconnect();
  //   this.disconnect();
  // },
  watch: {
    updateMsg(value) {
      if (value) {
        console.log("updateMsg value----", value);
        this.localMessages.push(value);
        this.page = 1;
        this.getChatHistory(this.currentRoomId, this.page, "empty");
        this.getLatestChatRoom();
        console.log("this.localMessages--->", this.localMessages);
      } else {
        // this.localMessages=[];
        // console.log('no value', value);
      }
    },
    currentRoomId(oldVal, newVal) {
      this.oldRoomId = oldVal;
      console.log("this.oldRoomId", this.oldRoomId);
      if (oldVal != newVal && newVal) {
        this.isRoomIdupdated = true;
      }
    },
  },
  methods: {
    sentMsg(event, msgText) {
      let code = event.keyCode || event.which;
      if (code == 13) {
        this.sendMessage(msgText);
      }
    },

    handleScroll(el) {
      // console.log(el.srcElement.scrollTop)
      if (el.srcElement.scrollTop == 0 && this.chatHistory.length != 0) {
        // Check if clientHeight is smaller than scrollHeight.
        if (el.srcElement.clientHeight < el.srcElement.scrollHeight) {
          this.page++;
          this.getChatHistory(this.roomId, this.page, "append");
        }
        el.srcElement.scrollTop = 3;
      }
    },

    scrollToBottom() {
      var messageBody = document.querySelector("#scroll_div");
      messageBody.scrollTo({
        top: messageBody.scrollHeight,
        behavior: "smooth",
      });
    },

    // disconnect() {
    //   SocketioService.socket.emit('disconnect');
    //   console.log('disconnect', this.socket);
    //   if (this.socket) {
    //     this.socket.disconnect();
    //   }
    // },

    moment() {
      return moment();
    },
    // click out side
    onClickOutside(event) {
      this.showUserDropdown = false;
      this.showMsgDropdown = false;
      this.userSearch = "";
      this.msgSearch = "";
      this.getUserList();
      this.getAllChatRoom();
    },
    inputOutside() {
      this.isSend = false;
    },
    // set dropdown
    setUserList(item) {
      console.log("setUserList", item);
      // this.currentRoomId = item.room_id;
      this.friend_id = item.id;
      this.createNewRoom(this.friend_id);
      this.userSearch = "";
      this.getUserList();
      this.showUserDropdown = false;
      this.chooseUserList = false;
      this.showChat = true;
      this.isChatroomOpen = true;
      // this.isHome = true;
      if (!item.department && !item.rank) {
        this.defaultUserList = `${item.name}`;
      } else if (!item.department) {
        this.defaultUserList = `${item.rank}_${item.name}`;
      } else if (!item.rank) {
        this.defaultUserList = `${item.department}_${item.name}`;
      } else {
        this.defaultUserList = `${item.department}_${item.rank}_${item.name}`;
      }
      // this.friend_id = item.id
      // this.createNewRoom(this.friend_id);
      // this.uTimeStamp = [];
      // this.localMessages = [];
      // this.latestChatHistory = [];
      // this.getChatHistory(item.id, this.page, 'empty')
    },

    setMsgList(item) {
      console.log("setMsgList", item);
      this.currentRoomId = item.room_id;
      this.msgSearch = "";
      this.defaultUserList = `${item.name}`;
      // this.isHome = true;
      this.showChat = true;
      this.isChatroomOpen = true;
      this.page = 1;
      this.allTimeStamp = [];
      this.localMessages = [];
      this.latestChatHistory = [];
      this.getChatHistory(item.room_id, this.page, "empty");
      if (this.showMsgDropdown == true) {
        this.showMsgDropdown = false;
        this.selectMsg = false;
        F;
      }
    },

    // selectLatestChat
    selectLatestChat(item, e) {
      // console.log('selectLatestChat--', item);
      localStorage.setItem("currentRoomID", item.room_id);
      this.currentRoomId = item.room_id;
      this.currentsenderUserId = item.user_id;
      this.roomId = item.room_id;
      this.page = 1;
      this.defaultUserList = `${item.department}_${item.room_name}`;
      // this.showChat = true;
      this.isChatroomOpen = true;
      this.selectMsg = false;
      this.chooseUserList = false;
      // this.isHome = true;

      // messageBody.scrollTop = messageBody.scrollHeight;

      //  Own read
      this.ownread = true;
      let child = e.target.children[0].children;
      let elm = child[0].classList.contains("onlline");
      // console.log('elm', elm)
      if (elm) {
        child[0].classList.remove("onlline");
      }
      // console.log('elem', child[0].classList.contains('onlline'));
      //  Own read

      this.allTimeStamp = [];
      this.localMessages = [];
      this.latestChatHistory = [];
      let readmdata = {
        room_id: parseInt(item.room_id),
        user_id: parseInt(item.user_id),
      };
      // console.log('readmdata', readmdata)
      SocketioService.readMessage(readmdata);
      // console.log('selectLatestChat---', item.room_id, this.page);
      this.getChatHistory(item.room_id, this.page, "empty");

      setTimeout(() => {
        this.scrollToBottom();
      }, 200);
    },

    writeMsg() {
      this.isSend = true;
      // console.log(this.isSend)
    },
    goBack() {
      this.isChatroomOpen = false;
      this.showChat = false;
      this.page = 1;
      this.allTimeStamp = [];
      this.localMessages = [];
      this.latestChatHistory = [];
      this.defaultUserList = "";
      this.selectMsg = true;
      this.chooseUserList = false;
      this.getLatestChatRoom();
    },
    goHome() {
      // this.defaultUserList = '';
      // this.showChat = false;
      // this.chooseUserList = false;
      // this.isHome = true;
      // if (this.latestChatUsers.length > 0) {
      //   this.selectMsg = true;
      // }
      this.$router.push({ name: "DashboardOne" });
    },

    // chat room list
    getLatestChatRoom() {
      this.commonService
        .chatRoom(this.roomLimit)
        .then((res) => {
          if (res.status == 200) {
            console.log("getLatestChatRoom", res.data);
            this.latestChatUsers = res.data.user_chatrooms;
            let readmdata = {
              room_id: parseInt(this.currentRoomId),
              user_id: parseInt(this.currentsenderUserId),
            };
            // console.log('readmdata', readmdata)
            SocketioService.readMessage(readmdata);
            console.log("this.latestChatUsers----", this.latestChatUsers);
            if (
              this.latestChatUsers.length > 0 &&
              this.chooseUserList == false &&
              this.showChat == false
            ) {
              this.selectMsg = true;
            }
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },

    // 1 create chat room
    createNewRoom(fId) {
      // SocketioService.createRoom();
      // console.log('createNewRoom', fId);
      SocketioService.createRoom(fId);
      this.commonService.createRoom(fId).then((res) => {
        // console.log('createRoom res- ', res);
        if (res.status == 200) {
          this.currentRoomId = res.data.room_id;
          this.allTimeStamp = [];
          this.localMessages = [];
          this.latestChatHistory = [];
          this.getChatHistory(res.data.room_id, this.page, "empty");
          const newChatroom = new Object();
          newChatroom.room_id = res.data.room_id;
          newChatroom.room_unique_id = res.data.room_unique_id;
          newChatroom.content_type = "text";
          this.createRoomObj = newChatroom;
          // console.log('this.createRoomObj--', this.createRoomObj);
        }
      });
      // console.log(err)
      //   .catch((err) => {
      //   })
    },

    //send message
    sendMessage() {
      if (this.msgText || this.msgFile) {
        // console.log(this.msgText);
        var a = moment();
        let smsgData = {
          message: this.msgText,
          room_id: this.createRoomObj.room_id,
          message_id: a.valueOf(),
          room_unique_id: this.createRoomObj.room_unique_id,
          content_type: this.msgFile ? this.contentType : "text",
          file: this.msgFile ? this.msgFile : null,
          original_file_name: this.msgFile ? this.msgFile.name : "",
        };
        console.log("smsgData----->", smsgData);
        // this.localMessages.push(localsmsgdata);
        SocketioService.sendMessage(smsgData);
        this.msgText = "";
        this.msgFile = "";
        this.isSend = false;
        setTimeout(() => {
          this.scrollToBottom();
        }, 200);
      }
    },
    getFile(event) {
      this.msgFile = event.target.files[0];

      // let allowedExtensionsImage = /(\.jpg|\.jpeg|\.png|\.gif)$/i;
      // let allowedExtensionsVideo = /(\.3gpp|\.mp4|\.avi|\.mov|\.wmv|\.mpeg|\.webp)$/i;
      // let allowedExtensionsDocs = /(\.pdf|\.docx|\.ppt|\.pptx|\.doc|\.xls|\.xsls|\.csv|\.txt)$/i;
      // let allowedExtensionsAudio = /(\.mpeg|\.mp3|\.ogg|\.wave|\.amr)$/i;
      if (this.msgFile) {
        console.log("form file--", this.msgFile.size);
        if (this.msgFile.size > 1024 * 1024 * 20) {
          Toast.fire({ title: "업로드 파일 용량은 최대 20mb입니다" });
          return false;
          // }
          // else if (this.msgFile.type.match('image.*') && !allowedExtensionsImage.exec(this.msgFile.name)) {
          //   Toast.fire({ title: 'jpg, jpeg, png, gif 파일만 업로드 가능합니다' });
          //   return false;
          // }
          // else if (this.msgFile.type.match('video.*') && !allowedExtensionsVideo.exec(this.msgFile.name)) {
          //   Toast.fire({ title: '3gpp, mp4, mov, avi, wmv, mpeg, webp  파일만 업로드 가능합니다' });
          //   return false;
          // }
          // else if (this.msgFile.type.match('audio.*') && !allowedExtensionsAudio.exec(this.msgFile.name)) {
          //   Toast.fire({ title: 'mpeg, mp3, ogg, wave, amr  파일만 업로드 가능합니다' });
          //   return false;
          // }
          // else if (!allowedExtensionsDocs.exec(this.msgFile.name)) {
          //   Toast.fire({ title: 'pdf, docx, doc, csv, xls, xsls, ppt, pptx, txt  파일만 업로드 가능합니다' });
          //   return false;
        } else {
          if (this.msgFile.type.match("image.*")) {
            // console.log('image');
            this.contentType = "image";
          } else if (this.msgFile.type.match("video.*")) {
            // console.log('video');
            this.contentType = "video";
          } else if (this.msgFile.type.match("audio.*")) {
            // console.log('audio');
            this.contentType = "audio";
          } else {
            this.contentType = "file";
            // console.log('file');
          }
          // this.socket.emit('upload', formData);
        }
      }
    },
    fileDownload(fileUrl, fName) {
      let dObj = { url: fileUrl, fileName: fName };
      // console.log(dObj);
      this.$store.dispatch("diagnosisManagement/createDownloadFiles", dObj);
    },

    // get all chat room
    getAllChatRoom() {
      this.commonService
        .allChatRoom(this.msgSearch)
        .then((res) => {
          if (res.status == 200) {
            this.allChatUsers = res.data.user_chatrooms;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // get user list
    getUserList() {
      this.commonService
        .userList(this.companyId, this.userSearch)
        .then((res) => {
          if (res.status == 200) {
            this.userList = res.data.user_list;
            // console.log('userList---', res.data)
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // chat history
    getChatHistory(roomId, page, event) {
      // console.log('getChatHistory joinMe', roomId, page);
      SocketioService.joinMe(roomId);
      this.commonService
        .chatHistory(roomId, page, this.chatLimit)
        .then((res) => {
          if (res.status == 200) {
            this.chatHistory = res.data.message_list;
            this.showChat = true;
            if (event == "empty") {
              // console.log(event);
              this.latestChatHistory = this.chatHistory;
              this.localMessages = this.latestChatHistory;
              this.localMessages.map((item, i) => {
                let CTS = moment.utc(item.timestamp).format("YYYY:MM:DD");
                // console.log('CTS---', CTS);
                this.allTimeStamp.push(CTS.toString());
              });

              this.uTimeStamp = [...new Set(this.allTimeStamp)].sort();
              // this.uTimeStamp = resss;
              console.log("uTimeStamp ---->", this.uTimeStamp);
            } else if (event == "append" && this.chatHistory.length != 0) {
              // console.log(event);

              this.latestChatHistory.unshift(...this.chatHistory);
              this.localMessages = this.latestChatHistory;

              this.localMessages.map((item, i) => {
                let CTS = moment.utc(item.timestamp).format("YYYY:MM:DD");
                // console.log('CTS---', CTS);
                this.allTimeStamp.push(CTS.toString());
              });

              this.uTimeStamp = [...new Set(this.allTimeStamp)].sort();
              // this.uTimeStamp = resss;
              // console.log('uTimeStamp ---->', this.uTimeStamp.sort());
            }
            // console.log('latestChatHistory data:--', this.latestChatHistory);
            // console.log('localMessages data:--', this.localMessages);
            const newChatroom = new Object();
            newChatroom.room_id = res.data.room_id;
            newChatroom.room_unique_id = res.data.room_unique_id;
            newChatroom.content_type = "text";
            this.createRoomObj = newChatroom;
            // console.log('this.createRoomObj--', this.createRoomObj);
            this.roomId = res.data.room_id;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // read all unread chat
    getReadAll() {
      this.commonService
        .readAllChat()
        .then((res) => {
          if (res.status == 200) {
            this.getLatestChatRoom();
            // let readmdata = {
            //   room_id: parseInt(this.currentRoomId),
            //   user_id: parseInt(this.currentsenderUserId),
            // };
            // // console.log('readmdata', readmdata)
            // SocketioService.readMessage(readmdata);
            if (this.currentRoomId) {
              this.getChatHistory(this.currentRoomId, 1, "empty");
            }
            // console.log(res);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // new message
    newMessage() {
      Toast.fire({ title: "Please select a new user" });
      this.chooseUserList = true;
      // this.isHome = true;
      this.selectMsg = false;
      this.defaultUserList = "";
    },
    // show delte btn
    showDelete(event, item) {
      this.deleteMessage(item.conversation_id, item.room_id);
    },
    // delete msg
    deleteMessage(conversation_id, roomId) {
      this.commonService
        .deleteMsg(conversation_id, roomId)
        .then((res) => {
          // console.log(res);
          if (res.status == 200) {
            // console.log(res.data.room_id)
            this.getLatestChatRoom();
            this.getChatHistory(res.data.room_id, this.page, "empty");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },

    dateformat(value) {
      if (value) {
        return moment.utc(value).format("YYYY:MM:DD");
      }
    },

    timeformat(value) {
      if (value) {
        return moment.utc(value).local().format("HH:mm");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.with_attatchment {
  display: flex;
  align-items: center;
  gap: 5px;
}

.overlay-click-out-side {
  position: fixed;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  opacity: 0;
  z-index: 2;
  background: red;
}

.message {
  display: flex;
  align-items: center;

  .delete {
    margin-left: 5px;
    position: relative;

    .kebabMenu {
      cursor: pointer;
    }

    .btn_wrap {
      position: absolute;
      right: 5px;
      top: 35px;
      bottom: 0;
      margin: auto;
      z-index: 9;
      width: 90px;
      height: 40px;
      background: #4c4c4c;
      border-radius: 5px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    img {
      height: 16px;
      width: 16px;
    }

    button {
      padding: 5px;
      color: #fff;
      border-radius: 4px;
    }
  }
}

.time_wrap {
  display: flex;
  align-items: center;

  .active_dot {
    height: 5px;
    width: 5px;
    border-radius: 100%;
    background: #3780e6;
    margin-right: 5px;
  }
}

.selected_user_name {
  display: flex;
  align-items: center;

  .user-name {
    font-weight: 700;
    font-size: 24px;
    line-height: 29px;
    color: #24212e;
  }

  span {
    display: block;
  }

  img {
    margin-right: 10px;
    cursor: pointer;
  }
}

.back_icon {
  cursor: pointer;
}

.gray_bordered {
  &.disabled {
    border: 1px solid #cfcfcf !important;
    color: #cfcfcf !important;
    background: transparent !important;
    cursor: no-drop !important;
  }
}

.search_dropdown {
  height: 250px;
  overflow: auto;
}

.user_wrap {
  display: flex;
  width: 100%;
  align-items: center;
}

.msg-desc {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 320px;
}
.remove_arrow{
  background: none !important;
}
</style>
