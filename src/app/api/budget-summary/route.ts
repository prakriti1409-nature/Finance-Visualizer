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
      .filter((t) => t.category.toLowerCase() === b.category.toLowerCase())
      .reduce((sum, t) => sum + t.amount, 0);

    return {
      category: b.category,
      budget: b.amount,
      spent,
    };
  });

  return NextResponse.json(summary);
}
