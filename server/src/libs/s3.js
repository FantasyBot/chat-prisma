const mime = require('mime-types');



// const S3 = require('aws-sdk/clients/s3');

// const s3 = new S3({
//   signatureVersion: 'v4',
//   region: 'eu-central-1',
// });

// s3.config.credentials = {
//   accessKeyId: process.env.BUCKET_ACCESS_KEY_ID,
//   secretAccessKey: process.env.BUCKET_SECRET_ACCESS_KEY,
// };

// module.exports = s3;



const aws = require('aws-sdk');
const crypto = require('crypto');
const { promisify } = require('util');
const randomBytes = promisify(crypto.randomBytes);

const s3 = new aws.S3({
  region: 'eu-central-1',
  accessKeyId: process.env.BUCKET_ACCESS_KEY_ID,
  secretAccessKey: process.env.BUCKET_SECRET_ACCESS_KEY,
  signatureVersion: 'v4',
});

async function generateUploadURL(mediable_type, filename) {
  try{
    const allowedMimes = [
            'image/png',
            'image/jpeg',
            'image/gif',
          ];

   const media_type = mime.lookup(filename);
   if (!allowedMimes.includes(media_type)) {
     // res.status(404);
    //  return next({ message: 'Invalid type of media' });
      console.log("Invalid type of media");
      throw new Error("Invalid type of media");
   }


    const rawBytes = await randomBytes(16);
    const imageName = rawBytes.toString('hex');
  
    const params = ({
      Bucket: "s3-bucket-chat",
      Key: imageName,
      Expires: 60
    })
  
    const uploadURL = await s3.getSignedUrlPromise('putObject', params);
    return uploadURL;

  } catch(err) {
    conosle.log(err);
  }
}

module.exports = { generateUploadURL }