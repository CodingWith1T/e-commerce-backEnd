const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require('cookie-parser');
const cors = require("cors");
const authRouter = require("./routes/auth/auth-route");
const adminProductsRouter = require('./routes/admin/products-routes')
const shopProductsRouter = require('./routes/shop/products-route')
const shopCartRouter = require('./routes/shop/cart-routes')
const shopAddressRouter = require('./routes/shop/address-routes')
const shopSearchRouter = require('./routes/shop/search-route')
const commonFeatureRoutes = require('./routes/common/features-routes')
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// create a database connection
mongoose
    .connect(
        'mongodb+srv://abhishekraghavsrmca2224:abhishekraghavsrmca2002@e-commerce.4wemd5t.mongodb.net/'
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
    optionSuccessStatus: 200
}));

app.use(express.json());
app.use(cookieParser());
app.use('/api/auth', authRouter);
app.use('/api/admin/products', adminProductsRouter);
app.use('/api/shop/products', shopProductsRouter);
app.use('/api/shop/cart', shopCartRouter);
app.use('/api/shop/address', shopAddressRouter);
app.use('/api/shop/search', shopSearchRouter);

app.use('/api/common/feature', commonFeatureRoutes);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))


