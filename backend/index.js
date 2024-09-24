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

// Professor routes
app.get("/professors", async (req, res) => {
  try {
    // var cursor = db.collection("Professor").find();
    // var professors = [];
    // // Execute the each command, triggers for each document
    // cursor.each(function (err, item) {
    //   // If the item is null then the cursor is exhausted/empty and closed
    //   if (item == null) {
    //     db.close(); // you may not want to close the DB if you have more code....
    //     return;
    //   }
    //   professors.push(item);
    //   // otherwise, do something with the item
    // });

    const professors = [
      {
        professor_id: "#919",
        image: "https://example.com/image.jpg",
        email: "professor.email@example.com",
        phone: "+1-123-456-7890",
        office: "Room 204, Science Building",
        first_name: "John",
        last_name: "Doe",
        qualification: "PhD in Computer Science",
        designation: "Associate Professor",
        education: [
          {
            degree: "PhD",
            field: "Computer Science",
            institution: "University of Example",
            year: 2015,
          },
          {
            degree: "MSc",
            field: "Information Technology",
            institution: "Tech University",
            year: 2010,
          },
          {
            degree: "BSc",
            field: "Computer Science",
            institution: "State University",
            year: 2008,
          },
        ],
        courses_taught: [
          "Introduction to Algorithms",
          "Data Structures",
          "Advanced Machine Learning",
        ],
        academic_interests: [
          "Artificial Intelligence",
          "Data Science",
          "Machine Learning",
          "Natural Language Processing",
        ],
      },
      {
        professor_id: "#919",
        image: "https://example.com/image.jpg",
        email: "professor.email@example.com",
        phone: "+1-123-456-7890",
        office: "Room 204, Science Building",
        first_name: "Mia",
        last_name: "Khalifa",
        qualification: "PhD in Computer Science",
        designation: "Associate Professor",
        education: [
          {
            degree: "PhD",
            field: "Computer Science",
            institution: "University of Example",
            year: 2015,
          },
          {
            degree: "MSc",
            field: "Information Technology",
            institution: "Tech University",
            year: 2010,
          },
          {
            degree: "BSc",
            field: "Computer Science",
            institution: "State University",
            year: 2008,
          },
        ],
        courses_taught: [
          "Introduction to Algorithms",
          "Data Structures",
          "Advanced Machine Learning",
        ],
        academic_interests: [
          "Artificial Intelligence",
          "Data Science",
          "Machine Learning",
          "Natural Language Processing",
        ],
      },
    ];

    res.send(professors);
  } catch (error) {
    res.status(500).send({ message: "Error getting professors", error });
  }
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

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
