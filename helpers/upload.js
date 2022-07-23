const cloudinary = require('../config/cloudinary.config');
const fs = require('fs');

async function upload(file, options = { }){
    try {
        const result = await cloudinary.uploader.upload(file, {
            use_filename: true,
            unique_filename: true,
            overwrite: true,
            ...options
        });
        fs.unlinkSync(file);

        return result.url;
    } catch (err) {
        throw err;
    }
}

module.exports = {upload};