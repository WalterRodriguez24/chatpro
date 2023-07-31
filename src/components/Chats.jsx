import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

const Chats = () => {
  // const [chatpro, setChatpro] = useState();
  const chat = [
    {
      name: "asdasd",
      flow: {
        nodes: [
          {
            id: "lkobes9teswuq8kyouf",
            type: "main",
            question: "asdasdads",
            entry: "asdasd",
            responses: [
              {
                id: "lkobeu4ph2tax2avnz",
                type: "response",
                question: "asdasd",
                entry: "asdasd",
                responses: [
                  {
                    id: "lkobevm9dggrf3cz4yp",
                    type: "response",
                    question: "asdasd",
                    entry: "asdasd",
                    responses: [
                      {
                        id: "lkobexbdsyhktgqgzqp",
                        type: "response",
                        question: "entry",
                        responses: [],
                        parentId: "lkobevm9dggrf3cz4yp",
                        showResponses: true,
                      },
                    ],
                    parentId: "lkobeu4ph2tax2avnz",
                    showResponses: true,
                  },
                ],
                parentId: "lkobes9teswuq8kyouf",
                showResponses: true,
              },
              {
                id: "lkobeygpkgc7xi9yfr",
                type: "response",
                question: "asdasdasd",
                entry: "asdasd",
                responses: [],
                parentId: "lkobes9teswuq8kyouf",
                showResponses: true,
              },
              {
                id: "lkobf16pnphdr0yru1",
                type: "response",
                question: "asdasd",
                entry: "asdasd",
                responses: [],
                parentId: "lkobes9teswuq8kyouf",
                showResponses: true,
              },
              {
                id: "lkobf3416mu8c4bihba",
                type: "response",
                question: "asdasd",
                entry: "asdasd",
                responses: [],
                parentId: "lkobes9teswuq8kyouf",
                showResponses: true,
              },
            ],
            showResponses: true,
          },
          {
            id: "lkobf5m9blosppllffm",
            type: "main",
            question: "asdasd",
            entry: "asdasd",
            responses: [],
            showResponses: true,
          },
        ],
      },
    },
  ];

  const [conversationFlow, setConversationFlow] = useState({ nodes: [] });
  // Function to generate a unique ID
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
  





  const validacion =()=> {
    if( question.trim() ==""
    || question==="" || entry.trim()=="" || entry===""){
      return
    }
    addNode()
    console.log(conversationFlow)
  }

  // useEffect(() => {
  //   setChatpro(chat);
  // }, []);
  // if (!chatpro) {
  //   return <h1>vjndjvn</h1>;
  // }

  return (
    <Box
      sx={{
        border: "1px solid #ccc",
        borderRadius: "4px",
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
          onChange={()=> validacion()}
          // defaultValue={chatpro.pregunta}
          variant="standard"
          margin="normal"
        />
        <TextField
          fullWidth
          // defaultValue={chatpro.entrada}
          label="Entrada"
          onChange={()=> validacion()}
          variant="standard"
          margin="normal"
        />
      </Box>

      {conversationFlow.nodes.responses instanceof Array &&
        conversationFlow.nodes.responses.map((resp) => (
          <Box
            key={resp.id}
            sx={{
              marginBottom: "20px",
              borderBottom: "1px solid #ccc",
              paddingBottom: "10px",

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
              defaultValue={resp.respuesta}
              variant="standard"
              margin="normal"
            />
            <TextField
              fullWidth
              defaultValue={resp.entrada}
              label="Entrada"
              variant="standard"
              margin="normal"
            />

            <Stack spacing={2} marginTop={2}>
              <Button variant="outlined" color="error">
                Eliminar respuestas
              </Button>
              <Button onClick={addNode} variant="outlined">Agregar respuesta anidada</Button>
            </Stack>
          </Box>
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

        <Stack spacing={2} marginTop={2}>
          <Button variant="outlined" color="error">
            Eliminar respuesta Anidada
          </Button>
          <Button variant="outlined">Agregar respuesta anidada</Button>
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
