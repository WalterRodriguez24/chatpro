/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";

import NodeChat from "./Node";
import { useChatContext } from "../hooks/useChatContext";
/**
 * @typedef Conversation
 * @property {string} name
 * @property {number} [age]
 */

const marginLeftByResponse = 100;

const generateNodeId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

const Chats = () => {
  const { mainNode } = useChatContext();

  if (!mainNode) {
    return <h1>No hay respuesta</h1>;
  }

 
  return (
    <Box
      sx={{
        border: "1px solid #ccc",
        borderRadius: "10px",
        padding: "20px",
      }}
    >
      <h1 style={{ marginBottom: "20px" }}>Nodo ID: {mainNode.id}</h1>

      {mainNode.responses.map((resp) => (
        <NodeChat key={resp.id} node={resp} />
      ))}
    </Box>
  );
};

export default Chats;
