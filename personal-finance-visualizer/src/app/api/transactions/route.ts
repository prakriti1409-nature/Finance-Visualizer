import { NextRequest } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Transaction from '@/models/Transaction';

export async function GET() {
  try {
    await connectToDatabase();
    const transactions = await Transaction.find().sort({ date: -1 });
    return Response.json(transactions);
  } catch (err: any) {
    return Response.json({ error: err.message || 'Failed to fetch transactions' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    await connectToDatabase();
    const newTransaction = await Transaction.create(body);
    return Response.json(newTransaction, { status: 201 });
  } catch (err: any) {
    return Response.json({ error: err.message || 'Failed to create transaction' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json(); // expects { id: "...transactionId" }
    await connectToDatabase();
    const deleted = await Transaction.findByIdAndDelete(id);

    if (!deleted) {
      return Response.json({ error: 'Transaction not found' }, { status: 404 });
    }

    return Response.json({ success: true, deleted });
  } catch (err: any) {
    return Response.json({ error: err.message || 'Failed to delete transaction' }, { status: 500 });
  }
}

// Add inside the same file where GET/POST/DELETE are
export async function PATCH(req: NextRequest) {
  try {
    const { id, updates } = await req.json();
    await connectToDatabase();
    const updated = await Transaction.findByIdAndUpdate(id, updates, { new: true });
    return Response.json(updated);
  } catch (err: any) {
    return Response.json({ error: err.message || 'Failed to update transaction' }, { status: 500 });
  }
}

