import { Link } from 'react-router-dom'

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 bg-blue-600 rounded-full opacity-5 blur-3xl" />
      </div>

      <div className="relative w-full max-w-sm text-center flex flex-col items-center gap-6">
        <span className="text-5xl">🚧</span>
        <div>
          <h1 className="text-2xl font-bold text-white mb-2">Page in Progress</h1>
          <p className="text-gray-400 text-sm leading-relaxed">
            Sign up is not available yet. This page is under construction.
          </p>
        </div>
        <Link
          to="/login"
          className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
        >
          ← Back to sign in
        </Link>
      </div>
    </div>
  )
}
