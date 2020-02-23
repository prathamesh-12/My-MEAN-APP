const jwt = require('jsonwebtoken');

const checkAuth = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]; // "Bearer lkdlskd36834kh"
        jwt.verify(token, 'aa_11_bb_22_cc_33_abc_123_xyz_678_hello_secret');
        next();
    } catch (error) {
        res.status(401).json({
            message: 'User Not Authorized!'
        });
    }
}

module.exports = checkAuth;