const ImageService = require('../services/imageService');

module.exports = class Image {
    static async get(req, res, next) {
        ImageService.get()
            .then((images) => {
                res.json({
                    success: true,
                    images,
                });
            })
            .catch((err) =>
                res.status(400).json({ error: 'Unable to images' })
            );
    }

    static async add(req, res, next) {
        const file = req.files.file;

        ImageService.createNew(file)
            .then((imageLink) => {
                res.json(
                    imageLink
                        ? {
                              success: true,
                              imageLink,
                          }
                        : {
                              error: 'Unable to post this image',
                          }
                );
            })
            .catch((err) =>
                res.status(400).json({ error: 'Unable to post this image' })
            );
    }
};
