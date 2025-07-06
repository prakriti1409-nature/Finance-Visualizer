'use client';

import { useEffect, useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

type Summary = {
  category: string;
  month: string;
  spent: number;
  budget: number;
};

export default function BudgetVsActualChart() {
  const [data, setData] = useState<Summary[]>([]);
  const [selectedMonth, setSelectedMonth] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('/api/budget-summary');
      const result = await res.json();
      setData(result);
    };
    fetchData();
  }, []);

  const filteredData = selectedMonth
    ? data.filter((item) => item.month === selectedMonth)
    : data;

  const uniqueMonths = Array.from(new Set(data.map((d) => d.month)));

  return (
    <div className="mt-12">
      <div className="mb-4">
        <label className="font-medium mr-2">Filter by Month:</label>
        <select
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
          className="border px-2 py-1 rounded"
        >
          <option value="">All</option>
          {uniqueMonths.map((m) => (
            <option key={m} value={m}>{m}</option>
          ))}
        </select>
      </div>

      {filteredData.length === 0 ? (
        <p className="text-center text-gray-500">No budget data to compare.</p>
      ) : (
        <>
          <h2 className="text-xl font-semibold mb-4">Budget vs Actual</h2>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={filteredData}>
              <XAxis dataKey="category" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="budget" fill="#10b981" name="Budget" />
              <Bar dataKey="spent" fill="#ef4444" name="Spent" />
            </BarChart>
          </ResponsiveContainer>
        </>
      )}
    </div>
  );
}
