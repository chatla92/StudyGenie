import Auth from '../models/auth';
import User from '../models/user';
import mongoose from 'mongoose';
import Transaction from 'mongoose-transactions';

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

    User.findOne({ username }, function (userError, foundUser) {
      if (userError) return res.status(410).json({ result: 'failed', result: 'Requested user data is not present in the server' });
      return res.status(200).json({ status: 'success', result: { 'username': foundCredential.username, 'fullname': foundUser.fullname } });
    });
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
  req.session.user = null;
  return res.status(200).json({ status: 'success' });
}
