import { Button } from '@mui/material';
import React, { useState } from 'react';
import AddRoomateModal from './components/UpdateRoomatesModal';
import GetSavedRoomates from './util/GetSavedRoomates';

function App() {
  const [roomates, setRoomates] = useState(GetSavedRoomates() || []);
  const [isAddRoomateDialogueOpen, setIsAddRoomateDialogueOpen] = useState(false);

  const handleAddRoomateButtonClick = () => { 
    setIsAddRoomateDialogueOpen(true);
  }

  return (
    <div className="App">
      <Button onClick={handleAddRoomateButtonClick}>Add Roomate</Button>

      <AddRoomateModal
        roomates={roomates}
        setRoomates={setRoomates}
        isOpen={isAddRoomateDialogueOpen}
        setIsOpen={setIsAddRoomateDialogueOpen}
      />

    </div>
  );
}

export default App;
