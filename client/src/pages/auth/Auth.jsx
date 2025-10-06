import React, { useState } from 'react'
import { Stack, Box, Typography, Paper } from "@mui/material";

import Signup from '../../components/auth/Signup'
import Login from '../../components/auth/Login'

const Auth = () => {
  const [isSignup, setIsSignup] = useState(false);
  
  const handleSwitch = () => {
    setIsSignup(!isSignup);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {isSignup ? (
        <Box sx={{ display: "flex", flexDirection: "row", marginX: 10, border: "1px dashed grey"}}
        >
          <Stack sx={{ width: "50%", padding: 2 }}>
            {/* <Avatar sx={{ bgcolor: "purple" }}></Avatar> */}
            <Typography component="h1" variant="h5">
              Welcome! Register to your account avail the best deals!
            </Typography>
            <Stack direction="row" spacing={2}>
              <Paper>Item 1<Typography> Natural Ingradients and chemical free</Typography></Paper>
              <Paper>Item 2<Typography> Cruelty Free</Typography></Paper>
              <Paper>Item 3<Typography> Long Lasting</Typography></Paper>
            </Stack>
          </Stack>
          <Signup SignupPage={handleSwitch} />
        </Box>
      ) : (
          <Box sx={{ display: "flex", flexDirection: "row", marginX: 10, border: "1px dashed grey" }}>
          <Stack sx={{ width: "50%", padding: 2 }}>
              {/* <Avatar sx={{ bgcolor: "purple" }}></Avatar> */}
              <Typography component="h1" variant="h5">
                Welcome! Login to your account avail the best deals!
                </Typography>
              <Stack direction="row" spacing={2}>
              <Paper>Item 1<Typography> Natural Ingradients and chemical free</Typography></Paper>
              <Paper>Item 2<Typography> Cruelty Free</Typography></Paper>
              <Paper>Item 3<Typography> Long Lasting</Typography></Paper>
            </Stack>
          </Stack>
          <Login SigninPage={handleSwitch} />
        </Box>
      )}
    </>
  );
}

export default Auth