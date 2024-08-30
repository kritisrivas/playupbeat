import React, { useContext } from "react";
import Navbar from "../common/Navbar";
import Tournaments from "../common/Tournaments";
import { AuthContext } from "../context/auth-context";
import Footer from "../common/Footer";

function UserDashboard() {
    const auth = useContext(AuthContext);
    return (
    <div className="bodyDiv">
        <Navbar />
        {auth.isLoggedIn && <Tournaments showMyTournament="true"/>}
        <Footer />
    </div>
    )
}

export default UserDashboard