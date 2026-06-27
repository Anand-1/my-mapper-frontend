import { Route,Routes } from 'react-router-dom'
import './App.css'
import AppNav from './components/AppNav/AppNav'
import AdminLandingPage from './pages/AdminLanding/AdminLandingPage'
import HomePage from './pages/Home/HomePage'
import LoginPage from './pages/Login/LoginPage'
import RegisterPage from './pages/Register/RegisterPage'
import ToolsPage from './pages/Tools/ToolsPage'

function App() {
  return (
    <>
      <AppNav />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={<AdminLandingPage />} />
        <Route path="/further" element={<ToolsPage />} />
      </Routes>
    </>
  )
}

export default App
