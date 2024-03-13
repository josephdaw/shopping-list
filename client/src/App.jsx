import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import './App.css'
import List from './List';

function Home() {
  return (<h2>Home</h2>);
}

function App() {


  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/list">Shopping List</Link>
            </li>
            <li>
              <Link to="/items">Items</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/list" element={<List />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
