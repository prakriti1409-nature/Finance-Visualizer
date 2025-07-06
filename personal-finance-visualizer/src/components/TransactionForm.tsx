'use client';

import { useState } from 'react';
import { CATEGORIES } from '@/utils/categories';

type Props = {
  onAdd: () => void;
};

export default function TransactionForm({ onAdd }: Props) {
  const [form, setForm] = useState({
    amount: '',
    description: '',
    category: '',
    date: '',
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/transactions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          amount: Number(form.amount),
        }),
      });

      if (res.ok) {
        setForm({ amount: '', description: '', category: '', date: '' });
        setSuccess(true);
        onAdd(); // refresh state
      } else {
        const err = await res.json();
        console.error('Error:', err);
      }
    } catch (err) {
      console.error('Fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded-md max-w-md mx-auto space-y-4">
      <h2 className="text-xl font-semibold">ADD TRANSACTION</h2>

      <input
        type="number"
        name="amount"
        placeholder="Amount"
        value={form.amount}
        onChange={handleChange}
        required
        className="w-full px-3 py-2 border rounded"
      />

      <input
        type="text"
        name="description"
        placeholder="Description"
        value={form.description}
        onChange={handleChange}
        className="w-full px-3 py-2 border rounded"
      />

      <select
        name="category"
        value={form.category}
        onChange={handleChange}
        required
        className="w-full px-3 py-2 border rounded"
      >
        <option value="">Select Category</option>
        {CATEGORIES.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>

      <input
        type="date"
        name="date"
        value={form.date}
        onChange={handleChange}
        required
        className="w-full px-3 py-2 border rounded"
      />

      <button
        type="submit"
        disabled={loading}
        className="w-full py-2 bg-black text-white rounded hover:bg-blue-700"
      >
        {loading ? 'Saving...' : 'Add Transaction'}
      </button>

      {success && <p className="text-green-600">Transaction added!</p>}
    </form>
  );
}
