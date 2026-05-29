"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function DebtPage() {
  const [name, setName] = useState("");
  const [balance, setBalance] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [minimumPayment, setMinimumPayment] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/debts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          balance: parseFloat(balance),
          interestRate: parseFloat(interestRate),
          minimumPayment: parseFloat(minimumPayment),
        }),
      });

      if (response.ok) {
        router.push("/dashboard"); // Redirect to home page after successful submission
      } else {
        console.error("Failed to add debt");
      }
    } catch (error) {
      console.error("Error adding debt:", error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900">
      <div className="max-w-md mx-auto mt-10 p-6 bg-slate-900 text-white rounded shadow">
        <h1 className="text-2xl font-bold mb-4">Add Debt</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-slate-300 mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 text-white rounded-lg focus:outline-none focus:border-green-500"
              required
            />
            <label htmlFor="balance" className="block text-slate-300 mb-2">
              Balance
            </label>
            <input
              type="number"
              id="balance"
              value={balance}
              onChange={(e) => setBalance(e.target.value)}
              className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 text-white rounded-lg focus:outline-none focus:border-green-500"
              required
            />
            <label htmlFor="interestRate" className="block text-slate-300 mb-2">
              Interest Rate
            </label>
            <input
              type="number"
              id="interestRate"
              value={interestRate}
              onChange={(e) => setInterestRate(e.target.value)}
              className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 text-white rounded-lg focus:outline-none focus:border-green-500"
              required
            />
            <label
              htmlFor="minimumPayment"
              className="block text-slate-300 mb-2"
            >
              Minimum Payment
            </label>
            <input
              type="number"
              id="minimumPayment"
              value={minimumPayment}
              onChange={(e) => setMinimumPayment(e.target.value)}
              className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 text-white rounded-lg focus:outline-none focus:border-green-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition-colors duration-200"
          >
            Add Debt
          </button>
        </form>
      </div>
    </div>
  );
}
