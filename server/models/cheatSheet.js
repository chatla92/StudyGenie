import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const csSchema = new Schema({
  _id: Schema.Types.ObjectId,
  title: String,
  notes: [
    {
      noteId: Number,
      position: {
        X: Number,
        Y: Number,
      },
    },
  ],
  owner: {
    username: String,
    fullname: String,
  },
  createDateTime: Date,
  modDateTime: Date,
});

export default mongoose.model('cheatSheet', csSchema);
