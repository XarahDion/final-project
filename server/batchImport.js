const { concerts } = require("./data/data");
const { MongoClient } = require("mongodb");
const {getPositionFromAddress} = require("./opencage")
const { v4: uuidv4 } = require("uuid");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

const allConcerts = []

/// creates the array to insert all documents (objects) in mongodb collection
const func = async () => {
    for (const item of concerts) {
    allConcerts.push({
        _id: uuidv4(), /// creating the _id before import instead of using mongodb's automatic _ids which are less easy to access
        date: item.date.slice(0, 6) + '20' + item.date.slice(6), /// updates the year format from DD/MM/YY to DD/MM/YYYY
        venue: item.venue,
        city: item.city,
        country: item.country, 
        coordinates: await getPositionFromAddress(item.city).then((result) => result), /// calls the handler to get coordinates from city name
    })};
    /// handles importing all documents to db
    const batchImport = async () => {
        const client = new MongoClient(MONGO_URI, options);
        await client.connect();
        const db = client.db("final-project");
        try {
            await db.collection("concerts").insertMany( allConcerts );
            console.log("success from batchImport")
        } catch (err) {
            console.log(err)
        } finally {
            client.close();
        }
    };
    batchImport();
    /// creates index on date field to allow $text $search method
    const indexField = async () => {
        const client = new MongoClient(MONGO_URI, options);
        await client.connect();
        const db = client.db("final-project");
        try {
            await db.collection("concerts").createIndex( { date: "text" } ) 
            console.log("success from IndexField")
        } catch (err) {
            console.log(err)
        } finally {
            client.close();
        }
    };
    indexField();
};
func();
