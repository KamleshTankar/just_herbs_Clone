import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { LockOpenOutlined, Visibility, VisibilityOff } from '@mui/icons-material'
import { Avatar, Box, InputAdornment, IconButton, Checkbox, Button, Container, FormControlLabel, Paper, TextField, Typography, Toolbar, Grid2, Link } from '@mui/material'

import { login } from '../../Redux-Toolkit/Slices/AuthSlice' 

const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [showPassword, setShowPassword] = useState();
  const [erroremail, setErromEmail] = useState();
  const [errorpass, setErromPass] = useState();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handlechange = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
      navigate("/signup");
  }


  const handleShowPassword = () => setShowPassword(!showPassword);

  const checkPassword = () => {
        const lower = new RegExp("(?=.*[a-z])");
        const upper = new RegExp("(?=.*[A-Z])");
        const numbers = new RegExp("(?=.*[0-9])");
        const spcialchar = new RegExp("(?=.*[!@#$%^&*])");
        const length = new RegExp("(?=.{8,})");

        if (!lower.test(password)) {
          setErromPass("At least one lower case latter include");
        } else if (!upper.test(password)) {
          setErromPass("At least one upper case latter include");
        } else if (!numbers.test(password)) {
          setErromPass("At least one number include");
        } else if (!spcialchar.test(password)) {
          setErromPass("At least one spcial character include");
        } else if (!length.test(password)) {
          setErromPass("At least 8 character include");
        } else {
          setErromPass("");
        };
    };

  const handelSubmit = (e) => {
    e.preventDefault();
    // const lower = new RegExp("(?=.*[a-z])");
    // const upper = new RegExp("(?=.*[A-Z])");
    // const numbers = new RegExp("(?=.*[0-9])");
    // const spcialchar = new RegExp("(?=.*[!@#$%^&*])");
    // const length = new RegExp("(?=.{8,})");
    // console.log("form");
    if (!email) {
      setErromEmail("Plaese enter email");
    } else {
      setErromEmail("");
    }
    if (!password) {
      setErromPass("Plaese enter Password");
    } else {
      let userData = { email, password };
      // console.log(userData);
    dispatch(login(userData)).then(() => navigate("/"));
    // dispatch(login(userData));
    }

    // if (!password) {
    //   setErromPass("Plaese enter password");
    // } else if (!lower.test(password)) {
    //   setErromPass("At least one lower case latter include");
    // } else if (!upper.test(password)) {
    //   setErromPass("At least one upper case latter include");
    // } else if (!numbers.test(password)) {
    //   setErromPass("At least one number include");
    // } else if (!spcialchar.test(password)) {
    //   setErromPass("At least one spcial character include");
    // };
  };

  return (
    <>
      <Container sx={{ width: "50%" }}>
        <Paper elevation={10} sx={{ padding: 2 }}>

          <Toolbar direction="row" sx={{ justifyContent: "center", gap: 2 }}>
            <Avatar sx={{ bgcolor: "purple" }}> <LockOpenOutlined /> </Avatar>
            <Typography component="h1" variant="h5" noWrap> Sign In </Typography>
          </Toolbar>

          <Box component="form" onSubmit={handelSubmit} noValidate sx={{ mt: 1 }} className="flex flex-col">
            <TextField className="my" placeholder="Enter Username" sx={{ mb: 2 }} label="Enter Username " variant="outlined" error={erroremail} helperText={erroremail}
              onChange={(e) => { setEmail(e.target.value); }} required />
            
            <TextField className="my-2" placeholder="Enter Password" sx={{ mb: 2 }} label="Enter Password" variant="outlined" error={errorpass}
              helperText={errorpass} onChange={(e) => { setPassword(e.target.value); }} onKeyUp={checkPassword} type={showPassword ? "text" : "password"}
              slotProps={{ input: { endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleShowPassword}>
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton> </InputAdornment>
                  ), },
              }} required />
            
            <Grid2 container justifyContent="end" sx={{ marginRight: 4 }}>
              <Link to="" underline="none"> Forget Password </Link>
            </Grid2>
            
            <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Remember Me" />
            
            <Button type="submit" sx={{ width: 300, marginX: "auto" }} variant="contained" > Sign In </Button>
          
          </Box>
          
          <Grid2 container justifyContent="end" sx={{ marginRight: 4, padding: 1 }} >
            <Grid2 item>Noe to ? create an account <Link component="button" href="/signup" onClick={handlechange} underline="none"> Register </Link> </Grid2>
          </Grid2>

        </Paper>
      </Container>
    </>
  );
};

export default Login