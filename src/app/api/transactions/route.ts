import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Transaction from '@/models/Transaction';

export async function GET(_: NextRequest) {
  await connectToDatabase();
  const transactions = await Transaction.find().sort({ date: -1 }).lean();
  return NextResponse.json(transactions);
}

export async function POST(req: NextRequest) {
  await connectToDatabase();
  const body = await req.json();
  const newTransaction = await Transaction.create(body);
  return NextResponse.json(newTransaction);
}

export async function DELETE(req: NextRequest) {
  await connectToDatabase();
  const { id } = await req.json();
  const deleted = await Transaction.findByIdAndDelete(id);
  return NextResponse.json({ success: !!deleted });
}

export async function PUT(req: NextRequest) {
  await connectToDatabase();
  const { id, ...updates } = await req.json();
  const updated = await Transaction.findByIdAndUpdate(id, updates, { new: true });
  return NextResponse.json(updated);
}
