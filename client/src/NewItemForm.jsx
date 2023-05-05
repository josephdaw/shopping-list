import React from 'react'
import { useState } from 'react'

export default function NewItemForm({ addShoppingItem }) {
  const [newItemName, setNewItemName] = useState("")

  function handleSubmit(event) {
    event.preventDefault()
    
    // check for blank items
    if (newItemName === "") return

    addShoppingItem(newItemName)
    //clear input
    setNewItemName("")
  }

  return (
    <form>
      <label>Item: </label>
      <input
        value={newItemName}
        onChange={event => setNewItemName(event.target.value)}
        type='text'
        id='item'></input>
      <button type='submit'
        onClick={handleSubmit}>Add</button>
    </form>
  )
}
