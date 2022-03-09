const mime = require('mime-types');
const { v4: uuid } = require('uuid');
const s3 = require('../libs/s3');
const { PrismaClient } = require('@prisma/client');
const { media } = new PrismaClient();

// POST/api/user/media/upload
// PRIVATE
const mediaService = async (
  req,
  res,
  next,
  { mediable_type, filename, id: user_id }
) => {
  try {
    if (!mediable_type || !filename || !user_id) {
      res.status(404);
      return next({ message: 'Invalid parameters in media' });
    }
    const allowedMimes = [
      'image/png',
      'image/jpeg',
      'video/x-flv',
      'video/mp4',
      'application/x-mpegURL',
      'video/MP2T',
      'video/3gpp',
      'video/quicktime',
      'video/x-msvideo',
      'video/x-ms-wmv',
    ];
    const media_type = mime.lookup(filename);
    if (!allowedMimes.includes(media_type)) {
      res.status(404);
      return next({ message: 'Invalid type of media' });
    }

    const generatedFilename = `${uuid()}.${
      filename.split('.')[filename.split('.').length - 1]
    }`;
    const key = `${user_id}/${generatedFilename}`;

    const signedUrl = await s3.getSignedUrlPromise('putObject', {
      Bucket: process.env.BUCKET_NAME,
      Key: key,
      ContentType: media_type,
      Expires: 300,
    });
    if (!signedUrl) {
      res.status(404);
      return next({ message: 'Error in signedurl' });
    }

    const mediaD = await media.create({
      data: { media_type, path: key, authorId: user_id },
    });

    res.json({
      id: mediaD.id,
      signedUrl: signedUrl,
    });
  } catch (err) {
    res.status(404);
    return next({ message: 'Media upload failed', stack: err.message });
  }
};

module.exports = { mediaService };
