import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import CategoryPage from './pages/CategoryPage'
import NotePage from './pages/NotePage'
import SearchPage from './pages/SearchPage'
import NotFoundPage from './pages/NotFoundPage'

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/category/:category" element={<CategoryPage />} />
          <Route path="/note/:slug" element={<NotePage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
  )
}

export default App