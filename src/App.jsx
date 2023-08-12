import { createTheme } from "@mui/material";
import { ThemeProvider } from "@emotion/react";

import { mappedData } from "./data/chatData";
import { ChatContextProvider } from "./components/ChatContext";
import Router from "./routes/Routes";

const darkTheme = createTheme({
  palette: {
    mode: "light",
  },
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <ChatContextProvider initialNode={mappedData[0]}>
        <Router />
      </ChatContextProvider>
    </ThemeProvider>

  );
}

export default App;
