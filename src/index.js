const express = require("express");
require("./db/mongoose");
const userRouter = require("./routers/user");
const taskRouter = require("./routers/task");

const app = express();
const port = process.env.PORT || 3000;
//make sure to decalre the middelware before anu 'app.use' statement
// below app.user is express middelware .... means 
// new http request ---> middelware to do something ---> request handler 
// app.use((req, res, next ) =>{
//     if (req.method === 'GET'){
//         res.send('GET requests are disabled ')
//     }else {
//         next()
//     }
//     //next()// if not called here the call will keep waiting 
// })

// app.use((req, res, next) =>{
    
//     res.status(503).send('This serivces is under maintenance')
    
// })

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);




app.listen(port, () => {
  console.log("server is up at " + port);
});

const Task = require('./models/task')
const User = require('./models/user')

const main  = async () =>{
    // const task = await Task.findById('5d52cb1ac81bd43b18b5f094')
    // await task.populate('owner').execPopulate()
    // console.log(task.owner)

    const user = await User.findById('5d52ca2cbc535c3e9ccad2b9')
    await user.populate('tasks').execPopulate()
    console.log(user.tasks)
}

//main()
