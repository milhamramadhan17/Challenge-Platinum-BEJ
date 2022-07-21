const cloudinary = require('../config/cloudinary.config');

const upload = async (file) => {
    const result = await cloudinary.uploader.upload(file, {
        type: 'image',
        use_filename: true,
        unique_filename: true,
        overwrite: true,
    });
    return result;

    console.log(result);
}

module.exports = upload;