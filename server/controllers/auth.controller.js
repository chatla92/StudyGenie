import Auth from '../models/auth';
import User from '../models/user';
import mongoose from 'mongoose';
import Transaction from 'mongoose-transactions';
var express = require('express')
var session = require('express-session')

var app = express();
app.use(session());


/**
 * Authenticate User
 * @param req
 * @param res
 * @returns void
 */
export function authUser(req, res) {
  var sessionData = req.session;
  const { username, password } = req.body;
  Auth.findOne({ username, password }, (err, foundCredential) => {
    if (err) return res.status(500).send();
    if (!foundCredential) return res.status(401).send();
    req.session.username = foundCredential.username;
    console.log("Set session variable = " + req.session.username)
    sessionData.save(function(err) {
      return;
    });
    console.log("Set session variable = " + req.session.username)
    console.log("Set session variable = " + JSON.stringify(sessionData))

    User.findOne({ username }, function (userError, foundUser) {
      if (userError) return res.status(410).json({ result: 'failed', result: 'Requested user data is not present in the server' });
      if(foundUser)
        return res.status(200).json({ status: 'success', result: { 'username': foundCredential.username, 'fullname': foundUser.fullname } });
      else
        return res.status(404).json({ status: 'failed', result: "User not found" });
    });
  });
  exports.username = username
}

/**
 * Add User
 * @param req
 * @param res
 * @returns void
 */
export function addUser(req, res) {
  const { username, password, fullname } = req.body;
  const createDateTime = Date.now();

  Auth.findOne({ username }, (err, foundCredential) => {
    if (err) return res.status(500).send();
    if (foundCredential) return res.status(409).json({ status: 'emailTaken', result: 'Username already taken' });

    const _id = mongoose.Types.ObjectId();
    const newAuth = { _id, username, password };
    const user_id = mongoose.Types.ObjectId();
    const newUser = { _id: user_id, username, fullname, createDateTime };

    const transaction = new Transaction();
    transaction.insert('Auth', newAuth);
    transaction.insert('User', newUser);

    transaction.run().then((records) => {
      console.log(records);
      const result = { username: records[0].username, fullname: records[1].fullname };
      res.status(200).json({ status: 'success', result });
    }).catch(() => {
      transaction.rollback();
      res.status(530).json({ err: 'Site is Frozen', result });
    });
  });
}

/**
 * Logout
 * @param req
 * @param res
 * @returns void
 */
export function logout(req, res) {
  if (req.session) {
    // delete session object
    req.session.destroy(function(err) {
      if(err) {
        return res.status(404).json(status:'failed', result:err)
      } else {
        return res.status(200).json({ status: 'success' });
      }
    });
  }
  // req.session.username = null;
  // return res.status(200).json({ status: 'success' });
}
