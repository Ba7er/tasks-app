const express = require("express");
const User = require("../models/user");
const router = express.Router();
const auth = require("../middleware/auth");
const multer = require('multer')
const sharp = require('sharp')
const {sendWelcomEmail,sendCancelEmail} = require('../emails/account')



router.get("/test", (req, res) => {
  res.send("form new file");
});

router.post("/users", async (req, res) => {
  // we used destructuring of the request body
  // we are also generating JWT for signUp
  const user = new User(req.body);

  try {
    await user.save();
    sendWelcomEmail(user.email, user.name)
    const token = await user.generateAuthtoken(
      req.body.email,
      req.body.password
    );
    // below code is sending back user details with token here we are using {var1, var2} instead of {var1: value, var2:value}
    res.status(201).send({ user, token });
  } catch (e) {
    res.status(400).send(e);
  }
});

router.post("/users/login", async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await user.generateAuthtoken();
    res.send({ user, token });
  } catch (e) {
    res.status(400).send();
  }
});

router.post("/users/logout", auth, async (req, res) => {
  //targeting specific token user logged in with
  try {
    // the result of 'filter' will be assigned to the user instance then we will save it without that excluded tken
    // which we want to remove as we logout
    req.user.tokens = req.user.tokens.filter(token => {
      return token.token !== req.token;
    });
    await req.user.save();
    res.send();
  } catch (e) {
    res.status(500).send();
  }
});

router.post("/users/logoutall", auth, async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    console.log("tokens", req.user.tokens);
    res.send();
  } catch (e) {
    res.status(500).send();
  }
});
// adding the middleware to the route...."auth "
// router.get("/users", auth , async (req, res) => {
//   try {
//     const user = await User.find({});
//     res.send(user);
//   } catch (e) {
//     res.status(500).send();
//   }

router.get("/users/me", auth, async (req, res) => {
  res.send(req.user);
});

router.patch("/users/me", auth, async (req, res) => {
  // checking the req.body that it has the correct body and does not have wrong data or data not included in the call
  const updates = Object.keys(req.body);
  const allowedUpdates = ["name", "email", "password", "age"];
  const isValidOperation = updates.every(update =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates" });
  }
  try {
    updates.forEach(update => (req.user[update] = req.body[update]));
    await req.user.save();
    res.status(200).send(req.user);
  } catch (e) {
    res.status(400).send(e);
  }
});
// logged in users to remove user profile by himself
router.delete("/users/me", auth, async (req, res) => {
  try {
    // const user = await User.findByIdAndDelete(req.user._id);
    // if (!user) {
    //   return res.status(404).send();
    // }
    await req.user.remove();
    sendCancelEmail(req.user.email, req.user.name)
    
    res.send(req.user);
  } catch (e) {
    res.status(500).send();
  }
});

const avatar = multer({
  limits:{
    fileSize: 1000000
  },
  fileFilter(req, file, cb){
    if(!file.originalname.match(/\.(jpg|jpeg|png)$/)){
        return cb(new Error('only JPG, JPEG,PNG extentions are allowed'))
    }
    cb(undefined, true)
  }
})

// the 4th callback is for handeling errors 
// instead of saving the images in file system we are storing the binray as filed in user model
router.post('/users/me/avatar', auth,avatar.single('avatar'), async (req, res) =>{
  const buffer = await sharp(req.file.buffer).resize({width: 250, height: 250}).png().toBuffer()
  req.user.avatar = buffer
  await req.user.save()
  res.send()
}, (error, req, res, next) =>{
  res.status(400).send({error: error.message})
})


router.delete('/users/me/avatar', auth,async (req, res) =>{
    req.user.avatar = undefined
    await req.user.save()
    res.send()
})

router.get('/users/:id/avatar', async (req, res) =>{
    try{
      const user = await User.findById(req.params.id)
      if(!user || !user.avatar){
          throw new Error()
      }

      res.set('Content-type','image/png')
      res.send(user.avatar)

    }catch(e){
      res.status(404).send()
    }
})

module.exports = router;


