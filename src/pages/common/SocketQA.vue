<template>
  <div class="main_chat_wrap">
    <h4>Message ---- {{ socketDetails }} --- {{ `reciver id: :` + reciverId }} --- {{ `my user id:` + userId }}</h4>
    <div class="message_wrap">
      <div class="msg_people">
        <div class="chat_list" v-if="latestChatUsers.length">
          <div class="chat_person" v-for="(item, index) of latestChatUsers" :key="index"
            @click="selectLatestChat(item)">
            <span class="dot" :class="item.has_read == 'n' ? 'dot onlline' : 'dot'"></span>
            <div class="short">
              <h5>{{ item.department }} {{ item.room_name }}</h5>
              <p v-if="item.attachment" class="with_attatchment">
                <img src="@/assets/icon/attached_send.svg" />{{ item.attachment }}
              </p>
              <p v-if="item.message">{{ item.message }}</p>
            </div>
          </div>
        </div>
        <div class="no_message" v-else>
          <p>The message does not exist.</p>
        </div>
        <div class="button_wrap">
          <button type="button" class="gray_bordered" @click="getReadAll">
            Read All
          </button>
          <button type="button" class="blue_bordered" @click="newMessage">
            New Message
          </button>
        </div>
      </div>
      <div class="chat_box">
        <div class="main_wrap">
          <!-- <template v-if="latestChatUsers.length"> -->
          <div class="header">
            <div class="choose_message">
              <div class="selected_user_name" v-if="defaultUserList">
                <span @click="goBack"><img src="@/assets/icon/arwLeft.svg" alt="go to home" /></span>
                <p v-if="defaultUserList != ''">{{ defaultUserList }}</p>
              </div>
              <div class="select_msg_wrap" v-if="selectMsg">
                <div class="select_user_list">
                  <a @click="() => (showMsgDropdown = !showMsgDropdown)">Please select a
                    message</a>
                  <div class="dropdown_wrap" v-if="showMsgDropdown" v-click-outside="onClickOutside">
                    <input type="text" placeholder="Search" v-model="msgSearch" @keyup="getAllChatRoom">
                    <ul>
                      <li v-for="(item, index) of allChatUsers" :key="index" @click="setMsgList(item)">
                        <h5>{{ item.department }} {{ item.name }}</h5>
                        <p v-if="item.attachment" class="with_attatchment">
                          <img src="@/assets/icon/attached_send.svg" />{{
                              item.attachment
                          }}
                        </p>
                        <p v-if="item.message">{{ item.message }}</p>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div class="select_user_list" v-if="chooseUserList">
                <a @click="() => (showUserDropdown = !showUserDropdown)">Choose User</a>
                <div class="dropdown_wrap" v-if="showUserDropdown" v-click-outside="onClickOutside">
                  <input type="text" placeholder="Search" v-model="userSearch" @keyup="getUserList" />
                  <ul>
                    <li v-for="(item, index) of userList" :key="index" @click="setUserList(item)">
                      {{ item.department }}_{{ item.rank }}_{{ item.name }}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="icon">
              <a href="#"><img src="@/assets/icon/icon1.svg" /></a>
            </div>
          </div>
          <template v-if="showChat">
            <div id="all_chat" class="all_chat">
              <div class="chat_wrap">
                <div class="chat">
                  <div class="date">
                    <div class="devider"></div>
                    <span>2022.01.06</span>
                  </div>
                  {{ localMessages }}
                  <div v-for="(item, index) of localMessages" :key="index">
                    <!-- <div class="date">
                                                <div class="devider"></div>
                                                <span>2022.01.06</span>
                                            </div> -->
                    <!-- <div v-for="(item, index) of chatHistory" :key="index"> -->
                    <div :class="item.user_id != userId ? 'left_box' : 'right_box'">
                      <div class="text">
                        <div class="message">
                          <div class="message_inner">
                            <span v-if="item.content_type=='text'" @click="fileDownload(item.attachments, item.original_file_name)">
                              <img src="@/assets/icon/attached_send.svg" />{{item.original_file_name}}
                            </span>
                            <p>{{ item.message }}</p>
                          </div>
                          <div class="delete" v-if="item.user_id == userId">
                            <!-- <img src="@/assets/icon/kebabMenu.svg" alt="delete chat"
                                                                class="kebabMenu" @click="showDelete($event, item)" />
                                                            <div class="delete_btn_wrap" :id="item.conversation_id">
                                                                <div class="btn_wrap" v-if="isDelete">
                                                                    <img src="@/assets/icon/DeleteWhite.svg"
                                                                        alt="delete chat" />
                                                                    <button class="btn">Delete</button>
                                                                </div>
                                                            </div> -->
                            <PopperWrapper arrow placement="right">
                              <img src="@/assets/icon/kebabMenu.svg" alt="delete chat" class="kebabMenu" />
                              <template #content>
                                <div class="btn_wrap" @click="deleted">
                                  <img src="@/assets/icon/DeleteWhite.svg" alt="delete chat" />
                                  <button class="btn" @click="showDelete($event, item)">Delete</button>
                                </div>
                              </template>
                            </PopperWrapper>
                          </div>
                        </div>
                        <div class="time_wrap">
                          <div class="dot_wrap" v-if="item.has_read != 'y'">
                            <div class="active_dot" v-if="item.user_id == userId"></div>
                          </div>
                          <span class="time">{{
                              moment(String(item.timestamp)).format("HH:MM")
                          }}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="type_box">
              <div class="send_box_wrap">
                <input type="text" @click="writeMsg" v-model="msgText" />
                <div class="send_box">
                  <div class="attach_wrap">
                    <input type="file" placeholder="Select a file" @change="getFile($event)"
                      :disabled="isSend ? disabled : ''" />
                    <img v-if="isSend" src="@/assets/icon/attatch_blue.svg" />
                    <img v-else src="@/assets/icon/attached.svg" />
                  </div>
                  <div class="send">
                    <!-- <button type="button" :disabled="isSend ? disabled : ''"
                                            :class="isSend ? 'active' : ''" @click="sendMessage(msgText)">
                                            <img src="@/assets/icon/sendbutton.svg" />
                                        </button> -->
                    <button type="button" class="Active" @click="sendMessage()">
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
</template>

