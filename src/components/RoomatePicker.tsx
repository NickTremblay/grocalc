import { Checkbox, FormControlLabel, FormGroup, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Roomate, RoomateCheckbox } from "../types";

interface Props { 
    roomates: Roomate[]; 
    setSelectedRoomates: (selectedRoomates: string[]) => void; 
}

export const RoomatePicker = (props:Props) => { 
  const {setSelectedRoomates} = props; 

  const defaultRoomateState = props.roomates.map((roomate) => {
    return {
      name: roomate.name,
      isSelected: true
    } as RoomateCheckbox;
  });

  const [roomateCheckboxes, setRoomateCheckboxes] = useState(defaultRoomateState);

  const toggleRoomate = (roomateName: string) => { 
    setRoomateCheckboxes((oldRoomateCheckboxes) => { 
      const index = oldRoomateCheckboxes.findIndex((checkbox) => checkbox.name === roomateName);
      if(index === -1) return oldRoomateCheckboxes;

      const newRoomateCheckboxes = [...oldRoomateCheckboxes]; 
      newRoomateCheckboxes[index] = {
        ...newRoomateCheckboxes[index],
        isSelected: !newRoomateCheckboxes[index].isSelected
      }; 

      return newRoomateCheckboxes;
    });
  };

  useEffect(() => { 
    const newSelectedRoomates = 
        roomateCheckboxes.filter((roomateCheckbox) => roomateCheckbox.isSelected)
          .map((roomateCheckbox) => roomateCheckbox.name);

    setSelectedRoomates(newSelectedRoomates);
  }, [roomateCheckboxes]);

  return (
    <FormGroup>
      {
        roomateCheckboxes.map((roomateCheckbox: RoomateCheckbox) => { 
          return (
            <FormControlLabel key={roomateCheckbox.name}
              control={
                <Checkbox 
                  checked={roomateCheckbox.isSelected}
                  onChange={() => toggleRoomate(roomateCheckbox.name)} 
                />} 
              label={<Typography variant="body1">{roomateCheckbox.name}</Typography>} 
              sx={{marginLeft:"0.5rem"}}
            />
          );
        })
      }
    </FormGroup>
  );
};