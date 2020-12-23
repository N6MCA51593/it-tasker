module.exports = (req, res, next) => {
  // const token = req.cookies.token || null;
  // if (!token) {
  //   return res.status(401).json({ msg: 'Token not provided' });
  // }

  // try {
  //   const decoded = jwt.verify(token, jwtSecret);
  //   req.user = decoded.user;
  //   next();
  // } catch (err) {
  //   res.clearCookie('token');
  //   res.status(401).json({ msg: 'Token is not valid' });
  // }
  // console.log(req.session.user);
  // console.log(req.session.id);
  next();
};
