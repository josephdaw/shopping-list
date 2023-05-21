import React from 'react'
import { useState } from 'react'

export default function NewItemForm({ addShoppingItem }) {
  const [newItem, setNewItem] = useState({
    name: ''
  })
  const [locations, setLocations] = useState([{
    shop: "Marion",
    aisle: "3"
  }])

  function handleSubmit(event) {
    event.preventDefault()

    // check for blank items
    if (newItem === "") return

    addShoppingItem(newItem)
    //clear input
    setNewItem("")
  }

  return (
    <>
    <div>{newItem.name}</div>
{locations.map(location => { 
      return <p>{location.shop} / {location.aisle}</p>})}
      <form>
        <label>Item: </label>
        <input
          value={newItem.name}
          onChange={e => { setNewItem({ ...newItem, name: e.target.value }) }}
          type='text'
          id='name'
        />
      
        <button type='submit'
          onClick={handleSubmit}>Save Item</button>
      </form>
      <form>
        <label>Shop: </label>
        <input
          // value={newItem.shop}
          onChange={e => setLocations({ ...locations, shop: e.target.value })}
          type='text'
          id='shop'
        />
        <label>Location: </label>
        <input
          // value={newItem.aisle}
          onChange={e => setLocations({ ...locations, aisle: e.target.value })}
          type='text'
          id='aisle'
        />
        <button type='submit'
          onClick={handleSubmit}>Add Location</button>
      </form>
    </>
  )
}
