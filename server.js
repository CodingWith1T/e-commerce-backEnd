const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const authRouter = require("./routes/auth/auth-route");
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// create a database connection
mongoose
    .connect(
        `mongodb+srv://${process.env.USERDB}:${process.env.PASSWORDDB}@e-commerce.4wemd5t.mongodb.net/`
    )
    .then(() => console.log("MongoDB Connected"))
    .catch((error) => console.log(error));

app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "DELETE", "PUT"],
    allowedHeaders: [
        "Content-Type",
        "Authorization",
        "Cache-Control",
        "Expires",
        "Pragma",
    ],
    credentials: true,
    optionSuccessStatus:200
}));

app.use(cookieParser());
app.use(express.json());
app.use('/api/auth', authRouter);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))


