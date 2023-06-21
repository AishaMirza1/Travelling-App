import "./index.css";
import { useState } from "react";
// const items = [
//   { id: 1, discription: "jacket", packed: false, quantity: 3 },
//   { id: 2, discription: "bag", packed: true, quantity: 1 },
//   { id: 3, discription: "socks", packed: false, quantity: 2 }
// ];
export default function App() {
  const [items, setItems] = useState([]);

  function handleItemsArray(item) {
    setItems((items) => [...items, item]);
  }
  function handleDelte(id) {
    setItems((items) => items.filter((item) => item.id !== id));
  }
  function handleTogglePAcked(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }
  function handleClearList() {
    setItems([]);
  }
  return (
    <div className="App">
      <Logo />
      <Form handleItemsArray={handleItemsArray} />
      <PackingList
        items={items}
        onDeleteItem={handleDelte}
        onTogglePacked={handleTogglePAcked}
        onClearList={handleClearList}
      />
      <Stats items={items} />
    </div>
  );
}
function Logo() {
  return <h1>🚀 Far Away</h1>;
}

function Form({ handleItemsArray }) {
  const [discription, setdiscription] = useState("");
  const [quantity, setQuantity] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();
    const newItem = {
      discription,
      quantity,
      packed: false,
      id: Date.now(),
    };
    if (discription) {
      handleItemsArray(newItem);
    }

    setQuantity(1);
    setdiscription("");
  }
  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your trip</h3>
      <select
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      >
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="item"
        value={discription}
        onChange={(e) => setdiscription(e.target.value)}
      />
      <button>Add</button>
    </form>
  );
}
function PackingList({ items, onDeleteItem, onTogglePacked, onClearList }) {
  const [sortBy, setSortBy] = useState("packed");
  let sortedItems;

  if (sortBy === "input") sortedItems = items;
  if (sortBy === "discription") {
    sortedItems = items
      .slice()
      .sort((a, b) => a.discription.localeCompare(b.discription));
  }
  if (sortBy === "packed") {
    sortedItems = items
      .slice()
      .sort((a, b) => Number(a.packed) - Number(b.packed));
  }
  return (
    <div className="list">
      <ul>
        {sortedItems.map((item) => {
          return (
            <Item
              item={item}
              key={item.id}
              onDeleteItem={onDeleteItem}
              onTogglePacked={onTogglePacked}
            />
          );
        })}
      </ul>
      <div className="actions">
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="input">Sort by input</option>
          <option value="packed">Sort by packed status</option>
          <option value="discription">Sort by discription</option>
        </select>
        <button onClick={onClearList}>Clear List</button>
      </div>
    </div>
  );
}
function Item({ item, onDeleteItem, onTogglePacked }) {
  return (
    <li>
      <input
        type="checkbox"
        value={item.packed}
        onChange={() => onTogglePacked(item.id)}
      />
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.discription}
      </span>
      <button
        className="btn-li"
        onClick={() => {
          onDeleteItem(item.id);
        }}
      >
        &times;
      </button>
    </li>
  );
}
function Stats({ items }) {
  if (!items.length)
    return <p className="stats">start adding some items and packing 👔</p>;
  const numItem = items.length;
  const packedItems = items.filter((item) => item.packed).length;
  const percentagePacked = Math.floor((packedItems / numItem) * 100);
  return (
    <footer className="stats">
      {percentagePacked === 100 ? (
        "you are ready to go 🚀"
      ) : (
        <em>
          You have {numItem} items in your list and you already packed{" "}
          {packedItems} ({percentagePacked}%)
        </em>
      )}
    </footer>
  );
}
