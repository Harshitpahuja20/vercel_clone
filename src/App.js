import { RouterProvider, useNavigate } from "react-router-dom";
import "./App.css";
import router from "./Routes/routes";
import { useEffect } from "react";
import { socketIo } from "./Socket/socket";
// import { socketServer } from "./Socket/socket";
// import { ConnectToSocket } from "./Socket/socket";

function App() {
  useEffect(() => {
    socketIo.on("server_response", (data) => {
      console.log(data)
      if (data.status) {
        localStorage.setItem("git_access_token" , data.access_token);
        console.log("object")
        window.location.href = "/";
      }
    });
  }, [socketIo]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
