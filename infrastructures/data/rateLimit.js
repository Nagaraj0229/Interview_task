const rateLimit = require("express-rate-limit");

const addTodoLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: {
    status: 429,
    error: "Too many requests, please try again later.",
  },
});

module.exports = addTodoLimiter;
