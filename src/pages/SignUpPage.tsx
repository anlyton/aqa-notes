import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function SignUpPage() {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 bg-blue-600 rounded-full opacity-5 blur-3xl" />
      </div>

      <div className="relative w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-8">
          <span className="text-4xl">🧪</span>
          <h1 className="text-2xl font-bold text-white mt-3">AQA Notes</h1>
          <p className="text-gray-400 text-sm mt-1">Create an account</p>
        </div>

        <div className="bg-gray-800 border border-gray-700 rounded-2xl p-8 shadow-xl">
          {submitted ? (
            <div className="text-center flex flex-col items-center gap-4">
              <div className="w-12 h-12 bg-blue-900/40 border border-blue-700 rounded-full flex items-center justify-center text-2xl">
                📬
              </div>
              <div>
                <p className="text-white font-semibold mb-1">Request received</p>
                <p className="text-gray-400 text-sm">
                  This is a private knowledge base. Access is granted manually — we'll be in touch.
                </p>
              </div>
              <Link
                to="/login"
                className="text-sm text-blue-400 hover:text-blue-300 transition-colors mt-2"
              >
                ← Back to sign in
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div className="flex flex-col gap-1.5">
                <label htmlFor="name" className="text-sm font-medium text-gray-300">Name</label>
                <input
                  id="name"
                  type="text"
                  placeholder="Your name"
                  required
                  className="bg-gray-900 border border-gray-600 rounded-lg px-4 py-2.5 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="email" className="text-sm font-medium text-gray-300">Email</label>
                <input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  required
                  className="bg-gray-900 border border-gray-600 rounded-lg px-4 py-2.5 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="password" className="text-sm font-medium text-gray-300">Password</label>
                <input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  required
                  className="bg-gray-900 border border-gray-600 rounded-lg px-4 py-2.5 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                />
              </div>

              <div className="bg-blue-950/50 border border-blue-800 rounded-lg px-3 py-2.5 text-xs text-blue-300">
                🔒 This is a private knowledge base. Registration requests are reviewed manually.
              </div>

              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-lg px-4 py-2.5 text-sm transition-colors mt-1"
              >
                Request access
              </button>

              <p className="text-center text-sm text-gray-500">
                Already have access?{' '}
                <Link to="/login" className="text-blue-400 hover:text-blue-300 transition-colors">
                  Sign in
                </Link>
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
