const cloudinary = require('../config/cloudinary.config')

const upload = async (file, options) => {
    try {
        const result = await cloudinary.uploader.upload(file, {
            use_filename: true,
            unique_filename: true,
            overwrite: true,
            ...options
        });

        return result.url;
    } catch (err) {
        throw err;
    }
}

module.exports = upload;