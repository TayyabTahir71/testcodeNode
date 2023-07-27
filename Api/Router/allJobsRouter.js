
const express = require('express');
const JobsSkelton = require('../../Database/model/Jobs');
const allJobsRouter = express.Router();

allJobsRouter.get('/jobss', async (req, res) => {
  try { 
    const jobList = await JobsSkelton.find({});
    res.send({ success: true, list: jobList });
  } catch (error) {
    console.error('Error retrieving user data:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = allJobsRouter;