const { getUser } = require("../service/auth");

async function restrictToLoggedUserOnly(req, res, next) {
  const userUid = req.cookies && req.cookies.uid;
  if (!userUid) return res.status(400).json("Masla");
  const user = getUser(userUid);
  if (!user) return res.status(400).json("Masla");
  req.user = user;
  next();
}

async function checkAuth(req, res, next) {
  const userUid = req.cookies && req.cookies.uid;
  const user = getUser(userUid);
  req.user = user;
  next();
}

module.exports = { restrictToLoggedUserOnly, checkAuth };
