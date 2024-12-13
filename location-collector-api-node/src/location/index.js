const bcrypt = require("bcrypt");
const locationDb = require("../dbs/location-db");

const addLocationFromBoard = (req, res) => {
  const data = JSON.parse(req.body);
  const { id, pass, lat, lon, time, speed, vol } = data;

  locationDb
    .query(`SELECT * FROM public.boards WHERE id = $1`, [id])
    .then((result) => {
      const data = result.rows;
      if (data.length === 0) {
        throw new Error();
      } else {
        return bcrypt.compare(pass, data[0].password);
      }
    })
    .then((result) => {
      if (!result) {
        throw new Error();
      } else {
        return locationDb.query(
          `INSERT INTO public.location("boardId", "gpsLongitude", "gpsLatitude", "gpsTime", "speed", "voltage")
        VALUES ($1, $2, $3, $4, $5, $6)`,
          [id, lon, lat, time, speed, vol]
        );
      }
    })
    .then(() => {
      res.send("Location added");
    })
    .catch(() => {
      res.send("try again");
    });
};

const getLastKnownLocations = (req, res) => {
  const { boardId, lastNumber } = req.query;
  locationDb
    .query(
      `SELECT * FROM public.location WHERE "boardId" = $1 ORDER BY id DESC LIMIT $2`,
      [boardId, lastNumber]
    )
    .then((result) => {
      res.send(result.rows);
    })
    .catch(() => {
      res.send("try again");
    });
};

const getLocations = (req, res) => {
  const { boardId, startDate, endDate } = req.query;
  locationDb
    .query(
      `SELECT * FROM public.location WHERE "boardId" = $1 AND "servertime" >= $2 AND "servertime" < $3`,
      [boardId, startDate, endDate]
    )
    .then((result) => {
      res.send(result.rows);
    })
    .catch(() => {
      res.send("try again");
    });
};

module.exports = {
  addLocationFromBoard,
  getLocations,
  getLastKnownLocations,
};
