const JsonManager = require('../helpers/json.helper');
const generateId = require('../helpers/generateId');
const fs = require('fs');
const path = require('path');
const config = require('config');

module.exports = class ImageService {
    static async get() {
        const images = JsonManager.objFromPath('./images.json')?.images;

        return images;
    }
    static async createNew({ path, name }) {
        const basePath = './images';
        const supportedExtensions = [
            'APNG',
            'AVIF',
            'GIF',
            'JPEG',
            'PNG',
            'JPG',
            'SVG',
            'WEBP',
        ];
        const extname = name.split('.')[1];

        if (!supportedExtensions.includes(extname.toUpperCase())) {
            try {
                fs.unlinkSync(path);
                return null;
            } catch (err) {
                console.error(err);
            }
        }

        const images = JsonManager.objFromPath('./images.json')?.images;

        const newId = generateId(extname);
        if (newId === null) return null;

        const newName = `${newId}.${extname}`;

        images.push(newName);

        const newpath = `${basePath}/${newName}`;

        fs.renameSync(path, newpath);

        JsonManager.objToPath({
            object: { images },
            path: './images.json',
        });

        const baseUrl = config.get('baseUrl');

        return `${baseUrl}/${newName}`;
    }
};
