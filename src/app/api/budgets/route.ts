import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import { Budget } from '@/models/Budget';

export async function GET(_: NextRequest) {
  await connectToDatabase();
  const budgets = await Budget.find().lean();
  return NextResponse.json(budgets);
}

export async function POST(req: NextRequest) {
  await connectToDatabase();
  const body = await req.json();
  const newBudget = await Budget.create(body);
  return NextResponse.json(newBudget);
}
