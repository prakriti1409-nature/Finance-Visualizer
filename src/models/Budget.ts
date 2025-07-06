import mongoose, { Schema, models } from 'mongoose';

const BudgetSchema = new Schema({
  category: { type: String, required: true },
  month: { type: String, required: true }, // Format: "Jul 2025"
  amount: { type: Number, required: true },
});

export const Budget = models.Budget || mongoose.model('Budget', BudgetSchema);
