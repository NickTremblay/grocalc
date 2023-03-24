import { Button } from '@mui/material';
import React, { useState } from 'react';
import ItemList from './components/ItemList';
import AddItemModal from './components/AddItemModal';
import UpdateRoomatesModal from './components/UpdateRoomatesModal';
import Item from './types/Item';
import GetSavedRoomates from './util/GetSavedRoomates';

function App() {
  const [roomates, setRoomates] = useState(GetSavedRoomates() || []);
  const [isAddRoomateDialogueOpen, setIsAddRoomateDialogueOpen] = useState(false);
  const [isAddItemDialogueOpen, setIsAddItemDialogueOpen] = useState(false);
  const [items, setItems] = useState([] as Item[]);

  const handleEditRoomatesButtonClick = () => { 
    setIsAddRoomateDialogueOpen(true);
  }

  const handleAddItemButtonClick = () => { 
    setIsAddItemDialogueOpen(true);
  }

  const deleteItem = (id: number) => { 
      setItems((oldItems) => {
          const newItems = oldItems.filter((item:Item) => item.id !== id);
          return newItems;
      });
  }

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
      />

      <ItemList items={items} roomates={roomates} deleteItem={deleteItem} />

    </div>
  );
}

export default App;
