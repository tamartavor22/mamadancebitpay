const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");

const app = express();
const port = 3000;

// MySQL connection configuration
const connection = mysql.createConnection({
  host: "localhost",
  user: "your_mysql_username",
  password: "your_mysql_password",
  database: "your_database_name",
});

// Connect to MySQL
connection.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
    return;
  }
  console.log("Connected to MySQL");
});

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Serve the HTML page on the root route
app.get("/", (req, res) => {
  res.send(/* Your HTML page */);
});

// POST endpoint to handle phone number submission
app.post("/phonenumber", (req, res) => {
  const { phoneNumber } = req.body;
  // Insert the phone number into the database
  const sql = "INSERT INTO phone_numbers (number) VALUES (?)";
  connection.query(sql, [phoneNumber], (err, result) => {
    if (err) {
      console.error("Error inserting phone number into MySQL:", err);
      res.status(500).send("Error inserting phone number into database");
      return;
    }
    console.log("Phone number inserted into MySQL:", phoneNumber);
    res.status(200).send("Phone number received and inserted successfully");
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
