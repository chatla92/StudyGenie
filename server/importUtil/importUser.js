var fs = require('fs');
var csv = require('fast-csv');
var stream = fs.createReadStream('../csvFiles/user.csv');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost:27017/StudyGenie');
var db = mongoose.connection;

//read in CSV as stream row by row
csv.fromStream(stream, {headers:true})
    .on('data', function(data){
      data.createDateTime = getRandomDate(new Date(2015,1,1), new Date(2015,12,30)).toISOString();
      var job = new user(data);
      job.save(function (err) {
        if (err) 
          console.log(err);
      });
    })
    .on('end', function(){
      console.log('done');
    });

function getRandomDate(start, end = new Date()) {
  var diffTime = end.getTime() - start.getTime()
  return new Date(start.getTime() + Math.random() * diffTime);
}

const userSchema = new Schema({
  // _id: Schema.Types.ObjectId,
  name: { type: String, required: true },
  geo: {
    city: String,
    country: String
  },
  groups: [String],
  createDateTime: Date,
  modDateTime: Date
});

var user = mongoose.model('user', userSchema)