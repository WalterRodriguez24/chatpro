import { useContext } from "react";
import { ChatContext } from "../components/ChatContext";

export function useChatContext() {
  return useContext(ChatContext);
}
