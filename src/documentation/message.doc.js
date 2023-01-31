const idParams = {
  name: 'id',
  in: 'path',
  description: 'blog id',
  required: true,
  type: 'string',
  example: '63bdbc1451a42f4d46319e77',
};
const token = {
  in: 'header',
  name: 'token',
  description: 'token',
  type: 'string',
  required: true,
  example: 'Bearer token',
};

const listmessages = {
  tags: ['messages'],
  description: 'all messages in dbs',
  parameters: [token],
  responses: {
    200: {
      description: 'OK',
      content: {
        'application/json': {
          schema: {
            type: 'Array ',
            example: [
              {
                _id: '63bdbf7fe4c0a201f8f8e0ec',
                name: 'test',
                email: 'test@gmail.com',
                content: 'my db trial',
              },
            ],
          },
        },
      },
    },
  },
};

const addmessages = {
  tags: ['messages'],
  description: 'add message to dbs',
  requestBody: {
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            name: { type: 'string', description: 'name', example: 'kelly' },
            email: {
              type: 'string',
              description: 'email',
              example: 'kake@gmail.com',
            },
            content: {
              type: 'string',
              description: 'content',
              example: 'hey balbel to es6 route test',
            },
          },
        },
      },
    },
  },
  responses: {
    200: {
      description: 'OK',
      content: {
        'application/json': {
          schema: {
            type: 'object ',
            example: {
              message: 'message sent',
              status: 'success',
            },
          },
        },
      },
    },
  },
};

const deletemessages = {
  tags: ['messages'],
  description: 'delete message from dbs',
  parameters: [idParams, token],
  responses: {
    200: {
      description: 'OK',
      content: {
        'application/json': {
          schema: {
            type: 'object ',
            example: {
              message: ` message has been deleted`,
              status: 'sucess',
            },
          },
        },
      },
    },
  },
};

const messageRouterDoc = {
  '/getmessages': {
    get: listmessages,
  },
  '/addmessages': {
    post: addmessages,
  },
  '/deletemessage/{id}': {
    delete: deletemessages,
  },
};

export default messageRouterDoc;
