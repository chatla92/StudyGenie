import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const noteSchema = new Schema({
  _id: Schema.Types.ObjectId,
  title: String,
  content: String,
  owner: [Schema.Types.ObjectId],
  isPrivate: Boolean,
  meta: {
  	                    tags: [Schema.Types.ObjectId],
    fav: [Schema.Types.ObjectId],
  	                    upvote: [Schema.Types.ObjectId],
  	                    downvote: [Schema.Types.ObjectId],
  },
  createDateTime: Date,
  modDateTime: Date,
});

export default mongoose.model('note', noteSchema);
