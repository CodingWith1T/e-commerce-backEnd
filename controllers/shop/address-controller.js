const Address = require("../../models/Address");

const addAddress = async (req, res) => {
    try {
        const { userId, address, city, pincode, phone, notes } = req.body;

        if (!userId || !address || !city || !pincode || !phone || !notes) {
            return res.status(400).json({
                success: false,
                message: 'Invalid data provided. All fields are required.'
            });
        }

        const newlyCreatedAddress = new Address({
            userId,
            address,
            city,
            pincode,
            phone,
            notes
        });

        await newlyCreatedAddress.save();

        return res.status(201).json({
            success: true,
            data: newlyCreatedAddress
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: 'Server error while adding address'
        });
    }
};


const fetchAddress = async (req, res) => {

    try {
        const { userId } = req.params;

        if (!userId) {
            return res.status(400).json({
                success: false,
                message: 'User ID is required'
            });
        }

        const addressList = await Address.find({ userId });

        if (!addressList || addressList.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'No data found *'
            });
        }

        return res.status(200).json({
            success: true,
            data: addressList
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};

const editAddress = async (req, res) => {
    try {

        const { userId, addressId } = req.params;

        const formData = req.body;

        if (!userId || !addressId) {
            res.status(400).json({
                success: false,
                message: 'User id and address id is required'
            });
        }

        const address = await Address.findOneAndUpdate({
            _id: addressId,
            userId
        }, formData, { new: true })

        if (!address) {
            res.status(404).json({
                success: false,
                message: 'Address not found'
            });
        }

        res.status(200).json({
            success: false,
            data: address
        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Error'
        });
    }
}

const deleteAddress = async (req, res) => {
    try {

        const { userId, addressId } = req.params;

        if (!userId || !addressId) {
            res.status(400).json({
                success: false,
                message: 'User id and address id is required'
            });
        }

        const address = await Address.findOneAndDelete({
            _id: addressId,
            userId
        })

        if (!address) {
            res.status(404).json({
                success: false,
                message: 'Address not found'
            });
        }

        res.status(200).json({
            success: false,
            message: 'Address deleted successfully'
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Error'
        });
    }
}

module.exports = {
    addAddress,
    fetchAddress,
    editAddress,
    deleteAddress
}