const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
    host: parsedUrl.hostname,
  user: parsedUrl.username,
  password: parsedUrl.password,
  database: parsedUrl.pathname.substring(1), 
  port: parsedUrl.port || 3306
});

db.connect((err) => {
    if (err) {
        console.error("Database connection failed:", err);
        return;
    }
    console.log("Connected to MySQL");
});

app.post("/submit", (req, res) => {
    const { name } = req.body;
    if (!name) return res.status(400).json({ error: "Name is required" });

    const sql = "INSERT INTO users (name) VALUES (?)";
    db.query(sql, [name], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Data inserted successfully", id: result.insertId });
    });
});

app.listen(5000, () => {
    console.log("Server running on port 5000");
});
