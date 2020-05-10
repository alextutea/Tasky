const jwt = require('jsonwebtoken');

const jwtSignature = process.env.JWT_SIGN || "124aww12423ad24124awdrtaeNADAIUASNFI@$h1247asd"

// Middleware for private routes
const jwtVerify = (req, res, next) => {
    console.log("Checking authorization token...");
    const token = req.header('authorization');
    if (!token) {
        console.log("No authorization token provided in the header. Access deined.")
        return res.status(401).send('Access Denied');
    }

    // Check if valid token
    try {
        const verified = jwt.verify(token, jwtSignature);
        req.body.authUser = verified;
        console.log('Successfully authorized token!');
        next();
    } catch(err) {
        console.log('Invalid token.');
        res.status(400).send('Invalid Token');
    }
};

module.exports = {jwtSignature, jwtVerify}