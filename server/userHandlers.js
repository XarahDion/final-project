"use strict";
const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;
const { v4: uuidv4 } = require("uuid");
const { getPositionFromAddress } = require("./opencage");
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

// returns an array of all year numbers for username collection
const getUserYears = async (req, res) => {
    const client = new MongoClient(MONGO_URI, options);
    const username = req.params.username;
    try {
        await client.connect();
        const db = client.db("final-project");
        let result = await db.collection(`${username}`).find().toArray();
        
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

// for a given user, returns all travels by year from mongodb
const getTravelsByYear = async (req, res) => {
    const info = req.params;
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
    const { username } = req.params;
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

// for a given user, returns a single travel by _id
const getTravelById= async (req, res) => {
    const { username, _id } = req.params;
    const client = new MongoClient(MONGO_URI, options);

    try {
        await client.connect();
        const db = client.db("final-project");
        let result = await db.collection(`${username}`).findOne({ _id })
        let newResult = {
            _id: result._id,
            date: result.date,
            venue: result.venue,
            city: result.city,
            country: result.country
        }
        res.status(200).json({ status: 200, data: newResult })
    } catch (err) {
        res.status(404).json({ status: 404, data: "Not Found" });
    } finally {
    client.close();
    }
};

// deletes one travel in user collection by its _id
const deleteTravel = async (req, res) => {
    const info = req.params ;
    const _id = info._id;
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

// creates a travel documents to user collection
const addTravel = async (req, res) => {
    const { username, date, venue, city, country } = req.body;
    const client = new MongoClient(MONGO_URI, options);

    try { // form validation 
        const regex = /^\d{2}[./-]\d{2}[./-]\d{4}$/; // impose date format
        if (date.match(regex) === null) {
            throw new Error;
        };

        const hasWhiteSpace = (city) => { // no white spaces -> RoadGoat API doesn't accept queries with white space
            return /\s/g.test(city);
        };
        if (hasWhiteSpace(city) || hasWhiteSpace(country)) {
            throw new Error;
        }

        const coords = []; // get coords from opencage handler
        await getPositionFromAddress(city, country).then((result) => {
            if (result === undefined) {
                throw new Error;
            } else {
                coords.push(result[0], result[1]);
            }
        });

        await client.connect();
        const db = client.db("final-project");
        const result = await db.collection(`${username}`).insertOne({ // define key/value pairs to insert in document
            _id: uuidv4(),
            date: date,
            venue: venue,
            city: city,
            country: country,
            coordinates: coords
        });

        await db.collection(`${username}`).createIndex( { date: "text" } ); // creates index for date field to be able to $text $search

        res.status(201).json({ status: 201, data: result});
    } catch (err) {
        res.status(500).json({ status: 500, data: req.body, message: "An error has occured, please try again." });
    } finally {     
    client.close();
    }
};

// updates a single travel in user collection
const updateTravel = async (req, res) => {
    const { _id, username } = req.params; // username for collection, _id to find document to update
    const { date, venue, city, country } = req.body;
    const client = new MongoClient(MONGO_URI, options);

    try { // same form validation and coords method as in addTravel
        const regex = /^\d{2}[./-]\d{2}[./-]\d{4}$/;
        if (date.match(regex) === null) {
            throw new Error;
        };

        const hasWhiteSpace = (city) => {
            return /\s/g.test(city);
        }
        if (hasWhiteSpace(city) || hasWhiteSpace(country)) {
            throw new Error;
        };

        const coords = [];
        await getPositionFromAddress(city, country).then((result) => {
            if (result === undefined) {
                throw new Error;
            } else {
                coords.push(result[0], result[1]);
            }
        });

        await client.connect();
        const db = client.db("final-project");
        const newValues = { $set: { // values to update document
                            date: date,
                            venue: venue,
                            city: city,
                            country: country,
                            coordinates: await getPositionFromAddress(city, country).then((result) => result)
                            } };
        const result = await db.collection(username).updateOne( { _id: _id }, newValues);

        if (req.body === undefined) { // this was used in insomnia to test endpoint
            return res.status(400).json({ status: 404, message: "You cannot update with these keys." });
        } else {
            res.status(201).json({ status: 201, data: result });
        }
    } catch (err) {
        res.status(500).json({ status: 500, data: req.body, message: "An error has occured, please try again." });
    } finally {
        client.close();
    }
};

module.exports = { 
    getUserYears,
    getTravelsByYear,
    getAllTravels,
    getTravelById,
    addTravel,
    deleteTravel,
    updateTravel,
};