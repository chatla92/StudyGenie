const fs = require('fs');
const csv = require('fast-csv');
const stream = fs.createReadStream('../csvFiles/note.csv');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost:27017/StudyGenie');

function getRandomDate(start, end = new Date()) {
  const diffTime = end.getTime() - start.getTime();
  return new Date(start.getTime() + Math.random() * diffTime);
}

const noteSchema = new Schema({
  _id: Schema.Types.ObjectId,
  title: String,
  content: String,
  owner: {
    username: String,
    fullname: String
  },
  isPrivate: Boolean,
  meta: {
    tags: [Schema.Types.ObjectId],
    fav: [{
      username: String,
      fullname: String
    }],
    upvote: [{
      username: String,
      fullname: String
    }],
    downvote: [{
      username: String,
      fullname: String
    }],
  },
  createDateTime: Date,
  modDateTime: Date,
});

const userSchema = new Schema({
  _id: Schema.Types.ObjectId,
  name: { type: String, required: true },
  geo: {
    city: String,
    country: String,
  },
  groups: [String],
  createDateTime: Date,
  modDateTime: Date,
});

const Note = mongoose.model('Note', noteSchema);
const User = mongoose.model('User', userSchema);

csv.fromStream(stream, { headers: true })
    .on('data', function (data) {
      if(data.content !== "NULL" && data.title !== "NULL") {
        const username = 'user' + data.username + '@gmail.com';

        User.findOne({ username }, function (err, userInfo) {
          if (err) return res.status(500).send();

          data.owner = {
            "username": userInfo.username,
            "fullname": userInfo.fullname
          };
          const randomDate = getRandomDate(new Date(2016, 1, 1));
          data.createDateTime = randomDate.toISOString();
          data.modDateTime = getRandomDate(randomDate).toISOString();

          const job = new Note(data);
          job._id = mongoose.Types.ObjectId();
          job.save(function (err) {
            if (err) res.status(500).send();
          });
        });
      }
    })
    .on('end', function () {
      console.log('done');
      // console.log(masterList.toString());
    });
