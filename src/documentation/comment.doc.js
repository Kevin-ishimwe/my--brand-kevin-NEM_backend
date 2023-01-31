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
const getcomments = {
  tags: ['comment'],
  description: 'get comments from dbs',
  parameters: [token],
  responses: {
    200: {
      description: 'OK',
      content: {
        'application/json': {
          schema: {
            type: 'object ',
            example: [
              {
                _id: '63c791b675426914a79d53e9',
                blog: '63c521ec11358f7d533de44f',
                name: 'kevzy',
                comment: 'your 2nd comment,mongose function',
                date: '2023-01-18T06:28:12.000Z',
                __v: 0,
              },
            ],
          },
        },
      },
    },
  },
};

const addcomment = {
  tags: ['comment'],
  description: 'add comment into dbs',
  parameters: [idParams],
  requestBody: {
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            name: { type: 'string', description: 'name', example: 'dieudonne' },
            comment: {
              type: 'string',
              description: 'content',
              example: 'comment route documenation',
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
            example: { message: 'comment added', status: 'sucess' },
          },
        },
      },
    },
  },
};

const deletecomment = {
  tags: ['comment'],
  description: 'delet comment from dbs',
  parameters: [idParams, token],
  responses: {
    200: {
      description: 'OK',
      content: {
        'application/json': {
          schema: {
            type: 'object ',
            example: { message: 'comment deleted' },
          },
        },
      },
    },
  },
};

const commentRouterDoc = {
  '/addcomment/{id}': {
    post: addcomment,
  },
  '/deletecomment/{id}': {
    delete: deletecomment,
  },
  '/getcomments': {
    get: getcomments,
  },
};
export default commentRouterDoc;
