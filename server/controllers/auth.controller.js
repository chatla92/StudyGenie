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

    User.findOne({username}, function(userError, foundUser) {
      if(userError) return res.status(410).json({result:"failed", result:"Requested user data is not present in the server"});
      return res.status(200).json({ status: 'success', result: {"username": foundCredential.username, "fullname": foundUser.fullname }});
    })
    
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
    if (err) return res.status(500).send();
    if (foundCredential) return res.status(409).json({status:"failed", result:"Username already taken"});
    const _id = mongoose.Types.ObjectId();
    const newAuth = new Auth({ _id, username, password });
    const user_id = mongoose.Types.ObjectId();
    const newUser = new User({ _id: user_id, username, fullname, createDateTime });
    newAuth.save(function (authError) {
      if (authError) return res.status(500).send();
    });

    newUser.save(function (userError) {
      if (userError)  return res.status(500).send();
      return res.status(200).send({status:"success", result:{"username": username, "fullname": fullname}});
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
