const jwt = require('jsonwebtoken');


module.exports = function(req, res, next) {
    const token = res.header('auth-token');
    if (!token) return res.status(401).send('Access denied');

    try {
        const verified = jwt.verify(token, SECRET_TOKEN);
        req.user = verified;
        next();

    } catch (err) {
        res.status(401).send('Invalid token');

    }

};