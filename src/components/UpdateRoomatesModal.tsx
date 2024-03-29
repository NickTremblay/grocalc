import { Dialog, DialogTitle, DialogContent, DialogActions, Button, List, ListItem, TextField, IconButton, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import React, { useEffect, useState } from "react";
import { Roomate } from "../types";
import { SaveRoomates } from "../util";

interface Props { 
    roomates:Roomate[]; 
    setRoomates: (roomates: Roomate[]) => void; 
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void; 
}

// Modal to add and delete roomates. Changes persisted to local storage. 
export const UpdateRoomatesModal = (props: Props) => {
  const {isOpen, setIsOpen, roomates, setRoomates} = props;
  const [updatedRoomates, setUpdatedRoomates] = useState(roomates);
  const [nameInputValue, setNameInputValue] = useState("");
  const [isNameInputValueValid, setIsNameInputValueValid] = useState(true);

  const addRoomate = (name: string) => { 
    const newRoomate = {
      name,
      balance: 0
    } as Roomate;
    setUpdatedRoomates((oldUpdatedRoomates) => [...oldUpdatedRoomates, newRoomate]);
  };

  const deleteRoomate = (name: string) => { 
    setUpdatedRoomates((oldUpdatedRoomates) => {
      const newUpdatedRoomates = oldUpdatedRoomates.filter((roomate:Roomate) => roomate.name !== name);
      return newUpdatedRoomates;
    });
  };

  const handleNameInputChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const newName = event.target.value;

    setNameInputValue(newName);

    if(updatedRoomates.filter((roomate) => roomate.name === newName).length > 0){ 
      setIsNameInputValueValid(false);
    }else if(!isNameInputValueValid) setIsNameInputValueValid(true);
  };

  const handleCloseClick = () => {
    setIsOpen(false);
    if(isNameInputValueValid && nameInputValue !== ""){ 
      addRoomate(nameInputValue);
      setRoomates(updatedRoomates);
      setNameInputValue("");
      setIsNameInputValueValid(true);
    }
  };

  const handleAddNewRoomateClick = () => { 
    if(isNameInputValueValid && nameInputValue !== ""){ 
      addRoomate(nameInputValue);
      setIsNameInputValueValid(true);
      setNameInputValue("");
    }
  };

  useEffect(() => { 
    SaveRoomates(updatedRoomates);
    props.setRoomates(updatedRoomates);
  }, [...updatedRoomates]);

  return (
    <Dialog
      open={isOpen}
      onClose={handleCloseClick}
      aria-labelledby="alert-dialog-title"
    >

      <DialogTitle id="alert-dialog-title" variant="h5" sx={{color:"primary.main"}}>Update Roomates</DialogTitle>

      <DialogContent>
        {/* Display each roomate already added */}
        {updatedRoomates.length > 0 && <List>
          {
            updatedRoomates.map((roomate:Roomate, i) => { 
              return (
                <ListItem key={i} disablePadding>
                  <IconButton aria-label="delete" onClick={() => deleteRoomate(roomate.name)}>
                    <DeleteIcon />
                  </IconButton>
                  <Typography variant="body1">{roomate.name}</Typography>
                </ListItem>
              );
            })
          }
        </List>}

        <TextField
          error={!isNameInputValueValid}
          label="Name of new roomate"
          helperText={!isNameInputValueValid ? "Name already in use" : null}
          onChange={handleNameInputChange}
          value={nameInputValue}
        />
                
      </DialogContent>

      <DialogActions>
        <Button onClick={handleAddNewRoomateClick} variant="contained">
          <Typography variant="button">Add Another Roomate</Typography>
        </Button>

        <Button onClick={handleCloseClick} variant="contained">
          <Typography variant="button">Done</Typography>
        </Button>
      </DialogActions>

    </Dialog>
  );

};