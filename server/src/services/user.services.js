const { PrismaClient } = require('@prisma/client');
const { user } = new PrismaClient();
const bcrypt = require('bcryptjs');
const generateToken = require('../utils/generateToken.js');

// POST/api/user/register
// PUBLIC
const userRegistationService = async (
  req,
  res,
  next,
  { email, password, name }
) => {
  try {
    if (!email || !password || !name) {
      return next({ message: 'Enter all input values...' });
    }
    const userExists = await user.findUnique({
      where: {
        email,
      },
      select: {
        email: true,
      },
    });

    if (userExists) {
      res.status(404);
      return next({ message: 'User already exists!' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await user.create({
      data: { email, name, password: hashedPassword },
    });

    res.json({
      message: 'success',
      token: generateToken({
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
      }),
    });
  } catch (err) {
    res.status(404);
    return next({ message: 'User registration failed!', stack: err.message });
  }
};

// POST/api/user/login
// PUBLIC
const userLoginService = async (req, res, next, { email, password }) => {
  try {
    if (!email) {
      res.status(404);
      return next({ message: 'Enter all input values...' });
    }

    const userInfo = await user.findUnique({
      where: {
        email,
      },
    });

    if (!userInfo) {
      res.status(404);
      return next({ message: 'User not found!' });
    }

    const encryptedPassword = await bcrypt.compare(password, userInfo.password); //true if the password match

    if (!encryptedPassword) {
      res.status(404);
      return next({ message: 'Password does not match!' });
    }

    res.json({
      message: 'success',
      token: generateToken({
        id: userInfo.id,
        name: userInfo.name,
        email: userInfo.email,
      }),
    });
  } catch (err) {
    res.status(406);
    return next({ message: 'User login failed!', stack: err.message });
  }
};

// GET/api/user/profile
// PRIVATE
const userProfileService = async (req, res, next, { name, email }) => {
  try {
    res.json({
      message: 'success',
      data: { name, email },
    });
  } catch (err) {
    res.status(406);
    return next({ message: 'Profile failed!', stack: err.message });
  }
};

// PUT/api/user/update
// PRIVATE
const updateProfileService = async (
  req,
  res,
  next,
  { name, email, password, tokenEmail }
) => {
  try {
    const userInfo = await user.findUnique({
      where: {
        email: tokenEmail,
      },
    });

    // BEST PERFORMANCE :)
    let newPass;
    if (password.length === 0) {
      newPass = userInfo.password;
    } else {
      let encryptedPassword = await bcrypt.compare(password, userInfo.password); //true if the password match

      if (encryptedPassword) {
        newPass = userInfo.password;
      } else {
        let salt = await bcrypt.genSalt(10);
        let hashedPassword = await bcrypt.hash(password, salt);
        newPass = hashedPassword;
      }
    }

    const updatedUser = await user.update({
      where: { id: userInfo.id },
      data: {
        name: name || userInfo.name,
        email: email || userInfo.email,
        password: newPass,
      },
    });

    res.json({
      message: 'success',
      token: generateToken({
        id: updatedUser.id,
        name: updatedUser.name,
        email: updatedUser.email,
      }),
    });
  } catch (err) {
    res.status(406);
    return next({ message: 'User profile update failed!', stack: err.message });
  }
};

module.exports = {
  userRegistationService,
  userLoginService,
  userProfileService,
  updateProfileService,
};
