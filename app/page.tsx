export default function Home() {
  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center px-6">
      <div className="text-center">
        <h1 className="text-5xl font-bold text-white mb-4">ZeroOut</h1>
        <p className="text-slate-400 text-lg mb-8">
          Track your budget. Crush your debt.
        </p>
        <div className="flex gap-8 justify-center mb-8">
          <div className="text-center">
            <p className="text-2xl mb-2">💰</p>
            <p className="text-slate-400 text-sm">Track Income</p>
          </div>
          <div className="text-center">
            <p className="text-2xl mb-2">📊</p>
            <p className="text-slate-400 text-sm">Manage Expenses</p>
          </div>
          <div className="text-center">
            <p className="text-2xl mb-2">🎯</p>
            <p className="text-slate-400 text-sm">Crush Debt</p>
          </div>
        </div>
        <div className="flex gap-4 justify-center">
          <a
            href="/signup"
            className="bg-slate-700 hover:bg-slate-600 text-white font-bold py-2 px-4 rounded"
          >
            Sign Up
          </a>
          <a
            href="/login"
            className="bg-green-700 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
          >
            Log In
          </a>
        </div>
      </div>
    </div>
  );
}
