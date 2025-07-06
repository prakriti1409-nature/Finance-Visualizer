'use client';

import React from 'react';

type Transaction = {
  _id: string;
  amount: number;
  description: string;
  category: string;
  date: string;
};

type Props = {
  transactions: Transaction[];
};

export default function Csvmaker({ transactions }: Props) {
  const handleExport = () => {
    if (!transactions.length) return;

    const headers = ['Amount', 'Description', 'Category', 'Date'];
    const rows = transactions.map(txn => [
      txn.amount,
      `"${txn.description}"`,
      txn.category,
      new Date(txn.date).toLocaleDateString(),
    ]);

    const csvContent =
      [headers, ...rows].map(e => e.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'transactions.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="mt-6 text-center">
      <button
        onClick={handleExport}
        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
      >
        ⬇️ Export as CSV
      </button>
    </div>
  );
}
