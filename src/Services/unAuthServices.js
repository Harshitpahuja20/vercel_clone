// import {  socketServer } from "../Socket/socket";

import { socketIo } from "../Socket/socket";

const client_id = process.env.REACT_APP_CLIENT_ID;
const redirect_uri = process.env.REACT_APP_REDIRECT_URI;

export function loginwithgithub() {
  window.location.assign(
    `https://github.com/login/oauth/authorize?client_id=${client_id}&redirect_uri=${redirect_uri}&scope=repo`
  );
}

export function sendSessionCode(code){
  socketIo.emit("callback" , code)
}