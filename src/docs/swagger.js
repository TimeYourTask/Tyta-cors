module.exports = {
  swagger: '2.0.0',
  info: {
    title: 'TYTA API',
    description: 'TYTA Api Documentation',
    version: '0.1.0',
  },
  securityDefinitions: {
    Authentification: {
      type: 'apiKey',
      in: 'header',
      name: 'Authorization',
    },
  },
  tags: [
    {
      name: 'Auth',
      description: 'Authentification operations',
    },
    {
      name: 'Users',
      description: 'Operations about user',
    },
    {
      name: 'Teams',
      description: 'Manage Teams',
    },
    {
      name: 'Projects',
      description: 'Manage Projects',
    },
    {
      name: 'Teams',
      description: 'Manage Teams',
    },
    {
      name: 'Tasks',
      description: 'Manage Tasks',
    },
    {
      name: 'Task Time',
      description: 'Manage Task Time',
    },
  ],
  paths: {
    // Authentification
    '/register': {
      post: {
        tags: ['Auth'],
        summary: 'Log in the app and get API Token',
        description: '',
        parameters: [
          {
            in: 'body',
            name: 'body',
            description: 'User object that need to be registered',
            required: true,
            schema: {
              required: ['email', 'password'],
              properties: {
                email: {
                  type: 'string',
                  example: 'tyta@mail.com',
                },
                password: {
                  type: 'string',
                  example: 'test',
                },
              },
            },
          },
        ],
        responses: {
          201: {
            description: 'Success',
            schema: {
              properties: {
                message: {
                  type: 'string',
                  example: 'User Created!',
                },
              },
            },
          },
          500: {
            description: 'Error',
            schema: {
              properties: {
                message: {
                  type: 'string',
                  example: 'Internal Server Error',
                },
              },
            },
          },
        },
      },
    },
    '/login': {
      post: {
        tags: ['Auth'],
        summary: 'Log in the app and get API Token',
        description: '',
        parameters: [
          {
            in: 'body',
            name: 'body',
            description: 'User object that need to be logged',
            required: false,
            schema: {
              required: ['email', 'password'],
              properties: {
                email: {
                  type: 'string',
                  example: 'tyta@mail.com',
                },
                password: {
                  type: 'string',
                  example: 'test',
                },
              },
            },
          },
        ],
        responses: {
          200: {
            description: 'Success',
            schema: {
              properties: {
                token: {
                  type: 'string',
                  example:
                    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzOGQ0MGQwNWZmY2FhY2VlM2JlYWJmYyIsImVtYWlsIjoicXVlbnRpbi5hdWJlcnQ0MkBnbWFpbC5jb20iLCJyb2xlIjoidXNlciIsImlhdCI6MTY3MjEwMTExNiwiZXhwIjoxNjc0NjkzMTE2fQ.FT3doveFDqYFDspo66U5sFk00omI8oBKd89mrYHo5rE',
                },
                email: {
                  type: 'string',
                  example: 'tyta@mail.com',
                },
              },
            },
          },
          500: {
            description: 'Error',
            schema: {
              properties: {
                message: {
                  type: 'string',
                  example: 'Interal Server Error',
                },
              },
            },
          },
        },
      },
    },
    '/resetpassword': {
      post: {
        tags: ['Auth'],
        summary: 'Reset Password when forgotten',
        description: '',
        parameters: [
          {
            in: 'body',
            name: 'body',
            description: 'User object that need to request a password reset',
            required: true,
            schema: {
              required: ['email'],
              properties: {
                email: {
                  type: 'string',
                  example: 'tyta@mail.com',
                },
              },
            },
          },
        ],
        responses: {
          200: {
            description: 'Success',
            schema: {
              properties: {
                message: {
                  type: 'string',
                  example:
                    'If our services find a match with the address you entered, you will receive a reset link in a few moments.',
                },
              },
            },
          },
          400: {
            description: 'Error',
            schema: {
              properties: {
                message: {
                  type: 'string',
                  example: 'Something went wrong!',
                },
              },
            },
          },
        },
      },
    },
    '/reset-password/{token_id}/{token}': {
      post: {
        tags: ['Auth'],
        summary: 'Change your password',
        description: '',
        parameters: [
          {
            in: 'body',
            name: 'body',
            description: 'New Password to change it',
            required: true,
            schema: {
              required: ['password'],
              properties: {
                password: {
                  type: 'string',
                  example: 'newPassword',
                },
              },
            },
          },
          {
            in: 'path',
            name: 'token_id',
            schema: {
              type: 'string',
            },
            required: true,
            description: 'The token ID',
          },
          {
            in: 'path',
            name: 'token',
            schema: {
              type: 'string',
            },
            required: true,
            description: 'The reset token',
          },
        ],
        responses: {
          200: {
            description: 'Success',
            schema: {
              properties: {
                message: {
                  type: 'string',
                  example: 'Password reset successfully',
                },
              },
            },
          },
          400: {
            description: 'Error',
            schema: {
              properties: {
                message: {
                  type: 'string',
                  example: 'Invalid or expired link, please try again later.',
                },
              },
            },
          },
        },
      },
    },
    // Users
    '/users': {
      get: {
        tags: ['Users'],
        summary: 'Get an array of all users of the app',
        description: 'Get an array of all users of the app',
        security: [
          {
            Authentification: [],
          },
        ],
        responses: {
          200: {
            description: 'Success',
            schema: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  _id: {
                    type: 'string',
                    example: '638d40d05ffcaacee3beabfc',
                  },
                  email: {
                    type: 'string',
                    example: 'quentin.aubert42@gmail.com',
                  },
                  password: {
                    type: 'string',
                    example:
                      '$2b$10$vqczTLEGFdJz2GRQ9TPOveipEfrt/ijwtHGob2Vlg4aGeAlPQFMOS',
                  },
                  role: {
                    type: 'string',
                    example: 'user',
                  },
                  createdAt: {
                    type: 'date-time',
                    example: '2022-12-05T00:52:32.150Z',
                  },
                  updatedAt: {
                    type: 'string',
                    example: '2022-12-05T00:52:32.150Z',
                  },
                },
              },
            },
          },
          400: {
            description: 'Error',
            schema: {
              properties: {
                message: {
                  type: 'string',
                  example: 'Something went wrong!',
                },
              },
            },
          },
        },
      },
    },
    '/user/{user_id}': {
      get: {
        tags: ['Users'],
        summary: 'Get an Object with user Informations',
        description: 'Get an Object with user Informations',
        security: [
          {
            Authentification: [],
          },
        ],
        parameters: [
          {
            in: 'path',
            name: 'user_id',
            schema: {
              type: 'string',
            },
            required: true,
            description: 'The user ID',
          },
        ],
        responses: {
          200: {
            description: 'Success',
            schema: {
              type: 'object',
              properties: {
                _id: {
                  type: 'string',
                  example: '638d40d05ffcaacee3beabfc',
                },
                email: {
                  type: 'string',
                  example: 'quentin.aubert42@gmail.com',
                },
                password: {
                  type: 'string',
                  example:
                    '$2b$10$vqczTLEGFdJz2GRQ9TPOveipEfrt/ijwtHGob2Vlg4aGeAlPQFMOS',
                },
                role: {
                  type: 'string',
                  example: 'user',
                },
                createdAt: {
                  type: 'date-time',
                  example: '2022-12-05T00:52:32.150Z',
                },
                updatedAt: {
                  type: 'string',
                  example: '2022-12-05T00:52:32.150Z',
                },
              },
            },
          },
          400: {
            description: 'Error',
            schema: {
              properties: {
                message: {
                  type: 'string',
                  example: 'Something went wrong!',
                },
              },
            },
          },
        },
      },
      put: {
        tags: ['Users'],
        summary: "Update user's Informations",
        description: "Update user's Informations",
        security: [
          {
            Authentification: [],
          },
        ],
        parameters: [
          {
            in: 'path',
            name: 'user_id',
            schema: {
              type: 'string',
            },
            required: true,
            description: 'The user ID',
          },
          {
            in: 'body',
            name: 'body',
            schema: {
              type: 'object',
              properties: {
                email: {
                  type: 'string',
                  example: 'new+{{user_email}}',
                },
                password: {
                  type: 'string',
                  example: 'test',
                },
                firstName: {
                  type: 'string',
                  example: 'test',
                },
                lastName: {
                  type: 'string',
                  example: 'brysto',
                },
              },
            },
          },
        ],
        responses: {
          200: {
            description: 'Success',
            schema: {
              properties: {
                message: {
                  type: 'string',
                  example: 'User updated!',
                },
              },
            },
          },
          404: {
            description: 'Error',
            schema: {
              properties: {
                message: {
                  type: 'string',
                  example: 'User not found!',
                },
              },
            },
          },
          500: {
            description: 'Error',
            schema: {
              properties: {
                message: {
                  type: 'string',
                  example: 'Internal Server Error!',
                },
              },
            },
          },
        },
      },
      delete: {
        tags: ['Users'],
        summary: "Delete user's Informations",
        description: "Delete user's Informations",
        security: [
          {
            Authentification: [],
          },
        ],
        parameters: [
          {
            in: 'path',
            name: 'user_id',
            schema: {
              type: 'string',
            },
            required: true,
            description: 'The user ID',
          },
        ],
        responses: {
          200: {
            description: 'Success',
            schema: {
              properties: {
                message: {
                  type: 'string',
                  example: 'User deleted!',
                },
              },
            },
          },
          404: {
            description: 'Error',
            schema: {
              properties: {
                message: {
                  type: 'string',
                  example: 'User not found!',
                },
              },
            },
          },
          500: {
            description: 'Error',
            schema: {
              properties: {
                message: {
                  type: 'string',
                  example: 'Internal Server Error!',
                },
              },
            },
          },
        },
      },
    },
    // Teams
    '/team': {
      post: {
        tags: ['Teams'],
        summary: 'Create a new Team',
        description: 'Create a new Team',
        security: [
          {
            Authentification: [],
          },
        ],
      },
    },
    '/teams': {
      get: {
        tags: ['Teams'],
        summary: "Get a list with all Team's Object",
        description: "Get a list with all Team's Object",
        security: [
          {
            Authentification: [],
          },
        ],
      },
    },
    '/team/{team_id}': {
      get: {
        tags: ['Teams'],
        summary: 'Get Object with team informations',
        description: 'Get Object with team informations',
        security: [
          {
            Authentification: [],
          },
        ],
      },
      put: {
        tags: ['Teams'],
        summary: 'Update a team',
        description: 'Update a team',
        security: [
          {
            Authentification: [],
          },
        ],
      },
      delete: {
        tags: ['Teams'],
        summary: 'Delete a team',
        description: 'Delete a team',
        security: [
          {
            Authentification: [],
          },
        ],
      },
    },
    '/team/{team_id}/user/{user_id}': {
      put: {
        tags: ['Teams'],
        summary: 'Add an user to a team',
        description: 'Add an user to a team',
        security: [
          {
            Authentification: [],
          },
        ],
      },
      delete: {
        tags: ['Teams'],
        summary: 'Delete an user from a team',
        description: 'Delete an user from a team',
        security: [
          {
            Authentification: [],
          },
        ],
      },
    },
    '/team/{team_id}/project/{project_id}': {
      put: {
        tags: ['Teams'],
        summary: 'Add a project to a team',
        description: 'Add a project to a team',
        security: [
          {
            Authentification: [],
          },
        ],
      },
      delete: {
        tags: ['Teams'],
        summary: 'Delete a project from a team',
        description: 'Delete a project from a team',
        security: [
          {
            Authentification: [],
          },
        ],
      },
    },
    // Projects
    '/team/{team_id}/project': {
      put: {
        tags: ['Projects'],
        summary: 'Create a project',
        description: 'Create a project',
        security: [
          {
            Authentification: [],
          },
        ],
      },
    },
    '/admin/projects': {
      get: {
        tags: ['Projects'],
        summary: 'Get all admin of projects',
        description: 'Get all admin of projects',
        security: [
          {
            Authentification: [],
          },
        ],
      },
    },
    '/project/{project_id}': {
      get: {
        tags: ['Projects'],
        summary: 'Get an object with project informations',
        description: 'Get an object project informations',
        security: [
          {
            Authentification: [],
          },
        ],
      },
      put: {
        tags: ['Projects'],
        summary: 'Update project informations',
        description: 'Update project informations',
        security: [
          {
            Authentification: [],
          },
        ],
      },
      delete: {
        tags: ['Projects'],
        summary: 'Delete a project',
        description: 'Delete a project',
        security: [
          {
            Authentification: [],
          },
        ],
      },
    },
    '/project/{project_id}/user/{user_id}': {
      put: {
        tags: ['Projects'],
        summary: 'Update users in project',
        description: 'Update users in project',
        security: [
          {
            Authentification: [],
          },
        ],
      },
    },
    '/user/{user_id}/projects': {
      get: {
        tags: ['Projects'],
        summary: "Get an object with different user's projects informations",
        description:
          "Get an object with different user's projects informations",
        security: [
          {
            Authentification: [],
          },
        ],
      },
    },
    // Tasks
    '/task': {
      post: {
        tags: ['Tasks'],
        summary: 'Create a new Task',
        description: 'Create a new Task',
        security: [
          {
            Authentification: [],
          },
        ],
      },
    },
    '/tasks': {
      get: {
        tags: ['Tasks'],
        summary: "Get a list with all Task's informations",
        description: "Get a list with all Task's informations",
        security: [
          {
            Authentification: [],
          },
        ],
      },
    },
    '/task/{task_id}': {
      get: {
        tags: ['Tasks'],
        summary: 'Get an object with Task information',
        description: 'Get an object with Task information',
        security: [
          {
            Authentification: [],
          },
        ],
      },
      put: {
        tags: ['Tasks'],
        summary: 'Update task informations',
        description: 'Update task informations',
        security: [
          {
            Authentification: [],
          },
        ],
      },
      delete: {
        tags: ['Tasks'],
        summary: 'Delete a task',
        description: 'Delete a task',
        security: [
          {
            Authentification: [],
          },
        ],
      },
    },
    // Task Time
    '/task/{task_id}/start': {
      post: {
        tags: ['Task Time'],
        summary: 'Start a Task timer',
        description: 'Start a Task timer',
        security: [
          {
            Authentification: [],
          },
        ],
      },
    },
    '/task/{task_id}/end': {
      post: {
        tags: ['Task Time'],
        summary: 'End a Task timer',
        description: 'End a Task timer',
        security: [
          {
            Authentification: [],
          },
        ],
      },
    },
    '/timers': {
      get: {
        tags: ['Task Time'],
        summary: 'End a Task timer',
        description: 'End a Task timer',
        security: [
          {
            Authentification: [],
          },
        ],
      },
    },
    '/task/user/timer': {
      get: {
        tags: ['Task Time'],
        summary: 'End a Task timer',
        description: 'End a Task timer',
        security: [
          {
            Authentification: [],
          },
        ],
      },
    },
    '/task/{task_id}/timer': {
      get: {
        tags: ['Task Time'],
        summary: 'Get timer of a task',
        description: 'Get timer of a task',
        security: [
          {
            Authentification: [],
          },
        ],
      },
      delete: {
        tags: ['Task Time'],
        summary: 'Delete timer of a task',
        description: 'Delete timer of a task',
        security: [
          {
            Authentification: [],
          },
        ],
      },
    },
    '/task/{task_id}/timer/{time_id}': {
      get: {
        tags: ['Task Time'],
        summary: 'Update timer of a task',
        description: 'Update timer of a task',
        security: [
          {
            Authentification: [],
          },
        ],
      },
    },
  },
};
