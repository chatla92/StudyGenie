import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const csSchema = new Schema({
  _id: Schema.Types.ObjectId,
  title: String,
  content: String,
  owner: [Schema.Types.ObjectId],
  createDateTime: Date,
  modDateTime: Date,
});

export default mongoose.model('cheatSheet', csSchema);
