const uuid = require('uuid');
const { validationResult } = require("express-validator");

const HttpError = require("../models/http-error");
const Tournament = require("../models/tournaments");
const User = require("../models/users");
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

const getAllTournaments = async (req, res, next) => {
    let tournaments;
    try {
        tournaments = await Tournament.find();
    } catch (err) {
        const error = new HttpError(
            'Fetching tournaments failed, please try again later.',
            500
        );
        return next(error);
    }
    res.json({tournaments: tournaments.map(tournament => tournament.toObject({ getters: true }))});
    
}

const getTournamentById = async (req, res, next) => {
  const tournamentId = req.params.tid; 

  let tournament;
  try {
    tournament = await Tournament.findById(tournamentId);
  } catch (err) {
    const error = new HttpError("something went wrong,try again.", 500);
    return next(error);
  }
  if (!tournament) {
    const error = new HttpError(
      "Could not find a tournament for the provided id.",
      404
    );
    return next(error);
  }

  res.json({ tournament: tournament.toObject({ getters: true }) });
};

const getTournamentsByUserId = async (req, res, next) => {
  const userId = req.params.uid;
  let tournaments;
  try {
    tournaments = await Tournament.find({ creator: userId });
  }catch (err) {
    const error = new HttpError("something went wrong, try again.", 500);
    return next(error);
  }
  if (!tournaments) {
    const error = new HttpError(
      "Could not find tournaments for the provided user",
      204
    );
    return next(error);
  }
  res.json({tournaments: tournaments.map(tournament => tournament.toObject({getters: true})) });
};

const createTournament = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }

  const { title, description, date, location, creator } = req.body;

  const createdTournament = new Tournament({
    title,
    description,
    date,
    location,
    creator
  });
 
  try {
    await createdTournament.save();
  } catch (err) {
    console.log(err);
    const error = new HttpError("Creating tournament failed, please try again", 500);
    return next(error);
  }

  res.status(201).json({ tournament: createdTournament });
};

const updateTournament = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }

  const { title, description, date, location } = req.body;
  const tournamentId = req.params.tid;

  let tournament;
  try {
    tournament = await Tournament.findById(tournamentId);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not update tournament",
      500
    );
    return next(error);
  }

  tournament.title = title;
  tournament.description = description;
  tournament.date = date;
  tournament.location = location;

  try {
    await tournament.save();
  } catch (err) {
    const error = new HttpError("Could not update tournament", 500);
    return next(error);
  }

  res.status(200).json({ tournament: tournament.toObject({ getters: true }) });
};

const deleteTournament = async (req, res, next) => {
  const tournamentId = req.params.tid;
  let tournament;
  try {
    tournament = await Tournament.findById(tournamentId)
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, try again later.',
      500
    );
    return next(error);
  }

  if (!tournament) {
    const error = new HttpError('Could not find tournament for this id.', 404);
    return next(error);
  }

  try {
    await Tournament.deleteOne();
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not delete tournament.',
      500
    );
    return next(error);
  }
  res.status(200).json({ message: "Deleted Tournament." });
};

exports.getAllTournaments = getAllTournaments;
exports.getTournamentById = getTournamentById;
exports.getTournamentsByUserId = getTournamentsByUserId;
exports.createTournament = createTournament;
exports.updateTournament = updateTournament;
exports.deleteTournament = deleteTournament;
