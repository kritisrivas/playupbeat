// import logo from './logo.svg';
import React from 'react';
import "./App.css";
import Home from "./components/pages/Home";
import About from "./components/pages/About";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import UserLogin from './components/pages/UserLogin';
import AdminLogin from './components/pages/AdminLogin';
import UserDashboard from './components/pages/UserDashboard';
import AdminDashboard from './components/pages/AdminDashboard';
import CreateTournament from './components/pages/CreateTournament';
import UpdateTournament from './components/pages/UpdateTournament';
import { AuthContext } from './components/context/auth-context';
import { useAuth } from './components/hooks/auth-hook';
function App() {

  const {token, userId, userRole, login, logout} = useAuth();

  return (
    <AuthContext.Provider
    value={{
      isLoggedIn: !!token,
      token: token,
      userId: userId,
      userRole: userRole,
      login: login,
      logout: logout
    }}>
    <Router>
      <Routes>
        <Route exact={true} path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<UserLogin />}  />
        <Route path='/dashboard' element={<UserDashboard />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path='/admin/dashboard' element={<AdminDashboard />} />
        <Route path='/admin/createTournament' element={<CreateTournament />} />
        <Route path='/admin/updateTournament' element={<UpdateTournament />} />
       </Routes>
    </Router>
    </AuthContext.Provider>
  );
}

export default App;
