import { useEffect, useState } from "react";
import {mappedData} from '../data/chatData'
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
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";

const PROJECTS = "proyecto";

const Dashboard = () => {
  // Importas toastity

  const [projetcs, setProjetcs] = useLocalStorage(PROJECTS, []);
  // Cualquier cosa
  const [proyectSelected, setProyectSelected] = useState("");

  const [showChatNode, setShowChatNode] = useState(false);

  // Modals
  const [showModalWhatsap, setShowModalWhatsap] = useState(false);
  const [showModalSetNameProject, setShowModalSetNameProject] = useState(false);

  // Context
  const { mainNode, setnode } = useChatContext();

  useEffect(() => {
    const proyectData = projetcs.find(
      (project) => project.name == proyectSelected
    );
    
    if (!proyectData) {
      setnode(mappedData[0]);
      return
    }
    setnode(proyectData);
    setShowChatNode(false);

  }, [proyectSelected, projetcs]);
  

  // Values
  const [nameProject, setNameProject] = useState("");
  // const [getProjectLocalStorage, setGetProjectLocalStorage] = useState([]);

  const [validationError, setvalidationError] = useState(false);

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
    

    const proyectData = projetcs.find(
      (project) => project.name == proyectSelected
    );
    console.log({proyectData})
    if (proyectData) {
      setProjetcs(
        projetcs.map((projetc) => {
          if (projetc.name === proyectData.name) {
            return mainNode;
          }
          return projetc;
        })
      );
    } else {
      if (
        nameProject.length == 0 ||
        nameProject == "" ||
        nameProject.trim() == ""       ) 
        {
        setvalidationError(true);
        toast.error("No se puede guardar un proyecto sin nombre");
        return;
      }
      if (projetcs.some((project) => project.name === nameProject)) {
        setvalidationError(true);
        toast.error("Ya existe un proyecto con este nombre");
        return;
      }

      
      const newMainNode = Object.assign(mainNode, { name: nameProject ,id:window.crypto.randomUUID()});
      setProjetcs([...projetcs, newMainNode]);
    }
  

    setShowModalSetNameProject(false);
    setShowChatNode(false);

    toast.success("Proyecto guardado exitosamente");
  };


  const onDelete = ()=> {
    console.log({projetcs,proyectSelected})
    setProjetcs(projetcs.filter((proyect)=>proyect.name!=proyectSelected))
    setShowModalSetNameProject(false);
    setShowChatNode(false);
    
    }




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
            {projetcs.map((project) => (
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
            // onLoadProject();
          }}
          variant="contained"
          disabled = {proyectSelected.length===0}
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
          disabled = {proyectSelected.length===0}
          onClick={onDelete}
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
          onClick={() => {setShowChatNode(false)
            setTimeout(()=>{
              setShowChatNode(true)
            },500)
            setProyectSelected('')
          }}
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
          onClick={() => {
           if (proyectSelected == "") {
              setShowModalSetNameProject(true);
            }else{
              onSaveProject()
            }
          }}
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
          <TextField
            id="standard-basic"
            label="Nombre del proyecto"
            variant="standard"
            onChange={(e) => {
              setNameProject(e.target.value);
              setvalidationError(false);
            }}
            error={validationError}
            helperText={validationError ? "ingrese un nombre valido " : ""}
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
            {/* toast.success('Guardado con éxito') */}
            Guardar proyecto
          </Button>
          <ToastContainer
            position="top-right"
            hideProgressBar
            newestOnTop
            closeOnClick
          />
        </Box>
      </Modal>

      <br />
      <br />

      {showChatNode && <Chats />}
    </Box>
  );
};

export default Dashboard;
