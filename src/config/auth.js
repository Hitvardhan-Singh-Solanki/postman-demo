export default {
  ensureAuthenticated: (req, res, next) => {
    if (req.isAuthenticated()) {
      return next();
    } else {
      res.sendStatus(401);
    }
  }
};
