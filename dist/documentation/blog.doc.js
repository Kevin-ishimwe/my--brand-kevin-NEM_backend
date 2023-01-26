"use strict";

const listblogss = {
  tags: ['blogs'],
  description: 'all blogs in dbs',
  responses: {
    200: {
      description: 'OK',
      content: {
        'application/json': {
          schema: {
            type: 'Array ',
            example: [{
              _id: '63c7923e75426914a79d53f7',
              blogTitle: 'its a new one',
              blogDescription: 'adding blog after implementing es6 and tokens and commenting has been implemented',
              blogImg: 'http://res.cloudinary.com/dcsgmqseu/image/upload/v1674023485/qkukttwyo4y1n6vnigwm.jpg',
              blogContent: '2nd blog',
              blogImgId: 'qkukttwyo4y1n6vnigwm',
              comments: [],
              __v: 0
            }]
          }
        }
      }
    }
  }
};
const singleblog = {
  tags: ['blogs'],
  description: 'read single blogs from dbs',
  parameters: [{
    name: 'id',
    in: 'path',
    description: 'blog id',
    required: true,
    type: 'string',
    example: '63bdbc1451a42f4d46319e77'
  }],
  responses: {
    200: {
      description: 'OK',
      content: {
        'application/json': {
          schema: {
            type: 'object ',
            example: {
              _id: '63c92298ad493378dc71153f',
              blogTitle: 'why we need to eat desert ',
              blogDescription: 'what is a desert,which treats make a good desrt ',
              blogImg: 'http://res.cloudinary.com/dcsgmqseu/image/upload/v1674125976/gyxgby1ezwhuglvwyiny.jpg',
              blogContent: 'hey balbel to es6 route test',
              blogImgId: 'gyxgby1ezwhuglvwyiny',
              comments: [{
                _id: '63ca24fc7cfa30c82f6f0565',
                blog: '63c92298ad493378dc71153f',
                name: 'dieudonne',
                comment: 'testing comment docs zoom',
                date: '2023-01-20T05:19:09.000Z',
                __v: 0
              }],
              __v: 0
            }
          }
        }
      }
    }
  }
};
const addblog = {
  tags: ['blogs'],
  description: 'all blogs in dbs',
  parameters: [{
    in: 'header',
    name: 'token',
    description: 'token',
    type: 'apiKey',
    required: true,
    example: 'Bearer '
  }],
  requestBody: {
    content: {
      'multipart/form-data': {
        schema: {
          type: 'object',
          properties: {
            blogTitle: {
              type: 'string',
              description: 'title',
              example: 'why we need to eat desert '
            },
            blogDescription: {
              type: 'string',
              description: 'description',
              example: 'what is a desert,which treats make a good desrt '
            },
            blogContent: {
              type: 'string',
              description: 'content',
              example: 'hey balbel to es6 route test'
            },
            blogImg: {
              type: 'string',
              format: 'binary',
              description: 'cover image',
              example: `base64 encoded image data`
            }
          }
        }
      }
    }
  },
  responses: {
    200: {
      description: 'OK',
      content: {
        'application/json': {
          schema: {
            type: 'object ',
            example: {
              message: 'blog added',
              status: 'success'
            }
          }
        }
      }
    }
  }
};
const deleteblog = {
  tags: ['blogs'],
  description: 'delete blog from dbs',
  parameters: [{
    name: 'id',
    in: 'path',
    description: 'blog id',
    required: true,
    type: 'string',
    example: '63bdbc1451a42f4d46319e77'
  }, {
    in: 'header',
    name: 'token',
    description: 'token',
    type: 'string',
    required: true,
    example: 'Bearer token'
  }],
  responses: {
    200: {
      description: 'OK',
      content: {
        'application/json': {
          schema: {
            type: 'object ',
            example: {
              message: ` blog has been deleted`,
              status: 'sucess'
            }
          }
        }
      }
    }
  }
};
const updateblog = {
  tags: ['blogs'],
  description: 'update this blog in dbs',
  parameters: [{
    name: 'id',
    in: 'path',
    description: 'blog id',
    required: true,
    type: 'string',
    example: '63bdbc1451a42f4d46319e77'
  }, {
    in: 'header',
    name: 'token',
    description: 'token',
    type: 'string',
    required: true,
    example: 'Bearer token'
  }],
  requestBody: {
    content: {
      'multipart/form-data': {
        schema: {
          type: 'object',
          properties: {
            blogTitle: {
              type: 'string',
              description: 'title',
              example: 'why we need to eat desert '
            },
            blogDescription: {
              type: 'string',
              description: 'description',
              example: 'what is a desert,which treats make a good desrt '
            },
            blogContent: {
              type: 'string',
              description: 'content',
              example: 'hey balbel to es6 route test'
            },
            blogImg: {
              type: 'file',
              format: 'binary',
              description: 'cover image',
              example: `base64 encoded image data`
            }
          }
        }
      }
    }
  },
  responses: {
    200: {
      description: 'OK',
      content: {
        'application/json': {
          schema: {
            type: 'object ',
            example: {
              message: ` blog has been updated`,
              status: 'sucess'
            }
          }
        }
      }
    }
  }
};
const blogRouterDoc = {
  '/getblogs': {
    get: listblogss
  },
  "/singleblog/{id}": {
    get: singleblog
  },
  '/addblog': {
    post: addblog
  },
  '/deleteblog/{id}': {
    delete: deleteblog
  },
  '/updateblog/{id}': {
    put: updateblog
  }
};
module.exports = blogRouterDoc;