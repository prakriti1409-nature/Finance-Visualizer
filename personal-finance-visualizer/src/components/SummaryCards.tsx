'use client';

type Transaction = {
  amount: number;
  description: string;
  date: string;
};

type Props = {
  transactions: Transaction[];
};

export default function SummaryCards({ transactions }: Props) {
  const total = transactions.reduce((sum, txn) => sum + txn.amount, 0);
  const recent = [...transactions]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-10">
      <div className="p-4 bg-white border rounded shadow">
        <h3 className="text-lg font-semibold">Total Spent</h3>
        <p className="text-2xl font-bold mt-2 text-blue-600">₹{total}</p>
      </div>

      <div className="p-4 bg-white border rounded shadow">
        <h3 className="text-lg font-semibold">Recent Transactions</h3>
        <ul className="mt-2 space-y-1 text-sm text-gray-700">
          {recent.map((txn, index) => (
            <li key={index} className="flex justify-between">
              <span>{txn.description}</span>
              <span>₹{txn.amount}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
