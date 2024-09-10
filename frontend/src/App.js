// import logo from './logo.svg';
import React, {Suspense} from 'react';
import "./App.css";
import Home from "./components/pages/Home";
import About from "./components/pages/About";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { AuthContext } from './components/context/auth-context';
import { useAuth } from './components/hooks/auth-hook';

const UserLogin = React.lazy(() => import('./components/pages/UserLogin'));
const AdminLogin = React.lazy(() => import('./components/pages/AdminLogin'));
const UserDashboard = React.lazy(() => import('./components/pages/UserDashboard'));
const AdminDashboard = React.lazy(() => import('./components/pages/AdminDashboard'));
const CreateTournament = React.lazy(() => import('./components/pages/CreateTournament'));
const UpdateTournament = React.lazy(() => import('./components/pages/UpdateTournament'));

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
      <Suspense fallback={<div>Loading...</div>}>
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
       </Suspense>
    </Router>
    </AuthContext.Provider>
  );
}

export default App;
