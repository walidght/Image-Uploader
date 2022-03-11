const express = require('express');
const formidable = require('express-formidable');

const router = require('./routes/image.route');

const app = express();

const port = process.env.PORT || 3000;

app.use(express.static(__dirname + '\\public'));

app.use(
    formidable({
        uploadDir: './images',
        multiples: false,
    })
);

app.use('/api/images', router);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '\\index.html');
});

app.listen(port);
