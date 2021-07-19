const express = require('express');
const router = express.Router();


// require the Drone model here
const Drone = require('../models/Drone.model')

router.get('/drones', (req, res, next) => {
  // Iteration #2: List the drones
  Drone.find({})
    .then((dronesFound) => {
      console.log(dronesFound)
      res.render("drones/list.hbs", {
        drones: dronesFound
      })
    })
    .catch((err) => {
      console.log(err)
    })
});

router.get('/drones/create', (req, res, next) => {
  // Iteration #3: Add a new drone
    res.render("drones/create-form.hbs")
});

router.post('/drones/create', (req, res, next) => {
  // Iteration #3: Add a new drone
  const { name, propellers, maxSpeed } = req.body

  Drone.create({name, propellers, maxSpeed})
    .then((droneCreated) => {
      res.redirect("/drones")
    })
    .catch(e => console.log(e))
});

router.get('/drones/:id/edit', (req, res, next) => {
  // Iteration #4: Update the drone
  const { id } = req.params

  Drone.findById(id)
    .then((droneFound) => {
      console.log(droneFound)
      res.render("drones/update-form.hbs", {
        drone: droneFound
      })
    })
    .catch((e) => {
      console.log(e)
    })

});

router.post('/drones/:id/edit', (req, res, next) => {
  // Iteration #4: Update the drone
  const { id } = req.params
  const { name, propellers, maxSpeed } = req.body

  Drone.findByIdAndUpdate(id, {name, propellers, maxSpeed}, {new: true})
    .then((droneUpdate) => {
      console.log(droneUpdate)
      res.redirect("/drones")
    })
    .catch(e => console.log(e))
});

router.post('/drones/:id/delete', (req, res, next) => {
  // Iteration #5: Delete the drone
  const { id } = req.params

  Drone.findByIdAndDelete(id)
    .then((droneDeleted) => {
      console.log(droneDeleted)
      res.redirect("/drones")
    })
    .catch((e) => {
      console.log(e)
    })
});

module.exports = router;
