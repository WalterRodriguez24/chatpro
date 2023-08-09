import { useEffect, useState } from "react";
import {
  Box,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Stack,
  Button,
  TextField,
} from "@mui/material";
import { Modal, Typography } from "@mui/material";
import qrsvg from "../img/descarga.svg";
import Chats from "../components/Chats";
import { Save } from "@mui/icons-material";
import { useChatContext } from "../hooks/useChatContext";
import useLocalStorage from "../hooks/useLocalStorage";

const Dashboard = () => {
  // Importas toastity

  const [, setValueNodeCurrent] = useLocalStorage("chatNodes", []);
  // Cualquier cosa
  const [proyectSelected, setProyectSelected] = useState("");
  const [showChatNode, setShowChatNode] = useState(false);

  // Modals
  const [showModalWhatsap, setShowModalWhatsap] = useState(false);
  const [showModalSetNameProject, setShowModalSetNameProject] = useState(false);

  // Context
  const { mainNode } = useChatContext();

  // Values
  const [nameProject, setNameProject] = useState("");
  const [getProjectLocalStorage, setGetProjectLocalStorage] = useState([]);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    textAlign: "center",
  };

  const handleChangeProjectSelected = (event) => {
    setProyectSelected(event.target.value);
  };

  const onSaveProject = () => {
    if (
      nameProject.length == 0 ||
      nameProject == "" ||
      nameProject.trim() == ""
    ) {
      console.log("No se puede guardar un proyecto sin nombre");
      return;
    }

    const newMainNode = Object.assign(mainNode, { name: nameProject });
    const getProjects = JSON.parse(localStorage.getItem("projects")) || [];
    localStorage.setItem(
      "projects",
      JSON.stringify([...getProjects, newMainNode])
    );
    setGetProjectLocalStorage([...getProjects, newMainNode]);
    setShowModalSetNameProject(false);
    setShowChatNode(false);
  };

  const onLoadProject = () => {
    const getProjects = JSON.parse(localStorage.getItem("projects")) || [];
    const proyectSelectedInLocalStorage = getProjects.find(
      (project) => project.name == proyectSelected
    );
    setValueNodeCurrent(proyectSelectedInLocalStorage);
  };

  useEffect(() => {
    const getProjects = JSON.parse(localStorage.getItem("projects")) || [];
    setGetProjectLocalStorage(getProjects);
  }, []);

  return (
    <Box
      sx={{
        padding: "10px",
        textAlign: "center",
        justifyContent: "center",
        maxWidth: "1100",
      }}
    >
      {/* Proyectos */}
      <Box sx={{ minWidth: 120, marginBottom: "20px" }}>
        <FormControl fullWidth variant="outlined">
          <InputLabel id="demo-simple-select-label">PROYECTO</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={proyectSelected}
            label="Age"
            onChange={handleChangeProjectSelected}
          >
            {getProjectLocalStorage.map((project) => (
              <MenuItem key={project.id} value={project.name}>
                {project.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {/* Primera fila */}
      <Stack direction="row" spacing={2} justifyContent="left">
        <Button
          onClick={() => {
            setShowChatNode(true);
            onLoadProject();
          }}
          variant="contained"
          size="large"
          sx={{
            bgcolor: "green",
            color: "#fff",
            "&:hover": { bgcolor: "#2e7d32" },
          }}
        >
          Cargar
        </Button>
        <Button
          variant="contained"
          size="large"
          sx={{
            bgcolor: "red",
            color: "#fff",
            "&:hover": { bgcolor: "#c62828" },
          }}
        >
          Eliminar
        </Button>
      </Stack>
      <h2
        style={{
          marginBottom: "20px",
          color: "#000000",
          fontSize: "45px",
          textTransform: "uppercase",
          textAlign: "left",
        }}
      >
        CHAT PRO
      </h2>

      {/* Segunda fila */}
      <Stack direction="row" spacing={2} justifyContent="left" marginTop="20px">
        <Button
          onClick={() => setShowChatNode(!showChatNode)}
          variant="contained"
          size="large"
          sx={{
            bgcolor: "blue",
            color: "#fff",
            "&:hover": { bgcolor: "#1976d2" },
          }}
        >
          Agregar Nodo
        </Button>
        <Button
          variant="contained"
          size="large"
          sx={{
            bgcolor: "grey",
            color: "#fff",
            "&:hover": { bgcolor: "#616161" },
          }}
        >
          Mostrar respuestas
        </Button>
        <Button
          onClick={() => setShowModalSetNameProject(true)}
          variant="contained"
          size="large"
          sx={{
            bgcolor: "skyblue",
            color: "#fff",
            "&:hover": { bgcolor: "#0288d1" },
          }}
        >
          Guardar
        </Button>
        <Button
          onClick={() => setShowModalWhatsap(true)}
          variant="contained"
          size="large"
          sx={{
            bgcolor: "limegreen",
            color: "#fff",
            "&:hover": { bgcolor: "#558b2f" },
          }}
        >
          Conectar Whatsapp
        </Button>
        <Button
          variant="contained"
          size="large"
          sx={{
            bgcolor: "#ff9800",
            color: "#fff",
            "&:hover": { bgcolor: "#f57c00" },
          }}
        >
          Iniciar App
        </Button>
      </Stack>

      {/* Modal whatsap */}
      <Modal
        open={showModalWhatsap}
        onClose={() => setShowModalWhatsap(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            sx={{ fontSize: "30px" }}
            id="modal-modal-title"
            variant="h6"
            component="h2"
          >
            QR DE WHASSAPT
          </Typography>
          <br />
          <img src={qrsvg} alt="" />
        </Box>
      </Modal>

      {/* Modal set project */}
      <Modal
        open={showModalSetNameProject}
        onClose={() => setShowModalSetNameProject(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            sx={{ fontSize: "30px" }}
            id="modal-modal-title"
            variant="h6"
            component="h2"
          >
            Establece el nombre del proyecto
          </Typography>
          <br />
          <br />
          <TextField
            id="standard-basic"
            label="Nombre del proyecto"
            variant="standard"
            onChange={(e) => setNameProject(e.target.value)}
          />
          <br />
          <br />
          <Button
            variant="contained"
            size="large"
            endIcon={<Save />}
            onClick={onSaveProject}
            required
          >
            Guardar proyecto
          </Button>
        </Box>
      </Modal>

      <br />
      <br />

      {showChatNode && <Chats />}
    </Box>
  );
};

export default Dashboard;
