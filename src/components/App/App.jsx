import React from 'react';

// Import useEffect to auto-render GET on DOM on page load:
import { useEffect, useState } from 'react';

// import axios:
import axios from 'axios';
import ItemForm from '../ItemForm/ItemForm';

// import components:
import Header from '../Header/Header.jsx';
import ShoppingList from '../ShoppingList/ShoppingList';
import './App.css';

function App() {
  const [shoppingList, setShoppingList] = useState([]);

  let [newItemName, setNewItemName] = useState('');
  let [newQuantity, setNewQuantity] = useState('');
  let [newUnit, setNewUnit] = useState('');

  //POST route
  const addItem = (event) => {
    event.preventDefault();
    axios
      .post('/list', {
        name: newItemName,
        quantity: newQuantity,
        unit: newUnit,
      })
      .then((response) => {
        fetchList();
      })
      .catch((err) => {
        alert('Error Adding item');
        console.log(err);
      });
  };
  // auto-render db table info on DOM:
  useEffect(() => {
    fetchList();
  }, []); //end useEffect

  const fetchList = () => {
    axios
      .get('/list')
      .then((response) => {
        console.log('get response:', response.data);
        setShoppingList(response.data);
      })
      .catch((error) => {
        console.log('GET error:', error);
      });
  }; // end fetchList

  const clearList = () => {
    console.log('inClear');

    axios
      .delete('/list/clear')
      .then((response) => {
        console.log('Clear successful');
        fetchList();
      })
      .catch((error) => {
        console.log('Error in clearList', error);
      });
  }; // end clearList

  return (
    <div className="App">
      <Header />

      <main>
        <ItemForm
          newItemName={newItemName}
          newQuantity={newQuantity}
          newUnit={newUnit}
          setNewItemName={setNewItemName}
          setNewQuantity={setNewQuantity}
          setNewUnit={setNewUnit}
          handleSubmit={addItem}
        />
        <ShoppingList shoppingList={shoppingList} clearList={clearList} />
      </main>
    </div>
  );
}

export default App;
