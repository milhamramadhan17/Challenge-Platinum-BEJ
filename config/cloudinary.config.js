const cloudinary = require('cloudinary').v2

cloudinary.config({ 
    cloud_name: 'bej-binar', 
    api_key: '714783943216247', 
    api_secret: 'F2RpbcZ4mWW8eqT5Nu0B2smpTTg' 
  });

  module.exports = cloudinary;
