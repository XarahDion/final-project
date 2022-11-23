const express = require("express");
const morgan = require("morgan");

const PORT = 8000;

express()
    .use(function (req, res, next) {
        res.header(
        "Access-Control-Allow-Methods",
        "OPTIONS, HEAD, GET, PUT, POST, DELETE"
        );
        res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
        );
        next();
    })
    .use(morgan("tiny"))
    .use(express.static("./server/assets"))
    .use(express.json())
    .use(express.urlencoded({ extended: false }))
    .use("/", express.static(__dirname + "/"))

    .get('/', function (req, res) {
        res.status(200).json({ message : 'Hello World' })
    })

    .listen(PORT, () => console.info(`Listening on port ${PORT}`));
