import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'
import './Nav'
import List from './List';
import Nav from "./Nav";

function Home() {
  return (<h2>Home</h2>);
}

function App() {


  return (
    <Router>
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/list" element={<List />} />
        </Routes>
    </Router>
  )
}

export default App
