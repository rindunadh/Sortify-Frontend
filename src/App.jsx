import { Routes, Route } from 'react-router-dom'
import './styles/landing.css'
import './styles/analyze.css'
import Home from './pages/Home'
import Analyze from './pages/Analyze'
import About from './pages/About'

function App() {
  // Top-level router. Each route owns its page composition.
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/analyze" element={<Analyze />} />
      <Route path="/about" element={<About />} />
      <Route path="*" element={<Home />} />
    </Routes>
  )
}

export default App