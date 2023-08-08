import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

export const ChatContext = createContext();

const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

export const KEY_CHAT_NODES = "chatNodes";

export function ChatContextProvider({ children, initialNode }) {
  /*   const [mainNode, setMainNode] = useState(() => {
    const chatNodes = window.localStorage.getItem(KEY_CHAT_NODES);

    if (chatNodes) {
      return JSON.parse(chatNodes);
    }

    return initialNode;
  });

  useEffect(() => {
    window.localStorage.setItem(KEY_CHAT_NODES, JSON.stringify(mainNode));
  }, [mainNode]); */

  const [mainNode, setMainNode] = useLocalStorage(KEY_CHAT_NODES, initialNode);

  function addNode(nodeId, position) {
    const newMainNode = JSON.parse(JSON.stringify(mainNode));

    const recursivelyAddNode = (node) => {
      if (node.id === nodeId) {
        if (!node.responses) {
          node.responses = [];
        }
        const newNode = {
          id: generateId(),
          type: "response",
          response: "",
          entry: "",
          responses: [],
        };

        if (position === "start") {
          node.responses.unshift(newNode);
        } else if (position === "after") {
          const idx = node.responses.findIndex((n) => n.id === nodeId);
          node.responses.splice(idx + 1, 0, newNode);
        } else {
          node.responses.push(newNode);
        }
        return;
      }
      (node.responses || []).forEach(recursivelyAddNode);
    };

    recursivelyAddNode(newMainNode);
    setMainNode(newMainNode);
  }

  function deleteNode(nodeId) {
    const newMainNode = JSON.parse(JSON.stringify(mainNode));

    const recursivelyDeleteNode = (node, nodeId) => {
      if (!node.responses) return;

      const index = node.responses.findIndex(
        (response) => response.id === nodeId
      );
      if (index !== -1) {
        node.responses.splice(index, 1);
        return;
      }

      node.responses.forEach((response) =>
        recursivelyDeleteNode(response, nodeId)
      );
    };

    recursivelyDeleteNode(newMainNode, nodeId);
    setMainNode(newMainNode);
  }

  return (
    <ChatContext.Provider value={{ mainNode, addNode, deleteNode }}>
      {children}
    </ChatContext.Provider>
  );
}
