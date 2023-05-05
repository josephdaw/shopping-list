import React from 'react'

export default function ShoppingItem({ id, name, bought, toggleItem, deleteItem }) {
    bought == true
    console.log(bought)
    return (
        <li>
            <label>
                <input
                    type='checkbox'
                    checked={bought} 
                    onChange={e => toggleItem(id, e.target.checked)}/>
                {name}
            </label>
            <button
            onClick={() => deleteItem(id)}
            >Delete</button>
        </li>
    )
}
