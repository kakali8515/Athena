import { io } from 'socket.io-client';
// var token = localStorage.getItem('token');
class SocketioService {
  socket;
  constructor() { }

  // socket service
  setupSocketConnection() {
    var token = localStorage.getItem('token');

    this.socket = io(process.env.VUE_APP_SOCKET_ENDPOINT, {
      query: "token=" + token,
    });
  }

 // 1 -connection
  socketConnection() {
    // console.log('connection');
    this.socket.on("connect", (res) => {
      console.log('socket connection-', this.socket.connected);
    });

    this.socket.on('connect_error', (error) => {
      console.log('connect_error-', error);
    });

  }

  // 2 - sendMessage - emit
  sendMessage(data) {
    // console.log('sendMessagesocket', data.room_unique_id);
    this.socket.emit('sendMessage', data);
  }

  // 2.1 acknowledgement - on
  // async acknowledgement() {
  //   let msg;
  //   let myPromise = new Promise(function(resolve, reject) {
  //     this.socket.on('acknowledgement', (data) => {
  //       console.log('acknowledgement-', data);
  //       msg = data;
  //     });
  //     resolve(msg);
  //   });
  //   // this.socket.on('acknowledgement', (data) => {
  //   //   console.log('acknowledgement-', data);
  //   //   msg = data;
  //   // });
  //   let value = await myPromise;
  //   return value;
  // }

  // 3 - createRoom
  createRoom(data) {
    // console.log('create room !');
    this.socket.emit('createRoom', (res) => {
      // console.log('createRoom-', res);
    });
  }
  // 4 - joinMe - emit
  joinMe(roomId) {
    this.socket.emit('joinMe', roomId);
  }
  // 5 - readMessage
  readMessage(data) {
    this.socket.emit('readMessage', data);
  }
  // 6 - leaveMe
  leaveMe(data) {
    this.socket.emit('leaveMe', data);
  }
  // 7 - disconnect
  disconnect() {
    this.socket.emit('disconnect');
    // console.log('disconnect', this.socket);
    if (this.socket) {
      this.socket.disconnect();
    }
  }
}

export default new SocketioService();