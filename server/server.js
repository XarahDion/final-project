const express = require("express");
const morgan = require("morgan");
const cors = require("cors")
const PORT = process.env.PORT || 8000;

const {
    getConcerts,
    getConcertsByYear,
    getYears,
    getCity
} = require("./handlers")

const {
    getTravelsByYear,
    getUserYears,
    getAllTravels,
    getTravelById,
    addTravel,
    deleteTravel,
    updateTravel,
} = require("./userHandlers")

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
.use(cors({
    origin: ['https://earth-trotter.onrender.com', 'https://www.earth-trotter.xarahdion.com', 'http://localhost:3000']
}))

.get("/concerts", getConcerts)
.get("/concerts/:year", getConcertsByYear)
.get("/cities/:city", getCity)
.get("/get-years", getYears)
.get("/travels/:username/:year", getTravelsByYear)
.get("/get-years/:username", getUserYears)
.get("/get-travels/:username", getAllTravels)
.get("/get-travel/:username/:_id", getTravelById)
.post("/travels", addTravel)
.delete("/delete-travel/:username/:_id", deleteTravel)
.patch("/update-travel/:username/:_id", updateTravel)

.listen(PORT, () => console.info(`Listening on port ${PORT}`));
