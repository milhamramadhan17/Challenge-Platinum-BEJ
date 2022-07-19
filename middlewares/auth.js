const { decode } = require('../helpers/jwt');

module.exports = {
    authentication: (req, res, next) => {
        if (!req.headers.authorization) {
            return res.status(401).json({
                status: 401,
                message: 'No token provided.'
            });
        }

        try {
            req.admin = decode(req.headers.authorization);

        } catch (err) {
            return res.status(401).json({
                status: 401,
                message: 'Invalid token'
            });
        }

        next();
},
    authorization: {
        admin: (req, res, next) => {
            if (req.admin.role === 1 ) next ();

            return res.status(401).json({
                status: 401,
                message: 'Unauthorized' + req.admin.role
            });
        }
    },
        seller: (req, res, next) => {
            if (req.seller.role === 2 ) next ();

            return res.status(401).json({
            status: 401,
            message: "Unauthorized. You aren't logged in as seller."
            });
        }
    }

