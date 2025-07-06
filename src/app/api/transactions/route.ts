import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Transaction from '@/models/Transaction';

export async function GET() {
  await connectToDatabase();
  const transactions = await Transaction.find().sort({ date: -1 }).lean();
  return NextResponse.json(transactions);
}

export async function POST(request: Request) {
  await connectToDatabase();
  const body = await request.json();
  const newTransaction = await Transaction.create(body);
  return NextResponse.json(newTransaction);
}

export async function DELETE(request: Request) {
  await connectToDatabase();
  const body = await request.json();
  await Transaction.findByIdAndDelete(body._id);
  return NextResponse.json({ success: true });
}

export async function PATCH(request: Request) {
  await connectToDatabase();
  const body = await request.json();

  const { id, updates } = body; // ✅ expect `id` and `updates` as sent from frontend

  const updated = await Transaction.findByIdAndUpdate(id, updates, { new: true });

  return NextResponse.json(updated);
}
