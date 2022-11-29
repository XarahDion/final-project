const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

const indexField = async () => {
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db("final-project");
    try {
        await db.collection("travels").createIndex( { date: "text" } ) 
        // await db.collection("travels").createIndex( { username: "text" } )  
        console.log("success from IndexField")
    } catch (err) {
        console.log(err)
    } finally {
        client.close();
    }
};
indexField();