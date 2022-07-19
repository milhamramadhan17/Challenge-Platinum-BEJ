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

        if (!req.headers.authorization) {
            return res.status(401).json({
              status: 401,
              message: 'Unauthorized. Only logged in customer can access this endpoint.'
            })
          }
      
          try {
            req.customer = decode(req.headers.authorization);
          } catch (err) {
            return res.status(401).json({
              status: 400,
              message: 'Token invalid'
            })
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
        },
        seller: (req, res, next) => {
            if (req.user.role === 2) next();
      
            return res.status(401).json({
              status: 401,
              message: 'Unauthorized. Only seller can access this endpoint.'
            })
          },
          customer: (req, res, next) => {
            if (req.user.role === 2) next();
      
            return res.status(401).json({
              status: 401,
              message: 'Unauthorized. Only customer can access this endpoint.'
            })
          },
        }
        }
