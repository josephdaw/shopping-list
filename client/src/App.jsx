import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider, ProtectedRoute } from "./utils/auth/Auth";
import './App.css'
import './Nav'
import List from './pages/List';
import Nav from "./Nav";
import Item from "./pages/Item";
import Items from "./pages/Items";
import Login from "./pages/Login";


function Home() {
  return (<h2>Home</h2>);
}

function App() {


  return (
    <AuthProvider>
      <Router>
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/list" element={<ProtectedRoute><List /></ProtectedRoute>} />
          {/* <ProtectedRoute path="/list" element={<List />} /> */}
          <Route path="/items" element={<Items />} />
          <Route path="/items/:id" element={<Item />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App
