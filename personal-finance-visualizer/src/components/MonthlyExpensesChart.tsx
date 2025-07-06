'use client';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';

type Transaction = {
  amount: number;
  date: string;
};

type Props = {
  transactions: Transaction[];
};

type MonthlyData = {
  month: string;
  total: number;
};

export default function MonthlyExpensesChart({ transactions }: Props) {
  const grouped: Record<string, number> = {};

  transactions.forEach(({ amount, date }) => {
    const monthKey = new Date(date).toLocaleString('default', {
      month: 'short',
      year: 'numeric',
    });

    grouped[monthKey] = (grouped[monthKey] || 0) + amount;
  });

  const data: MonthlyData[] = Object.entries(grouped).map(([month, total]) => ({
    month,
    total,
  }));

  if (!data.length) return <p className="text-center mt-8 text-gray-500">No data to show yet.</p>;

  return (
    <div className="mt-12 w-full">
      <h2 className="text-xl font-semibold mb-4">Monthly Expenses</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="total" fill="#3b82f6" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
