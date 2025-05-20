import HomePage from './Components/HomePage'
import Navigation from './Components/Navigation'
import { AuthProvider } from './context/AuthContext'
import AuthSuccess from './Components/AuthSuccess'
import ChatBot from './Components/ChatBot'

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import About from './Components/About'
import Projects from './Components/Projects'
import Volunteer from './Components/Volunteer'

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="min-h-screen flex flex-col justify-between">
          <Navigation />
          <div className="flex-grow">
            <Routes>
              <Route path="/" element={<HomePage />}/>
              <Route path="/about" element={<About />}/>
              <Route path="/projects" element={<Projects />}/>
              <Route path="/volunteer" element={<Volunteer />}/>
              <Route path="/auth-success" element={<AuthSuccess />} />
            </Routes>
          </div>
          <ChatBot />
        </div>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App;