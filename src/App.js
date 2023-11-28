import { useState } from 'react';
import './index.css';

// const initialItems = [
//   { id: 1, description: 'Passports', quantity: 2, packed: false },
//   { id: 2, description: 'Socks', quantity: 12, packed: false },
//   { id: 3, description: 'Glasses', quantity: 3, packed: true },
// ];

export default function App() {
  const [items, setItems] = useState([]);
  // const nbItems = items.length;
  // const nbItemsPacked = items.filter((item) => item.packed === true).length;

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

  function handdleClearList() {
    const confirmed = window.confirm(
      'are you sure you want to delete all items'
    );
    if (confirmed) setItems([]);
  }
  return (
    <div className='app'>
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList
        items={items}
        onRemoveItem={handdleRemoveItem}
        onIsPacked={handdleIsPacked}
        onClearList={handdleClearList}
      />
      <Stats items={items} />
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

function PackingList({ items, onRemoveItem, onIsPacked, onClearList }) {
  // console.log(items);
  const [sortBy, setSortBy] = useState('input');
  let sortedItems;
  if (sortBy === 'input') sortedItems = items;
  if (sortBy === 'description') {
    sortedItems = items
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description));
  }
  if (sortBy === 'packed') {
    sortedItems = items
      .slice()
      .sort((a, b) => Number(a.packed) - Number(b.packed));
  }
  return (
    <div className='list'>
      <ul>
        {sortedItems.map((item) => (
          <Item
            item={item}
            key={item.id}
            onRemoveItem={onRemoveItem}
            onIsPacked={onIsPacked}
          />
        ))}
      </ul>
      <div className='actions'>
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value='input'>Sort by the input order</option>
          <option value='description'>Sort by description</option>
          <option value='packed'>Sort by packed status</option>
        </select>
        <button onClick={onClearList}>clear list</button>
      </div>
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

function Stats({ items }) {
  if (!items.length)
    return (
      <p className='stats'>
        <em>Start adding some items to your packing list 🚀</em>
      </p>
    );

  const nbItems = items.length;
  const nbItemsPacked = items.filter((item) => item.packed).length;
  let stat = nbItems > 0 ? Math.round((nbItemsPacked * 100) / nbItems) : 0;
  console.log(stat);
  return (
    <footer className='stats'>
      <em>
        {stat === 100
          ? 'You got everything! Ready to go ✈️!'
          : `You have ${nbItems} items on your list, and you already packed ${nbItemsPacked} (${stat}%)`}
      </em>
    </footer>
  );
}
