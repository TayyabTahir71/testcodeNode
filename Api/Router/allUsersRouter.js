
const express = require('express');
const allUsersRouter = express.Router();
const Developers = require('../../Database/model/Developer');


allUsersRouter.get('/alluser', async (req, res) => {
  try {
    const users = await Developers.find({});
    res.send({ success: true, users });

  } catch (error) {
    console.error('Error retrieving user data:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});


module.exports = allUsersRouter;