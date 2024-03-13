import { useState, useEffect } from 'react';
import axios from 'axios';
import './List.css';
import { Link } from 'react-router-dom';

function List() {
  const [items, setItems] = useState([]);
  
  useEffect(() => {
    axios.get('/api/v1/items')
      .then(res => setItems(res.data));
  }, []);

  
  return (
    <div className="App">
      <h1>All Items</h1>

      <table>
        <thead>
          <tr>
            <th>Item Name</th>
          </tr>
        </thead>
        <tbody>
          {items.map(item => (
            <tr key={item._id}>
              <td><Link to={`/items/${item._id}`}>{item.name}</Link></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default List;
