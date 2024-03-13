import { useParams } from "react-router-dom";
import { useState, useEffect } from 'react';
import axios from 'axios';
import './Item.css';

function Item() {
  const { id } = useParams();
  const [item, setItems] = useState([]);

  useEffect(() => {
    axios.get(`/api/v1/items/${id}`)
      .then(res => setItems(res.data));
  }, [id]);

console.log(item);

  const [store, setStore] = useState('');
  const [location, setLocation] = useState('');

  const handleStoreChange = (e) => {
    setStore(e.target.value);
  };

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  };

  const handleAddLocation = () => {
    // Add logic to handle adding a new location
    axios.post(`/api/v1/items/${id}/location`, { store, location })
      .then(res => setItems(res.data)); // Update the state with the new item

    setStore('');
    setLocation('');
  };

  return (
    <div>
      <h2>{item?.name}</h2>
      <h3>Locations</h3>
      <div>
        <input type="text" value={store} onChange={handleStoreChange} placeholder="Store" />
        <input type="text" value={location} onChange={handleLocationChange} placeholder="Location" />
        <button onClick={handleAddLocation}>Add Location</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Store</th>
            <th>Location</th>
          </tr>
        </thead>
        <tbody>
          {item?.locations?.map(location => (
            <tr key={location._id}>
              <td>{location.storeId.name}</td>
              <td>{location.locationDetails}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Item;