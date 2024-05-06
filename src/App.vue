<template>
  <div id="app-container">
    <!-- header -->
    <HeaderOne />
    <!--ENd header -->
    <router-view :key="$route.path" v-slot="{ Component }">
      <transition name="route" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
    <!-- Footer -->
    <Footer v-if="routeName == 'LogIn' || routeName == 'SignUp'" />
    <!-- Footer -->
  </div>
</template>
<script>
import HeaderOne from "./components/HeaderOne.vue";
import Footer from "./components/Footer.vue";
import SocketioService from "./services/SocketIoService.js";

export default {
  name: "App",
  components: {
    HeaderOne,
    Footer,
  },

  data() {
    return {
      currentRouteName: "", // Store the current route name
    };
  },
  computed: {
    routeName() {
      return (this.currentRouteName = this.$route.name);
    },
  },

  mounted() {
    SocketioService.setupSocketConnection();
    SocketioService.socketConnection();

    // Get Messages
    // SocketioService.socket.on('acknowledgement', (data) => {
    //   console.log('msg acknowledgement------', data);
    //   if (data.conversation_id) {
    //     this.getLatestChatRoom();
    //   }

    //   if (data.room_id == this.currentRoomId) {
    //     this.updateMsg = data;
    //     // this.localMessages.push(this.updateMsg);
    //     console.log('SocketioService.socket msg-', this.updateMsg);
    //     SocketioService.socket.on('hasRead', (data) => {
    //       console.log('hasRead data------------', data);
    //       this.$store.state.msgHasread = data.has_read;
    //     });
    //   }
    // });

    // Get Notifications
    SocketioService.socket.on("notification", (data) => {
      console.log("APP notification data------------", data);
      this.$store.state.notificationList = data;
    });

    // Get Notifications
    SocketioService.socket.on("hasRead", (data) => {
      console.log("App hasRead data------------", data);
      this.$store.state.msgHasread = data.has_read;
    });

    // DISCONNECT
    SocketioService.socket.on("disconnect", () => {
      console.log(SocketioService.socket.connected); // false
      SocketioService.setupSocketConnection();
      SocketioService.socketConnection();
    });
  },

  updated() {
    console.log("socket connection-", SocketioService.socket.connected);
  },
};
</script>

<style src="vue-multiselect/dist/vue-multiselect.css"></style>

<style>
#app {
  font-family: "pretendard";
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  min-width: 1200px;
  font-weight: 600;
}
</style>
