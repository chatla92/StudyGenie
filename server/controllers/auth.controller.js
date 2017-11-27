import Auth from '../models/auth';
import User from '../models/user';
const mongoose = require('mongoose');

/**
 * Authenticate User
 * @param req
 * @param res
 * @returns void
 */
export function authUser(req, res) {
  const { username, password } = req.body;
  Auth.findOne({ username, password }, (err, foundCredential) => {
    if (err) return res.status(500).send();
    if (!foundCredential) return res.status(401).send();

    req.session.user = foundCredential;
    return res.status(200).json({ status: 'success',
      sessionId: req.sessionID, name: foundCredential.username });
  });
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
    console.log('foundCredential = ' + foundCredential);
    if (err) return res.status(500).send();
    if (foundCredential) return res.status(409).send();
    const _id = mongoose.Types.ObjectId();
    const newAuth = new Auth({ _id, username, password });

    const user_id = mongoose.Types.ObjectId();
    const newUser = new User({ _id: user_id, username, fullname, createDateTime });

    newAuth.save(function (err) {
      if (err) return res.status(500).send();
    });

    newUser.save(function (err) {
      if (err)  return res.status(500).send();
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
  req.session.user = null;
  return res.status(200).json({ status: 'success' });
}
