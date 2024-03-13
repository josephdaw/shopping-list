import { Link } from "react-router-dom";
import './Nav.css';

const Nav = () => {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/list">Shopping List</Link>
      <Link to="/items">Items</Link>
    </nav>
  );
};

export default Nav;