const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API,
  api_secret: process.env.CLOUDINARY_SECRET,
  secure: true,
});

export const uploadImageToCloudinary = async (path ,Image) => {
   const ImageResponse = await cloudinary.uploader.upload(
    Image,
    { folder: path },
    (error, result) => {
      return result;
    }
  );

   return ImageResponse;
};
