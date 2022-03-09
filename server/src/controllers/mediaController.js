const { mediaService } = require('../services/media.services.js');

const registerMedia = async (req, res, next) => {
  const { mediable_type, filename } = req.body;
  const { id } = req.user;

  mediaService(req, res, next, {
    mediable_type,
    filename,
    id,
  });
};

module.exports = {
  registerMedia,
};
