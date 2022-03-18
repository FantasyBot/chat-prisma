const { imageService, saveImageService } = require('../services/media.services.js');

// const registerMedia = async (req, res, next) => {
//   const { mediable_type, filename } = req.body;
//   const { id } = req.user;

//   mediaService(req, res, next, {
//     mediable_type,
//     filename,
//     id,
//   });
// };

const registerImage = async (req, res, next) => {
  const { mediable_type, filename } = req.body;
  const { id } = req.user;

  imageService(req, res, next, {
    mediable_type,
    filename,
    id,
  });
};

const saveImage = async (req, res, next) => {
  const { image_url } = req.body;
  const { id } = req.user;

  saveImageService(req, res, next, {
    image_url,
    id,
  });
};

module.exports = {
  // registerMedia,
  registerImage,
  saveImage,
};
