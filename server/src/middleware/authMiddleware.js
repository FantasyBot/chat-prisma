const { PrismaClient } = require('@prisma/client');
const { user } = new PrismaClient();
const jwt = require('jsonwebtoken');

const protect = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      //Check if the user exists in DB
      const userInfo = await user.findUnique({
        where: {
          email: decoded.email,
        },
      });
      if (!userInfo) {
        res.status(404);
        return next({ message: 'User not found, Auth.' });
      }

      req.user = userInfo;
      return next();
    } catch (err) {
      res.status(401);
      return next({
        msg: 'Not authorized, token failed',
        stk: err.message,
      });
    }
  }
  if (!token) {
    res.status(401);
    return next({
      msg: 'Not authorized, no token',
    });
  }
};

module.exports = { protect };
