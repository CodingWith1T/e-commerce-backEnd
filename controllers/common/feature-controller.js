const Feature = require('../../models/Feature')

const addFeaturesImage = async (req, res) => {
    try {
        const { image } = req.body;

        const featureImages = new Feature({
            image,
        })

        await featureImages.save();

        res.status(201).json({
            success: true,
            data: featureImages,
        })


    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "Some error occoured"
        })
    }
}

const getFeaturesImage = async (req, res) => {
    try {

        const images = await Feature.find({});

        res.status(200).json({
            success: true,
            data: images
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "Some error occoured"
        })
    }
}

module.exports = {
    addFeaturesImage,
    getFeaturesImage
}