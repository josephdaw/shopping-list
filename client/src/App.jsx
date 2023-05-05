import React, { useState } from 'react'
import './App.css'
import ShoppingList from './ShoppingList'
import NewItemForm from './NewItemForm'

export default function App() {
  const [shoppingItems, setShoppingItems] = useState([])

  function addShoppingItem(name){
    setShoppingItems(currentItems => {
      return [
        ...currentItems,
        { id: crypto.randomUUID(), name, bought: false}
      ]
    })
  }

  function toggleItem(id, bought){
    setShoppingItems(currentItems => {
      return currentItems.map(item => {
        if (item.id === id){
          return { ...item, bought}
        }
        return item
      })
    })
  }

  function deleteItem(id){
    setShoppingItems(currentItems => {
      return currentItems.filter(item => item.id !== id)
    })
  }

  return (
    <>
    <h1>The Best Shopping List Application</h1>
    <h3>Add New Item</h3>
    <NewItemForm addShoppingItem={addShoppingItem} />
    <h2>Shopping List</h2>
    <ShoppingList 
    shoppingItems={shoppingItems} 
    toggleItem={toggleItem}
    deleteItem={deleteItem}
    />
    </>
  )
}