<script>
import CommonService from "@/services/CommonService";
import moment from "moment";
import PopperWrapper from "@/components/Popper.vue";
import { io } from 'socket.io-client';
import ManagementDiagnosisSettingsModal from '@/components/modals/ManagementDiagnosisSettingsModal.vue';
var token = localStorage.getItem('token');

var Socket = io(process.env.VUE_APP_SOCKET_ENDPOINT, {
  query: "token=" + token,
});

export default {
  name: 'SocketQA',

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
      reciverId: '',
      chooseUserList: false,
      isDelete: false,
      userSearch: '',
      msgSearch: '',
      selectMsg: true,
      roomLimit: 5,
      friend_id: '',
      isSend: false,
      isAttatchement: false,
      connection: null,

      isConnected: false,
      socketMessage: '',

      // socket: SocketioService.socket,
      socket: Socket,
      socketDetails: '',
      updateMsg: null,
      newMessage: null,
      msgText: null,
      msgFile: null,
      createRoomObj: null,

      localMessages: [],
    };
  },

  created() {
    this.commonService = new CommonService();

    this.socket.on("connect", (res) => {
      console.log('connection-', this.socket);
      this.socketDetails = this.socket.id;
    });


    // this.socket.emit("readMessage", (res) => {
    //   console.log('connection-', this.socket);
    //   this.socketDetails = this.socket.id;
    // });


    // if (this.userId != this.reciverId) {
    //   this.socket.on('acknowledgement', (data) => {
    //     console.log('created --- acknowledgement---', data);
    //     this.updateMsg = data;
    //     // this.localMessages.push(this.updateMsg);
    //     console.log('update msg-', this.updateMsg);
    //   });
    // }

    // this.socket.on('acknowledgement', (data) => {
    //     console.log('created --- acknowledgement---', data);
    //     // if (data.user_id == this.userId) {
    //     //     console.log('get my message -', data);
    //     //   } else {
    //     //     this.updateMsg = data;
    //     //     console.log('get reciver message -', data);
    //     //   }
    //     this.updateMsg = data;
    //     this.localMessages.push(this.updateMsg);
    //     console.log('update msg-', this.updateMsg);
    //   });
    this.socket.on('acknowledgement', (data) => {
      console.log('created --- acknowledgement---', data);
      // if (data.user_id == this.userId) {
      //     console.log('get my message -', data);
      //   } else {
      //     this.updateMsg = data;
      //     console.log('get reciver message -', data);
      //   }
      this.updateMsg = data;
      // this.localMessages.push(this.updateMsg);
      console.log('update msg-', this.updateMsg);
    });

    this.socket.on("notification", (data) => {
      console.log('notification-', data);
    });

    this.socket.on("getFile", (data) => {
      console.log('getFile---->', data);
    })






  },

  mounted() {
    this.getLatestChatRoom();
    this.getAllChatRoom();
    this.getUserList();

    // this.socket.on('acknowledgement', (data) => {
    //     console.log('created --- acknowledgement---', data);
    //     // if (data.user_id == this.userId) {
    //     //     console.log('get my message -', data);
    //     //   } else {
    //     //     this.updateMsg = data;
    //     //     console.log('get reciver message -', data);
    //     //   }
    //     this.updateMsg = data;
    //     this.localMessages.push(this.updateMsg);
    //     console.log('update msg-', this.updateMsg);
    //   });



  },

  unmounted() {
    // this.disconnect();
  },

  watch: {
    updateMsg(value) {
      if (value) {
        console.log('value', value);
        this.localMessages.push(value);
      } else {
        // this.localMessages=[];
        console.log('no value', value);
      }
    }
  },

  methods: {

    // disconnect() {
    //   this.socket.emit('disconnect');
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
    },
    // set dropdown
    setUserList(item) {
      console.log('setUserList', item)
      this.defaultUserList = `${item.department}_${item.rank}_${item.name}`;
      // this.chatUsername = true;
      // this.showChat = true;
      this.friend_id = item.id
      this.createNewRoom(this.friend_id);
      if (this.showUserDropdown == true) {
        this.showUserDropdown = false;
        this.chooseUserList = false;
      }
    },

    setMsgList(item) {
      console.log('setMsgList', item)
      this.defaultUserList = `${item.name}`;
      // this.selectMsg = true;
      // this.showChat = true;
      this.getChatHistory(item.id)
      if (this.showMsgDropdown == true) {
        this.showMsgDropdown = false;
        this.selectMsg = false;
      }
    },
    selectLatestChat(item) {
      console.log('selectLatestChat--', item)
      this.defaultUserList = `${item.department}_${item.room_name}`;
      // this.showChat = true;
      this.reciverId = item.user_id;
      this.selectMsg = false;
      this.chooseUserList = false;
      this.getChatHistory(item.room_id);
    },
    writeMsg() {
      this.isSend = true;
      console.log(this.isSend)
    },
    goBack() {
      this.selectMsg = true;
      this.defaultUserList = '';
      this.showChat = false;
    },

    // chat room list
    getLatestChatRoom() {
      this.commonService
        .chatRoom(this.roomLimit)
        .then((res) => {
          if (res.status == 200) {
            console.log('latest chatroom', res.data);
            this.latestChatUsers = res.data.user_chatrooms;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },

    // 1 create chat room
    createNewRoom(fId) {
      // SocketioService.createRoom();
      console.log('createNewRoom', fId);
      this.socket.emit('createRoom', fId);
      // this.commonService.createRoom(fId).then((res) => {
      //     // console.log('createRoom res- ', res);
      //     if (res.status == 200) {
      //         this.getChatHistory(res.data.room_id)
      //         const newChatroom = new Object();
      //         newChatroom.room_id = res.data.room_id;
      //         newChatroom.room_unique_id = res.data.room_unique_id;
      //         newChatroom.content_type = 'text';
      //         this.createRoomObj = newChatroom;
      //         // console.log('this.createRoomObj--', this.createRoomObj);
      //     }
      // })
      //     .catch((err) => {
      //         console.log(err)
      //     })
    },

    //send message
    sendMessage() {
      if (this.msgText) {
        console.log(this.msgText);
        var a = moment();
        let smsgData = {
          message: this.msgText,
          room_id: this.createRoomObj.room_id,
          message_id: a.valueOf(),
          room_unique_id: this.createRoomObj.room_unique_id,
          content_type: 'text',
          file: this.msgFile,
          original_file_name: this.msgFile.name,
        }
        // let localsmsgdata = smsgData;
        // localsmsgdata['user_id'] = this.userId;

        // this.localMessages.push(localsmsgdata);

        this.socket.emit('sendMessage', smsgData);
        this.msgText = '';
        this.msgFile = '';
        window.scrollTo(0, document.getElementById('all_chat').scrollHeight);

        // SocketioService.sendMessage(smsgData);

        // console.log('localsmsgdata--', this.localMessages);
        // SocketioService.readMessage();
        // SocketioService.acknowledgement();

        // this.getChatHistory(this.createRoomObj.room_id);
        // this.getLatestChatRoom();
      }
    },

    getFile(event) {
      this.msgFile = event.target.files[0];
      // let formData = new FormData();
      // formData.append("room_unique_id", this.createRoomObj.room_unique_id);
      // formData.append("file", event.target.files[0]);
      // this.sendMessage(event.target.files[0]);
      // this.sendFile(event.target.files[0]);
      console.log('form file--', this.msgFile.name);
      console.log('form file--', this.msgFile.type);
      if (this.msgFile.type.match('image.*')) {
        console.log('image');
      }
      if (this.msgFile.type.match('video.*')) {
        console.log('video');
      }
      if (this.msgFile.type.match('audio.*')) {
        console.log('audio');
      } else {
        console.log('file');
      }
      // this.socket.emit('upload', formData);
    },
    fileDownload(fileUrl, fName) {
      let dObj = { url: fileUrl, fileName: fName };
      console.log(dObj);
      this.$store.dispatch('diagnosisManagement/createDownloadFiles', dObj);
    },
    // sendFile(efile) {
    //   console.log('hit send file....');
    //   if (efile) {
    //     console.log(efile);
    //     let smsgData = {
    //       room_unique_id: this.createRoomObj.room_unique_id,
    //       file: efile
    //     }
    //     console.log('smsgData', smsgData);
    //     this.socket.emit('upload', smsgData);
    //     this.msgFile = null;
    //     this.isSend = true;
    //     window.scrollTo(0, document.getElementById('all_chat').scrollHeight);
    //   }
    // },

    // get all chat room
    getAllChatRoom() {
      this.commonService.allChatRoom(this.msgSearch)
        .then((res) => {
          if (res.status == 200) {
            this.allChatUsers = res.data.user_chatrooms
          }
        })
        .catch((err) => { console.log(err) })
    },
    // get user list
    getUserList() {
      this.commonService
        .userList(this.companyId, this.userSearch)
        .then((res) => {
          if (res.status == 200) {
            this.userList = res.data.user_list;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // chat history
    getChatHistory(roomId) {
      console.log('getChatHistory joinMe with--', roomId);

      this.socket.emit('joinMe', roomId);


      this.commonService
        .chatHistory(roomId, this.page, this.chatLimit)
        .then((res) => {
          if (res.status == 200) {
            this.chatHistory = res.data.message_list;
            this.showChat = true;
            console.log('chat history---', res.data);

            // this.localMessages = this.chatHistory;

            const newChatroom = new Object();
            newChatroom.room_id = res.data.room_id;
            newChatroom.room_unique_id = res.data.room_unique_id;
            newChatroom.content_type = 'text';
            this.createRoomObj = newChatroom;
            console.log('this.createRoomObj--', this.createRoomObj);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // read all unread chat
    getReadAll() {
      this.commonService
        .readAll()
        .then((res) => {
          if (res.status == 200) {
            this.getLatestChatRoom();
            // console.log(res);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // new message
    newMessage() {
      console.log('newmsg hit');
      this.chooseUserList = true;
      // this.chatUsername = false;
      this.selectMsg = false;
      this.defaultUserList = '';
    },
    // show delte btn
    showDelete(event, item) {
      console.log(item);
      if (item.conversation_id) {
        this.isDelete = !this.isDelete;
      }
      this.deleteMessage(item.conversation_id, item.room_id)
      //    this.deleteMessage(item.conversation_id, item.conversation_recipient_id, item.room_id)
    },
    // delete msg
    deleteMessage(conversation_id, roomId) {
      this.commonService.deleteMsg(conversation_id, roomId)
        .then((res) => {
          console.log(res);
          if (res.status == 200) {
            console.log(res.data.room_id)
            this.getChatHistory(res.data.room_id)
          }
        })
        .catch((err) => {
          console.log(err);
        })
    },


  },

}
</script>

<style lang="scss" scoped>
</style>