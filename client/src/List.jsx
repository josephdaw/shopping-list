import { useState, useEffect } from 'react';
import axios from 'axios';
import './List.css';
import { Link } from 'react-router-dom';

function List() {
  const [items, setItems] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    axios.get('/api/v1/items')
      .then(res => setItems(res.data));
  }, []);
  console.log(items);
  const storeNames = [...new Set(items?.flatMap(item => item.location.map(location => location.storeId.name)))];
  
  return (
    <div className="App">
      <select value={filter} onChange={e => setFilter(e.target.value)}>
        <option value="">Select a store</option>
        {storeNames.map(name => (
          <option key={name} value={name}>{name}</option>
        ))}
      </select>
      <table>
        <thead>
          <tr>
            <th>Item Name</th>
            {/* <th>Store Name</th> */}
            <th>Location</th>
          </tr>
        </thead>
        <tbody>
          {items.map(item => (
            <tr key={item._id}>
              <td><Link to={`/items/${item._id}`}>{item.name}</Link></td>
              {item.location.filter(location => location.storeId.name === filter).map(location => (
                <>
                  {/* <td>{location.storeId.name}</td> */}
                  {/* <td>{location.storeId.location}</td> */}
                  <td>{location.locationDetails}</td>
                </>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default List;
