const express = require('express');
const { 
  addFeaturesImage,
  getFeaturesImage
 } = require('../../controllers/common/feature-controller');

const router = express.Router();

// router.post('/add', upload.single('my_file'), addFeaturesImage);
router.post('/add', addFeaturesImage);
router.get('/get',getFeaturesImage);

module.exports = router;