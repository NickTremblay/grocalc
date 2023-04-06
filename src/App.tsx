import { Button } from '@mui/material';
import React, { useState } from 'react';
import ItemList from './components/ItemList';
import AddItemModal from './components/AddItemModal';
import UpdateRoomatesModal from './components/UpdateRoomatesModal';
import Item from './types/Item';
import GetSavedRoomates from './util/GetSavedRoomates';
import TotalPage from './components/TotalPage';
import Cost from './types/Cost';
import Roomate from './types/Roomate';

function App() {
  const [isAddRoomateDialogueOpen, setIsAddRoomateDialogueOpen] = useState(false);
  const [isAddItemDialogueOpen, setIsAddItemDialogueOpen] = useState(false);
  const [isTotalPageOpen, setIsTotalPageOpen] = useState(false);

  const [roomates, setRoomates] = useState(GetSavedRoomates() || []);
  const [items, setItems] = useState([] as Item[]);
  const [costs, setCosts] = useState([] as Cost[]);

  // Add balanceIncrement to balance of and append newCosts to costs of single roomate 
  const updateRoomate = (roomateName: string, balanceIncrement: number, newCosts: Cost[]) => {
    let newRoomates: Roomate[] = [];

    setRoomates((oldRoomates) => { 
        newRoomates = [...oldRoomates];

        const targetRoomateIndex = oldRoomates.findIndex((roomate) => roomate.name === roomateName); 

        // If roomateName valid 
        if(targetRoomateIndex > -1) {
            newRoomates[targetRoomateIndex] = {
                ...oldRoomates[targetRoomateIndex], 
                balance: oldRoomates[targetRoomateIndex].balance + balanceIncrement,
                costs: [...oldRoomates[targetRoomateIndex].costs, ...newCosts]
            }
        }

        return newRoomates; 
    });
  }

const addCosts = (costs: Cost[]) => { 
      // Update balance and costs of each roomate on item 
      for(let i = 0; i < costs.length; i++){ 
          let cost = costs[i]; 
          updateRoomate(cost.roomate, cost.amount, [cost])
      }

      // Append new costs to state 
      setCosts((oldCosts) => { 
          return [...oldCosts, ...costs];
      });
  }

  const handleEditRoomatesButtonClick = () => { 
    setIsAddRoomateDialogueOpen(true);
  }

  const handleAddItemButtonClick = () => { 
    setIsAddItemDialogueOpen(true);
  }

  const handleCalculateButtonClick = () => { 
    setIsTotalPageOpen(true);
  }

  const deleteItem = (id: number) => { 
      setItems((oldItems) => {
          const newItems = oldItems.filter((item:Item) => item.id !== id);
          return newItems;
      });
  }

  if(isTotalPageOpen) return (
    <div className="App">
        <TotalPage setIsTotalPageOpen={setIsTotalPageOpen} roomates={roomates} items={items} />
    </div>
  )

  return (
    <div className="App">
      <Button onClick={handleEditRoomatesButtonClick}>Edit Roomates</Button>
      <Button onClick={handleAddItemButtonClick}>Add Item</Button>

      <UpdateRoomatesModal
        roomates={roomates}
        setRoomates={setRoomates}
        isOpen={isAddRoomateDialogueOpen}
        setIsOpen={setIsAddRoomateDialogueOpen}
      />

      <AddItemModal
        items={items} 
        roomates={roomates}
        setItems={setItems}
        isOpen={isAddItemDialogueOpen} 
        setIsOpen={setIsAddItemDialogueOpen} 
        addCosts={addCosts}
      />

      <ItemList items={items} roomates={roomates} deleteItem={deleteItem} />

      <Button onClick={handleCalculateButtonClick}>Calculate</Button>

    </div>
  );
}

export default App;
