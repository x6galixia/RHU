const LocalStrategy = require('passport-local').Strategy;
const { pool } = require("./models/databases/dbConfig");

const authenticateUser = (username, password, done) => {
  pool.query(
    `SELECT * FROM users WHERE username = $1`, [username], (err, results) => {
      if (err) {
        return done(err);
      }
      if (results.rows.length > 0) {
        const user = results.rows[0];

        if (password === user.password) { // Ideally, use bcrypt to compare hashed passwords
          return done(null, user);
        } else {
          return done(null, false, { message: "Password is incorrect" });
        }
      } else {
        return done(null, false, { message: "Username is not registered" });
      }
    }
  );
};

function initialize(passport) {
  passport.use(
    new LocalStrategy(
      {
        usernameField: "username",
        passwordField: "password"
      },
      authenticateUser
    )
  );

  passport.serializeUser((user, done) => done(null, user.id));

  passport.deserializeUser((id, done) => {
    pool.query(`SELECT * FROM users WHERE id = $1`, [id], (err, results) => {
      if (err) {
        return done(err);
      }
      return done(null, results.rows[0]);
    });
  });
}

module.exports = initialize;
