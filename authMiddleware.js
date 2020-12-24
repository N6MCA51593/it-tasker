module.exports = (req, res, next) => {
  try {
    if (!req.session.user) {
      req.session.destroy(error => {
        if (error) throw error;
        res.clearCookie(process.env.SESSION_NAME);
        return res.status(401).json({ msg: 'Not authorized' });
      });
    } else {
      req.userId = req.session.user.id;
      next();
    }
  } catch (error) {
    console.log(error);
    return res.status(401).json({ msg: 'Not authorized' });
  }
};
