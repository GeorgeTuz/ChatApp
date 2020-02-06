const express = require("express");
const User = require("./modules/users");
const Message = require("./modules/messages");
const router = express.Router();
const uuidv1 = require('uuid/v1');


router.get("/users", (req,res)=>{
    User.find({}).then(user =>{
        res.send(user);
    })
});

router.post("/user", (req,res)=>{
    const newUser = {
        id: uuidv1(),
        name: req.body.name
    }
    User.create(newUser).then(user => {
        res.send(user)
    });
});

router.put("/user/:id", (req,res)=>{
    User.findByIdAndUpdate({_id:req.params.id}, req.body).then(() =>{
        User.findOne({_id: req.params.id}).then( user =>{
            res.send(user)
        })
    })
});

router.delete("/user/:id", (req,res)=>{
    User.deleteOne({_id: req.params.id})
    .then(user => {
      res.send(user)
    });
});

router.get("/messages", (req,res)=>{
    Message.find({}).then(message =>{
        res.send(message)
    })
});

router.post("/message", (req,res)=>{
    const newMessage = {
        id: uuidv1(),
        user_id: req.body.user_id,
        message: req.body.message,
        created_at: new Date(),
        updated_at: new Date()
    }
    Message.create(newMessage).then(message => {
        res.send(message)
    });
});

router.put("/message/:id", (req,res)=>{
    Message.findByIdAndUpdate({_id:req.params.id}, req.body).then(() =>{
        message.findOne({_id: req.params.id}).then( message =>{
            res.send(message)
        })
    })
});

router.delete("/message/:id", (req,res)=>{
    Message.deleteOne({_id: req.params.id})
    .then(message => {
      res.send(message)
    });
});

module.exports = router;