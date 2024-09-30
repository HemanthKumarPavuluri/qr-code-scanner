const express = require("express");
const { MongoClient, ServerApiVersion } = require("mongodb");
const cors = require("cors");
require("dotenv").config({ path: "./config.env" });

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
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

// Route to get all professors
app.get("/professors", async (req, res) => {
  try {
    const results = await profCollection.find({}).toArray();
    res.status(200).send(results);
  } catch (error) {
    res.status(500).send({ message: "Error fetching professors", error });
  }
});

// Route to add a new professor
app.post("/professors", async (req, res) => {
  try {
    const newProf = req.body; // Get data from request body
    const result = await profCollection.insertOne(newProf); // Insert new professor into the collection
    res.status(201).send(result); // Respond with the inserted document
  } catch (error) {
    res.status(500).send({ message: "Error inserting professor", error });
  }
});

// Route to update an existing professor
app.put("/professors/:id", async (req, res) => {
  try {
    const profId = req.params.id;
    const updatedProf = req.body;

    // Update professor based on _id
    const result = await profCollection.updateOne(
      { _id: new MongoClient.ObjectId(profId) },
      { $set: updatedProf }
    );

    if (result.modifiedCount === 0) {
      return res.status(404).send({ message: "Professor not found" });
    }

    res.send({ message: "Professor updated successfully" });
  } catch (error) {
    res.status(500).send({ message: "Error updating professor", error });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
