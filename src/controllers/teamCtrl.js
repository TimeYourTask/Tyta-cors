const Team = require('../models/teamModel');
const User = require('../models/userModel');
const {
  userAddedToTeamEmail,
  userRemovedFromTeamEmail,
} = require('../utils/mails');

exports.createTeam = async (req, res) => {
  const payload = {
    ...req.body,
    users: [{ user: req.userId, role: 'admin' }],
  };

  const team = new Team(payload);

  team
    .save()
    .then(() => res.status(201).json({ message: 'Team Created!', data: team }))
    .catch((error) => res.status(500).json(error));
};

exports.getTeams = (req, res) => {
  // get teams and replace user by full user
  Team.find()
    .populate(['users.user', 'projects'])
    .then((teams) => {
      res.status(200).json(teams);
    })
    .catch((error) => res.status(400).json(error));
};

exports.getMyTeams = (req, res) => {
  Team.find({ 'users.user': req.userId })
    .populate(['users.user', 'projects'])
    .then((teams) => {
      res.status(200).json(teams);
    })
    .catch((error) => res.status(400).json(error));
};

exports.getOneTeam = (req, res) => {
  Team.findById(req.params.teamId)
    .populate(['users.user', 'projects'])
    .then((team) => res.status(200).json(team))
    .catch((error) => res.status(400).json(error));
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
  // check if user not in the team
  Team.findById(req.params.teamId)
    .then((team) => {
      if (team) {
        const isUserExist = team.users.find(
          (user) => user.user === req.body.user
        );
        if (isUserExist) {
          return res.status(400).json({
            message: 'User already in the team',
          });
        }
        User.findById(req.body.user).then((user) => {
          team.users.push(req.body);
          team
            .save()
            .then(() => {
              userAddedToTeamEmail(user, team.name);
              res.status(200).json({ message: 'User added to team!' });
            })
            .catch((error) => {
              console.log(error);
              res.status(500).json(error);
            });
        });
      } else {
        res.status(404).json({ message: 'Team not found!' });
      }
    })
    .catch((error) => res.status(500).json(error));
};

exports.removeUserFromTeam = (req, res) => {
  // check if user in team
  Team.findById(req.params.teamId)
    .then((team) => {
      if (team) {
        const user = team.users.find(
          (user) => user.user.toString() === req.body.user
        );
        if (user) {
          // remove user from team
          team.users = team.users.filter(
            (user) => user.user.toString() !== req.body.user
          );
          team
            .save()
            .then((newTeam) => {
              userRemovedFromTeamEmail(user.email, user.firstName, team.name);
              res.status(200).json({
                message: 'User removed from the team',
                newTeam,
              });
            })
            .catch((error) => res.status(500).json(error));
        } else {
          res.status(404).json({
            message: 'User not found in team!',
          });
        }
      } else {
        res.status(404).json({
          message: 'Team not found!',
        });
      }
    })
    .catch((error) =>
      res.status(401).json({ message: 'Invalid Request!', error })
    );
};

exports.addProjectToTeam = (req, res) => {
  // check if project not in team
  Team.findById(req.params.teamId)
    .then((team) => {
      if (team) {
        const project = team.projects.find(
          (project) => project.toString() === req.body.projectId
        );
        if (project) {
          return res.status(400).json({
            message: 'Project already in the team',
          });
        }
        team.projects.push(req.body.projectId);
        team
          .save()
          .then((newTeam) =>
            res.status(200).json({ message: 'Project added to team!', newTeam })
          )
          .catch((error) => res.status(500).json(error));
      } else {
        res.status(404).json({
          message: 'Team not found!',
        });
      }
    })
    .catch((error) =>
      res.status(401).json({ message: 'Invalid Request!', error })
    );
};

exports.removeProjectFromTeam = (req, res) => {
  // check if project in team
  Team.findById(req.params.teamId)
    .then((team) => {
      if (team) {
        const project = team.projects.find(
          (project) => project.toString() === req.body.projectId
        );
        if (project) {
          // remove project from team
          team.projects = team.projects.filter(
            (project) => project.toString() !== req.body.projectId
          );
          team
            .save()
            .then((newTeam) =>
              res.status(200).json({
                message: 'Project removed from the team',
                newTeam,
              })
            )
            .catch((error) => res.status(500).json(error));
        } else {
          res.status(404).json({
            message: 'Project not found in team!',
          });
        }
      } else {
        res.status(404).json({
          message: 'Team not found!',
        });
      }
    })
    .catch((error) =>
      res.status(401).json({ message: 'Invalid Request!', error })
    );
};

exports.getUserOfTeam = (req, res) => {
  Team.findById(req.params.teamId)
    .populate(['users.user'])
    .then((team) => {
      const users = team.users.map((users) => users.user);
      res.status(200).json(users);
    })
    .catch((error) => res.status(400).json(error));
};
