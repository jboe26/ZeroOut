"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [debt, setDebt] = useState([]);
  const [expenses, setExpense] = useState([]);
  const [income, setIncome] = useState([]);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  useEffect(() => {
    if (status === "authenticated") {
      const fetchData = async () => {
        try {
          const [debtsRes, transactionsRes] = await Promise.all([
            fetch("/api/debts"),
            fetch("/api/transactions"),
          ]);
          const debtsData = await debtsRes.json();
          const transactionsData = await transactionsRes.json();
          if (debtsData.success) setDebt(debtsData.debts);
          if (transactionsData.success) {
            setExpense(
              transactionsData.transactions.filter((t: any) => t.amount < 0),
            );
            setIncome(
              transactionsData.transactions.filter((t: any) => t.amount > 0),
            );
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    }
  }, [status]);

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <p className="text-white">Loading...</p>
      </div>
    );
  }

  const totalIncome = income.reduce((acc, t: any) => acc + t.amount, 0);
  const totalExpenses = expenses.reduce((acc, t: any) => acc + t.amount, 0);
  const totalDebt = debt.reduce((acc, t: any) => acc + t.amount, 0);
  const combined = [...income, ...expenses].sort(
    (a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );

  return (
    <div className="min-h-screen bg-slate-900 max-w-6xl mx-auto p-8">
      <h1 className="text-white text-3xl font-bold mb-8">Financial Overview</h1>
      <div className="mt-8 grid grid-cols-3 gap-6">
        <div className="bg-slate-800 p-4 rounded">
          <h2 className="text-xl text-white">Total Income</h2>
          <p className="text-green-400 text-2xl">${totalIncome.toFixed(2)}</p>
        </div>
        <div className="bg-slate-800 p-4 rounded">
          <h2 className="text-xl text-white">Total Expenses</h2>
          <p className="text-red-400 text-2xl">
            ${Math.abs(totalExpenses).toFixed(2)}
          </p>
        </div>
        <div className="bg-slate-800 p-4 rounded">
          <h2 className="text-xl text-white">Total Debt</h2>
          <p className="text-yellow-400 text-2xl">
            ${Math.abs(totalDebt).toFixed(2)}
          </p>
        </div>
      </div>
      <section className="mt-8">
        <h2 className="text-xl text-white mb-4">Recent Transactions</h2>
        <div className="bg-slate-800 p-4 rounded">
          {combined.map((t: any) => (
            <div
              key={t._id}
              className="flex justify-between py-2 border-b border-slate-700"
            >
              <span className="text-white">{t.description}</span>
              <span
                className={t.amount > 0 ? "text-green-400" : "text-red-400"}
              >
                ${Math.abs(t.amount).toFixed(2)}
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
