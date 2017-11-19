import Auth from '../models/auth';
import cuid from 'cuid';
import slug from 'limax';
import sanitizeHtml from 'sanitize-html';

/**
 * Authenticate User
 * @param req
 * @param res
 * @returns void
 */

export function authUser(req, res) {
  const { username, password } = req.body;
  Auth.findOne({username, password}, (err, foundCredential) => {
    if (err) return res.status(500).send();
    if (!foundCredential) return res.status(401).send();
    req.session.user = foundCredential;
    return res.status(200).json({status:'success',
      sessionId:req.sessionID, name: foundCredential.name});
  });
}

// export function addUser(req, res) {
//   const { username, password, fullname } = req.body;
//   const creationTime = Date.now();

//   UserCredential.findOne({username}, (err, foundCredential) => {
//     if (err) return res.status(500).send();

//     if (foundCredential) return res.status(409).send();

//     const newCredential = new UserCredential({ username, password, fullname, creationTime });
//     newCredential.save(function(err) {
//       if (err) return res.status(500).send();
//       return res.status(200).json({status:'success'});
//     });
//   })
// }