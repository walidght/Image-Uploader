const ImageService = require('../services/imageService');

module.exports = class Image {
    static async get(req, res, next) {
        const id = req.params.id;
        ImageService.getById(id)
            .then((imagePath) => {
                res.sendFile(imagePath);
            })
            .catch((err) =>
                res.status(400).json({ error: 'Unable to get this image' })
            );
    }

    static async add(req, res, next) {
        const file = req.files.file;

        ImageService.createNew(file)
            .then((imageLink) => {
                res.json({
                    success: true,
                    imageLink,
                });
            })
            .catch((err) =>
                res.status(400).json({ error: 'Unable to post this image' })
            );
    }
};
