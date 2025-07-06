import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import { Budget } from '@/models/Budget';
import Transaction from '@/models/Transaction';

export async function GET() {
  await connectToDatabase();

  const budgets = await Budget.find().lean();
  const transactions = await Transaction.find().lean();

  const summary = budgets.map((b) => {
    const spent = transactions
      .filter(
        (t) =>
          t.category.toLowerCase() === b.category.toLowerCase() &&
          formatMonth(t.date) === b.month
      )
      .reduce((sum, t) => sum + t.amount, 0);

    return {
      category: b.category,
      month: b.month,
      budget: b.amount,
      spent,
    };
  });

  return NextResponse.json(summary);
}

// ✅ Format date string into "Jul 2025" for comparison
function formatMonth(dateStr: string) {
  const date = new Date(dateStr);
  return date.toLocaleString('default', { month: 'short', year: 'numeric' });
}
