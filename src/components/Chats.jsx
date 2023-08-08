/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { chatData } from "../data/chatData";

const Chats = () => {
  const marginLeftByResponse = 20;
  const [conversationFlow, setConversationFlow] = useState({ nodes: [] });
  const [chatFlow, setChatFlow] = useState([]);
  const [dataQuestion, setDataQuestion] = useState({
    question: "",
    entry: "",
  });

  useEffect(() => {
    setChatFlow(chatData[0]);
  }, []);

  const generateNodeId = () => {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  };

  // Function to add a new node of interaction
  const addNode = () => {
    const nodeId = generateNodeId(); //iscusncjsnij
    const newNode = {
      id: nodeId,
      type: "main",
      question: "",
      entry: "",
      responses: [],
      showResponses: true,
    };
    setConversationFlow((prevFlow) => ({
      ...prevFlow,
      nodes: [...prevFlow.nodes, newNode],
    }));
  };

  // Function to delete a node of interaction
  const deleteNode = (nodeId) => {
    setConversationFlow((prevFlow) => ({
      ...prevFlow,
      nodes: prevFlow.nodes.filter((node) => node.id !== nodeId),
    }));
  };

  // Function to add a response to a node
  const addResponse = (parentNodeId) => {
    const parentNode = conversationFlow.nodes.find(
      (node) => node.id === parentNodeId
    );
    const responseId = generateNodeId();
    const newResponseNode = {
      id: responseId,
      type: "response",
      question: "",
      entry: "",
      responses: [],
      parentId: parentNode.id,
      showResponses: true,
    };
    setConversationFlow((prevFlow) => ({
      ...prevFlow,
      nodes: prevFlow.nodes.map((node) => {
        if (node.id === parentNodeId) {
          return {
            ...node,
            responses: [...node.responses, newResponseNode],
          };
        }
        return node;
      }),
    }));
  };

  const validacion = () => {
    if (
      dataQuestion.question.trim() == "" ||
      dataQuestion.question === "" ||
      dataQuestion.entry.trim() == "" ||
      dataQuestion.entry === ""
    ) {
      return;
    }
    addNode();
    console.log(conversationFlow);
  };

  if (chatFlow.length === 0) {
    return <h1>Cargando...</h1>;
  }

  return (
    <Box
      sx={{
        border: "1px solid #ccc",
        borderRadius: "10px",
        padding: "20px",
      }}
    >
      <h1 style={{ marginBottom: "20px" }}>Nodo ID: lko5n0ynh4ot3e33jdr</h1>
      <Box
        sx={{
          width: 500,
          maxWidth: "100%",
          marginBottom: "20px",
          borderBottom: "1px solid #ccc",
          paddingBottom: "10px",
        }}
      >
        <TextField
          fullWidth
          label="Pregunta"
          onChange={() => setDataQuestion({ ...dataQuestion, question: "" })}
          defaultValue={chatFlow.flow.nodes[0].question}
          variant="standard"
          margin="normal"
        />
        <TextField
          fullWidth
          label="Entrada"
          onChange={() => setDataQuestion({ ...dataQuestion, entry: "" })}
          defaultValue={chatFlow.flow.nodes[0].entry}
          variant="standard"
          margin="normal"
        />
      </Box>

      {chatFlow.flow.nodes[0].responses instanceof Array &&
        chatFlow.flow.nodes[0].responses.map((resp) => (
          <>
            <Box
              key={resp.id}
              sx={{
                marginBottom: "20px",
                borderBottom: "1px solid #ccc",
                paddingBottom: "10px",
                marginLeft: `${marginLeftByResponse}px`,

                width: 500,
                maxWidth: "100%",
                border: "1px solid #ccc",
                borderRadius: "4px",
                padding: "20px",
                left: "20",
              }}
            >
              <TextField
                fullWidth
                label="Respuesta"
                defaultValue={resp.question}
                variant="standard"
                margin="normal"
              />
              <TextField
                fullWidth
                defaultValue={resp.entry}
                label="Entrada"
                variant="standard"
                margin="normal"
              />

              <Stack spacing={2} marginTop={2} direction="row">
                <Button onClick={addNode} variant="outlined">
                  Agregar respuesta anidada
                </Button>
                <Button variant="outlined" color="error">
                  Eliminar respuestas
                </Button>
              </Stack>
            </Box>

            {chatFlow.flow.nodes[0].responses instanceof Array &&
              chatFlow.flow.nodes[0].responses[0].responses.map((resp) => (
                <Box
                  key={resp.id}
                  sx={{
                    marginBottom: "20px",
                    borderBottom: "1px solid #ccc",
                    paddingBottom: "10px",
                    marginLeft: `${marginLeftByResponse * 2}px`,

                    width: 500,
                    maxWidth: "100%",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                    padding: "20px",
                    left: "20",
                  }}
                >
                  <TextField
                    fullWidth
                    label="Respuesta"
                    defaultValue={resp.question}
                    variant="standard"
                    margin="normal"
                  />
                  <TextField
                    fullWidth
                    defaultValue={resp.entry}
                    label="Entrada"
                    variant="standard"
                    margin="normal"
                  />

                  <Stack spacing={2} marginTop={2} direction="row">
                    <Button onClick={addNode} variant="outlined">
                      Agregar respuesta anidada
                    </Button>
                    <Button variant="outlined" color="error">
                      Eliminar respuestas
                    </Button>
                  </Stack>
                </Box>
              ))}




            {chatFlow.flow.nodes[0].responses instanceof Array &&
              chatFlow.flow.nodes[0].responses[0].responses.map((resp) => (
                <Box
                  key={resp.id}
                  sx={{
                    marginBottom: "20px",
                    borderBottom: "1px solid #ccc",
                    paddingBottom: "10px",
                    marginLeft: `${marginLeftByResponse * 2}px`,

                    width: 500,
                    maxWidth: "100%",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                    padding: "20px",
                    left: "20",
                  }}
                >
                  <TextField
                    fullWidth
                    label="Respuesta"
                    defaultValue={resp.type}
                    variant="standard"
                    margin="normal"
                  />
                  <TextField
                    fullWidth
                    defaultValue={resp.type}
                    label="Entrada"
                    variant="standard"
                    margin="normal"
                  />

                  <Stack spacing={2} marginTop={2} direction="row">
                    <Button onClick={addNode} variant="outlined">
                      Agregar respuesta anidada
                    </Button>
                    <Button variant="outlined" color="error">
                      Eliminar respuestas
                    </Button>
                  </Stack>
                </Box>
              ))}
          </>
        ))}

      <Box
        sx={{
          width: 500,
          maxWidth: "100%",
          border: "1px solid #ccc",
          borderRadius: "4px",
          padding: "20px",
          left: "",
        }}
      >
        <TextField
          fullWidth
          label="Respuesta"
          // defaultValue={resp.respuesta}
          variant="standard"
          margin="normal"
        />
        <TextField
          fullWidth
          // defaultValue={resp.entrada}
          label="Entrada"
          variant="standard"
          margin="normal"
        />

        <Stack spacing={2} marginTop={2} direction="row">
          <Button variant="outlined">Agregar respuesta anidada</Button>
          <Button variant="outlined" color="error">
            Eliminar respuestas
          </Button>
        </Stack>
      </Box>

      <Stack direction="row" spacing={2} marginTop={3}>
        <Button variant="outlined">Agregar respuestas</Button>
        <Button variant="outlined" color="error">
          Eliminar Nodo
        </Button>
        <Button
          variant="outlined"
          sx={{
            bgcolor: "#757575",
            color: "#fff",
            "&:hover": { bgcolor: "#616161" },
          }}
        >
          Mostrar respuestas
        </Button>
      </Stack>
    </Box>
  );
};

export default Chats;
