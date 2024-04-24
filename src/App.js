import React, { useState } from 'react';
import './App.css';

function App() {
  const [lists, setLists] = useState([
    { id: 1, title: 'To do', cards: [] },
    { id: 2, title: 'Pending', cards: [] },
    { id: 3, title: 'Done', cards: [] },
  ]);

  const [draggedItem, setDraggedItem] = useState(null);

  const addCard = (listIndex, cardText, position) => {
    if (cardText.trim() === '') {
      return;
    }
  
    const updatedLists = [...lists];
    updatedLists[listIndex].cards.splice(position, 0, { id: Date.now(), text: cardText });
    setLists(updatedLists);
  };

  const removeCard = (listIndex, cardIndex) => {
    const updatedLists = [...lists];
    updatedLists[listIndex].cards.splice(cardIndex, 1);
    setLists(updatedLists);
  };

  const handleDragStart = (listIndex, cardIndex) => {
    setDraggedItem({ listIndex, cardIndex });
  };

  const handleDragOver = (listIndex) => {
    if (!draggedItem) return;
    if (draggedItem.listIndex !== listIndex) {
      const updatedLists = [...lists];
      const [draggedCard] = updatedLists[draggedItem.listIndex].cards.splice(draggedItem.cardIndex, 1);
      updatedLists[listIndex].cards.push(draggedCard);
      setLists(updatedLists);
      setDraggedItem(null);
    }
  };

  return (
    <div className="App">
      <h1>ToDo List - App React</h1>
      <div className="board">
        {lists.map((list, listIndex) => (
          <div className="list" key={list.id} onDragOver={() => handleDragOver(listIndex)}>
            <h2>{list.title}</h2>
            <ul>
              {list.cards.map((card, cardIndex) => (
                <li
                  key={card.id}
                  draggable
                  onDragStart={() => handleDragStart(listIndex, cardIndex)}
                >
                  {card.text}
                  <button onClick={() => removeCard(listIndex, cardIndex)}>Delete</button>
                </li>
              ))}
            </ul>
            <input
              type="text"
              placeholder="Add task ..."
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  addCard(listIndex, e.target.value);
                  e.target.value = '';
                }
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
