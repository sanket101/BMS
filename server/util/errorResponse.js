const errorCodes = {
    "400": "BAD_REQUEST",
    "401": "UNAUTHORISED",
    "404": "RESOURCE_NOT_FOUND"
};

const sendErrorResponse = (res, status, err) => {
    const errorObject = {
        status: "error",
        "error": {
            "code": errorCodes[status.toString()],
            "message": err.message,
            // "details": "The user with the ID '12345' does not exist in our records.",
            // "timestamp": "2023-12-08T12:30:45Z",
            // "path": "/api/v1/users/12345",
            // "suggestion": "Please check if the user ID is correct or refer to our documentation at https://api.example.com/docs/errors#RESOURCE_NOT_FOUND for more information."
        },
    };

    return res.status(status).json(errorObject);
};

module.exports = sendErrorResponse;