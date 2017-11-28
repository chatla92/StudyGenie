import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const noteSchema = new Schema({
  _id: Schema.Types.ObjectId,
  title: String,
  content: String,
  owner: {
    username: String,
    fullname: String,
  },
  isPrivate: Boolean,
  meta: {
    tags: [String],
    fav: [{
      username: String,
      fullname: String,
    }],
    upvote: [{
      username: String,
      fullname: String,
    }],
    downvote: [{
      username: String,
      fullname: String,
    }],
  },
  createDateTime: Date,
  modDateTime: Date,
});

export default mongoose.model('note', noteSchema);
