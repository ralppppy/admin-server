const router = require("express").Router();

const Barangay = require("../models/Barangay");

router.get("/", (req, res) => {
  //SELECT * FROM users
  Barangay.findAll()
    .then((response) => {
      console.log(response);
      res.json(response);
    })
    .catch((error) => console.log(error));
});


router.post("/add_barangay", (req, res) => {
  console.log("add to barangay table")
  let { barangayName, location, barangayDescription } = req.body;

  Barangay.create({ barangayName, location, barangayDescription })
    .then((response) => {
      res.json(response);
    })
    .catch((error) => console.log(error));
});

router.delete("/delete_barangay", (req, res) => {
  let { id } = req.query;

  Barangay.destroy({ where: { id } })
    .then((response) => {
      res.json({ success: true, msg: "Succefully deleted Barangay" });
    })
    .catch((error) => console.log(error));
});

module.exports = router;
