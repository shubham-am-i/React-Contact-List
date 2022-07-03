import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Contacts from './components/Contacts'

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Contacts />} exact></Route>
      </Routes>
    </Router>
  )
}

export default App
