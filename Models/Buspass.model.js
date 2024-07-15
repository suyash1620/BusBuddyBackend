import mongoose from 'mongoose'
const Schema = mongoose.Schema;
const BusPassSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  passType: {
    type: String,
    enum: ['1 month', '3 months', '6 months', '1 year'],
    required: true
  },
  issueDate: {
    type: Date,
    default: Date.now
  },
  expiryDate: {
    type: Date,
    required: true
  },
});

export default mongoose.model('Buspass', BusPassSchema)
