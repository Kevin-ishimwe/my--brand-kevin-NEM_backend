const listmessages = {
  tags: ['messages'],
  description: 'all messages in dbs',
  parameters: [
    {
      name: 'Authorization',
      in: 'header',
      description: 'token',
      required: true,
        type: "string",
      example: 'Bearer 63bdbc1451a42f4d46319e77'}
  ],
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
                __v: 0,
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
  parameters: [
    {
      name: 'id',
      in: 'query',
      description: 'message id',
      type: 'string',
      example: '63bdbc1451a42f4d46319e77',
    },
  ],
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
  '/deletemessage/id': {
    delete: deletemessages,
  },
};

module.exports = messageRouterDoc;
