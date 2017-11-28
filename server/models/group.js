import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const grpSchema = new Schema({
  _id: Schema.Types.ObjectId,
  name: String,
  owner: {
    username: String,
    fullname: String,
  },
  members: [{
    member: [{
      username: String,
      fullname: String,
      dateAdded: Date,
    }],
  }],
  noteDate: [{
    note: [Schema.Types.ObjectId],
    dateAdded: Date,
  }],
  createDateTime: Date,
  modDateTime: Date,
});

export default mongoose.model('group', grpSchema);
