import { Navigate, Route, Routes } from 'react-router'
import About from '@/pages/About'
import Contact from '@/pages/Contact'
import Home from '@/pages/Home'
import Signin from '@/pages/Signin'
import Signup from '@/pages/Signup'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" replace />} />
      <Route path="/home" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  )
}

export default App
