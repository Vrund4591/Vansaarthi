
import HomePage from './Components/HomePage'
import Navigation from './Components/Navigation'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <>
      <BrowserRouter>
        <Navigation />
        <Routes>
          <Route path="/" element={<HomePage />}>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;
