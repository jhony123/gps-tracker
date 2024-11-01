const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const locationDb = require("../dbs/location-db");

const loginUser = (req, res) => {
  const { username, password } = req.body;
  locationDb
    .query(`SELECT * FROM public.users WHERE name = $1`, [username])
    .then((result) => {
      const data = result.rows;
      if (data.length === 0) {
        throw new Error();
      } else {
        return bcrypt.compare(password, data[0].password);
      }
    })
    .then((result) => {
      if (!result) {
        throw new Error();
      } else {
        return new Promise((resolve, reject) => {
          jwt.sign(
            { username },
            process.env.JWT_PRIVATE_KEY,
            { expiresIn: "1h" },
            function (err, token) {
              if (err) {
                reject(err);
              }
              resolve(token);
            }
          );
        });
      }
    })
    .then((result) => {
      res.send({ token: result });
    })
    .catch(() => {
      res.status(403).send("try again");
    });
};

const verifyUser = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) {
    return res.status(403).send("try again");
  }
  jwt.verify(token, process.env.JWT_PRIVATE_KEY, function (err, decoded) {
    if (err) {
      return res.status(403).send("try again");
    }
    next();
  });
};

module.exports = {
  loginUser,
  verifyUser,
};
