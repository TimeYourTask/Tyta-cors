const { isValidObjectId } = require('mongoose');

const Project = require('../models/projectModel');
const Team = require('../models/teamModel');

const {
  userAddedToProjectEmail,
  userRemovedFromProjectEmail,
} = require('../utils/mails');

const { ROLES } = require('../config/global');

exports.createProject = async (req, res) => {
  const { teamId } = req.params;

  if (!isValidObjectId(teamId)) {
    return res
      .status(400)
      .json({ message: 'The information provided is incorrect!' });
  }

  const isTeamExist = await Team.findById(teamId);
  if (!isTeamExist) {
    return res
      .status(400)
      .json({ message: 'The information provided is incorrect!' });
  }

  const payload = {
    ...req.body,
    team: teamId,
    users: [{ user: req.userId, role: 'admin' }],
  };

  const newProject = new Project(payload);

  const editTeam = new Team(isTeamExist);
  editTeam.projects.push(newProject.id);
  editTeam.save();

  return newProject
    .save()
    .then((project) =>
      res.status(201).json({ message: 'Project Created!', data: project })
    )
    .catch((error) => res.status(500).json(error));
};

exports.getAllProjects = (req, res) => {
  Project.find()
    .populate(['users.user', 'team'])
    .then((projects) => res.status(200).json(projects))
    .catch((error) => res.status(400).json(error));
};

exports.getOneProject = (req, res) => {
  const { projectId } = req.params;

  Project.findById(projectId)
    .populate(['users.user', 'team'])
    .then((project) => {
      // Blocks users who want to access other users without being admin
      const isUserInTeam = project.users.some(
        (user) => user.user.id === req.userId
      );
      if (!isUserInTeam && req.role !== ROLES.admin) {
        return res.status(401).json({ message: 'Access denied!' });
      }

      return res.status(200).json(project);
    })
    .catch((error) => res.status(400).json(error));
};

exports.getUserProjects = (req, res) => {
  const { userId } = req.params;
  // Get project of user in a specific team if team is specified in query params
  const { team } = req.query;
  Project.find({ 'users.user': userId, ...(team && { team }) })
    .populate(['users.user', 'team'])
    .then((projects) => res.status(200).json(projects))
    .catch((error) => res.status(400).json(error));
};

exports.deleteProject = (req, res) => {
  const { projectId } = req.params;

  // Pass object in delete request to let mongoose pre hook access to request data
  Project.findByIdAndDelete({ _id: projectId, req })
    .then((project) => {
      if (!project) {
        return res
          .status(400)
          .json({ message: 'No item deleted: project not found!' });
      }

      return res.status(200).json({ message: 'Project deleted!' });
    })
    .catch((error) => {
      if (error.message === 'Access denied!') {
        return res.status(401).json({ message: error.message });
      }
      return res.status(400).json({ message: 'Invalid Request!', error });
    });
};

exports.updateProjectInfos = (req, res) => {
  Project.findByIdAndUpdate(req.params.projectId, req.body, { new: true })
    .then((project) => {
      if (!project)
        return res
          .status(400)
          .json({ message: 'No item updated: project not found!' });

      // Blocks users who want to access other users without being admin
      const isUserInTeam = project.users.some(
        (user) => user.user.toString() === req.userId && user.role === 'admin'
      );
      if (!isUserInTeam && req.role !== ROLES.admin) {
        return res.status(401).json({ message: 'Access denied!' });
      }

      return res
        .status(200)
        .json({ message: 'Project updated!', data: project });
    })
    .catch((error) =>
      res.status(400).json({ message: 'Invalid Request!', error })
    );
};

exports.addUserToProject = (req, res) => {
  // check if project exist
  Project.findById(req.params.projectId)
    .then((project) => {
      if (!project) {
        res.status(404).json({
          message: 'Project not found!',
        });
      }

      // Blocks users who want to access other users without being admin
      const isUserInTeam = project.users.some(
        (user) => user.user.toString() === req.userId && user.role === 'admin'
      );
      if (!isUserInTeam && req.role !== ROLES.admin) {
        return res.status(401).json({ message: 'Access denied!' });
      }

      const user = project.users.find(
        (u) => u.user.toString() === req.params.userId
      );
      if (user) {
        return res.status(400).json({
          message: 'User already in the project',
        });
      }

      project.users.push({
        user: req.params.userId,
        role: req.body.role || 'user',
      });
      return project
        .save()
        .then((newProject) => {
          userAddedToProjectEmail(user.email, user.firstName, project.name);
          res.status(200).json({
            message: 'User added to project!',
            newProject,
          });
        })
        .catch((error) => res.status(500).json(error));
    })
    .catch((error) =>
      res.status(401).json({ message: 'Invalid Request!', error })
    );
};

exports.removeUserFromProject = (req, res) => {
  const { projectId, userId } = req.params;

  Project.findById(projectId)
    .populate('users.user')
    .then(async (project) => {
      if (!project) {
        return res.status(404).json({
          message: 'Project not found!',
        });
      }

      const user = project.users.find((u) => u.user.id.toString() === userId);

      if (!user) {
        return res.status(404).json({
          message: 'User not found in project!',
        });
      }
      // Check if user is admin of project
      const projectAdmins = project.users.filter(
        (user) => user.role === 'admin'
      );
      const isUserAdminOfProject = projectAdmins.some(
        (user) => user.role === 'admin'
      );

      if (
        projectAdmins.length === 1 &&
        isUserAdminOfProject &&
        userId === req.userId
      ) {
        return res.status(400).json({
          message: "You can't delete this user, no more admin in this project!",
        });
      }

      // Blocks users who want to access other users without being admin
      const isUserInTeam = project.users.some(
        (user) => user.user.id.toString() === req.userId
      );
      if (!isUserInTeam && !isUserAdminOfProject && req.role !== ROLES.admin) {
        return res.status(401).json({ message: 'Access denied!' });
      }

      // Remove user from project
      let deletedUser = {};
      project.users = project.users.filter((u) => {
        if (u.user.id === req.params.userId) {
          deletedUser = u.user;
          return false;
        }
        return true;
      });

      return project
        .save()
        .then((newProject) => {
          userRemovedFromProjectEmail(
            deletedUser.email,
            deletedUser.firstName,
            project.name
          );
          res.status(200).json({
            message: 'User removed from the project',
            data: newProject,
          });
        })
        .catch((error) => res.status(500).json(error));
    })
    .catch((error) =>
      res.status(401).json({ message: 'Invalid Request!', error })
    );
};

exports.getUserOfProject = (req, res) => {
  Project.findById(req.params.projectId)
    .populate(['users.user'])
    .then((project) => {
      // Blocks users who want to access other users without being admin
      const isUserInTeam = project.users.some(
        (user) => user.user.id === req.userId
      );
      if (!isUserInTeam && req.role !== ROLES.admin) {
        return res.status(401).json({ message: 'Access denied!' });
      }

      const users = project.users.map((users) => users.user);
      return res.status(200).json(users);
    })
    .catch((error) =>
      res.status(404).json({ message: 'Project not found!', error })
    );
};
