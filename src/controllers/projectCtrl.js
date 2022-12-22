const Project = require('../models/projectModel');

exports.createProject = (req, res) => {
  const newProject = new Project(req.body);
  newProject
    .save()
    .then(() =>
      res.status(201).json({ message: 'Project Created!', data: newProject })
    )
    .catch((error) => res.status(500).json(error));
};

exports.getProjects = (req, res) => {
  Project.find()
    .then((projects) => res.status(200).json(projects))
    .catch((error) => res.status(400).json(error));
};

exports.getOneProject = (req, res) => {
  Project.findById(req.params.projectId)
    .then((project) => res.status(200).json(project))
    .catch((error) => res.status(400).json(error));
};

exports.deleteProject = (req, res) => {
  Project.findByIdAndDelete(req.params.projectId)
    .then((project) => {
      if (!project)
        res
          .status(400)
          .json({ message: 'No item deleted: project not found!' });
      else res.status(200).json({ message: 'Project deleted!' });
    })
    .catch((error) =>
      res.status(400).json({ message: 'Invalid Request!', error })
    );
};

exports.updateProjectInfos = (req, res) => {
  Project.findByIdAndUpdate(req.params.projectId, req.body, { new: true })
    .then((project) => {
      if (!project)
        res
          .status(400)
          .json({ message: 'No item updated: project not found!' });
      else res.status(200).json({ message: 'Project updated!', data: project });
    })
    .catch((error) =>
      res.status(400).json({ message: 'Invalid Request!', error })
    );
};

exports.addUserToProject = (req, res) => {
  // check if project exist
  Project.findById(req.params.projectId)
    // eslint-disable-next-line consistent-return
    .then((project) => {
      if (project) {
        const user = project.users.find(
          (u) => u.toString() === req.body.userId
        );
        if (user) {
          return res.status(400).json({
            message: 'User already in the project',
          });
        }
        project.users.push({
          id: req.body.userId,
          role: req.body.role || 'user',
        });
        project
          .save()
          .then((newProject) =>
            res.status(200).json({
              message: 'User added to project!',
              newProject,
            })
          )
          .catch((error) => res.status(500).json(error));
      }
      res.status(404).json({
        message: 'Project not found!',
      });
    })
    .catch((error) =>
      res.status(401).json({ message: 'Invalid Request!', error })
    );
};

exports.removeUserFromProject = (req, res) => {
  // check if project exist
  Project.findById(req.params.projectId)
    .then((project) => {
      if (project) {
        const user = project.users.find(
          (u) => u.toString() === req.body.userId
        );
        if (user) {
          // remove user from project
          // eslint-disable-next-line no-param-reassign
          project.users = project.users.filter(
            (u) => u.toString() !== req.body.userId
          );
          project
            .save()
            .then((newProject) =>
              res.status(200).json({
                message: 'User removed from the project',
                newProject,
              })
            )
            .catch((error) => res.status(500).json(error));
        } else {
          res.status(404).json({
            message: 'User not found in project!',
          });
        }
      } else {
        res.status(404).json({
          message: 'Project not found!',
        });
      }
    })
    .catch((error) =>
      res.status(401).json({ message: 'Invalid Request!', error })
    );
};
