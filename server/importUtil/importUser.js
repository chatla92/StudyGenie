const fs = require('fs');
const csv = require('fast-csv');
const stream = fs.createReadStream('../csvFiles/user.csv');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost:27017/StudyGenie');

function getRandomDate(start, end = new Date()) {
  const diffTime = end.getTime() - start.getTime();
  return new Date(start.getTime() + Math.random() * diffTime);
}

const userSchema = new Schema({
  _id: Schema.Types.ObjectId,
  username: { type: String, required: true },
  fullname: String,
  geo: {
    city: String,
    country: String,
  },
  groups: [String],
  createDateTime: Date,
  modDateTime: Date,
});

const User = mongoose.model('User', userSchema);

// read in CSV as stream row by row
csv.fromStream(stream, { headers: true })
    .on('data', function (data) {
      data.createDateTime = getRandomDate(new Date(2015, 1, 1), new Date(2015, 12, 30)).toISOString();
      const job = new User(data);
      job._id = mongoose.Types.ObjectId();
      job.save(function (err) {
        if (err)
          console.log(err);
      });
    })
    .on('end', function () {
      console.log('done');
    });

var user = mongoose.model('user', userSchema);
