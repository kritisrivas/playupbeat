const express = require('express');
const { check } = require('express-validator');

const tournamentController = require('../controllers/tournaments-controller')
const {authenticate, authorizeAdmin} = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', tournamentController.getAllTournaments);

router.get('/:tid', tournamentController.getTournamentById);

router.get('/user/:uid', authenticate, authorizeAdmin, tournamentController.getTournamentsByUserId);

router.post(
  '/',
  [
    check('title')
      .not()
      .isEmpty(),
    check('description').isLength({ min: 5 }),
    check('date')
      .not()
      .isEmpty(),
    check('location')
      .not()
      .isEmpty(),  
  ],
  authenticate,
  authorizeAdmin,
  tournamentController.createTournament
);

router.patch(
  '/:tid',
  [
    check('title')
      .not()
      .isEmpty(),
    check('description').isLength({ min: 5 }),
    check('date')
      .not()
      .isEmpty(),
    check('location')
      .not()
      .isEmpty(),
  ],
  authenticate,
  authorizeAdmin,
  tournamentController.updateTournament
);

router.delete('/:tid', authenticate, authorizeAdmin, tournamentController.deleteTournament);

module.exports = router;
