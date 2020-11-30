const router = require("express").Router();
let Exercise = require("../models/exercise.model");

router.route("/").get((req, res) => {
  Exercise.find()
    .then((exercises) => res.send(exercises))
    .catch((err) => res.status(400).json("Error:" + err));
});

router.route("/add").post((req, res) => {
  const { userName, description, duration } = req.body;
  const date = Date.parse(req.body.date);

  const newexercise = new Exercise({ userName, description, duration, date });
  newexercise
    .save()
    .then(() => res.json("Exercise Added!"))
    .catch((err) => res.status(400).json("Error:" + err));
});

router.route("/:id").get((req, res) => {
  Exercise.findById(req.params.id)
    .then((exercise) => res.json(exercise))
    .catch((err) => res.status(400).json("Error:" + err));
});

router.route("/:id").delete((req, res) => {
  Exercise.findByIdAndDelete(req.params.id)
    .then(() => res.json("Exercise Deleted"))
    .catch((err) => res.status(400).json("Error:" + err));
});

router.route("/update/:id").post((req, res) => {
  Exercise.findById(req.params.id)
    .then((exercise) => {
      exercise.userName = req.body.userName;
      exercise.description = req.body.description;
      exercise.duration = req.body.duration;
      exercise.Date = Date.parse(req.body.date);
      exercise
        .save()
        .then(() => res.json("Exercise updated"))
        .catch((err) => res.status(400).json("Error:" + err));
    })
    .catch((err) => res.status(400).json("Error:" + err));
});

module.exports = router;
