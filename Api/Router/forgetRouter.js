const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const async = require('async');
const crypto = require('crypto');
const UserForgot = require('../../Database/model/forgotModel');
const axios = require('axios');

router.post('/', function (req, res, next) {
  let token = '';
  // const URL = 'https://dkshs-v2-56e538e53ee1.herokuapp.com/reset/';
  const URL = 'http://localhost:3000/reset/';
  async.waterfall([
    function (done) {
      crypto.randomBytes(20, function (err, buf) {
        token = buf.toString('hex');
        done(err, token);
      });
    },
    function (token, done) {
      var userForgot = new UserForgot();

      userForgot.resetPasswordToken = token;
      userForgot.resetPasswordExpires = Date.now() + 3600000;
      userForgot.email = req.body.email;

      userForgot
        .save()
        .then(() => {
          done(null, token, userForgot);
        })
        .catch((err) => {
          console.error(err);
          done(err);
        });
    },
    function (token, userForgot, done) {
      var mailData = {
        sender: {
          name: 'DKSH ',
          email: 'hamad.softdev@gmail.com',
        },
        to: [
          {
            email: userForgot.email,
          },
        ],
        subject: 'DKSH (forgot password)',
        textContent:
          'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
          'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
          URL + token + '\n\n' +
          'If you did not request this, please ignore this email and your password will remain unchanged.\n',
      };

      axios
        .post('https://api.sendinblue.com/v3/smtp/email', mailData, {
          headers: {
            'Content-Type': 'application/json',
            'api-key': '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',
          },
        })
        .then((response) => {
          done(null, 'done');
        })
        .catch((err) => {
          console.error(err);
          done(err);
        });
    }
  ], function (err) {
    if (err) return next(err);
    // Send the response after the async waterfall is completed
    res.send({ success: true, message: 'Your e-mail has been sent.' });
  });
});

module.exports = router;
