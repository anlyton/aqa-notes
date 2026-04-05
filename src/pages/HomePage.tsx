import { Link } from 'react-router-dom'

function HomePage() {
    return (
        <div className="min-h-screen bg-gray-900 text-white p-8">
            <h1 className="text-4xl font-bold text-blue-400 mb-2">AQA Notes 🚀</h1>
            <p className="text-gray-400 mb-8">Your personal knowledge base</p>

            <div className="grid grid-cols-3 gap-4">
                <Link to="/category/playwright">
                    <div className="bg-gray-800 p-6 rounded-lg hover:bg-gray-700 cursor-pointer">
                        <h2 className="text-xl font-bold text-white mb-2">🎭 Playwright</h2>
                        <p className="text-gray-400 text-sm">E2E testing framework</p>
                    </div>
                </Link>
                <Link to="/category/javascript">
                    <div className="bg-gray-800 p-6 rounded-lg hover:bg-gray-700 cursor-pointer">
                        <h2 className="text-xl font-bold text-white mb-2">📜 JavaScript</h2>
                        <p className="text-gray-400 text-sm">Core language concepts</p>
                    </div>
                </Link>
                <Link to="/category/react">
                    <div className="bg-gray-800 p-6 rounded-lg hover:bg-gray-700 cursor-pointer">
                        <h2 className="text-xl font-bold text-white mb-2">⚛️ React</h2>
                        <p className="text-gray-400 text-sm">UI library basics</p>
                    </div>
                </Link>
            </div>
        </div>
    )
}

export default HomePage