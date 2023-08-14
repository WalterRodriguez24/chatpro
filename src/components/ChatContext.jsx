/* eslint-disable react/prop-types */
import { createContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

export const ChatContext = createContext();

const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

export const KEY_CHAT_NODES = "chatNodes";

export function ChatContextProvider({ children, initialNode }) {
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

  function setIdNodeProject(nodeId) {
    const newMainNode = Object.assign(mainNode, { id: nodeId });
    setMainNode(newMainNode);
  }


  
  /**
   * Actualiza el contenido de un nodo específico.
   * 
   * @param {string} nodeId - El ID del nodo a actualizar.
   * @param {Object} newData - Los nuevos datos para el nodo.
   */
  function updateNodeContent(nodeId, newData) {
    const recursivelyUpdateNode = (node) => {
      if (node.id === nodeId) {
        return { ...node, ...newData };
      }

      if (node.responses && node.responses.length > 0) {
        const updatedResponses = node.responses.map(recursivelyUpdateNode);
        return { ...node, responses: updatedResponses };
      }

      return node;
    };

    const updatedMainNode = recursivelyUpdateNode(mainNode);
    setMainNode(updatedMainNode);
  }

  function setnode(node) {
setMainNode(node)
  }


  return (
    <ChatContext.Provider
    value={{ mainNode, addNode, deleteNode, setIdNodeProject, updateNodeContent,setnode }}
    >
      {children}
    </ChatContext.Provider>
  );
}
