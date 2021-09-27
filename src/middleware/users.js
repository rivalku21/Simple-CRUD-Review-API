const jwt = require('jsonwebtoken');
const response = require('../utils/response');

module.exports = {
    isLoggedIn: (req, res, next) => {
        try {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(
            token,
            process.env.TOKEN_SECRET
        );
        req.userData = decoded;
        next();
        } catch (err) {
        return res.status(401).send({
            msg: 'Your session is not valid!'
        });
        }
    }
};