var fs = require('fs');
var csv = require('fast-csv');
var stream = fs.createReadStream('../csvFiles/cs.csv');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var masterList = [];

mongoose.connect('mongodb://localhost:27017/StudyGenie');

csv.fromStream(stream, {headers:true})
    .on('data', function(data){
      var userName = 'user' + data.userName
      var userCollection = mongoose.model('user', userSchema)
      
      userCollection.findOne({name:userName}, {_id:1}, function(err, userId) {
        if(err)
          console.log(err)

        data.owner = userId
        var randomDate = getRandomDate(new Date(2016,1,1));
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
    .on('end', function(){
      console.log('done');
      // console.log(masterList.toString());
      
    });

function getRandomDate(start, end = new Date()) {
  var diffTime = end.getTime() - start.getTime()
  return new Date(start.getTime() + Math.random() * diffTime);
}

const csSchema = new Schema({
  _id: Schema.Types.ObjectId,
  title: String,
  notes: [Schema.Types.ObjectId],
  owner: {
    username: String,
    fullname: String
  },
  createDateTime: Date,
  modDateTime: Date
});

var CS = mongoose.model('CS', csSchema)

const noteSchema = new Schema({
  _id: Schema.Types.ObjectId,
  title: String,
  content: String,
  owner: Schema.Types.ObjectId,
  isPrivate: Boolean,
  meta: {
    tags: [Schema.Types.ObjectId],
    fav: [Schema.Types.ObjectId],
    upvote: [Schema.Types.ObjectId],
    downvote: [Schema.Types.ObjectId],
  },
  createDateTime: Date,
  modDateTime: Date
});

const userSchema = new Schema({
  _id: Schema.Types.ObjectId,
  name: { type: String, required: true },
  geo: {
    city: String,
    country: String
  },
  groups: [String],
  createDateTime: Date,
  modDateTime: Date
});

var note = mongoose.model('note', noteSchema)