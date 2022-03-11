const express = require('express');
const router = express.Router();

const Image = require('../controllers/image.controller');

// @route GET api/images/:id
// @description Get single image by id
// @access Public
router.get('/:id', Image.get);

// @route GET api/images
// @description add/save image
// @access Public
router.post('/', Image.add);

module.exports = router;
