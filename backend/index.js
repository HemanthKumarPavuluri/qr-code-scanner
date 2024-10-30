const express = require("express");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const cors = require("cors");
require("dotenv").config({ path: "./config.env" });
const jwt = require("jsonwebtoken");

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// middleware for admin and professor
const verifyAdmin = async (req, res, next) => {
  const email = req.decoded.email;
  const query = { email: email };
  const user = await userCollection.findOne(query);
  if (user.role === "admin") {
    next();
  } else {
    return res.status(401).send({ message: "Unauthorised access" });
  }
};
// verifying the professor
const verifyProfessor = async (req, res, next) => {
  const email = req.decoded.email;
  const query = { email: email };
  const user = await userCollection.findOne(query);
  if (user.role === "professor") {
    next();
  } else {
    return res.status(401).send({ message: "Unauthorised access" });
  }
};
// verifying the jwt token for authorization
// If user credentials are valid then server will process the request
const verifyJWT = (req, res, next) => {
  const authorization = req.headers.authorization;
  if (!authorization) {
    return res.status(401).send({ message: "Autherization Denied" });
  }
  const token = authorization.split(" ")[1];
  jwt.verify(token, process.env.ACCESS_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Forbidden access" });
    }
    req.decoded = decoded;
    next();
  });
};

// using multer
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'frontend/src/assets')
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + '-' + file.originalname)
//   }
// })

// const upload = multer({ storage: storage })

// app.post("/single", upload.single(), (req,res) =>{
//   console.log(req.file)
// })
// MongoDB Connection
const client = new MongoClient(process.env.ATLAS_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

let profCollection; // Define collection variables outside to be accessible globally
let courseCollection;
let studentCollection;
let userCollection;

async function run() {
  try {
    // Connect the client to the server
    await client.connect();

    // Creating a database and collections
    const database = client.db("qrcode");
    profCollection = database.collection("Professor");
    courseCollection = database.collection("courses");
    studentCollection = database.collection("students");
    userCollection = database.collection("users");
    console.log("Pinged the deployment and connected to database successfully");
  } catch (error) {
    console.error("Failed to connect to database", error);
  }
}

run().catch(console.dir);

//Routes for users

app.post("/api/set-token", (req, res) => {
  const user = req.body;
  const token = jwt.sign(user, process.env.ACCESS_SECRET, {
    expiresIn: "24h",
  });
  res.send(token);
});

app.post("/new-user", async (req, res) => {
  const newuser = re.body;
  const result = await userCollection.insertOne(newuser);
  res.send(result);
});

app.get("/users", async (req, res) => {
  const result = await userCollection.find({}).toArray();
  res.send(result);
});

app.get("/users/:id", async (req, res) => {
  const id = req.params.id;
  const query = { _id: new ObjectId(id) };
  const result = await userCollection.findOne(query);
  res.send(result);
});

app.get("/user/:email", async (req, res) => {
  const email = req.params.email;
  const query = { email: email };
  const result = await userCollection.findOne(query);
  res.send(result);
});

app.delete("/delete-user/:id", async (req, res) => {
  const id = re.params.id;
  const query = { _id: new ObjectId(id) };
  const result = await userCollection.deleteOne(query);
  res.send(result);
});

app.put("update-user/:id", async (req, res) => {
  const id = req.params.id;
  const updatedUser = req.body;
  const filter = { _id: new ObjectId(id) };
  const options = { upsert: true };
  const updateOne = {
    $set: {
      name: updatedUser.name,
      email: updatedUser.email,
      role: updatedUser.role,
      empId: updatedUser.empId,
    },
  };
  const result = userCollection.updateOne(filter, updateDoc, options);
  res.send(result);
});

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

    delete updatedProf._id;

    // Update professor based on _id
    const result = await profCollection.updateOne(
      { _id: new ObjectId(profId) },
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
// route to delete 
app.delete("/professors/:id", async (req, res) => {
  try {
    const profId = req.params.id;

    const result = await profCollection.deleteOne({
      _id: new ObjectId(profId),
    });

    res.send({ message: "Successfully deleted the professor" });
  } catch (error) {
    res.status(500).send({ message: "Error deleting professor", error });
  }
});

// courses Routes start here

// Define collection variable for courses

run().catch(console.dir);

// Route to get all courses
app.get("/courses", async (req, res) => {
  try {
    const results = await courseCollection.find({}).toArray(); // Fetch all courses
    res.status(200).send(results);
  } catch (error) {
    res.status(500).send({ message: "Error fetching courses", error });
  }
});

// Route to add a new course
app.post("/courses", async (req, res) => {
  try {
    const newCourse = req.body; // Get data from request body
    const result = await courseCollection.insertOne(newCourse); // Insert new course into the collection
    res.status(201).send(result); // Respond with the inserted document
  } catch (error) {
    res.status(500).send({ message: "Error inserting course", error });
  }
});

// Route to update an existing course
app.put("/courses/:id", async (req, res) => {
  try {
    const courseId = req.params.id;
    const updatedCourse = req.body;

    delete updatedCourse._id; // Remove _id from the update payload

    // Update course based on _id
    const result = await courseCollection.updateOne(
      { _id: new ObjectId(courseId) },
      { $set: updatedCourse }
    );

    if (result.modifiedCount === 0) {
      return res.status(404).send({ message: "Course not found" });
    }

    res.send({ message: "Course updated successfully" });
  } catch (error) {
    res.status(500).send({ message: "Error updating course", error });
  }
});

// Route to delete a course
app.delete("/courses/:id", async (req, res) => {
  try {
    const courseId = req.params.id;

    const result = await courseCollection.deleteOne({
      _id: new ObjectId(courseId),
    });

    res.send({ message: "Successfully deleted the course" });
  } catch (error) {
    res.status(500).send({ message: "Error deleting course", error });
  }
});

// Route to get all students
app.get("/students", async (req, res) => {
  try {
    const results = await studentCollection.find({}).toArray(); // Fetch all students
    res.status(200).send(results);
  } catch (error) {
    res.status(500).send({ message: "Error fetching students", error });
  }
});

// Route to add a new student
app.post("/students", async (req, res) => {
  try {
    const newStudent = req.body; // Get data from request body
    const result = await studentCollection.insertOne(newStudent); // Insert new student into the collection
    res.status(201).send(result); // Respond with the inserted document
  } catch (error) {
    res.status(500).send({ message: "Error inserting student", error });
  }
});

// Route to update an existing student
app.put("/students/:id", async (req, res) => {
  try {
    const studentId = req.params.id;
    const updatedStudent = req.body;

    delete updatedStudent._id; // Remove _id from the update payload

    // Update student based on _id
    const result = await studentCollection.updateOne(
      { _id: new ObjectId(studentId) },
      { $set: updatedStudent }
    );

    if (result.modifiedCount === 0) {
      return res.status(404).send({ message: "Student not found" });
    }

    res.send({ message: "Student updated successfully" });
  } catch (error) {
    res.status(500).send({ message: "Error updating student", error });
  }
});

// Route to delete a student
app.delete("/students/:id", async (req, res) => {
  try {
    const studentId = req.params.id;

    const result = await studentCollection.deleteOne({
      _id: new ObjectId(studentId),
    });

    if (result.deletedCount === 0) {
      return res.status(404).send({ message: "Student not found" });
    }

    res.send({ message: "Successfully deleted the student" });
  } catch (error) {
    res.status(500).send({ message: "Error deleting student", error });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
