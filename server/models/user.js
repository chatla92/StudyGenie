import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const userSchema = new Schema({
  _id: Schema.Types.ObjectId,
  username: { type: String, required: true },
  fullName: String,
  geo: {
  	city: String,
  	country: String
  },
  groups: [String],
  createDateTime: Date,
  modDateTime: Date
});

export default mongoose.model('user', userSchema);