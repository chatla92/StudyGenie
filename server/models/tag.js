const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tagSchema = new Schema({
  _id: Schema.Types.ObjectId,
  name: { type: String, required: true },
  noteId: [Schema.Types.ObjectId],
  createDateTime: Date,
});

export default mongoose.model('Tag', tagSchema);
