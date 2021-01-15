const router = require("express").Router();
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
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

router.post("/search_barangays", (req, res) => {
  let { value } = req.body;

  Barangay.findAll({
    where: {
      [Op.or]: [
        {
          id: {
            [Op.like]: value,
          },
        },
        {
          barangayName: {
            [Op.like]: "%" + value + "%",
          },
        },
        {
          location: {
            [Op.like]: "%" + value + "%",
          },
        },
      ],
    },
  })
    .then((_res) => {
      res.json(_res);
    })
    .catch((error) => console.log(error));
});

router.post("/add_barangay", (req, res) => {
  console.log("add to barangay table");
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
