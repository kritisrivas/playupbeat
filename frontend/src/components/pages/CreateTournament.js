import React, { useContext, useState } from "react";
import axios from 'axios';

import Navbar from "../common/Navbar";
import { AuthContext } from "../context/auth-context";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Footer from "../common/Footer";

function CreateTournament() {
  const auth = useContext(AuthContext);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: new Date(),
    location: "",
    creator: auth.userId
  });

  const [startDate, setStartDate] = useState(new Date());
  const [tournamentCreatedMsg, setTournamentCreatedMsg] = useState("");
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDateChange = (date) => {
    setStartDate(date);
    setFormData({ ...formData, date: date });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/tournaments', 
        {...formData, creator: auth.userId},
        {
            headers: {
                'Authorization': `Bearer ${auth.token}` // Replace with actual token
            },
        });
        setFormData({
            title: "",
            description: "",
            date: new Date(),
            location: "",
            creator: auth.userId});
        setTournamentCreatedMsg("Tournament created successfully");
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="bodyDiv">
      <Navbar />
      <div className="event-form-container">
        <h2>Create Tournament</h2>
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
            type="text"
            value={formData.description}
            onChange={handleChange}
            required
          />

          <label htmlFor="date">Date</label>
          <DatePicker
            id="date"
            name="date"
            selected={startDate}
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

          <button type="submit">Create</button>
          <p>{tournamentCreatedMsg}</p>
        </form>
      </div>
      <Footer/>
    </div>
  );
}

export default CreateTournament;
