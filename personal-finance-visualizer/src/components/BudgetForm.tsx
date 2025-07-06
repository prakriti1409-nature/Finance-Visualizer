'use client';

import { useState } from 'react';

export default function BudgetForm() {
  const [category, setCategory] = useState('');
  const [rawMonth, setRawMonth] = useState(''); // 👈 This keeps YYYY-MM format
  const [amount, setAmount] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Format the month just before submitting
    const [year, m] = rawMonth.split('-');
    const date = new Date(Number(year), Number(m) - 1);
    const formattedMonth = date.toLocaleString('default', { month: 'short', year: 'numeric' });

    const res = await fetch('/api/budgets', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        category,
        month: formattedMonth,
        amount: Number(amount),
      }),
    });

    const data = await res.json();
    if (res.ok) {
      alert('Budget saved!');
      setCategory('');
      setRawMonth('');
      setAmount('');
    } else {
      alert('Error: ' + data.error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 mt-8 border p-4 rounded shadow bg-white"
    >
      <h2 className="text-lg font-bold">Set Monthly Budget</h2>

      <input
        type="text"
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="w-full p-2 border rounded"
        required
      />

      <input
        type="month"
        value={rawMonth}
        onChange={(e) => setRawMonth(e.target.value)} // ✅ Keep browser value intact
        className="w-full p-2 border rounded"
        required
      />

      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="w-full p-2 border rounded"
        required
      />

      <button
        type="submit"
        className="bg-black text-white px-4 py-2 rounded w-full"
      >
        Save Budget
      </button>
    </form>
  );
}
