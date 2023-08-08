import {} from "react";
// import Login from './components/Login';
// import Mainmenu from './components/Mainmenu'
// import LoginRouter from './routes/LoginRouter';
import Chats from "./components/Chats";
import { createTheme } from "@mui/material";
import { ThemeProvider } from "@emotion/react";

import { mappedData } from "./data/chatData";
import { ChatContextProvider } from "./components/ChatContext";

const darkTheme = createTheme({
  palette: {
    mode: "light",
  },
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <ChatContextProvider initialNode={mappedData[0]}>
        <Chats />
      </ChatContextProvider>
    </ThemeProvider>

    // <Mainmenu/>
  );
}

export default App;
