import { Button } from "@mui/material";
import React, { useState } from "react";
import { TotalPage, UpdateRoomatesModal, AddItemModal, ItemList } from "./components";
import { Item, Cost, Roomate } from "./types";
import { GetSavedRoomates } from "./util";

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
        };
      }

      return newRoomates; 
    });
  };

  const addCosts = (costs: Cost[]) => { 
    // Update balance and costs of each roomate on item 
    for(let i = 0; i < costs.length; i++){ 
      const cost = costs[i]; 
      updateRoomate(cost.roomate, cost.amount, [cost]);
    }

    // Append new costs to state 
    setCosts((oldCosts) => { 
      return [...oldCosts, ...costs];
    });
  };

  const deleteCostFromRoomate = (roomateName: string, itemId: number) => { 
    setRoomates((oldRoomates) => {
      const newRoomates = [...oldRoomates];

      const targetRoomateIndex = oldRoomates.findIndex((roomate) => roomate.name === roomateName); 
      
      if(targetRoomateIndex > -1) {
        newRoomates[targetRoomateIndex] = {
          ...oldRoomates[targetRoomateIndex], 
          costs: oldRoomates[targetRoomateIndex].costs.filter((cost) => cost.item.id !== itemId)
        };
      }

      return newRoomates;
    });

  };

  const deleteCostByItem = (item: Item) => { 
    setCosts((oldCosts) => { 
      const newCosts = [...oldCosts].filter((cost) => cost.item.id !== item.id);

      for(let i = 0; i < item.roomates.length; i++){ 
        deleteCostFromRoomate(item.roomates[i], item.id);
      }


      return newCosts; 
    });
  };

  const handleEditRoomatesButtonClick = () => { 
    setIsAddRoomateDialogueOpen(true);
  };

  const handleAddItemButtonClick = () => { 
    setIsAddItemDialogueOpen(true);
  };

  const handleCalculateButtonClick = () => { 
    setIsTotalPageOpen(true);
  };

  const deleteItem = (id: number) => { 
    const item = items.find((item) => item.id === id);
    if(!item) return; 
    
    deleteCostByItem(item);

    setItems((oldItems) => {
      const newItems = oldItems.filter((item:Item) => item.id !== id);
      return newItems;
    });
  };

  if(isTotalPageOpen) return (
    <div className="App">
      <TotalPage setIsTotalPageOpen={setIsTotalPageOpen} roomates={roomates} items={items} />
    </div>
  );

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
