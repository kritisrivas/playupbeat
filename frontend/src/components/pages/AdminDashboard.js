import React, { useContext, useEffect, useState } from "react";
import axios from "axios";

import Navbar from "../common/Navbar";
import { AuthContext } from "../context/auth-context";
import { useNavigate } from "react-router-dom";
import Footer from "../common/Footer";

function AdminDashboard() {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const [tournaments, setTournaments] = useState([]);

  useEffect(() => {
    const fetchTournamentsCreatedByUser = async () => {
      if (auth.isLoggedIn) {
        try {
          const response = await axios.get(
            `http://localhost:5000/api/tournaments/user/${auth.userId}`,
            {
              headers: {
                Authorization: `Bearer ${auth.token}`,
              },
            }
          );
          setTournaments(response.data.tournaments);
        } catch (err) {
          console.log("Unable to fetch tournaments", err);
        }
      }
    };
    fetchTournamentsCreatedByUser();
  }, [auth.userId, auth.isLoggedIn, auth.token]);

  const deleteTournament = async (tournamentId) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/tournaments/${tournamentId}`,
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );
    } catch (error) {
      console.error("Failed to delete Tournament:", error);
    }
  };

  const handleDeleteClick = async (tournament) => {
    try {
      await deleteTournament(tournament.id);
      setTournaments(tournaments.filter((event) => event.id !== tournament.id));
    } catch (err) {
      console.error("Failed to delete Tournament", err);
    }
  };

  return (
    <div className="bodyDiv">
      <Navbar />
      <div className="tournamentContainer">
        <h2>Your Tournaments</h2>
        <hr />
        {tournaments.map((tournament) => {
          return (
            <div key={tournament.id}>
              <div>
                <h3>{tournament.title}</h3>
                <p>{tournament.location}</p>
                <p>{(new Date(tournament.date)).toLocaleDateString()}</p>
              </div>
              <div className="admin-child">
                <button
                  onClick={() => {
                    navigate("/admin/updateTournament", {
                      state: { tournament: tournament },
                    });
                  }}
                >
                  Edit
                </button>
                <button onClick={() => handleDeleteClick(tournament)}>
                  Delete
                </button>
              </div>
              <hr />
            </div>
          );
        })}
      </div>
      <Footer/>
    </div>
  );
}

export default AdminDashboard;
