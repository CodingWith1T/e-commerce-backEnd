const { imageUploadUtil } = require("../../helper/cloudinary");
const Product = require("../../models/Product");

const handleImageUpload = async (req, res) => {
    try {
        const b64 = Buffer.from(req.file.buffer).toString('base64');
        const url = "data:" + req.file.mimetype + ";base64," + b64;
        const result = await imageUploadUtil(url);
        res.json({
            success: true,
            result,
        })

    } catch (error) {
        console.log(error)
        res.json({
            success: false,
            message: "Error occured",
        })
    }
}

// add new product
const addProduct = async (req, res) => {
    try {
        const { image, title, description, category, brand, price, salePrice, totalStock } = req.body;
        const newlyCreatedProduct = new Product({
            image,
            title,
            description,
            category,
            brand,
            price,
            salePrice,
            totalStock
        })
        await newlyCreatedProduct.save();
        res.status(201).json({
            success: true,
            data: newlyCreatedProduct,
            message: "Product save successfully",
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error occured",
        })
    }
}

// fetch all Product
const fetchProduct = async (req, res) => {
    try {
        const listOfProduct = await Product.find({});
        res.status(201).json({
            success: true,
            data: listOfProduct,
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error occured",
        })
    }
}

const fetchProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const productByID = await Product.findById(id);

        if (!productByID) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }

        res.status(200).json({
            success: true,
            data: productByID,
        });
    } catch (error) {
        console.error("Fetch Product Error:", error);
        res.status(500).json({
            success: false,
            message: "An error occurred while fetching the product.",
        });
    }
};

// edit product
const editProduct = async (req, res) => {
    try {
        const { id } = req.params;

        const {
            image,
            title,
            description,
            category,
            brand,
            price,
            salePrice,
            totalStock,
        } = req.body;

        let findProduct = await Product.findById(id);

        if (!findProduct) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }

        // Update only if values are provided
 
        findProduct.title = title || findProduct.title;
        findProduct.description = description || findProduct.description;
        findProduct.category = category || findProduct.category;
        findProduct.brand = brand || findProduct.brand;
        findProduct.price = price === '' ? 0 : price || findProduct.price;
        findProduct.salePrice = salePrice === '' ? 0 : salePrice || findProduct.salePrice;
        findProduct.totalStock = totalStock || findProduct.totalStock;
        findProduct.image = image || findProduct.image;

        await findProduct.save();

        res.status(200).json({
            success: true,
            data: findProduct,
        });
    } catch (error) {
        console.error("Edit Product Error:", error);
        res.status(500).json({
            success: false,
            message: "An error occurred while updating the product.",
        });
    }
};


// delete product
const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;

        const product = await Product.findByIdAndDelete(id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Product deleted successfully",
        });
    } catch (error) {
        console.error("Delete Product Error:", error);
        res.status(500).json({
            success: false,
            message: "An error occurred while deleting the product.",
        });
    }
};


module.exports = { handleImageUpload, addProduct, fetchProduct, fetchProductById, editProduct, deleteProduct }