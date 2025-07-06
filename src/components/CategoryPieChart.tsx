'use client';

import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const COLORS = ['#6366f1', '#10b981', '#f97316', '#ef4444', '#14b8a6', '#eab308'];

type Transaction = {
  category: string;
  amount: number;
};

type Props = {
  transactions: Transaction[];
};

export default function CategoryPieChart({ transactions }: Props) {
  const grouped: Record<string, number> = {};

  transactions.forEach(({ category, amount }) => {
    const cat = category.toLowerCase();
    grouped[cat] = (grouped[cat] || 0) + amount;
  });

  const data = Object.entries(grouped).map(([category, total]) => ({
    category,
    total,
  }));

  if (!data.length) return <p className="text-center mt-8">No category data yet.</p>;

  return (
    <div className="mt-12 w-full">
      <h2 className="text-xl font-semibold mb-4">Category Breakdown</h2>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            dataKey="total"
            nameKey="category"
            cx="50%"
            cy="50%"
            outerRadius={100}
            label
          >
            {data.map((_, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
