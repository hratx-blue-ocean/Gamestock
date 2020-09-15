import React, { useState, useEffect } from 'react';
import axios from 'axios';

const NewItemSearchBar = () => {

  // items stores a list of games sent by the API
  const [items, setItems] = useState([]);
  const [input, setInput] = useState('');


  // Function to make an axios request to get data from API/server
  const getItems = (item) => {
    axios.get(`/getItemPrice`, {
      // Sends the search value to the server
      params: {
        items : item,
      }
    })
    .then(res => console.log(res))
    .then((res) => {
      setItems(res.data);
    })
    .catch((err) => {
      console.log('Error getitng data from the server', err);
    });
  }

  return (
  <div>
    <span>
      This is Search Bar
    </span>
    <div>
      <input type="text" onChange={(e) => {setInput(e.target.value)}}/>
      <button onClick={() => getItems(input)}>Submit</button>
    </div>
    {items.map((item, key) => {
        <div>
          {item.id}
        </div>
      })}
  </div>
  );
};

export default NewItemSearchBar;
