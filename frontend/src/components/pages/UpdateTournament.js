import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import Navbar from "../common/Navbar";
import Footer from "../common/Footer";
import { AuthContext } from "../context/auth-context";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const UpdateTournament = () => {
  const { state } = useLocation();
  const auth = useContext(AuthContext);
  const tournamentId = state.tournament.id;
  const [loadedTournament, setLoadedTournament] = useState();
  const [tournamentUpdatedMsg, setTournamentUpdatedMsg] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: new Date(),
    location: "",
  });

  useEffect(() => {
    const fetchTournamentById = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/tournaments/${tournamentId}`
        );
        setLoadedTournament(response.data.tournament);
        setFormData({
          title: response.data.tournament.title,
          description: response.data.tournament.description,
          date: response.data.tournament.date,
          location: response.data.tournament.location,
        });
      } catch (err) {}
    };
    fetchTournamentById();
  }, [tournamentId, setFormData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDateChange = (date) => {
    setFormData({ ...formData, date: date });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(
        `http://localhost:5000/api/tournaments/${tournamentId}`,
        { ...formData, creator: auth.userId },
        {
          headers: {
            Authorization: `Bearer ${auth.token}`, // Replace with actual token
          },
        }
      );
      setTournamentUpdatedMsg("Tournament updated successfully");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="bodyDiv">
      <Navbar />
      <div className="event-form-container">
        <h2>Update Tournament</h2>
        {loadedTournament && (
          <form onSubmit={handleSubmit} className="event-form">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />

            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            />

            <label htmlFor="date">Date</label>
            <DatePicker
              id="date"
              name="date"
              selected={new Date(formData.date)}
              onChange={(date) => handleDateChange(date)}
              required
            />

            <label htmlFor="location">Location</label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
            />

            <button type="submit">Update</button>
            <p>{tournamentUpdatedMsg}</p>
          </form>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default UpdateTournament;
