const {
  userRegistationService,
  userLoginService,
  userProfileService,
  updateProfileService,
} = require('../services/user.services.js');
const catchAsync = require('../utils/catchAsync.js');

const registerUser = async (req, res, next) => {
  const { email, password, name } = req.body;

  userRegistationService(req, res, next, { email, password, name });
};

const loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  userLoginService(req, res, next, { email, password });
};

const userProfile = async (req, res, next) => {
  const { name, email } = req.user;

  userProfileService(req, res, next, { name, email });
};

const profileUpdate = async (req, res, next) => {
  const { email: tokenEmail } = req.user;
  const { name, email, password } = req.body;

  updateProfileService(req, res, next, { name, email, password, tokenEmail });
};

module.exports = { registerUser, loginUser, userProfile, profileUpdate };
