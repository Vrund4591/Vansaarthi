import HomePage from './Components/HomePage'
import Navigation from './Components/Navigation'


import { BrowserRouter, Routes, Route } from 'react-router-dom'
import About from './Components/About'
import Projects from './Components/Projects'
import Volunteer from './Components/Volunteer'

function App() {
  return (
    <>
      <BrowserRouter>
        <Navigation />
        <Routes>
          <Route path="/" element={<HomePage />}/>
          <Route path="/about" element={<About />}/>
          <Route path="/projects" element={<Projects />}/>
          <Route path="/volunteer" element={<Volunteer />}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;