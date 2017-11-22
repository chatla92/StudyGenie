const fs = require('fs');
const csv = require('fast-csv');
const stream = fs.createReadStream('../csvFiles/tag.csv');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost:27017/StudyGenie');

function getRandomDate(start, end = new Date()) {
  const diffTime = end.getTime() - start.getTime();
  return new Date(start.getTime() + Math.random() * diffTime);
}

const tagSchema = new Schema({
  _id: Schema.Types.ObjectId,
  name: { type: String, required: true },
  noteId: [Schema.Types.ObjectId],
  createDateTime: Date,
});

const Tag = mongoose.model('Tag', tagSchema);

// read in CSV as stream row by row
csv.fromStream(stream, { headers: true })
    .on('data', function (data) {
      data.createDateTime = getRandomDate(new Date(2015, 1, 1), new Date(2015, 12, 30)).toISOString();
      const job = new Tag(data);
      job._id = mongoose.Types.ObjectId();
      job.save(function (err) {
        if (err) console.log(err);
      });
    })
    .on('end', function () {
      console.log('done');
    });
