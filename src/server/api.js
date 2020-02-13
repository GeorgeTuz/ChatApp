const express = require('express');
const uuidv1 = require('uuid/v1');
const User = require('./modules/users');
const Message = require('./modules/messages');

const router = express.Router();

router.get('/users', (req, res) => {
  User.find({}).then(users => {
    const newUsers = users.map(({ id, name }) => ({ id, name }));
    res.send(newUsers);
  });
});

router.post('/user', (req, res) => {
  const newUser = {
    id: uuidv1(),
    name: req.body.name,
  };
  User.create(newUser).then(user => {
    res.send(user);
  });
});

router.put('/user/:id', (req, res) => {
  User.findByIdAndUpdate({ _id: req.params.id }, req.body).then(() => {
    User.findOne({ _id: req.params.id }).then(user => {
      res.send(user);
    });
  });
});

router.delete('/user/:id', (req, res) => {
  User.deleteOne({ _id: req.params.id }).then(user => {
    res.send(user);
  });
});

router.get('/messages', (req, res) => {
  Message.find({}).then(messages => {
    const newMessages = messages.map(({ id, userId, userName, message, createdAt, updatedAt }) => ({
      id,
      userId,
      userName,
      message,
      createdAt,
      updatedAt,
    }));
    res.send(newMessages);
  });
});

router.post('/message', (req, res) => {
  const newMessage = {
    id: uuidv1(),
    userId: req.body.userId,
    userName: req.body.userName,
    message: req.body.message,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  Message.create(newMessage).then(message => {
    res.send(message);
  });
});

router.put('/message/:id', (req, res) => {
  Message.findByIdAndUpdate({ _id: req.params.id }, req.body).then(() => {
    Message.findOne({ _id: req.params.id }).then(message => {
      res.send(message);
    });
  });
});

router.delete('/message/:id', (req, res) => {
  Message.deleteOne({ _id: req.params.id }).then(message => {
    res.send(message);
  });
});

module.exports = router;
