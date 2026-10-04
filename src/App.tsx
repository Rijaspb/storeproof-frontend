import { Navigate, Route, Routes } from 'react-router'
import ProtectedRoute from '@/components/ProtectedRoute'
import About from '@/pages/About'
import Contact from '@/pages/Contact'
import Dashboard from '@/pages/Dashboard'
import IncidentDetail from '@/pages/IncidentDetail'
import Home from '@/pages/Home'
import NotFound from '@/pages/NotFound'
import Signin from '@/pages/Signin'
import Dpa from '@/pages/Dpa'
import ForgotPassword from '@/pages/ForgotPassword'
import ResetPassword from '@/pages/ResetPassword'
import Privacy from '@/pages/Privacy'
import Signup from '@/pages/Signup'
import Terms from '@/pages/Terms'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" replace />} />
      <Route path="/home" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/terms" element={<Terms />} />
      <Route path="/privacy" element={<Privacy />} />
      <Route path="/dpa" element={<Dpa />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/incidents/:id" element={<IncidentDetail />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default App
