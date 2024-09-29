const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 3001;

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

app.get("/professors", async (req, res) => {
  let results = await profCollection.find({}).toArray();
  res.send(results).status(200);
});

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

// update professor

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

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
