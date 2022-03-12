const express = require('express');
const router = express.Router();

const Image = require('../controllers/image.controller');

// @route GET api/images
// @description Get all images
// @access Public
router.get('/', Image.get);

// @route POST api/images
// @description add/save image
// @access Public
router.post('/', Image.add);

module.exports = router;
