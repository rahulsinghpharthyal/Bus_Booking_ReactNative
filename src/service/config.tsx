import { Platform } from "react-native";
import io from "socket.io-client";

// export const BASE_URL =
//     Platform.OS === 'android' ? 'http"//10.0.2.2:4000' : 'http://localhost:4000';


// USE YOUR NETWORK IP OR HOSTED URL
// export const BASE_URL = 'http://192.168.1.64:4000'; 
export const BASE_URL = 'https://bus-booking-server-8h1r.onrender.com'; 

export const socket = io("https://your-railway-app.up.railway.app", {
  transports: ["websocket"],
});