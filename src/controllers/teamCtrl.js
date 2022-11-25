const Team = require('../models/teamModel');

exports.createTeam = (req, res) => {
  const newTeam = new Team(req.body);
  newTeam
    .save()
    .then(() => res.status(201).json({ message: 'Team Created! :', newTeam }))
    .catch((error) => res.status(500).json({ error }));
};

exports.getTeams = (req, res) => {
  Team.find()
    .then((teams) => res.status(200).json({ teams }))
    .catch((error) => res.status(400).json({ error }));
};

exports.getOneTeam = (req, res) => {
  Team.findById(req.params.teamId)
    .then((team) => res.status(200).json({ team }))
    .catch((error) => res.status(400).json({ error }));
};

exports.deleteTeam = (req, res) => {
  Team.findByIdAndDelete(req.params.teamId)
    .then(() => res.status(200).json({ message: 'Team deleted!' }))
    .catch((error) =>
      res.status(400).json({ message: 'Invalid Request!', error })
    );
};

exports.updateTeamName = (req, res) => {
  Team.findByIdAndUpdate(req.params.teamId, req.body, {
    new: true,
    upsert: true,
  })
    .then((team) => {
      res
        .status(200)
        .json({ message: 'The team has been modified correclty!', team });
    })
    .catch((error) =>
      res.status(401).json({ message: 'Invalid Request!', error })
    );
};

exports.addUserToTeam = (req, res) => {
  Team.findByIdAndUpdate(
    req.params.teamId,
    { $push: { users: req.body.userId } },
    {
      new: true,
      upsert: true,
    }
  )
    .then((team) => {
      res
        .status(200)
        .json({ message: 'The user has been added to the team!', team });
    })
    .catch((error) =>
      res.status(401).json({ message: 'Invalid Request!', error })
    );
};

exports.removeUserFromTeam = (req, res) => {
  Team.findByIdAndUpdate(
    req.params.teamId,
    { $pull: { users: req.body.userId } },
    {
      new: true,
      upsert: true,
    }
  )
    .then((team) => {
      res
        .status(200)
        .json({ message: 'The user has been removed from the team!', team });
    })
    .catch((error) =>
      res.status(401).json({ message: 'Invalid Request!', error })
    );
};
