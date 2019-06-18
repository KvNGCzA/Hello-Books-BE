import responseMessage from './responseMessage';

export default (request, response, next) => {
  const { body } = request;
  if (Object.keys(body).length === 0) {
    responseMessage(response, 400, { message: 'empty request body' });
  } else {
    next();
  }
};
