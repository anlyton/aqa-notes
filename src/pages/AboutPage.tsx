import Layout from '../components/Layout'

function AboutPage() {
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <div className="text-7xl mb-6">🚧</div>
        <h1 className="text-4xl font-bold text-blue-400 mb-4">About</h1>
        <p className="text-gray-400 text-xl max-w-md">
          This page is currently in progress. More information coming soon!
        </p>
      </div>
    </Layout>
  )
}

export default AboutPage