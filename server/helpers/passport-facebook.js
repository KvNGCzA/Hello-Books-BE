import bcrypt from 'bcryptjs';
import passport from 'passport';
import { Strategy as FacebookStrategy } from 'passport-facebook';
import models from '../database/models';

const { User } = models;

export default () => {
  passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: 'http://localhost:3001/api/v1/auth/facebook/callback',
    profileFields: ['id', 'first_name', 'last_name', 'photos', 'email']
  },
  async (accessToken, refreshToken, profile, cb) => {
    try {
      const users = await User.findOrCreate(
        {
          where: { facebookId: profile.id },
          defaults: {
            firstName: profile.name.givenName,
            lastName: profile.name.familyName,
            email: profile.emails[0].value,
            avatarUrl: profile.photos[0].value,
            password: bcrypt.hashSync(process.env.password || 'userpassword', 10),
            facebookId: profile.id
          }
        }
      );
      return cb(null, users);
    } catch (err) {
      return cb(err, null);
    }
  }));
};
