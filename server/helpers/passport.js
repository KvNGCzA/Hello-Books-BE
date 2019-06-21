import passport from 'passport';
import facebookPassport from './passport-facebook';

export default (app) => {
  app.use(passport.initialize());
  app.use(passport.session());
  passport.serializeUser((user, cb) => {
    cb(null, user);
  });

  passport.deserializeUser((obj, cb) => {
    cb(null, obj);
  });

  facebookPassport();
};
