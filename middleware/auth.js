import createError from "http-errors";
import accessToken from "./../utils/jwt.js";

const auth = async (req, res, next) => {
  if (!req.headers.authorization) {
    console.log(req.headers.authorization);
    return next(createError.Unauthorized("Access token is required"));
  }

  const token = req.headers.authorization.split(" ")[1];

  //   console.log(token);

  if (!token) {
    return createError.Unauthorized();
  }

  await accessToken
    .verifyAccessToken(token)
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => {
      next(createError.Unauthorized(err.message));
    });
};

export default auth;
