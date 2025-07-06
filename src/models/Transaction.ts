import mongoose, { Schema } from 'mongoose';

const TransactionSchema = new Schema({
  amount: { type: Number, required: true },
  description: { type: String },
  category: { type: String },
  date: { type: Date, required: true },
}, { timestamps: true });

export default mongoose.models.Transaction || mongoose.model('Transaction', TransactionSchema);
