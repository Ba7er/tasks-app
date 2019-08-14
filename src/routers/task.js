const Task = require("../models/task");
const express = require("express");
const router = express.Router();
const auth = require('../middleware/auth')

router.post("/tasks", auth, async (req, res) => {
  // const task = new Task(req.body);
const task = new Task({
  ...req.body, 
  owner: req.user.id
})

  try {
    await task.save();
    res.status(201).send(task);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.get("/tasks", auth, async (req, res) => {
  try {
    //const tasks = await Task.find({owner: req.user._id});
    //or
     await req.user.populate('tasks').execPopulate()
      //console.log(x)
      res.send(req.user.tasks);
  } catch (e) {
    res.status(500).send();
  }
});

router.get("/tasks/:id", auth, async (req, res) => {
  const _id = req.params.id;
  
  try {
    //const task = await Task.findById(_id);
    const task = await Task.findOne({_id, owner: req.user._id})

    if (!task) {
      return res.status(404).send();
    }

    res.send(task);
  } catch (e) {
    res.status(500).send();
  }
});

router.patch("/tasks/:id", auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["description", "completed"];
  const isValidOperation = updates.every(update =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates" });
  }
  // here we did new way to find and update just to able to use the 'save' method so it will go to save method customized in the model
  // before this change we were using findByIdnadUpdate()
  try {
    const task = await Task.findOne({_id: req.params.id, owner : req.user._id})
    //const task = await Task.findById(req.params.id)
    
 
    if (!task) {
      return res.status(404).send();
    }
    updates.forEach((update) => task[update] = req.body[update])
    await task.save()

    res.status(200).send(task);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.delete("/tasks/:id", auth, async (req, res) => {
  try {
    //const task = await Task.findByIdAndDelete({_id: req.params.id, owner: req.user._id });

    const task = await Task.findOneAndDelete({_id: req.params.id, owner: req.user._id})
    
    if (!task) {

      return res.status(404).send();
    }
    
    res.send(task);
  } catch (e) {
    res.status(500).send();
  }
});

module.exports = router;
