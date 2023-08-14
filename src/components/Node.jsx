import { Box, Button, Collapse, Stack, TextField } from "@mui/material";
import { useState, useEffect } from "react";
import { useChatContext } from "../hooks/useChatContext";

/**
 * @typedef {Object} Events
 * @property {(nodeId: string) => void} onNodeAdd - Function to add a new node
 * @property {(nodeId: string) => void} onNodeDelete - Function to delete a node
 */

/**
 * @typedef {Object} Props
 * @property {Object} node
 * @property {number} nestedLevel
 * @property {boolean} isNested
 * @property {Events} Events - The event handlers
 */

/**
 * A component that represents a node in the chatbot flow.
 * @param {Props} props - The props for the component
 * @returns {JSX.Element} - The JSX element
 */

const MARGIN_LEFT_BY_RESPONSE = 50;

export default function NodeChat(props) {
  const { onNodeAdd, onNodeDelete, node, nestedLevel = 0, isNested } = props;
  const mainLabel = node.type === "main" ? "Pregunta" : "Respuesta";

  const [open, setOpen] = useState(true);

  const { addNode, deleteNode, updateNodeContent } = useChatContext();

  // const [question, setquestion] = useState(node.question || node.response || "");
  // const [answer, setanswer] = useState(node.entry || "");

  
  const handleClick = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const hasResponses = node.responses
    ? Array.isArray(node.responses) && node.responses.length > 0
    : false;

  const newNestedLevel = nestedLevel + 1;

  const nestedStyle = isNested
    ? {
        border: "1px solid #ccc",
        borderRadius: "4px",
        padding: "20px",
      }
    : {};






  function handleNodeAdd() {
    addNode(node.id);
  }


  function handleNodeDelete() {
    deleteNode(node.id);
  }

  if (nestedLevel > 10) return <div>Maximo nivel es 10</div>;


  return (
    <>
      <Box
        sx={{
          width: 500,
          maxWidth: "100%",
          marginBottom: "20px",
          borderBottom: "1px solid #ccc",
          paddingBottom: "10px",
          marginLeft: `${nestedLevel * MARGIN_LEFT_BY_RESPONSE}px`,
          ...nestedStyle,
        }}
      >
        <TextField
          fullWidth
          label={mainLabel}
          defaultValue={node.question || node.entry}
          onChange={(e) => {

            const newentry = e.target.value
            if(nestedLevel==0){
              updateNodeContent(node.id, {question:newentry})
            }else{
              updateNodeContent(node.id, {entry:newentry})
            }
          }}
          variant="standard"
          margin="normal"
        />
        <TextField
          fullWidth
          label="Entrada"
          defaultValue={node.response}
          onChange={(e) => {
            updateNodeContent(node.id, {response: e.target.value});
          }}
          variant="standard"
          margin="normal"
        />

        <Stack spacing={2} marginTop={2} direction="row">
          <Button onClick={handleNodeAdd} variant="outlined">
            Agregar respuesta anidada
          </Button>
          <Button variant="outlined" onClick={handleNodeDelete} color="error">
            Eliminar respuestas
          </Button>
        </Stack>
      </Box>

      {hasResponses && (
        <>
          <Button onClick={handleClick} sx={{ marginBottom: "20px" }}>
            {open ? "Ocultar respuestas" : "Mostrar respuestas"}
          </Button>
          <Collapse component="div" in={open} timeout="auto" unmountOnExit>
            {node.responses.map((resp) => (
              <NodeChat
                key={resp.id}
                node={resp}
                nestedLevel={newNestedLevel}
                isNested
              />
            ))}
          </Collapse>
        </>
      )}
    </>
  );
}
