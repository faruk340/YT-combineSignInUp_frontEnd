import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

const Home = () => {
    const loginAuth = useSelector((state) => state.login)
    const userLoginData = loginAuth.loginUserData
    console.log("loginAuth", userLoginData);
    const useName = userLoginData.map((ele) => {
        return ele.fullName
    })

    return (
        <>
            <div style={{ width: "100%", height: '80vh', display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                <h1 style={{ fontSize: "10rem" }}>Hi {useName}</h1>
            </div>
        </>
    )
}

export default Home;