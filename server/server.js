const express = require("express");
const app = express();

const db = require("./database/database");

require("dotenv").config();

const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

db.authenticate()
  .then(() => {
    console.log("Connected to database");
  })
  .catch((error) => console.log("The error is " + error));

app.use("/api/v1/drivers", require("./routes/driver"));
app.use("/api/v1/jeepneys", require("./routes/jeepney"));
app.use("/api/v1/barangays", require("./routes/barangay"));

app.listen(PORT, () => console.log("Listent at port " + PORT));
