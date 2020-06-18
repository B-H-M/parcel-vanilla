const express = require("express");
const path = require("path");
const dotenv = require('dotenv');

dotenv.config();

const app = express();

app.use(express.static(path.join(__dirname, "front")));

app.get("/*", function(req, res) {
  res.sendFile(path.join(__dirname, "front", "index.html"));
});

const PORT = process.env.PORT || 5400;

app.listen(PORT, () => console.log(`App running on port ${PORT}...`));
