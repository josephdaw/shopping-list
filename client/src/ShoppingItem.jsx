import React from 'react'

export default function ShoppingItem({ id, name, bought, toggleItem, deleteItem }) {
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
