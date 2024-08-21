import React, { useContext, useState, useEffect } from "react"
import axios from 'axios'
import { AuthContext } from "../context/auth-context";

function Tournament(props){
    const auth = useContext(AuthContext);
    const [isRegistered, setisRegistered] = useState(false);
    const [regDate, setRegDate] = useState();

    useEffect(() => {
        async function checkUserRegistered() {
          if(auth.isLoggedIn){
              const config = {
                  headers: { 'Authorization': `Bearer ${auth.token}`},
                  params: { userId: auth.userId, tournamentId: props.id}
              }
          try {
            const response = await axios.get('http://localhost:5000/api/registrations/check-registration', config);
            setisRegistered(response.data.isRegistered);
            setRegDate(response.data.regDate);
          } catch (err) {
            console.log("Unable to check if user is registered for tournament", err);
          }
        }
      }
      checkUserRegistered();
      }, [auth.isLoggedIn, auth.userId, auth.token, props.id]);

    const handleRegisterClick = async () =>{
        try {
            const userId = auth.userId;
            const tournamentId = props.id;
            const response = await axios.post('http://localhost:5000/api/registrations/register', 
              {userId, tournamentId},
              {
                  headers: {
                      'Authorization': `Bearer ${auth.token}` // Replace with actual token
                  },
              });
              setisRegistered(true);
              setRegDate(response.data.registration.registrationDate);
            console.log('User registered for tournament successfully:', response);
          } catch (error) {
            console.error('Error:', error);
          }
    }

    return (
      <div className="tournament-container">
        <div>
          <h3>{props.title}</h3>
          <p>{props.location}</p>
          <p>{props.date}</p>
        </div>
        {auth.isLoggedIn && (
          <div className="child">
            {isRegistered ? <p>You've registered in this event on {regDate}</p> : 
            <button onClick={handleRegisterClick}>Register</button>}
          </div>
        )}
        <hr />
      </div>
    );
}

export default Tournament;