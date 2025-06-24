const Product = require('../../models/Product')

const searchProducts = async (req, res) => {
    try {
        const { keyword } = req.params;

        if (!keyword || typeof keyword !== 'string') {
            res.status(400).json({
                success: false,
                message: "Keyword is required must be in string form"
            })
        }

        const regEx = new RegExp(keyword, 'i')

        const createSearchQuery = {
            $or: [
                { title: regEx },
                { descriptio: regEx },
                { category: regEx },
                { brand: regEx },
            ]
        }

        const searchReasults = await Product.find(createSearchQuery);
        
        res.status(200).json({
            success: true,
            data: searchReasults
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "Error"
        })
    }
}

module.exports = { searchProducts }