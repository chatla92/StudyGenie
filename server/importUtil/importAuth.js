const fs = require('fs');
const csv = require('fast-csv');
const stream = fs.createReadStream('../csvFiles/auth.csv');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost:27017/StudyGenie');

const authSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    min: [3, 'Min. of 3 characters are required'],
    max: [10, 'Max. of 10 characters are allowed'],
  },
});

const Auth = mongoose.model('Auth', authSchema);

csv.fromStream(stream, { headers: true })
    .on('data', function (data) {
      const job = new Auth(data);
      job._id = mongoose.Types.ObjectId();
      job.save(function (err) {
        if (err)  console.log(err);
      });
    })
    .on('end', function () {
      console.log('done');
    });

