import { Link, useParams } from 'react-router-dom'

function CategoryPage() {
    const { category } = useParams()

    return (
        <div className="min-h-screen bg-gray-900 text-white p-8">
            <Link to="/" className="text-gray-400 hover:text-white mb-8 inline-block">← Back</Link>
            <h1 className="text-4xl font-bold text-blue-400 mb-2 capitalize">{category}</h1>
            <p className="text-gray-400 mb-8">Notes in this category</p>

            <div className="flex flex-col gap-4">
                <Link to={`/note/${category}-intro`}>
                    <div className="bg-gray-800 p-6 rounded-lg hover:bg-gray-700 cursor-pointer">
                        <h2 className="text-xl font-bold text-white mb-1">Introduction</h2>
                        <p className="text-gray-400 text-sm">Getting started guide</p>
                    </div>
                </Link>
                <Link to={`/note/${category}-basics`}>
                    <div className="bg-gray-800 p-6 rounded-lg hover:bg-gray-700 cursor-pointer">
                        <h2 className="text-xl font-bold text-white mb-1">Basics</h2>
                        <p className="text-gray-400 text-sm">Core concepts</p>
                    </div>
                </Link>
            </div>
        </div>
    )
}

export default CategoryPage