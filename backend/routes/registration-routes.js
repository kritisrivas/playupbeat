const express = require('express');
const { check } = require('express-validator');
const router = express.Router();
const registrationController = require('../controllers/registrations-controller');
const {authenticate} = require('../middleware/authMiddleware');
const HttpError = require('../models/http-error');

router.get('/user-tournaments', authenticate, async (req, res, next)=>{
   const { userId } = req.query;
   if(!userId){
    return res.status(400).json({message: 'User ID is required'});
   }
   try{
    const tournaments = await registrationController.getRegisteredTournaments(userId);
    res.json({tournaments})
   }catch(err){
    const error = new HttpError(
      "Error getting tournaments",
      500
    );
    return next(error);
   }
});

// Check if user is registered for an event
router.get('/check-registration', authenticate, async (req, res, next) => {
  const { userId, tournamentId } = req.query;
  if (!userId || !tournamentId) {
    return res.status(400).json({ message: 'User ID and Tournament ID are required' });
  }

  try {
    const registration = await registrationController.checkUserRegistration(userId, tournamentId);
    const isRegistered = registration !== null;
    if(registration === null){
      res.status(204).json({message: 'User Not registered'});
      return;
    }
    res.json({ isRegistered, regDate: registration.registrationDate });
  } catch (err) {
    const error = new HttpError("Error checking registration", 500);
    return next(error);
  }
});

// Register a user for an event
router.post('/register', 
    [
        check('userId')
          .not()
          .isEmpty(),
        check('tournamentId')
          .not()
          .isEmpty()
      ],
      authenticate,
      registrationController.registerUserForTournament);

module.exports = router;
