import { io } from "socket.io-client";
// class SocketServer {
//   constructor(socket) {
//     this.socket = socket;
//   }
//   ConnectToSocket = () => {
//     this.socket = io.connect(process.env.React_APP_SERVER_URL);
//     //   console.log(socket);x
//   };

//   getSocket = () => {
//     console.log(this.socket);
//     return this.socket;
//   };
// }


// export const socketServer = new SocketServer()

export const socketIo = io.connect(process.env.React_APP_SERVER_URL)