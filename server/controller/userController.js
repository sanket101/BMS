const userModel = require("../model/userModel");
const sendErrorResponse = require("../util/errorResponse");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        const user = await userModel.findOne({ email });
        if(!user) {
            sendErrorResponse(res, 404, { message: "User doesn't exists"});
            return;
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if(isPasswordCorrect) {
            const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, {
                expiresIn: "10d"
            });

            res.status(200).json({
                status: "success",
                message: "User logged in!",
                data: token,
            });
        }
        else {
            sendErrorResponse(res, 401, { message: "Incorrect Details"});
            return;
        }
    }
    catch(err) {
        sendErrorResponse(res, 500, { message: err.message });
        return;
    }
};

const register = async (req, res) => {
    try {
        const userExists = await userModel.find({ email: req.body.email });
        if(userExists?.length > 0) {
            sendErrorResponse(res, 400, { message: "User already exists"});
            return;
        }
        const { name, email, password, role } = req.body;
        const saltRounds = 10;
        const hash = await bcrypt.hash(password, saltRounds);
        const user = new userModel({ name, email, password: hash, role });
        await user.save();
        res.status(201).json({status: "success", message: "User saved successfully"});
        return;
    }
    catch(err) {
        sendErrorResponse(res, 500, { message: err.message });
        return;
    }
};

const getCurrentUser = async (req, res) => {
    try {
        const user = await userModel.findById(req.body.userId).select("-password");
        console.log("D2", req.body.userId, user);
        return res.status(200).send({
            success: true,
            data: user,
            message: "You are authorized person to go on protected route!",
        });
    } catch (err) {
        sendErrorResponse(res, 500, { message: err.message });
        return;
    }
}

module.exports = { login, register, getCurrentUser };