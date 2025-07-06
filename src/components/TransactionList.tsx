'use client';

import { useState } from 'react';

type Transaction = {
  _id: string;
  amount: number;
  description: string;
  category: string;
  date: string;
};

type Props = {
  transactions: Transaction[];
  onChange: () => void;
};

export default function TransactionList({ transactions, onChange }: Props) {
  const [filters, setFilters] = useState({
    fromDate: '',
    toDate: '',
    minAmount: '',
    maxAmount: '',
    search: '',
  });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editData, setEditData] = useState({ amount: '', description: '', category: '' });

  const applyFilters = (txn: Transaction) => {
    const date = new Date(txn.date);
    if (filters.fromDate && date < new Date(filters.fromDate)) return false;
    if (filters.toDate && date > new Date(filters.toDate)) return false;
    if (filters.minAmount && txn.amount < Number(filters.minAmount)) return false;
    if (filters.maxAmount && txn.amount > Number(filters.maxAmount)) return false;
    if (
      filters.search &&
      !(
        txn.description.toLowerCase().includes(filters.search.toLowerCase()) ||
        txn.category.toLowerCase().includes(filters.search.toLowerCase())
      )
    )
      return false;
    return true;
  };

  const filteredTxns = transactions.filter(applyFilters);

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
  };

  const handleDelete = async (id: string) => {
    await fetch('/api/transactions', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }) });
    onChange();
  };

  const handleUpdate = async (id: string) => {
    await fetch('/api/transactions', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, updates: { ...editData, amount: Number(editData.amount) } }),
    });
    setEditingId(null);
    onChange();
  };

  return (
    <div className="mt-8">
      <b>FILTER :</b><p className='text-yellow-800'> 1-From Date, 2-To Date, 3-Search Item, 4-Minimum Amount, 5-Maximum Amount</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-4">
        <input type="date" onChange={e => setFilters(f => ({ ...f, fromDate: e.target.value }))} className="p-2 border rounded" placeholder="From Date" />
        <input type="date" onChange={e => setFilters(f => ({ ...f, toDate: e.target.value }))} className="p-2 border rounded" placeholder="To Date" />
        <input type="text" onChange={e => setFilters(f => ({ ...f, search: e.target.value }))} className="p-2 border rounded" placeholder="Search Item..." />
        <input type="number" onChange={e => setFilters(f => ({ ...f, minAmount: e.target.value }))} className="p-2 border rounded" placeholder="Min Amount" />
        <input type="number" onChange={e => setFilters(f => ({ ...f, maxAmount: e.target.value }))} className="p-2 border rounded" placeholder="Max Amount" />
      </div>

      {filteredTxns.length === 0 && <p className="text-center text-gray-500">No transactions found.</p>}

      {filteredTxns.map(txn => (
        <div key={txn._id} className="p-4 border rounded mb-3">
          {editingId === txn._id ? (
            <div>
              {/* inline edit inputs */}
              <input value={editData.amount} onChange={e => setEditData(d => ({ ...d, amount: e.target.value }))} className="border p-1 mr-1 w-20" />
              <input value={editData.description} onChange={e => setEditData(d => ({ ...d, description: e.target.value }))} className="border p-1 mr-1 w-32" />
              <input value={editData.category} onChange={e => setEditData(d => ({ ...d, category: e.target.value }))} className="border p-1 mr-1 w-24" />
              <button onClick={() => handleUpdate(txn._id)} className="text-green-900 mr-2">Save</button>
              <button onClick={() => setEditingId(null)} className="text-gray-600">Cancel</button>
            </div>
          ) : (
            <div className="flex justify-between items-center">
              <div>
                <p className="text-lg">₹{txn.amount}</p>
                <p>{txn.description} • {txn.category}</p>
                <p className="text-xs text-black">{formatDate(txn.date)}</p>
              </div>
              <div className="space-x-2">
                <button onClick={() => { setEditingId(txn._id); setEditData({ amount: txn.amount.toString(), description: txn.description, category: txn.category }); }} className="text-black"><b>Edit</b></button>
                <button onClick={() => handleDelete(txn._id)} className="text-red-600"><b>Delete</b></button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
