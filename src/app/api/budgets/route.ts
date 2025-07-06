import { Budget } from '@/models/Budget';
import connectToDatabase from '@/lib/mongodb';


export async function GET() {
  try {
    await connectToDatabase();
    const budgets = await Budget.find();
    return Response.json(budgets);
  } catch (err: any) {
    return Response.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await connectToDatabase();
    const body = await req.json();

    const newBudget = new Budget(body);
    await newBudget.save();

    return Response.json(newBudget);
  } catch (err: any) {
    return Response.json({ error: err.message }, { status: 500 });
  }
}
