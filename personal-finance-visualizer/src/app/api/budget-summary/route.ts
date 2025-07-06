import connectToDatabase from '@/lib/mongodb';
import { Budget } from '@/models/Budget';
import Transaction  from '@/models/Transaction';

export async function GET() {
  try {
    await connectToDatabase();

    const transactions = await Transaction.find();
    const budgets = await Budget.find();

    const resultMap: Record<
      string,
      { category: string; month: string; budget: number; spent: number }
    > = {};

    // Group transactions by category+month
    for (const txn of transactions) {
      const date = new Date(txn.date);
      const month = date.toLocaleString('default', { month: 'short', year: 'numeric' });
      const key = `${txn.category.toLowerCase()}-${month}`;

      if (!resultMap[key]) {
        resultMap[key] = {
          category: txn.category.toLowerCase(),
          month,
          budget: 0,
          spent: 0,
        };
      }

      resultMap[key].spent += txn.amount;
    }

    // Merge in budgets
    for (const budget of budgets) {
      const key = `${budget.category.toLowerCase()}-${budget.month}`;

      if (!resultMap[key]) {
        resultMap[key] = {
          category: budget.category.toLowerCase(),
          month: budget.month,
          budget: 0,
          spent: 0,
        };
      }

      resultMap[key].budget = budget.amount;
    }

    const result = Object.values(resultMap);

    return Response.json(result);
  } catch (err: any) {
    return Response.json({ error: err.message }, { status: 500 });
  }
}
