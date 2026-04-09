import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import HomePage from './pages/HomePage'
import CategoryPage from './pages/CategoryPage'
import NotePage from './pages/NotePage'
import SearchPage from './pages/SearchPage'
import NotFoundPage from './pages/NotFoundPage'
import AutomationTypesPage from './pages/AutomationTypesPage'
import FrameworksPage from './pages/FrameworksPage'
import ToolsPage from './pages/ToolsPage'
import AboutPage from './pages/AboutPage'
import LoginPage from './pages/LoginPage'
import SignUpPage from './pages/SignUpPage'

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public */}
          <Route path="/login"  element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />

          {/* Protected */}
          <Route path="/" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
          <Route path="/automation-types" element={<ProtectedRoute><AutomationTypesPage /></ProtectedRoute>} />
          <Route path="/frameworks" element={<ProtectedRoute><FrameworksPage /></ProtectedRoute>} />
          <Route path="/tools" element={<ProtectedRoute><ToolsPage /></ProtectedRoute>} />
          <Route path="/about" element={<ProtectedRoute><AboutPage /></ProtectedRoute>} />
          <Route path="/category/:category" element={<ProtectedRoute><CategoryPage /></ProtectedRoute>} />
          <Route path="/note/:slug" element={<ProtectedRoute><NotePage /></ProtectedRoute>} />
          <Route path="/search" element={<ProtectedRoute><SearchPage /></ProtectedRoute>} />

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
