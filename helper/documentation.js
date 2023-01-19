import messageRouterDoc from './message.doc';

const swaggerDocumentation = {
  openapi: '3.0.3',
  info: {
    title: 'my brand-kevin API 3.0',
    description:
      "this is an API for my portfolio website, You can now help me improve the API whether it's by making changes to the  definition itself or to the code.That way, with time,`I can improve the API in general,`  and expose some of the new features u can also checkout my website at [https://kevin-ishimwe.github.io/my-brand-Kevin/]",
    contact: {
      name: 'kevin',
      email: 'ishimwekevin45@gmail.com',
    },
  },
  tags: [
    {
      name: 'messages',
      description: 'message routes ',
    },
  ],
  paths: {
    ...messageRouterDoc,
  },
};
export default swaggerDocumentation;
