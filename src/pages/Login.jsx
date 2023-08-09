import React, { useState } from "react";
import Grid from "@mui/material/Grid";

import Paper from "@mui/material/Paper";
import {
  Avatar,
  TextField,
  FormControlLabel,
  Button,
  Typography,
  Link,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Checkbox from "@mui/material/Checkbox";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navegation = useNavigate();

  const paperStyle = {
    padding: 20,
    height: "70vh",
    width: 280,
    margin: "20px auto",
  };
  const avatarStyle = { backgroundColor: "#1bbd7e" };
  const Password = { marginTop: 10 };
  const btnstyle = { margin: "8px 0" };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrorMessage("");

    axios
      .post("https://organic-panel.awcrast.com/app/login/chat-pro/", {
        username,
        password,
      })
      .then((response) => {
        console.log(response.data);
        if (response.data.ok) {
          localStorage.setItem("token", response.data.token);
          navegation("/menu");
        } else {
          setErrorMessage("Nombre de usuario o contraseña incorrectos");
        }
      })
      .catch((error) => {
        console.error("Credenciales incorrectas:", error);
        setErrorMessage("Credenciales incorrectas");
      });
  };

  return (
    <Grid>
      <Paper elevation={10} style={paperStyle}>
        <Grid align="center">
          <Avatar style={avatarStyle}>
            <LockOutlinedIcon />
          </Avatar>
          <h2>Chat Pro</h2>
        </Grid>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Username"
            placeholder="Enter username"
            fullWidth
            required
            value={username}
            onChange={handleUsernameChange}
          />
          <TextField
            style={Password}
            label="Password"
            placeholder="Enter Password"
            type="password"
            fullWidth
            required
            value={password}
            onChange={handlePasswordChange}
          />

          <FormControlLabel
            control={<Checkbox name="checkedB" color="primary" />}
            label="Remember me"
          />

          <Button
            variant="contained"
            style={btnstyle}
            type="submit"
            color="primary"
            fullWidth
          >
            Sign in
          </Button>
        </form>
        {errorMessage && <Typography color="error">{errorMessage}</Typography>}
        <Typography>
          <Link href="#" style={{ textDecoration: "none" }}>
            Forgot password?
          </Link>
        </Typography>
      </Paper>
    </Grid>
  );
};

export default Login;
