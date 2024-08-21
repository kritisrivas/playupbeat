import {React, useContext, useEffect, useState} from "react";
import axios from 'axios';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import Tournament from "./Tournament";
import { AuthContext } from '../context/auth-context';

function Tournaments(props) {
    const showMyTournament = props.showMyTournament === "true" ? true : false;
    const auth = useContext(AuthContext);
    const [tournamentsData, setTournamentsData] = useState([]);
    const [registeredTournaments, setRegisteredTournaments] = useState([]);
    const [activeTab, setActiveTab] = useState('allTab');

    useEffect(()=>{
        async function fetchTournaments() {
            try{
                const response = await axios.get('http://localhost:5000/api/tournaments')
                setTournamentsData(response.data.tournaments)
            }
            catch(err){
                console.log("Unable to fetch tournaments", err)
            }
        }
    fetchTournaments()
    }, [])

    useEffect(() => {
      async function fetchTournamentsOfUser() {
        if(auth.isLoggedIn){
            const config = {
                headers: { 'Authorization': `Bearer ${auth.token}`},
                params: { userId: auth.userId}
            }
        try {
          const response = await axios.get('http://localhost:5000/api/registrations/user-tournaments', config);
          setRegisteredTournaments(response.data.tournaments);
        } catch (err) {
          console.log("Unable to fetch tournaments", err);
        }
      }
    }
      fetchTournamentsOfUser();
    }, [auth.isLoggedIn, auth.userId, auth.token, activeTab]);

    const isDateInThisWeek = (date) => {
        const todayObj = new Date();
        const todayDate = todayObj.getDate();
        const todayDay = todayObj.getDay();
        const firstDayOfWeek = new Date(todayObj.setDate(todayDate - todayDay));
        const lastDayOfWeek = new Date(firstDayOfWeek);
        lastDayOfWeek.setDate(lastDayOfWeek.getDate() + 6);
        return date >= firstDayOfWeek && date <= lastDayOfWeek;
    }
    const handleTabSelect = (tab) => {
        if(tab === "MyTournamentTab"){
            setActiveTab(tab);
        }
    }
    return (
      <div className="tournamentContainer">  
      <h2>Tournaments</h2>
      <Tabs>
        <TabList>
          {auth.isLoggedIn && showMyTournament && <Tab onClick={()=>handleTabSelect("MyTournamentTab")}>My Tournaments</Tab>}
          <Tab onClick={()=>handleTabSelect("allTab")}>All</Tab>
          <Tab onClick={()=>handleTabSelect("weekTab")}>This Week</Tab>
          <Tab onClick={()=>handleTabSelect("upcomingTab")}>Upcoming</Tab>
        </TabList>
        {auth.isLoggedIn && showMyTournament &&
         <TabPanel>
         {registeredTournaments.map(tournament => {
             return <Tournament key={tournament.tournamentId} id={tournament.tournamentId} title={tournament.title} location={tournament.location} date={tournament.date}/>
             }
         )}
        </TabPanel>}
        <TabPanel>
            {tournamentsData.map(tournament => {
                return <Tournament key={tournament.id} id={tournament.id} title={tournament.title} location={tournament.location} date={tournament.date}/>
                }
            )}
        </TabPanel>
        <TabPanel>
           {tournamentsData.map( (tournament) => {
            return isDateInThisWeek(new Date(tournament.date)) && 
            <Tournament key={tournament.id} id={tournament.id} title={tournament.title} location={tournament.location} date={tournament.date}/>}
           )}
        </TabPanel>
        <TabPanel>
            {tournamentsData.map( (tournament) => {
            return new Date(tournament.date) > new Date() && 
            <Tournament key={tournament.id} id={tournament.id} title={tournament.title} location={tournament.location} date={tournament.date}/>}
           )}
        </TabPanel>
      </Tabs>
      </div>
    );
}

export default Tournaments