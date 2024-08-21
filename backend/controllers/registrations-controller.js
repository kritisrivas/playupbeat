const Registration = require('../models/registration');
const User = require('../models/users');
const Tournament = require('../models/tournaments');

const getRegisteredTournaments = async (userId) => {
    try {
        const registrations = await Registration.find({ 'user.userId': userId }).populate('tournament');
        // Extract tournaments from registrations
        const tournaments = registrations.map(reg => reg.tournament);
        return tournaments;
       
    } catch (err) {
        throw new Error('Error fetching tournaments')
    }
};

const checkUserRegistration = async (userId, tournamentId) => {
  try {
    const registration = await Registration.findOne({
      'user.userId': userId,
      'tournament.tournamentId': tournamentId
    });
    return registration;
  } catch (err) {
    console.log(err);
    throw new Error('Error checking registration');
  }
};

const registerUserForTournament = async (req, res) => {
    const { userId, tournamentId } = req.body;
  
    if (!userId || !tournamentId) {
      return res.status(400).json({ message: 'User ID and Tournament ID are required' });
    }
  
    try {
      // Check if user exists
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Check if tournament exists
      const tournament = await Tournament.findById(tournamentId);
      if (!tournament) {
        return res.status(404).json({ message: 'Tournament not found' });
      }
  
      // Check if user is already registered for the tournament
      const existingRegistration = await Registration.findOne({
        'user.userId': userId,
        'tournament.tournamentId': tournamentId
      });
      if (existingRegistration) {
        return res.status(400).json({ message: 'User already registered for this tournament' });
      }
  
      // Create new registration
      const registration = new Registration({
        user: {
          userId,
          name: user.name,
          email: user.email
        },
        tournament: {
          tournamentId,
          title: tournament.title,
          date: tournament.date,
          location: tournament.location
        }
      });
  
      await registration.save();
      res.status(201).json({ message: 'Registration successful', registration });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error registering user for tournament' });
    }
  };

exports.getRegisteredTournaments = getRegisteredTournaments;
exports.checkUserRegistration = checkUserRegistration;
exports.registerUserForTournament = registerUserForTournament;
