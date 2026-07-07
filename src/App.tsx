import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import AppNav from './components/AppNav/AppNav'
import AdminLandingPage from './pages/AdminLanding/AdminLandingPage'
import HomePage from './pages/Home/HomePage'
import LoginPage from './pages/Login/LoginPage'
import RegisterPage from './pages/Register/RegisterPage'
import ToolsPage from './pages/Tools/ToolsPage'
import LandingPage from './pages/Landing/LandingPage'
import TealiumRouteTracker from './components/TealiumRouteTracker/TealiumRouteTracker'
import { appRoutes } from './routes'

function App() {
  return (
    <>
      <TealiumRouteTracker />
      <AppNav />
      <Routes>
        <Route path={appRoutes.home} element={<HomePage />} />
        <Route path={appRoutes.landing} element={<LandingPage />} />
        <Route path={appRoutes.legacyHome} element={<Navigate to={appRoutes.home} replace />} />
        <Route path={appRoutes.login} element={<LoginPage />} />
        <Route path={appRoutes.register} element={<RegisterPage />} />
        <Route path={appRoutes.dashboard} element={<AdminLandingPage />} />
        <Route path={appRoutes.tools} element={<ToolsPage />} />
        <Route path={appRoutes.legacyTools} element={<Navigate to={appRoutes.tools} replace />} />
        <Route path="*" element={<Navigate to={appRoutes.home} replace />} />
      </Routes>
    </>
  )
}

export default App
