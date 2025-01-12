const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
    let token = req.headers["authorization"];

    if (token) {
        token = token.split(" ")[1];
        jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
            if (err) {
                return res.status(400).json({ message: "Invalid token" });
            } else {
                console.log(decoded);
                req.user = decoded; // Attach the decoded token to the request object
                next(); // Move next() inside the jwt.verify callback
            }
        });
    } else {
        return res.status(400).json({ message: "Token missing" });
    }
};

module.exports = verifyToken;
