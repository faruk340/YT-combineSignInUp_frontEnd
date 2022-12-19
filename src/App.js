import React, { useEffect } from 'react';
import './App.css';
import SignInOutContainer from './containers';
import Dashboard from './components/Dashboard';
import { BrowserRouter, Switch, Route, Routes } from "react-router-dom";
import Home from './components/pages/Home';
import Contact from './components/pages/Contact';
import Blog from './components/pages/Blog';
import About from './components/pages/About';
import { useState } from 'react';
import { useSelector } from 'react-redux';

function App() {
  const loginAuth = useSelector((state) => state.login)
  let userLoginAuth = loginAuth.login
  const [loginState, setLoginState] = useState(false)
  useEffect(() => {
    setLoginState(userLoginAuth)
  })
  return (
    loginState ?
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />}>
            <Route index element={<Home />} />
            <Route path="blog" element={<Blog />} />
            <Route path="contact" element={<Contact />} />
            <Route path="about" element={<About />} />
            {/* <Route path="*" element={<NoPage />} /> */}
          </Route>
        </Routes>
      </BrowserRouter>
      :
      <div className='App'>
        <SignInOutContainer />
      </div>
  )
}

export default App;
