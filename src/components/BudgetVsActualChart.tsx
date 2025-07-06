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

  // ✅ Ensure month string comparison is trimmed and case-insensitive
  const filteredData = selectedMonth
    ? data.filter(
        (item) => item.month.trim().toLowerCase() === selectedMonth.trim().toLowerCase()
      )
    : data;

  const uniqueMonths = Array.from(new Set(data.map((d) => d.month))).sort(
    (a, b) => new Date(a).getTime() - new Date(b).getTime()
  );

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
          {uniqueMonths.map((m, i) => (
            <option key={`${m}-${i}`} value={m}>
              {m}
            </option>
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
