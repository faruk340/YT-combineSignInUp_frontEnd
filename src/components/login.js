import React, { useEffect } from 'react';
import {
    Grid, Paper, Avatar, TextField,
    Button, Typography, Link, Slide, Dialog, DialogTitle,
    DialogContentText,
    DialogContent,
    DialogActions
} from '@material-ui/core';
// import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import shildLock from "../images/shield.png";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { userAuth } from '../redux/index';
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const Login = ({ handleChange }) => {
    const dispatch = useDispatch()
    const [validatationUi, setvalidatationUi] = useState(false)
    const [loginUnsuccess, setloginUnsuccess] = useState(false)
    const [rememberChecked, setRemenmberChecked] = useState(false)
    const [openForgotPassWord, setopenForgotPassWord] = useState(false)
    const [userRegData, setUserRegData] = useState([])
    const [forgotEmailValidation, getForgotEmailValidata] = useState(false)
    const [forgotPasswordValidation, setForgotPasswordValidation] = useState(false)
    const [sininData, setSininData] = useState({
        email: "",
        password: ""
    })
    const [forgotPasswordState, setForgotPasswordState] = useState({
        forgotEmail: "",
        newPassword: ""
    })


    const paperStyle = { padding: 20, height: '73vh', width: 300, margin: "0 auto" }
    const avatarStyle = { backgroundColor: '#1bbd7e' }
    const btnstyle = { margin: '8px 0' }

    const sinInHandleChange = (event) => {
        event.preventDefault()
        const { name, value } = event.target;
        setSininData({
            ...sininData,
            [name]: value
        })
    }

    const forgotPasswordHandleChange = (e) => {
        const { value, name } = e.target;
        setForgotPasswordState({
            ...forgotPasswordState,
            [name]: value
        })
    }

    const handleClose = () => {
        setvalidatationUi(false)
        setloginUnsuccess(false)
    }
    const rememberHandel = (e) => {
        const value = e.target.checked;
        setRemenmberChecked(value)
    }
    const OnSubmitfun = async () => {
        await axios.get("http://localhost:8000/registrationData").then((res) => {
            const userData = res.data;
            const validEmail = userData.filter((ele) => ele.email === sininData.email && ele.password === sininData.password)
            if (validEmail.length > 0 && validEmail.length === 1) {
                // setvalidatationUi(true)
                dispatch(userAuth({ login: true, loginUserData: validEmail }))
            } else {
                setloginUnsuccess(true)
            }
            // setUserRegData(userData);
        }).catch((err) => {
            console.log(err);
        })
        setSininData({
            email: "",
            password: ""
        })
    }

    const forgotPasswordAction = async () => {
        if (forgotPasswordState.forgotEmail !== "" && forgotPasswordState.newPassword !== "") {
            setForgotPasswordState({
                forgotEmail: "",
                newPassword: ""
            })
            getForgotEmailValidata(false)
            setForgotPasswordValidation(false)
            setopenForgotPassWord(false)
        } else if (forgotPasswordState.forgotEmail === "") {
            getForgotEmailValidata(true)
        } else if (forgotPasswordState.newPassword === "") {
            setForgotPasswordValidation(true)
        }
        else {
            getForgotEmailValidata(true)
            setForgotPasswordValidation(true)
        }
    }

    return (
        <Grid>
            <Paper style={paperStyle}>
                <Grid align='center'>
                    <Avatar style={avatarStyle}>
                        {/* <LockOutlinedIcon /> */}
                        {/* <img src={shildLock} alt="shildLock" /> */}
                    </Avatar>
                    <h2>Sign In</h2>
                </Grid>
                <TextField autoComplete='false' label='Email' placeholder='Enter Email' fullWidth required name='email' value={sininData.email} onChange={sinInHandleChange} />
                <TextField autoComplete='false' label='Password' placeholder='Enter password' type='password' fullWidth required name='password' value={sininData.password} onChange={sinInHandleChange} />
                <FormControlLabel
                    control={
                        <Checkbox
                            name="checkedB"
                            color="primary"
                            onChange={rememberHandel}
                        />
                    }
                    label="Remember me"
                />
                <Button color='primary' variant="contained" disabled={rememberChecked ? false : true} style={btnstyle} fullWidth onClick={OnSubmitfun}>Sign in</Button>
                <Typography >
                    <Link href="#" onClick={() => setopenForgotPassWord(true)}>
                        Forgot password ?
                    </Link>
                </Typography>
                <Typography > Do you have an account ?
                    <Link href="#" onClick={() => handleChange("event", 1)} >
                        Sign Up
                    </Link>
                </Typography>
            </Paper>
            <Dialog
                open={validatationUi}
                TransitionComponent={Transition}
            // keepMounted
            // onClose={handleClose}
            // aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>{"Login Successfull"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        Let Google help apps determine location. This means sending anonymous
                        location data to Google, even when no apps are running.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Disagree</Button>
                    <Button onClick={handleClose}>Agree</Button>
                </DialogActions>
            </Dialog>
            <Dialog
                open={loginUnsuccess}
                TransitionComponent={Transition}
            // keepMounted
            // onClose={handleClose}
            // aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>{"Your email and password is wrong"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        Let Google help apps determine location. This means sending anonymous
                        location data to Google, even when no apps are running.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Disagree</Button>
                    <Button onClick={handleClose}>Agree</Button>
                </DialogActions>
            </Dialog>

            {/* ========================this dialog for forgot password========= */}

            <Dialog open={openForgotPassWord} onClose={handleClose}>
                <DialogTitle>Reset Your Password</DialogTitle>
                <DialogContent>
                    <TextField
                        error={forgotEmailValidation}
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Email *"
                        type="email"
                        fullWidth
                        variant="standard"
                        onChange={forgotPasswordHandleChange}
                        value={forgotPasswordState.forgotEmail}
                        name="forgotEmail"
                    />
                    <TextField
                        error={forgotPasswordValidation}
                        autoFocus
                        margin="dense"
                        id="name"
                        label="New Password *"
                        type="email"
                        fullWidth
                        variant="standard"
                        onChange={forgotPasswordHandleChange}
                        value={forgotPasswordState.newPassword}
                        name="newPassword"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setopenForgotPassWord(false)}>Cancel</Button>
                    <Button onClick={forgotPasswordAction}>Ok</Button>
                </DialogActions>
            </Dialog>
        </Grid>
    )
}

export default Login;