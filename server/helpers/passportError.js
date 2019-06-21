export default (error, req, res, next) => {
  if (!error) next();
  res.status(400).json({ success: 'false', message: 'Auth failed' });
};
