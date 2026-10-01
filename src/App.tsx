import { Navigate, Route, Routes } from 'react-router'
import About from '@/pages/About'
import Contact from '@/pages/Contact'
import Home from '@/pages/Home'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" replace />} />
      <Route path="/home" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
    </Routes>
  )
}

export default App
