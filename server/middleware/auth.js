const jwt = require("jsonwebtoken");
const sendErrorResponse = require("../util/errorResponse");

const checkAuth = (req, res, next) => {
    try {
        console.log("E", req.body);
        const authHeader = req.headers.authorization;
        const token = authHeader?.split(" ")[1];

        const verified_token = jwt.verify(token, process.env.JWT_SECRET_KEY);

        req.body.userId = verified_token.userId;
        console.log("D1", verified_token.userId, req.body.userId);
        next();
    }
    catch(err) {
        sendErrorResponse(res, 401, err);
    }
};

module.exports = checkAuth;