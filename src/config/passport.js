
const passport = require(passport);

function passportConfig(app) {
    app.use(passport.initialize());
    app.use(passport.session());
    //Stores user in session
    passport.serializeUser((user,done) => {
        done(null,user);
    });

    //Retrieves user in session
    passport.deserializeUser((user,done) => {
        done(null,user);
    });
    require('./strategies/local.strategy');
}

module.exports = passportConfig;