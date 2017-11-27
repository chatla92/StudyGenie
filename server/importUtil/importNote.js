const fs = require('fs');
const csv = require('fast-csv');
const stream = fs.createReadStream('../csvFiles/note.csv');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost:27017/StudyGenie');

function getRandomDate(start, end = new Date()) {
  const diffTime = end.getTime() - start.getTime();

csv.fromStream(stream, { headers: true })
    .on('data', function (data) {
      var userName = 'user' + data.userName;
      var userCollection = mongoose.model('user', userSchema);

      userCollection.findOne({ name: userName }, { _id: 1 }, function (err, userId) {
        if (err)
          console.log(err);

        data.owner = userId;
        var randomDate = getRandomDate(new Date(2016, 1, 1));
        data.createDateTime = randomDate.toISOString();
        data.modDateTime = getRandomDate(randomDate).toISOString();

        var job = new note(data);
        job._id = mongoose.Types.ObjectId();
        job.save(function (err) {
          if (err)
            console.log(err);
        });
      });
    })
    .on('end', function () {
      console.log('done');
      // console.log(masterList.toString());
    });

function getRandomDate(start, end = new Date()) {
  var diffTime = end.getTime() - start.getTime();
>>>>>>> 8afff237aa1a1430ff24adb344ec28e7a1ac2cb2
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

var note = mongoose.model('note', noteSchema);
