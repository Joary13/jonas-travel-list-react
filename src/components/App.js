import { useState } from 'react';
import '.././index.css';
import Logo from './Logo';
import Form from './Form';
import PackingList from './PackingList';
import Stats from './Stats';

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
