const express = require('express');
const { 
    handleImageUpload,
    addProduct,
    fetchProduct,
    fetchProductById,
    editProduct,
    deleteProduct
 } = require('../../controllers/admin/products-controller');

const router = express.Router();

const { upload } = require('../../helper/cloudinary')

router.post('/upload-image', upload.single('my_file'), handleImageUpload);
router.post('/add',addProduct);
router.put('/edit/:id',editProduct);
router.delete('/delete/:id',deleteProduct);
router.get('/getAll',fetchProduct);
router.get('/getByID/:id',fetchProductById);

module.exports = router;