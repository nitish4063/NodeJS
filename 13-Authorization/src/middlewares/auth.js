const { getUser } = require("../service/auth");

const checkForAuthentication = (req, res, next) => {
  const tokenCookie = req.cookies?.token;
  req.user = null;
  if (!tokenCookie) return next();

  const token = tokenCookie;
  const user = getUser(token);

  req.user = user;
  return next();
};

// roles is an array, ['admin', 'normal_user']
const restrictTo = (roles = []) => {
  return function (req, res, next) {
    if (!req.user) return res.redirect("/login");

    if (!roles.includes(req.user.role)) return res.end("unAuthorized");

    return next();
  };
};

/*
const restrictToLoggedInUserOnly = async (req, res, next) => {
  console.log(req.cookies);
  const userUid = req.cookies?.uid;

  if (!userUid) return res.redirect("/login");

  const user = getUser(userUid);
  if (!user) return res.redirect("/login");

  console.log("user", user);

  req.user = user;
  next();
};

const checkAuth = async (req, res, next) => {
  const userUid = req.cookies?.uid;

  const user = getUser(userUid);

  req.user = user;
  next();
};
*/

module.exports = {
  checkForAuthentication,
  restrictTo,
};
