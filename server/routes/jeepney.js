const router = require("express").Router();

const Jeepney = require("../models/Jeepney");

router.get("/", (req, res) => {
  //SELECT * FROM users
  Jeepney.findAll()
    .then((response) => {
      console.log(response);
      res.json(response);
    })
    .catch((error) => console.log(error));
});

router.post("/add_jeep", (req, res) => {
  console.log("add to jeep table");
  let { driverId, plateNumber, jeepCapacity } = req.body;

  Jeepney.create({ driverId, plateNumber, jeepCapacity })
    .then((response) => {
      res.json(response);
    })
    .catch((error) => console.log(error));
});

router.delete("/delete_jeep", (req, res) => {
  let { id } = req.query;

  Jeepney.destroy({ where: { id } })
    .then((response) => {
      res.json({ success: true, msg: "Succefully deleted jeepney" });
    })
    .catch((error) => console.log(error));
});

module.exports = router;
