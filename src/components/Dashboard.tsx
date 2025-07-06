'use client';

import { useEffect, useState } from 'react';
import TransactionForm from '@/components/TransactionForm';
import TransactionList from '@/components/TransactionList';
import SummaryCards from '@/components/SummaryCards';
import MonthlyExpensesChart from '@/components/MonthlyExpensesChart';
import CategoryPieChart from '@/components/CategoryPieChart';
import BudgetForm from '@/components/BudgetForm';
import BudgetVsActualChart from '@/components/BudgetVsActualChart';
import BudgetInsights from '@/components/BudgetInsights';
import  Csvmaker  from '@/components/Csvmaker';
import { BarChart3 } from 'lucide-react';


type Transaction = {
  _id: string;
  amount: number;
  description: string;
  category: string;
  date: string;
};

export default function Dashboard() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const fetchTransactions = async () => {
    const res = await fetch('/api/transactions');
    const data = await res.json();
    setTransactions(data);
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <main className="max-w-5xl mx-auto px-4 py-6 space-y-10 text-gray-800">
      <header className="text-center mb-10 space-y-4">
  <div className="flex justify-center items-center gap-3">
    <BarChart3 className="w-8 h-8 text-blue-400 transition-transform duration-300 hover:scale-110" />
    <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-snug">
      <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-emerald-400">
        Personal Finance
      </span>{' '}
      Visualizer
    </h1>
  </div>
  <p className="text-lg text-gray-300 max-w-xl mx-auto">
    Track your spending, visualize your habits, and take control of your financial future.
  </p>
</header>

      <section className="text-center">
        <Csvmaker transactions={transactions} />

      </section>

    <section className="bg-gradient-to-r from-indigo-400 via-cyan-600 to-emerald-700 p-4 rounded-lg shadow">
  <TransactionForm onAdd={fetchTransactions} />
</section>
      <h4 className="text-3xl font-bold text-white">📊 Summary of Transactions</h4>
      <section className="bg-stone-300 p-4 rounded-lg shadow">
  <SummaryCards transactions={transactions} />
</section>
      <h4 className="text-3xl font-bold text-white">📊List of all Transactions </h4>

      <section className="bg-gradient-to-br from-teal-600 via-teal-500 to-green-800 p-4 rounded-lg shadow">
        <TransactionList transactions={transactions} onChange={fetchTransactions} />
      </section>
      <h3 className="text-3xl font-bold text-white">📊 Monthly Expenses and Category Breakdown</h3>

      <section className="grid md:grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <MonthlyExpensesChart transactions={transactions} />
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <CategoryPieChart transactions={transactions} />
        </div>
      </section>
      <h3 className="text-3xl font-bold text-white">📊 Budget</h3>

      <section className="grid md:grid-cols-2 gap-6">
        <div className="bg-yellow-300 p-4 rounded-lg shadow">
          <BudgetForm />
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <BudgetVsActualChart />
        </div>
      </section>
      <h3 className="text-3xl font-bold text-white">📊BudgetInsights </h3>

      <section className="bg-slate-800 p-4 rounded-lg shadow" >
        <BudgetInsights />
      </section>

      
    </main>
  );
}
