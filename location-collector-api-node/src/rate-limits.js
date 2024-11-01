const rateLimit = require("express-rate-limit");

const _100per15minLimit = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  message: "Too many requests from this IP",
});

const _50per15minLimit = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 50,
  message: "Too many requests from this IP",
});

const _20per15minLimit = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  message: "Too many requests from this IP",
});

const _5per1minLimit = rateLimit({
  windowMs: 60 * 1000,
  max: 5,
  message: "Too many requests from this IP",
});

module.exports = {
  _100per15minLimit,
  _50per15minLimit,
  _20per15minLimit,
  _5per1minLimit,
};
