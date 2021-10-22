const express = require("express");
const path = require("path");
const cors = require("cors");

// db
const { dbConnection } = require("./config/database");
dbConnection();

const app = express();
app.use(cors());
app.use(express.static(path.join(__dirname + "/public")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// routes
app.use("/api", require("./routes"));

// server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server is listening on ${PORT}`));
