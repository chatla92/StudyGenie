var mongoose = require('mongoose');
const Schema = mongoose.Schema;

var authSchema = new Schema({
  // _id: mongoose.Schema.Types.ObjectId,
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    min: [3, 'Min of 3 characters'],
    max: [10, 'Max of 10 characters'],
  },
});

export default mongoose.model('Auth', authSchema);
