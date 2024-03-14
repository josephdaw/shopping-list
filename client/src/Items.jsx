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

  const [itemName, setItemName] = useState('');

  const handleAddItem = () => {
    axios.post('/api/v1/items', { name: itemName })
      .then(res => {
        setItems([...items, res.data]);
        setItemName('');
      })
      .catch(error => {
        console.error('Error adding item:', error);
      });
  };

  return (
    <div className="App">
      <h1>All Items</h1>
      <div>
        <input type="text" placeholder="Enter item name" value={itemName} onChange={e => setItemName(e.target.value)} />
        <button onClick={handleAddItem}>Add Item</button>
      </div>
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
