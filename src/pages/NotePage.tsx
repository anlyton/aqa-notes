import { Link, useParams } from 'react-router-dom'

function NotePage() {
    const { slug } = useParams()

    return (
        <div className="min-h-screen bg-gray-900 text-white p-8 max-w-3xl mx-auto">
            <Link to="/" className="text-gray-400 hover:text-white mb-8 inline-block">← Back</Link>
            <h1 className="text-4xl font-bold text-blue-400 mb-8 capitalize">{slug}</h1>
            <div className="text-gray-300 leading-relaxed">
                <p>Note content will be loaded from Markdown files here.</p>
            </div>
        </div>
    )
}

export default NotePage