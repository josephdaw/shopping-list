import React from 'react'
import ShoppingItem from './ShoppingItem'

export default function ShoppingList({shoppingItems, toggleItem, deleteItem}) {

    return (
        <ul>
            {shoppingItems.length == 0 && "No Items"}
            {shoppingItems.map(item => {
                return <ShoppingItem {...item} key={item.id}
                toggleItem={toggleItem} deleteItem={deleteItem}/>
            })}
            

        </ul>
    )
}
 