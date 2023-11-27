import { useState } from 'react';
import './index.css';

// const initialItems = [
//   { id: 1, description: 'Passports', quantity: 2, packed: false },
//   { id: 2, description: 'Socks', quantity: 12, packed: false },
//   { id: 3, description: 'Glasses', quantity: 3, packed: true },
// ];

export default function App() {
  const [items, setItems] = useState([]);

  function handleAddItems(item) {
    setItems((items) => [...items, item]);
  }

  function handdleRemoveItem(id) {
    setItems((items) => items.filter((item) => item.id !== id));
  }

  function handdleIsPacked(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }
  return (
    <div className='app'>
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList
        items={items}
        onRemoveItem={handdleRemoveItem}
        onIsPacked={handdleIsPacked}
      />
      <Stats />
    </div>
  );
}

function Logo() {
  return <h1>🌴 Far Away 🧳</h1>;
}

function Form({ onAddItems }) {
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();
    if (!description) return;
    const newItem = { description, quantity, packed: false, id: Date.now() };
    console.log(newItem);
    onAddItems(newItem);
    setDescription('');
    setQuantity(1);
  }

  return (
    <form className='add-form' onSubmit={handleSubmit}>
      <h3>What do you need for your 😍 trip?</h3>
      <select
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      >
        {Array.from({ length: 20 }, (_, i) => i + 1).map((qty) => (
          <option value={qty} key={qty}>
            {qty}
          </option>
        ))}
      </select>
      <input
        type='text'
        placeholder='Item...'
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button>Add</button>
    </form>
  );
}

function PackingList({ items, onRemoveItem, onIsPacked }) {
  console.log(items);
  return (
    <div className='list'>
      <ul>
        {items.map((item) => (
          <Item
            item={item}
            key={item.id}
            onRemoveItem={onRemoveItem}
            onIsPacked={onIsPacked}
          />
        ))}
      </ul>
    </div>
  );
}

function Item({ item, onRemoveItem, onIsPacked }) {
  return (
    <li>
      <input
        type='checkbox'
        value={item.packed}
        onChange={() => onIsPacked(item.id)}
      />
      <span style={item.packed ? { textDecoration: 'line-through' } : {}}>
        {item.quantity} {item.description}
      </span>
      <button onClick={() => onRemoveItem(item.id)}>❌</button>
    </li>
  );
}

function Stats() {
  return (
    <footer className='stats'>
      <em>You have X items on your list, and you already packed (X%)</em>
    </footer>
  );
}
