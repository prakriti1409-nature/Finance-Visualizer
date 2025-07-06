'use client';

import { useEffect, useState } from 'react';

type Insight = {
  category: string;
  budget: number;
  spent: number;
};

export default function BudgetInsights() {
  const [insights, setInsights] = useState<Insight[]>([]);

  useEffect(() => {
    const fetchInsights = async () => {
      const res = await fetch('/api/budget-summary');
      const data = await res.json();
      setInsights(data);
    };

    fetchInsights();
  }, []);

  if (!insights.length) return null;

  return (
    <div className="mt-8 p-4 bg-yellow-50 border border-yellow-300 rounded">
      <h2 className="text-lg font-semibold mb-2">💡 Budget Insights</h2>
      <ul className="space-y-2 text-sm">
        {insights.map(({ category, budget, spent }, index) => {
          const key = `${category}-${index}`; // Ensure unique key

          if (spent > budget) {
            return (
              <li key={key} className="text-red-600">
                🚨 You overspent in <strong>{category}</strong> by ₹{spent - budget}
              </li>
            );
          } else if (spent === 0) {
            return (
              <li key={key} className="text-gray-500">
                ℹ️ No spending recorded in <strong>{category}</strong> yet.
              </li>
            );
          } else {
            return (
              <li key={key} className="text-green-600">
                ✅ You’re within budget for <strong>{category}</strong> (₹{budget - spent} left)
              </li>
            );
          }
        })}
      </ul>
    </div>
  );
}
