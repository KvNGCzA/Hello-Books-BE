import responseMessage from './responseMessage';

export default (request, response, next, user) => {
  const { verified } = user;
  if (verified || request.originalUrl.slice(0, 19) === '/api/v1/auth/verify') {
    request.userData = user;
    return next();
  }
  responseMessage(response, 403, { message: 'please verify your account to perform this action' });
};
