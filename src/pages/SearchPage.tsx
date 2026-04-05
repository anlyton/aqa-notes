import { useState } from 'react'
import { Link } from 'react-router-dom'

function SearchPage() {
    const [query, setQuery] = useState('')

    return (
        <div className="min-h-screen bg-gray-900 text-white p-8">
            <Link to="/" className="text-gray-400 hover:text-white mb-8 inline-block">← Back</Link>
            <h1 className="text-4xl font-bold text-blue-400 mb-8">Search 🔍</h1>

            <input
                type="text"
                placeholder="Search notes..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full bg-gray-800 text-white p-4 rounded-lg mb-8 outline-none focus:ring-2 focus:ring-blue-400"
            />

            {query && (
                <p className="text-gray-400">Searching for: <span className="text-white">{query}</span></p>
            )}
        </div>
    )
}

export default SearchPage