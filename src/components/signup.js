import React, { useState } from 'react'
import { Grid, Paper, Avatar, Typography, TextField, Button } from '@material-ui/core'
// import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import shildLock from "../images/shield.png";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Checkbox from '@material-ui/core/Checkbox';
import axios from 'axios';
const Signup = () => {
    const paperStyle = { padding: 20, width: 300, margin: "0 auto" }
    const headerStyle = { margin: 0 }
    const avatarStyle = { backgroundColor: '#1bbd7e' }
    const marginTop = { marginTop: 5 }


    const [regData, setRegData] = useState({
        fullName: "",
        email: "",
        gender: "",
        phoneNo: "",
        password: "",
        conformPass: ""
    })
    const handelChange = (event) => {
        event.preventDefault();
        const { value, name } = event.target;
        setRegData({
            ...regData,
            [name]: value
        })
    }
    const submitFun = async () => {
        await axios({
            method: "POST",
            url: "http://localhost:8000/registrationData",
            data: {
                fullName: regData.fullName,
                email: regData.email,
                gender: regData.gender,
                phoneNo: regData.phoneNo,
                password: regData.password,
                conformPass: regData.conformPass
            }
        })
        setRegData({
            fullName: "",
            email: "",
            gender: "",
            phoneNo: "",
            password: "",
            conformPass: ""
        })
    }
    return (
        <Grid>
            <Paper style={paperStyle}>
                <Grid align='center'>
                    <Avatar style={avatarStyle}>
                        {/* <AddCircleOutlineOutlinedIcon /> */}
                        {/* <img src={shildLock} alt="shildLock" /> */}
                    </Avatar>
                    <h2 style={headerStyle}>Sign Up</h2>
                    <Typography variant='caption' gutterBottom>Please fill this form to create an account !</Typography>
                </Grid>
                <form>
                    <TextField fullWidth label='Name' placeholder="Enter your name" onChange={handelChange} value={regData.fullName} name="fullName" />
                    <TextField fullWidth label='Email' placeholder="Enter your email" onChange={handelChange} value={regData.email} name="email" />
                    <FormControl component="fieldset" style={marginTop}>
                        <FormLabel component="legend">Gender</FormLabel>
                        <RadioGroup aria-label="gender" name="gender" style={{ display: 'initial' }} onChange={handelChange} value={regData.gender}>
                            <FormControlLabel value="female" control={<Radio />} label="Female" />
                            <FormControlLabel value="male" control={<Radio />} label="Male" />
                        </RadioGroup>
                    </FormControl>
                    <TextField fullWidth label='Phone Number' placeholder="Enter your phone number" onChange={handelChange} value={regData.phoneNo} name="phoneNo" />
                    <TextField fullWidth label='Password' placeholder="Enter your password" onChange={handelChange} value={regData.password} name="password" />
                    <TextField fullWidth label='Confirm Password' placeholder="Confirm your password" onChange={handelChange} value={regData.conformPass} name="conformPass" />
                    <FormControlLabel
                        control={<Checkbox name="checkedA" />}
                        label="I accept the terms and conditions."
                    />
                    <Button variant='contained' color='primary' onClick={submitFun}>Sign up</Button>
                </form>
            </Paper>
        </Grid >
    )
}

export default Signup;