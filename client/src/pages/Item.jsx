import { useParams } from "react-router-dom";
import { useState, useEffect } from 'react';
import axios from 'axios';
import './Item.css';


function Item() {
  const { id } = useParams();
  const [item, setItems] = useState(null);
  const [store, setStore] = useState("");
  const [stores, setStores] = useState([]);

  useEffect(() => {
    axios.get(`/api/v1/items/${id}`)
      .then(res => setItems(res.data))
      .catch(error => console.error('Error fetching item:', error));
  }
    ,[id]);


  useEffect(() => {
    axios.get('/api/v1/stores')
      .then(res => {
        // Assuming the response data is an array of stores with _id and name properties
        const stores = res.data;
        // Update the state with the list of stores
        setStores(stores);
      })
      .catch(error => {
        // Handle error if the request fails
        console.error('Error fetching stores:', error);
      });
  }, []);

  const [location, setLocation] = useState('');

  const handleStoreChange = (e) => {
    setStore(e.target.value);
  };

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  };

  const handleAddLocation = () => {
    // Create a new location object
    const newLocation = { storeId: store, locationDetails: location };
  
    // Create a new array for the locations
    const newLocations = [...item.locations, newLocation];
  
    // Create a new item object
    const newItem = { ...item, locations: newLocations };
  
    axios.put(`/api/v1/items/${id}`, newItem)
      .then(res => {
        // Update the state with the new item
        console.log(res.data);
        setItems(res.data);
        // Clear the location input
        setLocation('');
      });
  };

  const handleDeleteLocation = (locationId) => {
    // Filter out the location with the given locationId
    const updatedLocations = item.locations.filter(location => location._id !== locationId);

    // Create a new item object with the updated locations
    const updatedItem = { ...item, locations: updatedLocations };

    axios.put(`/api/v1/items/${id}`, updatedItem)
      .then(res => {
        // Update the state with the updated item
        setItems(res.data);
      })
      .catch(error => {
        console.error('Error deleting location:', error);
      });
  };

  return (
    <div>
      <h2>{item?.name}</h2>
      <h3>Locations</h3>
      <div>
        <select value={store} onChange={handleStoreChange}>
          <option value="">Select a store</option>
          {stores.map(store => (
            <option key={store._id} value={store._id}>{store.name}</option>
          ))}
        </select>
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
              <td>
                <button onClick={() => handleDeleteLocation(location._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Item;