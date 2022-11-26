const Project = require('../models/projectModel');

exports.createProject = (req, res) => {
  const newProject = new Project(req.body);
  newProject
    .save()
    .then(() =>
      res.status(201).json({ message: 'Project Created! :', newProject })
    )
    .catch((error) => res.status(500).json({ error }));
};

exports.getProjects = (req, res) => {
  Project.find()
    .then((projects) => res.status(200).json({ projects }))
    .catch((error) => res.status(400).json({ error }));
};

exports.getOneProject = (req, res) => {
  Project.findById(req.params.projectId)
    .then((project) => res.status(200).json({ project }))
    .catch((error) => res.status(400).json({ error }));
};

exports.deleteProject = (req, res) => {
  Project.findByIdAndDelete(req.params.projectId)
    .then(() => res.status(200).json({ message: 'Project deleted!' }))
    .catch((error) =>
      res.status(400).json({ message: 'Invalid Request!', error })
    );
};

exports.updateTeamInfos = (req, res) => {
  Project.findByIdAndUpdate(req.params.projectId, req.body, {
    new: true,
    upsert: true,
  })
    .then((project) => {
      res
        .status(200)
        .json({ message: 'The project has been modified correclty!', project });
    })
    .catch((error) =>
      res.status(401).json({ message: 'Invalid Request!', error })
    );
};

exports.addUserToProject = (req, res) => {
  Project.findByIdAndUpdate(
    req.params.projectId,
    {
      $push: {
        users: {
          id: req.body.userId,
          role: req.body.role,
        },
      },
    },
    {
      new: true,
      upsert: true,
    }
  )
    .then((project) => {
      res
        .status(200)
        .json({ message: 'The user has been added to the project!', project });
    })
    .catch((error) =>
      res.status(401).json({ message: 'Invalid Request!', error })
    );
};

exports.removeUserFromProject = (req, res) => {
  Project.findByIdAndUpdate(
    req.params.projectId,
    { $pull: { users: req.body.userId } },
    {
      new: true,
      upsert: true,
    }
  )
    .then((project) => {
      res.status(200).json({
        message: 'The user has been removed from the project!',
        project,
      });
    })
    .catch((error) =>
      res.status(401).json({ message: 'Invalid Request!', error })
    );
};
