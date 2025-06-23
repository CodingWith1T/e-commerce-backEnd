const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../models/Users');

//registerUser 
const registerUser = async (req, res) => {

    const { userName, email, password } = req.body;

    try {
        const checkUser = await User.findOne({ email });

        if (checkUser) return res.json({ success: false, message: "User Already exists! Pls try again" })
        const hashPassword = await bcrypt.hash(password, 12);
        const newUser = new User({
            userName,
            email,
            password: hashPassword
        });

        await newUser.save();
        res.status(200).json({
            success: true,
            message: 'Registration successfully'
        });

    } catch (e) {
        console.log(e);
        res.status(500).json({
            success: false,
            message: "Some error occured",
        });
    }
}

// login
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            success: false,
            message: "Email and password are required",
        });
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "Email doesn't exist! Please register first",
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Incorrect password! Please try again",
            });
        }

        const token = jwt.sign(
            {
                id: user._id,
                role: user.role,
                email: user.email,
                username: user.userName,
            },
            process.env.CLIENT_SECRET_KEY, // Use .env for secret keys
            { expiresIn: '60m' }
        );

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // use HTTPS in production
            sameSite: 'Strict',
            maxAge: 60 * 60 * 1000, // 60 minutes
        });

        return res.status(200).json({
            success: true,
            message: 'Logged in successfully',
            user: {
                id: user._id,
                email: user.email,
                role: user.role,
                username: user.userName,
            },
        });
    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({
            success: false,
            message: 'An error occurred while logging in',
        });
    }
};



// logout
const userLogout = (req, res) => {
    res.clearCookie('token').json({
        httpOnly: true,
        success: true,
        message: "Logged Out Successfully! "
    })
}

const authMiddleware = async (req, res, next) => {
    const token = req.cookies?.token;

    if (!token) {
        return res.status(401).json({
            success: false,
            message: 'Unauthorized user!',
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.CLIENT_SECRET_KEY);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: 'Invalid or expired token!',
        });
    }
};

module.exports = { registerUser, loginUser, userLogout, authMiddleware };