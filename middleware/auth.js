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
            req.Admins = decode(req.headers.authorization);

        } catch (err) {
            return res.status(401).json({
                status: 401,
                message: 'Invalid token'
            });
        }

        next();
},
    authorization: {
        Admins: (req, res, next) => {
            if (req.Admins.role === 1 ) next ();

            return res.status(401).json({
                status: 401,
                message: 'Unauthorized' + req.Admins.role
            });
        }
    }
}