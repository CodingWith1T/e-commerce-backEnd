const cloudinary = require('cloudinary').v2;
const multer = require('multer');

cloudinary.config({
    cloud_name : 'dxigpiz0l',
    api_key : '755483974166325',
    api_secret : '-ZD83rRKZbhfz9Rtcnj2kf5o6tI',
});

const stroage = new multer.memoryStorage();

async function imageUploadUtil(file) {
    const result = await cloudinary.uploader.upload(file,{
        resource_type : 'auto'
    })
    return result;
}

const upload = multer({stroage});

module.exports = {upload, imageUploadUtil};