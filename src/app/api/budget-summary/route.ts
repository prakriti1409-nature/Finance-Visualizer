import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Transaction from '@/models/Transaction';
import { Budget } from '@/models/Budget';

export async function GET(_: NextRequest) {
  await connectToDatabase();

  const transactions = await Transaction.find().lean();
  const budgets = await Budget.find().lean();

  const spendingMap: Record<string, number> = {};

  for (const txn of transactions) {
    const cat = txn.category.toLowerCase();
    spendingMap[cat] = (spendingMap[cat] || 0) + txn.amount;
  }

  const summary = budgets.map((budget) => {
    const cat = budget.category.toLowerCase();
    return {
      category: budget.category,
      budget: budget.amount,
      spent: spendingMap[cat] || 0,
    };
  });

  return NextResponse.json(summary);
}
