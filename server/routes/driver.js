const router = require("express").Router();
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const Driver = require("../models/Driver");

router.get("/", (req, res) => {
  //SELECT * FROM users
  Driver.findAll()
    .then((response) => {
      console.log(response);
      res.json(response);
    })
    .catch((error) => console.log(error));
});

router.post("/search_drivers", (req, res) => {
  let {
    id,
    firstName,
    middleName,
    lastName,
    contactNumber,
    address,
    email,
  } = req.body;

  Driver.findAll({
    where: {
      [Op.or]: [
        {
          id: {
            [Op.like]: id,
          },
        },
        {
          firstName: {
            [Op.like]: "%" + firstName + "%",
          },
        },
        {
          middleName: {
            [Op.like]: "%" + middleName + "%",
          },
        },
        {
          lastName: {
            [Op.like]: "%" + lastName + "%",
          },
        },
        {
          contactNumber: {
            [Op.like]: "%" + contactNumber + "%",
          },
        },
        {
          address: {
            [Op.like]: "%" + address + "%",
          },
        },
        {
          email: {
            [Op.like]: "%" + email + "%",
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

//localhost:8080/users/add
router.post("/add_driver", (req, res) => {
  console.log("add to db");
  let {
    firstName,
    middleName,
    lastName,
    address,
    contactNumber,
    generatePassword,
    email,
  } = req.body;

  Driver.create({
    firstName,
    middleName,
    lastName,
    address,
    contactNumber,
    generatePassword,
    email,
  })
    .then((response) => {
      res.json(response);
    })
    .catch((error) => console.log(error));
});

router.delete("/delete_driver", (req, res) => {
  let { id } = req.query;

  Driver.destroy({ where: { id } })
    .then((response) => {
      res.json({ success: true, msg: "Succefully deleted user" });
    })
    .catch((error) => console.log(error));
});

module.exports = router;
