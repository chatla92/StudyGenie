import mongoose from 'mongoose';
const Schema = mongoose.Schema;

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

export default mongoose.model('user', userSchema);