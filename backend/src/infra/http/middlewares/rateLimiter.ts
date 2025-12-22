import rateLimit from "express-rate-limit";

export const verifyTokenLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 50,
  message: {
    success: false,
    error: {
      code: "TOO_MANY_REQUESTS",
      message: "Too many request. Please try again later.",
    },
  },
  standardHeaders: true,
  legacyHeaders: false,
});
