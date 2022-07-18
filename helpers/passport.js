const passport = require('passport');
const { Strategy, ExtractJwt } = require('passport-jwt');
const { Admins } = require('../models');

const validateToken = (payload, done) => {
    Admins.findByPk(payload.id)
        .then(admin => {
            if (admin) {
                return done(null, admin);
            }
            return done(null, false);
        })
        .catch(err => {
            return done(err, false);
        });
}

passport.use(new Strategy({
    jwtFromRequest: ExtractJwt.fromHeader('Authorization'),
    secretOrKey: 'password',
}, validateToken));

module.exports = passport;