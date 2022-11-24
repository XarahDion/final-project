const { flights, reservations } = require("./data");
const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

const batchImport = async () => {
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();

    const db = client.db("final-project");

    try {
    await db.collection("concerts").insertMany(  );
    console.log("success")
    } catch (err) {
        console.log(err)
    } finally {
        client.close();
    }
};

batchImport();