import React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { Modal, Typography } from "@mui/material";
import qrsvg from "../img/descarga.svg"
const Mainmenu = () => {
  const [age, setAge] = React.useState("");
  const [open, setOpen] = React.useState(false);

  const style = {
    position: 'absolute' ,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    textAlign:'center'
  };

  const titulowhasapt = {
    fontSize: '30px'
  }

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <Box
      sx={{
        padding: "10px",
        textAlign: "center",
        justifyContent: "center",
        maxWidth: "1100",
      }}
    >
      <Box sx={{ minWidth: 120, marginBottom: "20px" }}>
        <FormControl fullWidth variant="outlined">
          <InputLabel id="demo-simple-select-label">PROYECTO</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={age}
            label="Age"
            onChange={handleChange}
          >
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Stack direction="row" spacing={2} justifyContent="left">
        <Button
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

      <Stack direction="row" spacing={2} justifyContent="left" marginTop="20px">
        <Button
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
        onClick={()=>setOpen(true)}
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
      <Modal
        open={open}
        onClose={()=>setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx ={style}>
          <Typography sx={titulowhasapt} id="modal-modal-title" variant="h6" component="h2">
            QR DE WHASSAPT
          </Typography>
          <br/>
          <img src={qrsvg} alt="" srcset="" />
        </Box>
      </Modal>
    </Box>
  );
};

export default Mainmenu;




