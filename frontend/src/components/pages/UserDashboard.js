import React, { useContext } from "react";
import Navbar from "../common/Navbar";
import Tournaments from "../common/Tournaments";
import { AuthContext } from "../context/auth-context";

function UserDashboard() {
    const auth = useContext(AuthContext);
    return (
    <div>
        <Navbar />
        {auth.isLoggedIn && <Tournaments showMyTournament="true"/>}
    </div>
    )
}

export default UserDashboard