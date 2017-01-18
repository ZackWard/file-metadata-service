var fs = require('fs');
var express = require('express');
var app = express();
var helmet = require('helmet');
var multer = require('multer');
var upload = multer({dest: __dirname + '/uploads'});

var port = 3004;

app.use(helmet());
app.use('/static', express.static('public'));

app.get('/', function (req, res) {
    res.sendFile(__dirname + "/public/index.html");
});

app.post('/analyze', upload.single('fileInput'), function (req, res, next) {
    var fileInfo = {
        size: req.file.size
    };
    fs.unlink(req.file.path, function () {
        console.log("Deleted file: " + req.file.path);
    });
    res.json(fileInfo);
});

app.listen(port, 'localhost', function () {
    console.log("File Metadata Service listening on port " + port);
});