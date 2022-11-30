"use strict";
const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;
const { v4: uuidv4 } = require("uuid");
const net = require('follow-redirects').https;
const fs = require('fs');
const auth_key = Buffer.from(process.env.ROAD_GOAT_AUTH_KEY).toString('base64');
const {getPositionFromAddress} = require("./opencage")
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

/// returns all concerts by year from mongodb
const getConcertsByYear = async (req, res) => {
    const year = req.params.year
    const client = new MongoClient(MONGO_URI, options);

    try {
        await client.connect();
        const db = client.db("final-project");
        let result = await db.collection("concerts").find({ $text: { $search: year } }).toArray()
        res.status(200).json({ status: 200, data: result })
    } catch (err) {
        res.status(404).json({ status: 404, data: "Not Found" });
    } finally {
    client.close();
    }
};

/// returns city or country data from roadgoat api
const getCity = (request, result) => {
    const city = request.params.city
    const goatOptions = {
        method: 'GET',
        hostname: 'api.roadgoat.com',
        port: 443,
        path: `/api/v2/destinations/auto_complete?q=${city}`,
        headers: {
            'Authorization': `Basic ${auth_key}`
        },
        maxRedirects: 20
    };
    const req = net.request(goatOptions, function (res) {
    const chunks = [];

    res.on("data", function (chunk) {
        chunks.push(chunk);
    });

    res.on("end", function (chunk) {
        const body = Buffer.concat(chunks);
        result.status(200).json({ status: 200, data: JSON.parse(body.toString())})
    })

    res.on("error", function (error) {
        console.error(error);
    });
    });
    req.end();
}

// returns an array of all year numbers for concerts collection
const getYears = async (req, res) => {
    const client = new MongoClient(MONGO_URI, options);

    try {
        await client.connect();
        const db = client.db("final-project");
        let result = await db.collection("concerts").find().toArray();

        /// extracts the years from the date values (DD/MM/YYYY)
        let years = [];
        result.forEach((item) => {
            if (!years.includes(item.date.substr(6)))
            years.push(item.date.substr(6));
        });
        res.status(200).json({ status: 200, data: years })
    } catch (err) {
        res.status(404).json({ status: 404, data: "Not Found" });
    } finally {
        client.close();
    }
};

// creates a travel documents to user collection
// also creates index for date field to be able to $text $search
const addTravel = async (req, res) => {
    const info = req.body
    const client = new MongoClient(MONGO_URI, options);
    try { 
        await client.connect();
        const db = client.db("final-project");
        const result = await db.collection(`${info.username}`).insertOne({
            _id: uuidv4(),
            date: info.date,
            venue: info.venue,
            city: info.city,
            country: info.country,
            coordinates: await getPositionFromAddress(info.city, info.country).then((result) => result)
        });
        await db.collection(`${info.username}`).createIndex( { date: "text" } ) 
        res.status(201).json({ status: 201, data: result})
    } catch (err) {
        res.status(500).json({ status: 500, data: req.body, message: err.message });
    } finally {     
    client.close();
    }
};

// returns an array of all year numbers for username collection
const getUserYears = async (req, res) => {
    const client = new MongoClient(MONGO_URI, options);
    const username = req.params.username
    try {
        await client.connect();
        const db = client.db("final-project");
        let result = await db.collection(`${username}`).find().toArray();
        
        /// extracts the years from the date values (DD/MM/YYYY)
        let years = [];
        result.forEach((item) => {
            if (!years.includes(item.date.substr(6)))
            years.push(item.date.substr(6));
        });
        res.status(200).json({ status: 200, data: years })
    } catch (err) {
        res.status(404).json({ status: 404, data: "Not Found" });
    } finally {
        client.close();
    }
};

// for a given user, returns all travels by year from mongodb
const getTravelsByYear = async (req, res) => {
    const info = req.params
    const client = new MongoClient(MONGO_URI, options);

    try {
        await client.connect();
        const db = client.db("final-project");
        let result = await db.collection(`${info.username}`).find({ $text: { $search: `${info.year}` } }).toArray()
        res.status(200).json({ status: 200, data: result })
    } catch (err) {
        res.status(404).json({ status: 404, data: "Not Found" });
    } finally {
    client.close();
    }
};

// for a given user, returns all travels from mongodb
const getAllTravels = async (req, res) => {
    const { username } = req.params
    const client = new MongoClient(MONGO_URI, options);

    try {
        await client.connect();
        const db = client.db("final-project");
        let result = await db.collection(`${username}`).find().toArray();
        res.status(200).json({ status: 200, data: result })
    } catch (err) {
        res.status(404).json({ status: 404, data: "Not Found" });
    } finally {
    client.close();
    }
};

/// deletes one travel in user collection by its _id
const deleteTravel = async (req, res) => {
    const info = req.params ;
    const _id = info._id
    const client = new MongoClient(MONGO_URI, options);

    try { 
        await client.connect();
        const db = client.db("final-project");
        const result = await db.collection(`${info.username}`).deleteOne({ _id : _id });

        if (!result.deletedCount) {
            return res.status(400).json({ status: 404, data: _id, message: "Cannot delete this item."})
        }
        if (result.deletedCount) {
            return res.status(201).json({ status: 204, _id, data: result})
        }
    } catch (err) {
        console.log(err.stack)
    } finally {
        client.close();
    }
};

// updates a specified reservation
const updateTravel = async (req, res) => {
    const info = req.params ;
    const _id = info._id
    const username = info.username
    const { date, venue, city, country } = req.body
    const client = new MongoClient(MONGO_URI, options);

    try {
        await client.connect();
        const db = client.db("final-project");
        const newValues = { $set: {
                            date: date,
                            venue: venue,
                            city: city,
                            country: country,
                            coordinates: await getPositionFromAddress(city, country).then((result) => result)
                            } };
        const result = await db.collection(username).updateOne( { _id: _id }, newValues);

        if (req.body === undefined) {
            return res.status(400).json({ status: 404, message: "You cannot update with these keys." });
        } else {
            res.status(201).json({ status: 201, data: result })
        }
    } catch (err) {
        console.log(err.stack)
    } finally {
        client.close();
    }
};

module.exports = { 
    getConcertsByYear,
    getCity,
    getYears,
    addTravel,
    getUserYears,
    getTravelsByYear,
    getAllTravels,
    deleteTravel,
    updateTravel
}