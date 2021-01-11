const router = require("express").Router();
const Image = require("../models/Image");
const randomString = require("randomstring");


router.get("/", (req, res) => {
 
  Image.findAll()
    .then((response) => {
      console.log(response);
      res.json(response);
    })
    .catch((error) => console.log(error));
});

router.delete("/delete_Image", (req, res) => {
  let { id } = req.query;

  Image.destroy({ where: { id } })
    .then((response) => {
      res.json({ success: true, msg: "Succefully deleted user" });
    })
    .catch((error) => console.log(error));
});

router.post("/save_image", (req, res) => {
  console.log("add to db")
  let { imageOwnerId, imageReferenceId, imagePath } = req.body;

  Image.create({ imageOwnerId, imageReferenceId, imagePath })
    .then((response) => {
      res.json(response);
    })
    .catch((error) => console.log(error));
});

//Uploading Images
router.post("/add_image", (req, res) => {
    console.log("Uploading");
    if (req.files === null) {
      return res.status(400).json({ msg: "No image uploaded!" });
    }
    console.log(req.files.file)
    const file = req.files.file;
    const randomFileName = randomString.generate(15);
    const splitFile = file.name.split(".");
    //console.log(file)
    file.mv(
      `${__dirname}/../../client/public/uploadImage/${randomFileName}.${splitFile[1]}`,
      (err) => {
        if (err) {
          console.error(err);
          return res.status(500).send(err);
        }
        res.json({
          fileName: file.name,
          filePath: `/uploadImage/${randomFileName}.${splitFile[1]}`,
        });
      }
    );
    // console.log(file.filePath);
  });

module.exports = router;
