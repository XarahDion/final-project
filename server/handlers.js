"use strict";
const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};
const net = require('follow-redirects').https;
const fs = require('fs');
const auth_key = Buffer.from(process.env.ROAD_GOAT_AUTH_KEY).toString('base64');

// returns all concerts
const getConcerts = async (req, res) => {
    const client = new MongoClient(MONGO_URI, options);

    try {
        await client.connect();
        const db = client.db("final-project");
        let result = await db.collection("concerts").find().toArray()
        res.status(200).json({ status: 200, data: result })
    } catch (err) {
        res.status(404).json({ status: 404, data: "Not Found" });
    } finally {
    client.close();
    }
};

// returns all concerts by year from mongodb
const getConcertsByYear = async (req, res) => {
    const year = req.params.year;
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

// returns an array of all year numbers for concerts collection
const getYears = async (req, res) => {
    const client = new MongoClient(MONGO_URI, options);

    try {
        await client.connect();
        const db = client.db("final-project");
        let result = await db.collection("concerts").find().toArray();

        // extracts the years from the date values (DD/MM/YYYY)
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

// returns city or country data from roadgoat api
const getCity = (request, result) => {
    const city = request.params.city;
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
        result.status(200).json({ status: 200, data: JSON.parse(body.toString()) });
    })

    res.on("error", function (error) {
        console.error(error);
    });
    });
    req.end();
};

module.exports = { 
    getConcerts,
    getConcertsByYear,
    getYears,
    getCity
};