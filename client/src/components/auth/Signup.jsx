import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { LockOpenOutlined, Visibility, VisibilityOff } from '@mui/icons-material'
import { Avatar, Box, InputAdornment, IconButton, Button, Container, Paper, TextField, Typography, Toolbar, Grid2, Link,
  FormControl, FormControlLabel, FormLabel, RadioGroup, Radio} from '@mui/material'

import { register } from "../../Redux-Toolkit/Slices/AuthSlice";


const Signup = () => {

  const [formData, setFormData] = useState({
    Firstname: '', Lastname: '', email: '', number: '', gender: '',
    password:'', confirmPassword:''
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handlechange = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
      navigate("/login");
  };

  const handleChanged = (e) => {
    const {name, value} = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
      setErrors((prev) => ({ ...prev, [name]: "" })); // Clear error on change
  };

  const validate = () => {
    const newErrors = {};

    const requiredFields = ["gender"];

    requiredFields.forEach((field) => {
      if (!formData[field]) {
        newErrors[field] = `This ${field} is required`;
      } else { newErrors[field] = ""; };
    });

    if (formData.Firstname && !/^[A-Za-z]+$/.test(formData.Firstname)) {
      newErrors.Firstname = "First name should contain only letters";
    };

    if (formData.Lastname) {
      newErrors.Lastname = "First name should contain only letters";
    };

    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Enter a valid email address";
    };

    if (formData.number && !/^\d{10}$/.test(formData.number)) {
      newErrors.number = "Enter a valid 10-digit phone number";
    };

    // Password Strength
    const password = formData.password;
    if (password) {
      const validations = [
        { regex: /(?=.*[a-z])/, msg: "At least one lowercase letter" },
        { regex: /(?=.*[A-Z])/, msg: "At least one uppercase letter" },
        { regex: /(?=.*\d)/, msg: "At least one number" },
        { regex: /(?=.*[!@#$%^&*])/, msg: "At least one special character" },
        { regex: /.{8,}/, msg: "At least 8 characters long" },
      ];

      validations.forEach((rule) => {
        if (!rule.regex.test(password)) {
          newErrors.password = rule.msg;
        };
      });
    };

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    };


    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
      e.preventDefault();
      if (!validate()) return;

      const { Firstname, Lastname, email, number, House, Street,
        Landmark, Zip, City, State, gender, password, } = formData;

      const userData = { Firstname, Lastname, email, number, gender, House,
        Street, Landmark, Zip, City, State, password, };

      dispatch(register(userData)).then(() => navigate("/"));
    };

  // const checkPassword = () => {
  //   const lower = new RegExp("(?=.*[a-z])");
  //   const upper = new RegExp("(?=.*[A-Z])");
  //   const numbers = new RegExp("(?=.*[0-9])");
  //   const spcialchar = new RegExp("(?=.*[!@#$%^&*])");
  //   const length = new RegExp("(?=.{8,})");
        
  //   if (!lower.test(formData.password)) {
  //     setErrors("At least one lower case latter include");
  //   } else if (!upper.test(formData.password)) {
  //     setErrors("At least one upper case latter include");
  //   } else if (!numbers.test(formData.password)) {
  //     setErrors("At least one number include");
  //   } else if (!spcialchar.test(formData.password)) {
  //     setErrors("At least one spcial character include");
  //   } else if (!length.test(formData.password)) {
  //     setErrors("At least 8 character include");
  //   } else {
  //     setErrors("");
  //   }

  // };
    
  // const handelSubmit = (e) => {
  //           e.preventDefault();
        
  //       if (!Firstname) {
  //         setErromName("Plaese enter name");
  //       } else {
  //         setErromName("");
  //   };
  //       if (!Lastname) {
  //         setErromLastName("Plaese enter lastname");
  //       } else {
  //         setErromLastName("");
  //   };

  //       if (!email) {
  //         setErromEmail("Plaese enter email");
  //       } else {
  //         setErromEmail("");
  //   };
      
  //       if (!number) {
  //         setErromNumber("Plaese enter number");
  //       } else {
  //         setErromNumber("");
  //   };
  //       if (!House) {
  //         setErromNumber("Plaese enter address");
  //       } else {
  //         setErromNumber("");
  //   };
  //       if (!Street) {
  //         setErromNumber("Plaese enter address");
  //       } else {
  //         setErromNumber("");
  //   };
  //       if (!Landmark) {
  //         setErromNumber("Plaese enter landmark");
  //       } else {
  //         setErromNumber("");
  //   };
  //       if (!Zip) {
  //         setErromNumber("Plaese enter zip");
  //       } else {
  //         setErromNumber("");
  //   };
  //       if (!City) {
  //         setErromNumber("Plaese enter city");
  //       } else {
  //         setErromNumber("");
  //   };
  //       if (!State) {
  //         setErromNumber("Plaese enter state");
  //       } else {
  //         setErromNumber("");
  //   };
  //       if (!password) {
  //         setErromPass("Plaese enter Password");
  //       } else {
  //         setErromPass("");
  //   };
      
  //     if (password !== conmpassword) {
  //       setErromPass("password did not match");
  //     } else {
  //       setErromPass("");
  //       let userData ={ Firstname, Lastname, email, number, House, Street, Landmark, Zip, City, State, password };
  //       dispatch(register(userData)).then(() => navigate("/"));
  //   };
  // };


  return (
    <>
      <Container sx={{ width: "50%"}}>
        <Paper elevation={10} sx={{ padding: 2 }}>
          <Toolbar direction="row" sx={{ justifyContent: "center", gap: 2, mb:2 }}>
            <Avatar sx={{ bgcolor: "purple" }}>
              <LockOpenOutlined />
            </Avatar>
            <Typography component="h1" variant="h5" noWrap>
              Sign Up
            </Typography>
          </Toolbar>
          <Box component="form" onSubmit={handleSubmit} noValidate autoComplete="on" sx={{ mt: 1 }} className="flex flex-col">
            
            <Box className='flex justify-between'>
            <TextField placeholder="Enter Name" sx={{ mb: 2, width:'45%'}} label="First Name" variant="outlined" error={!!errors.Firstname} helperText={errors.Firstname}
              onChange={handleChanged} required/>
            <TextField placeholder="Enter Name" sx={{ mb: 2, width:'45%'}} label="Last Name" variant="outlined" error={!!errors.Lastname} helperText={errors.Lastname}
              onChange={handleChanged} required/>
            </Box>

            <TextField placeholder="Enter Email" sx={{ mb: 2 }} type="email" label="Email" variant="outlined" error={!!errors.email} helperText={errors.email}
              onChange={handleChanged} required />
            
            <TextField placeholder="Enter Number" sx={{ mb: 2 }} type="number" label="Number" variant="outlined" error={!!errors.number} helperText={errors.number}
              onChange={handleChanged} required />
            
            <FormControl sx={{ mb: 2}}>
      <FormLabel id="demo-row-radio-buttons-group-label" error={!!errors.gender}>Gender</FormLabel>
      <RadioGroup row aria-labelledby="demo-row-radio-buttons-group-label" name="row-radio-buttons-group" onChange={handleChanged} >
        <FormControlLabel value="female" control={<Radio />} label="Female" />
        <FormControlLabel value="male" control={<Radio />} label="Male" />
        <FormControlLabel value="other" control={<Radio />} label="Other" />
      </RadioGroup>
        {errors.gender && <Typography color="error">{errors.gender}</Typography>}
            </FormControl>
            
            <TextField placeholder="Date of Birth" type='date' sx={{ mb: 2 }} label="Date of Birth" variant="outlined" />
            {/* <TextField placeholder="House" sx={{ mb: 2 }} label="House" variant="outlined" error={!!errors.House} helperText={errors.House}
            onChange={handleChanged} required />
            
            <TextField placeholder="Street" sx={{ mb: 2 }} label="Street" variant="outlined" error={!!errors.Street} helperText={errors.Street}
            onChange={handleChanged} required />   
            
            <Box className='flex justify-between'>
            <TextField placeholder="Enter Landmark" sx={{ mb: 2, width:'45%'}} label="Landmark" variant="outlined" error={!!errors.Landmark} helperText={errors.Landmark}
            onChange={handleChanged} required/>
          
            <TextField placeholder="Enter Zip" sx={{ mb: 2, width:'45%' }} type="number" label="Zip" variant="outlined" error={!!errors.Zip} helperText={errors.Zip}
            onChange={handleChanged} required/>
            </Box>

            <Box className='flex justify-between'>
            <TextField placeholder="Enter City" sx={{ mb: 2, width:'45%' }} label="City" variant="outlined" error={!!errors.City} helperText={errors.City}
            onChange={handleChanged} required/>
            <TextField placeholder="Enter State" sx={{ mb: 2, width:'45%' }} label="State" variant="outlined" error={!!errors.State} helperText={errors.State}
            onChange={handleChanged} required/>
            </Box> */}

            <TextField placeholder="Enter Password" sx={{ mb: 2 }} type={showPassword ? "text" : "password"}
              slotProps={{
                input: { endAdornment: (
                    <InputAdornment position="end"> <IconButton aria-label='password-showhide-button' onClick={()=>setShowPassword((prev)=>!prev)}>
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton> </InputAdornment> ), },
              }} label="Enter Password" variant="outlined" error={!!errors.password} helperText={errors.password}
              onChange={handleChanged} required />
            
            <TextField placeholder="Confirm Password" sx={{ mb: 2 }} type={showConfirm ? "text" : "password"}
              slotProps={{
                input: { endAdornment: (
                    <InputAdornment position="end"> <IconButton aria-label='confirmpassword-showhide-button' onClick={()=>setShowConfirm((prev)=>!prev)}>
                        {showConfirm ? <VisibilityOff /> : <Visibility />}
                      </IconButton> </InputAdornment> ), },
              }} label="Confirm Password" variant="outlined" error={!!errors.confirmPassword} helperText={errors.confirmPassword}
              onChange={handleChanged}
              required />
            {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember Me"
            /> */}
            <Button type="submit" sx={{width:300, marginX:"auto"}} aria-label='signup-button' variant="contained" className="w-full">
              Sign Up
            </Button>
          </Box>
          <Grid2 container justifyContent="end" sx={{ marginRight: 4, padding: 1 }}>
            <Grid2 item >Already have a account ? <Link component="button" onClick={handlechange} underline="none"> Sign In </Link> </Grid2>
          </Grid2>
        </Paper>
      </Container>
    </>
  );
}

export default Signup

