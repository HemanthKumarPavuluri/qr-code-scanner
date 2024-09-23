const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const { MongoClient, ServerApiVersion } = require("mongodb");
require("dotenv").config({ path: "./config.env" });

const client = new MongoClient(process.env.ATLAS_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

let profCollection; // Define collection variables outside to be accessible globally

async function run() {
  try {
    // Connect the client to the server
    await client.connect();

    // Creating a database and collections
    const database = client.db("qrcode");
    profCollection = database.collection("Professor");

    console.log("Pinged the deployment and connected to database successfully");
  } catch (error) {
    console.error("Failed to connect to database", error);
  }
}

run().catch(console.dir);

// Professor routes
app.post("/professors", async (req, res) => {
  try {
    const newProf = req.body;
    const result = await profCollection.insertOne(newProf);
    res.send(result);
  } catch (error) {
    res.status(500).send({ message: "Error inserting professor", error });
  }
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
