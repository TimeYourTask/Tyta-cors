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
    {
      name: 'Administration',
      description: 'Requires admin role to access data',
    },
  ],
  paths: {
    // Authentification
    '/register': {
      post: {
        tags: ['Auth'],
        summary: 'Log in the app and get API Token',
        description: 'Log in the app and get API Token',
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
        description: 'Log in the app and get API Token',
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
        description: 'Reset Password when forgotten',
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
        description: 'Change your password',
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
    '/users': {
      get: {
        tags: ['Administration'],
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
        parameters: [
          {
            in: 'body',
            name: 'body',
            description: 'Team Name',
            required: true,
            schema: {
              required: ['name'],
              properties: {
                name: {
                  type: 'string',
                  example: 'TimeYourTaskTeam',
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
                  example: 'Team Created!',
                },
                newTeam: {
                  type: 'object',
                  properties: {
                    name: {
                      type: 'string',
                      example: 'TimeYourTaskTeam',
                    },
                    projects: {
                      type: 'array',
                      example: [],
                    },
                    _id: {
                      type: 'string',
                      example: '63ab12f525d4a913c2f28578',
                    },
                    users: {
                      type: 'array',
                      example: [],
                    },
                    createdAt: {
                      type: 'date-time',
                      example: '2022-12-27T15:44:54.004Z',
                    },
                    updatedAt: {
                      type: 'date-time',
                      example: '2022-12-27T15:44:54.004Z',
                    },
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
                  example: 'Invalid or expired link, please try again later.',
                },
              },
            },
          },
        },
      },
    },
    '/teams/mine': {
      get: {
        tags: ['Teams'],
        summary: 'Get List of my teams',
        description: 'Get List of my teams',
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
                    example: '63ab14c19234de2a20e2a09b',
                  },
                  name: {
                    type: 'string',
                    example: 'TimeYourTaskTeam',
                  },
                  projects: {
                    type: 'array',
                    example: [],
                  },
                  users: {
                    type: 'array',
                    example: [],
                  },
                  createdAt: {
                    type: 'date-time',
                    example: '2022-12-27T15:52:33.330Z',
                  },
                  updatedAt: {
                    type: 'date-time',
                    example: '2022-12-27T15:52:33.330Z',
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
        parameters: [
          {
            in: 'path',
            name: 'team_id',
            schema: {
              type: 'string',
            },
            required: true,
            description: 'The team ID',
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
                    example: '63ab14c19234de2a20e2a09b',
                  },
                  name: {
                    type: 'string',
                    example: 'TimeYourTaskTeam',
                  },
                  projects: {
                    type: 'array',
                    example: [],
                  },
                  users: {
                    type: 'array',
                    example: [],
                  },
                  createdAt: {
                    type: 'date-time',
                    example: '2022-12-27T15:52:33.330Z',
                  },
                  updatedAt: {
                    type: 'date-time',
                    example: '2022-12-27T15:52:33.330Z',
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
      put: {
        tags: ['Teams'],
        summary: 'Update a team',
        description: 'Update a team',
        security: [
          {
            Authentification: [],
          },
        ],
        parameters: [
          {
            in: 'path',
            name: 'team_id',
            schema: {
              type: 'string',
            },
            required: true,
            description: 'The team ID',
          },
          {
            in: 'body',
            name: 'body',
            schema: {
              properties: {
                name: {
                  type: 'string',
                  example: 'New+Name',
                },
              },
            },
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
                    example: '63ab14c19234de2a20e2a09b',
                  },
                  name: {
                    type: 'string',
                    example: 'NewTeamName',
                  },
                  projects: {
                    type: 'array',
                    example: [],
                  },
                  users: {
                    type: 'array',
                    example: [],
                  },
                  createdAt: {
                    type: 'string',
                    example: '2022-12-27T15:52:33.330Z',
                  },
                  updatedAt: {
                    type: 'string',
                    example: '2022-12-27T15:52:33.330Z',
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
      delete: {
        tags: ['Teams'],
        summary: 'Delete a team',
        description: 'Delete a team',
        security: [
          {
            Authentification: [],
          },
        ],
        parameters: [
          {
            in: 'path',
            name: 'team_id',
            schema: {
              type: 'string',
            },
            required: true,
            description: 'The team ID',
          },
        ],
        responses: {
          200: {
            description: 'Success',
            schema: {
              properties: {
                message: {
                  type: 'string',
                  example: 'Team Deleted!',
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
    '/team/{team_id}/user/': {
      put: {
        tags: ['Teams'],
        summary: 'Add an user to a team',
        description: 'Add an user to a team',
        security: [
          {
            Authentification: [],
          },
        ],
        parameters: [
          {
            in: 'path',
            name: 'team_id',
            schema: {
              type: 'string',
            },
            required: true,
            description: 'The team ID',
          },
          {
            in: 'body',
            name: 'body',
            schema: {
              properties: {
                user: {
                  type: 'string',
                  example: '638d40d05ffcaacee3beabfc',
                },
                role: {
                  type: 'string',
                  example: 'user',
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
                  example: 'User added to team!',
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
                  example: 'User already in the team',
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
                  example: 'Team not found!',
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
                  example: 'Something went wrong!',
                },
              },
            },
          },
        },
      },
    },
    '/team/{team_id}/users/': {
      get: {
        tags: ['Teams'],
        summary: 'Get users list of a team',
        description: 'Get users list of a team',
        security: [
          {
            Authentification: [],
          },
        ],
        parameters: [
          {
            in: 'path',
            name: 'team_id',
            schema: {
              type: 'string',
            },
            required: true,
            description: 'The team ID',
          },
        ],
        responses: {
          200: {
            description: 'Success',
            schema: {
              properties: {
                message: {
                  user: 'array',
                  example: [],
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
                  example: 'Team not found!',
                },
              },
            },
          },
        },
      },
    },
    '/team/{team_id}/user/{user_id}': {
      delete: {
        tags: ['Teams'],
        summary: 'Delete an user from a team',
        description: 'Delete an user from a team',
        security: [
          {
            Authentification: [],
          },
        ],
        parameters: [
          {
            in: 'path',
            name: 'team_id',
            schema: {
              type: 'string',
            },
            required: true,
            description: 'The team ID',
          },
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
                  example: 'User removed from the team',
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
                  example: 'User / Team not found',
                },
              },
            },
          },
          401: {
            description: 'Error',
            schema: {
              properties: {
                message: {
                  type: 'string',
                  example: 'Invalid Request!',
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
                  example: 'Something went wrong!',
                },
              },
            },
          },
        },
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
        parameters: [
          {
            in: 'path',
            name: 'team_id',
            schema: {
              type: 'string',
            },
            required: true,
            description: 'The team ID',
          },
          {
            in: 'path',
            name: 'project_id',
            schema: {
              type: 'string',
            },
            required: true,
            description: 'The project ID',
          },
        ],
        responses: {
          200: {
            description: 'Success',
            schema: {
              properties: {
                message: {
                  type: 'string',
                  example: 'Project added to team',
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
                  example: 'Project already in the team',
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
                  example: 'Team not found!',
                },
              },
            },
          },
          401: {
            description: 'Error',
            schema: {
              properties: {
                message: {
                  type: 'string',
                  example: 'Invalid Request!',
                },
              },
            },
          },
        },
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
        parameters: [
          {
            in: 'path',
            name: 'team_id',
            schema: {
              type: 'string',
            },
            required: true,
            description: 'The team ID',
          },
          {
            in: 'path',
            name: 'project_id',
            schema: {
              type: 'string',
            },
            required: true,
            description: 'The project ID',
          },
          {
            in: 'body',
            name: 'body',
            schema: {
              properties: {
                projectId: {
                  type: 'string',
                  example: '638d40d05ffcaacee3beabfc',
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
                  example: 'Project removed from the team',
                },
                newTeam: {
                  type: 'object',
                  properties: {
                    name: {
                      type: 'string',
                      example: 'TimeYourTaskTeam',
                    },
                    projects: {
                      type: 'array',
                      example: [],
                    },
                    _id: {
                      type: 'string',
                      example: '63ab12f525d4a913c2f28578',
                    },
                    users: {
                      type: 'array',
                      example: [],
                    },
                    createdAt: {
                      type: 'date-time',
                      example: '2022-12-27T15:44:54.004Z',
                    },
                    updatedAt: {
                      type: 'date-time',
                      example: '2022-12-27T15:44:54.004Z',
                    },
                  },
                },
              },
            },
          },
          401: {
            description: 'Error',
            schema: {
              properties: {
                message: {
                  type: 'string',
                  example: 'Invalid Request!',
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
                  example: 'Project / Team not found',
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
                  example: 'Something went wrong!',
                },
              },
            },
          },
        },
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
        parameters: [
          {
            in: 'path',
            name: 'team_id',
            schema: {
              type: 'string',
            },
            required: true,
            description: 'The team ID',
          },
          {
            in: 'body',
            name: 'body',
            schema: {
              properties: {
                name: {
                  type: 'string',
                  example: 'Test project 2',
                },
                description: {
                  type: 'string',
                  example: 'Beautiful project',
                },
                users: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      id: {
                        type: 'string',
                        example: '{{user_id}}',
                      },
                    },
                  },
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
                  example: 'Project Created!',
                },
                data: {
                  type: 'object',
                  properties: {
                    name: {
                      type: 'string',
                      example: 'Test un beau projet',
                    },
                    description: {
                      type: 'string',
                      example: 'Beautiful project',
                    },
                    users: { type: 'array', example: [] },
                    team: {
                      type: 'string',
                      example: '63ad67d4a8b21296142ff048',
                    },
                    _id: {
                      type: 'string',
                      example: '63ad84d7d008827135280989',
                    },
                    createdAt: {
                      type: 'date-time',
                      example: '2022-12-29T12:15:19.041Z',
                    },
                    updatedAt: {
                      type: 'date-time',
                      example: '2022-12-29T12:15:19.041Z',
                    },
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
                  example: 'The information provided is incorrect!',
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
                  example: 'Something went wrong!',
                },
              },
            },
          },
        },
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
        parameters: [
          {
            in: 'path',
            name: 'project_id',
            schema: {
              type: 'string',
            },
            required: true,
            description: 'The project ID',
          },
        ],
        responses: {
          200: {
            description: 'Success',
            schema: {
              properties: {
                data: {
                  type: 'object',
                  properties: {
                    _id: {
                      type: 'string',
                      example: '63ad84d7d008827135280989',
                    },
                    name: {
                      type: 'string',
                      example: 'Test un beau projet',
                    },
                    description: {
                      type: 'string',
                      example: 'Beautiful project',
                    },
                    users: { type: 'array', example: [] },
                    team: {
                      type: 'object',
                      properties: {
                        _id: {
                          type: '',
                          example: '63ad67d4a8b21296142ff048',
                        },
                        name: {
                          type: '',
                          example: 'KEKBody',
                        },
                        users: {
                          type: 'array',
                          example: [],
                        },
                        projects: {
                          type: 'array',
                          example: ['63ad84d7d008827135280989'],
                        },
                      },
                    },
                    createdAt: {
                      type: 'date-time',
                      example: '2022-12-29T12:15:19.041Z',
                    },
                    updatedAt: {
                      type: 'date-time',
                      example: '2022-12-29T12:15:19.041Z',
                    },
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
      put: {
        tags: ['Projects'],
        summary: 'Update project informations',
        description: 'Update project informations',
        security: [
          {
            Authentification: [],
          },
        ],
        parameters: [
          {
            in: 'path',
            name: 'project_id',
            schema: {
              type: 'string',
            },
            required: true,
            description: 'The project ID',
          },
          {
            in: 'body',
            name: 'body',
            schema: {
              properties: {
                name: {
                  type: 'string',
                  example: 'NewName',
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
                  example: 'Project updated!',
                },
                data: {
                  type: 'object',
                  properties: {
                    _id: {
                      type: 'string',
                      example: '63ad84d7d008827135280989',
                    },
                    name: {
                      type: 'string',
                      example: 'New',
                    },
                    description: {
                      type: 'string',
                      example: 'Beautiful project',
                    },
                    users: {
                      type: 'array',
                      example: [],
                    },
                    team: {
                      type: 'string',
                      example: '63ad67d4a8b21296142ff048',
                    },
                    createdAt: {
                      type: 'date-time',
                      example: '2022-12-29T12:15:19.041Z',
                    },
                    updatedAt: {
                      type: 'date-time',
                      example: '2022-12-29T12:31:15.592Z',
                    },
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
      delete: {
        tags: ['Projects'],
        summary: 'Delete a project',
        description: 'Delete a project',
        security: [
          {
            Authentification: [],
          },
        ],
        parameters: [
          {
            in: 'path',
            name: 'project_id',
            schema: {
              type: 'string',
            },
            required: true,
            description: 'The project ID',
          },
        ],
        responses: {
          200: {
            description: 'Success',
            schema: {
              properties: {
                message: {
                  type: 'string',
                  example: 'Project deleted!',
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
                  example: 'Invalid Request!',
                },
              },
            },
          },
        },
      },
    },
    '/project/{project_id}/users': {
      get: {
        tags: ['Projects'],
        summary: 'Get an user list of project',
        description: 'Get an user list of project ',
        security: [
          {
            Authentification: [],
          },
        ],
        parameters: [
          {
            in: 'path',
            name: 'project_id',
            schema: {
              type: 'string',
            },
            required: true,
            description: 'The project ID',
          },
        ],
        responses: {
          200: {
            description: 'Success',
            schema: {
              properties: {
                data: {
                  type: 'array',
                  example: [],
                },
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
                example: 'Project not found!',
              },
            },
          },
        },
      },
    },
    '/project/{project_id}/user/{user_id}': {
      put: {
        tags: ['Projects'],
        summary: 'Add user in project',
        description: 'Add user in project',
        security: [
          {
            Authentification: [],
          },
        ],
        parameters: [
          {
            in: 'path',
            name: 'project_id',
            schema: {
              type: 'string',
            },
            required: true,
            description: 'The project ID',
          },
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
                  example: 'User added to project!!',
                },
              },
            },
          },
          401: {
            description: 'Error',
            schema: {
              properties: {
                message: {
                  type: 'string',
                  example: 'Invalid Request!',
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
                  example: 'User already in the project!',
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
                  example: 'Project not found!',
                },
              },
            },
          },
        },
      },
      delete: {
        tags: ['Projects'],
        summary: 'Remove user in project',
        description: 'Remove user in project',
        security: [
          {
            Authentification: [],
          },
        ],
        parameters: [
          {
            in: 'path',
            name: 'project_id',
            schema: {
              type: 'string',
            },
            required: true,
            description: 'The project ID',
          },
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
                  example: 'User removed from the project',
                },
              },
            },
          },
          401: {
            description: 'Error',
            schema: {
              properties: {
                message: {
                  type: 'string',
                  example: 'Invalid Request!',
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
                  example: 'User / Project not found!',
                },
              },
            },
          },
        },
      },
    },
    '/user/{user_id}/projects': {
      get: {
        tags: ['Projects'],
        summary: "Get a list with different user's projects informations",
        description: "Get a list with different user's projects informations",
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
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  _id: {
                    type: 'string',
                    example: '63ad84d7d008827135280989',
                  },
                  name: {
                    type: 'string',
                    example: 'New',
                  },
                  description: {
                    type: 'string',
                    example: 'Beautiful project',
                  },
                  users: {
                    type: 'array',
                    example: [],
                  },
                  team: {
                    _id: {
                      type: 'string',
                      example: '63ad67d4a8b21296142ff048',
                    },
                    name: {
                      type: 'string',
                      example: 'KEKBody',
                    },
                    users: {
                      type: 'array',
                      example: [],
                    },
                    projects: {
                      type: 'array',
                      example: ['63ad84d7d008827135280989'],
                    },
                    createdAt: {
                      type: 'date-time',
                      example: '2022-12-29T10:11:32.520Z',
                    },
                    updatedAt: {
                      type: 'date-time',
                      example: '2022-12-29T12:15:19.041Z',
                    },
                  },
                  createdAt: {
                    type: 'date-time',
                    example: '2022-12-29T12:15:19.041Z',
                  },
                  updatedAt: {
                    type: 'date-time',
                    example: '2022-12-29T14:24:12.623Z',
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
        parameters: [
          {
            in: 'body',
            name: 'body',
            schema: {
              properties: {
                project_id: {
                  type: 'string',
                  example: 'Test project 2',
                },
                title: {
                  type: 'string',
                  example: 'TASK X',
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
                  example: 'Task Created!',
                },
                newTask: {
                  type: 'object',
                  properties: {
                    title: {
                      type: 'string',
                      example: 'TASK 2',
                    },
                    project: {
                      type: 'string',
                      example: '63ad84d7d008827135280989',
                    },
                    _id: {
                      type: 'string',
                      example: '63adae661226f5320b31f30b',
                    },
                    createdAt: {
                      type: 'date-time',
                      example: '2022-12-29T15:12:38.765Z',
                    },
                    updatedAt: {
                      type: 'date-time',
                      example: '2022-12-29T15:12:38.765Z',
                    },
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
        parameters: [
          {
            in: 'path',
            name: 'task_id',
            schema: {
              type: 'string',
            },
            required: true,
            description: 'The task ID',
          },
        ],
        responses: {
          200: {
            description: 'Success',
            schema: {
              properties: {
                task: {
                  type: 'object',
                  properties: {
                    _id: {
                      type: 'string',
                      example: '63adae661226f5320b31f30b',
                    },
                    title: {
                      type: 'string',
                      example: 'TASK 2',
                    },
                    project: {
                      type: 'string',
                      example: '63ad84d7d008827135280989',
                    },
                    createdAt: {
                      type: 'date-time',
                      example: '2022-12-29T15:12:38.765Z',
                    },
                    updatedAt: {
                      type: 'date-time',
                      example: '2022-12-29T15:12:38.765Z',
                    },
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
          404: {
            description: 'Error',
            schema: {
              properties: {
                message: {
                  type: 'string',
                  example: 'Task not found!',
                },
              },
            },
          },
        },
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
        parameters: [
          {
            in: 'path',
            name: 'task_id',
            schema: {
              type: 'string',
            },
            required: true,
            description: 'The task ID',
          },
          {
            in: 'body',
            name: 'body',
            schema: {
              properties: {
                title: {
                  type: 'string',
                  example: 'new title',
                },
                assigned: {
                  type: 'string',
                  example: '{{user_id}}',
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
                  example: 'The Task has been modified correclty!',
                },
                task: {
                  type: 'object',
                  properties: {
                    _id: {
                      type: 'string',
                      example: '63adae661226f5320b31f30b',
                    },
                    title: {
                      type: 'string',
                      example: 'New',
                    },
                    project: {
                      type: 'string',
                      example: '63ad84d7d008827135280989',
                    },
                    createdAt: {
                      type: 'date-time',
                      example: '2022-12-29T15:12:38.765Z',
                    },
                    updatedAt: {
                      type: 'date-time',
                      example: '2022-12-29T15:28:36.660Z',
                    },
                    assigned: {
                      type: 'string',
                      example: '{{user_id}}',
                    },
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
                  example: 'Invalid Request!',
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
                  example: 'No items updated : task not found!',
                },
              },
            },
          },
        },
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
        parameters: [
          {
            in: 'path',
            name: 'task_id',
            schema: {
              type: 'string',
            },
            required: true,
            description: 'The task ID',
          },
        ],
        responses: {
          200: {
            description: 'Success',
            schema: {
              properties: {
                message: {
                  type: 'string',
                  example: 'Task deleted!',
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
                  example: 'Invalid Request!',
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
                  example: 'No items deleted: task not found!',
                },
              },
            },
          },
        },
      },
    },
    // Task Time
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
        responses: {
          200: {
            description: 'Success',
            schema: {
              properties: {
                timeTask: {
                  type: 'object',
                  example: {},
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
                  example: 'Timer not started!',
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
                  example: 'Timer not found!',
                },
              },
            },
          },
        },
      },
    },
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
        parameters: [
          {
            in: 'path',
            name: 'task_id',
            schema: {
              type: 'string',
            },
            required: true,
            description: 'The task ID',
          },
        ],
        responses: {
          201: {
            description: 'Success',
            schema: {
              properties: {
                message: {
                  type: 'string',
                  example: 'Timer created',
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
                  example:
                    'A timer is already running on this task or task does not have user assigned',
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
                  example: 'User / Task not found!',
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
                  example: 'Something went wrong!',
                },
              },
            },
          },
        },
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
        parameters: [
          {
            in: 'path',
            name: 'task_id',
            schema: {
              type: 'string',
            },
            required: true,
            description: 'The task ID',
          },
        ],
        responses: {
          200: {
            description: 'Success',
            schema: {
              properties: {
                message: {
                  type: 'string',
                  example: 'The timer has been modified correclty',
                },
                result: {
                  type: 'object',
                  properties: {},
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
                  example: 'No timer started',
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
                  example: 'Timer not found, start a new timer for init',
                },
              },
            },
          },
        },
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
        parameters: [
          {
            in: 'path',
            name: 'task_id',
            schema: {
              type: 'string',
            },
            required: true,
            description: 'The task ID',
          },
        ],
        responses: {
          200: {
            description: 'Success',
            schema: {
              properties: {
                timeTask: {
                  type: 'object',
                  example: {},
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
                  example: 'Timer not found!',
                },
              },
            },
          },
        },
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
        parameters: [
          {
            in: 'path',
            name: 'task_id',
            schema: {
              type: 'string',
            },
            required: true,
            description: 'The task ID',
          },
        ],
        responses: {
          200: {
            description: 'Success',
            schema: {
              properties: {
                message: {
                  type: 'string',
                  example: 'Timer deleted',
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
          404: {
            description: 'Error',
            schema: {
              properties: {
                message: {
                  type: 'string',
                  example: 'Timer not found!',
                },
              },
            },
          },
        },
      },
    },
    '/task/{task_id}/timer/{time_id}': {
      put: {
        tags: ['Task Time'],
        summary: 'Update timer of a task',
        description: 'Update timer of a task',
        security: [
          {
            Authentification: [],
          },
        ],
        parameters: [
          {
            in: 'path',
            name: 'task_id',
            schema: {
              type: 'string',
            },
            required: true,
            description: 'The task ID',
          },
          {
            in: 'path',
            name: 'time_id',
            schema: {
              type: 'string',
            },
            required: true,
            description: 'The time ID',
          },
          {
            in: 'body',
            name: 'body',
            required: true,
            schema: {
              required: ['start_date', 'end_date'],
              properties: {
                start_date: {
                  type: 'string',
                  example: '2022-12-27T15:44:54.004Z',
                },
                end_date: {
                  type: 'string',
                  example: '2022-12-27T16:44:54.004Z',
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
                  example: 'The timer has been modified correclty',
                },
                result: {
                  type: 'object',
                  properties: {},
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
                  example: 'Missing data',
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
                  example: 'Missing data',
                },
              },
            },
          },
        },
      },
    },
    // Admin
    '/admin/teams': {
      get: {
        tags: ['Administration'],
        summary: "Get a list with all Team's Object",
        description: "Get a list with all Team's Object",
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
                    example: '63aadb211811bfa0ca06be70',
                  },
                  name: {
                    type: 'string',
                    example: 'TimeYourTaskTeam',
                  },
                  projects: {
                    type: 'array',
                    example: [],
                  },
                  users: {
                    type: 'array',
                    example: [],
                  },
                  createdAt: {
                    type: 'date-time',
                    example: '2022-12-27T11:46:41.990Z',
                  },
                  updatedAt: {
                    type: 'date-time',
                    example: '2022-12-27T11:46:41.990Z',
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
          401: {
            description: 'Error',
            schema: {
              properties: {
                message: {
                  type: 'string',
                  example: 'Access denied!',
                },
              },
            },
          },
        },
      },
    },
    '/admin/projects': {
      get: {
        tags: ['Administration'],
        summary: 'Get every project where i am administrator',
        description: 'Get every project where i am administrator',
        security: [
          {
            Authentification: [],
          },
        ],
        responses: {
          200: {
            description: 'Success',
            schema: {
              properties: {
                data: {
                  type: 'object',
                  properties: {
                    _id: {
                      type: 'string',
                      example: '63ad84d7d008827135280989',
                    },
                    name: {
                      type: 'string',
                      example: 'Test un beau projet',
                    },
                    description: {
                      type: 'string',
                      example: 'Beautiful project',
                    },
                    users: { type: 'array', example: [] },
                    team: {
                      type: 'object',
                      properties: {
                        _id: {
                          type: '',
                          example: '63ad67d4a8b21296142ff048',
                        },
                        name: {
                          type: '',
                          example: 'KEKBody',
                        },
                        users: {
                          type: 'array',
                          example: [],
                        },
                        projects: {
                          type: 'array',
                          example: ['63ad84d7d008827135280989'],
                        },
                      },
                    },
                    createdAt: {
                      type: 'date-time',
                      example: '2022-12-29T12:15:19.041Z',
                    },
                    updatedAt: {
                      type: 'date-time',
                      example: '2022-12-29T12:15:19.041Z',
                    },
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
          401: {
            description: 'Error',
            schema: {
              properties: {
                message: {
                  type: 'string',
                  example: 'Access denied!',
                },
              },
            },
          },
        },
      },
    },
    '/admin/tasks': {
      get: {
        tags: ['Administration'],
        summary: "Get a list with all Task's informations",
        description: "Get a list with all Task's informations",
        security: [
          {
            Authentification: [],
          },
        ],
        responses: {
          200: {
            description: 'Success',
            schema: {
              properties: {
                tasks: {
                  type: 'array',
                  example: '[]',
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
          401: {
            description: 'Error',
            schema: {
              properties: {
                message: {
                  type: 'string',
                  example: 'Access denied!',
                },
              },
            },
          },
        },
      },
    },
    '/admin/timers': {
      get: {
        tags: ['Administration'],
        summary: 'Get timers',
        description: 'Get timers',
        security: [
          {
            Authentification: [],
          },
        ],
        responses: {
          200: {
            description: 'Success',
            schema: {
              properties: {
                TimeTasks: {
                  type: 'array',
                  example: '[]',
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
          401: {
            description: 'Error',
            schema: {
              properties: {
                message: {
                  type: 'string',
                  example: 'Access denied!',
                },
              },
            },
          },
        },
      },
    },
  },
};
