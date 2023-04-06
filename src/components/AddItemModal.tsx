import { Dialog, DialogTitle, DialogContent, List, ListItem, TextField, DialogActions, Button, ListItemText, DialogContentText } from "@mui/material";
import React, { useEffect, useState } from "react";
import AddItemTextInputField, { AddItemTextFields, defaultTextInputFieldState } from "../types/AddItemTextField";
import Item from "../types/Item";
import Roomate from "../types/Roomate";
import getNDecimalPlaces from "../util/getNDecimalPlaces";
import RoomatePicker from "./RoomatePicker";
import Cost from "../types/Cost";
import deriveCosts from "../util/deriveCosts";

interface Props { 
    items: Item[]; 
    roomates: Roomate[];
    setItems: (items: Item[]) => void; 
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void; 
    addCosts: (costs: Cost[]) => void; 
}

// Modal to add a new item 
const AddItemModal = (props: Props) => { 
  const [roomates, setRoomates] = useState(props.roomates);

  const {isOpen, setIsOpen, items, setItems} = props;
  const [updatedItems, setUpdatedItems] = useState(items);

  const [textInputFieldState, setTextInputFieldState] = useState(defaultTextInputFieldState);
  const [selectedRoomates, setSelectedRoomates] = useState([] as string[]);

  const addItem = (name: string, roomates: string[], cost: number, quantity: number) => { 
    // New item ID is id of last item in list plus 1, or 0 for empty items list 
    const newId = updatedItems.length > 0 ? updatedItems[updatedItems.length - 1].id + 1 : 0; 
    const newItem = {
      id: newId, 
      name,
      roomates, 
      cost, 
      quantity
    } as Item;

    setUpdatedItems((oldUpdatedItems) => [...oldUpdatedItems, newItem]);

    // Generate costs based off item and add them 
    props.addCosts(deriveCosts([newItem]));
  };


  const updateTextField = (id: AddItemTextFields, value: AddItemTextInputField) => { 
    setTextInputFieldState((oldTextInputFieldState) => { 
      const index = oldTextInputFieldState.findIndex((field) => field.id === id);
      if(index === -1) return oldTextInputFieldState;

      const newTextInputFieldState = [...oldTextInputFieldState]; 
      newTextInputFieldState[index] = value; 

      return newTextInputFieldState;
    });
  };

  // Updates error messages, returns true if all inputs are valid
  const validateAllInputFields = () => { 
    let allInputsValid = true; 

    for(let i = 0; i < textInputFieldState.length; i++) { 
      const oldFieldState = [...textInputFieldState][i]; 
      const field = textInputFieldState[i].id; 
      const text = textInputFieldState[i].value as string; 

      const [isValid, errorMessage] = validateInputChange(text, field) as [boolean, string];

      updateTextField(field, {
        ...oldFieldState,
        isValid,
        errorMessage
      });

      if(!isValid) allInputsValid = false; 
    }

    if(selectedRoomates.length < 1) allInputsValid = false; 

    return allInputsValid;
  };

  const getTextFieldById = (id: AddItemTextFields) => { 
    return [...textInputFieldState].find((field) => field.id === id) as AddItemTextInputField;
  };
    
  // Return input values as object 
  const getAllInputValues = () => { 
    const inputValues = {
      name: "",
      cost: 0,
      quantity: 0,
      roomates: [...selectedRoomates]
    }; 

    for(let i = 0; i < textInputFieldState.length; i++) { 
      const fieldValue = [...textInputFieldState][i];
      const id = [...textInputFieldState][i].id;

      switch(id) { 
      case AddItemTextFields.Name:
        inputValues["name"] = fieldValue.value as string;
        break;

      case AddItemTextFields.Cost:
        inputValues["cost"] = parseFloat(fieldValue.value as string);
        break;

      case AddItemTextFields.Quantity:
        inputValues["quantity"] = parseInt(fieldValue.value as string);
        break;
      }
    }

    return inputValues;
  };

  const handleCloseClick = () => {
    if(validateAllInputFields()){ 
      const {name, cost, quantity, roomates} = getAllInputValues();
      setIsOpen(false);
      addItem(name, roomates, cost, quantity);
      setTextInputFieldState(defaultTextInputFieldState);
    }  
  };

  const handleAddAnotherItemClick = () => { 
    if(validateAllInputFields()){ 
      const {name, roomates, cost, quantity} = getAllInputValues();
      addItem(name, roomates, cost, quantity);
      setTextInputFieldState(defaultTextInputFieldState);
    }  
  };

  const validateInputChange = (text: string, field: AddItemTextFields) => { 
    let valid = false;
    let errorMessage = ""; 

    let isNumber: boolean; 
        
    switch(field) { 

    case AddItemTextFields.Name: 
      // If name is not unique 
      if(updatedItems.filter((item) => item.name === text).length > 0) { 
        errorMessage = "Name taken"; 
      } else if(text.length > 32) { 
        errorMessage =  "Too long";
      } else if(text.length === 0) {
        errorMessage = "Name cannot be blank";
      } else { 
        valid = true; 
      }
      break; 

    case AddItemTextFields.Cost: 
      isNumber = !Number.isNaN(parseFloat(text));

      if(!isNumber){ 
        errorMessage = "Must be a number";
      } else if(!(getNDecimalPlaces(text) === 0 || getNDecimalPlaces(text) === 2)){
        errorMessage = "Invalid format";
      } else { 
        valid = true; 
      }
      break;

    case AddItemTextFields.Quantity: 
      isNumber = !Number.isNaN(parseInt(text));

      if(!isNumber){ 
        errorMessage = "Must be a number";
      } else if(getNDecimalPlaces(text) !== 0 || parseInt(text) < 0){
        errorMessage = "Quantity must be a whole, positive number";
      } else { 
        valid = true; 
      }
      break;
    }

    return [valid, errorMessage]; 
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>, field: AddItemTextFields) => {
    const text = event.target.value;
    const oldFieldState = getTextFieldById(field); 

    const [isValid, errorMessage] = validateInputChange(text, field) as [boolean, string];

    updateTextField(field, {
      ...oldFieldState,
      isValid,
      errorMessage,
      value: text
    });
  };

  useEffect(() => { 
    setItems(updatedItems);
  }, [updatedItems]);

  useEffect(() => { 
    setRoomates(props.roomates);
  }, [props.roomates]);

  return (
    <Dialog
      open={isOpen}
      onClose={handleCloseClick}
      aria-labelledby="alert-dialog-title"
    >

      <DialogTitle id="alert-dialog-title">
        {"Add Item"}
      </DialogTitle>

      <DialogContent>

        {roomates.length > 0 && <List>
          {
            textInputFieldState.map((field) => (
              <ListItem key={field.id}>
                <TextField 
                  error={!field.isValid}
                  label={field.label}
                  helperText={!field.isValid ? field.errorMessage : null}
                  onChange={(e) => handleInputChange(e, field.id)}
                  value={field.value}
                />
              </ListItem> 
            )
            )
          }

          <ListItem key={textInputFieldState.length + 1}>
            <ListItemText>Roomates</ListItemText>
          </ListItem>

          <ListItem key={textInputFieldState.length + 2}>
            <RoomatePicker 
              roomates={roomates} 
              setSelectedRoomates={setSelectedRoomates}
            />
          </ListItem>

        </List>}

        {roomates.length === 0 && <DialogContentText>Add roomates to begin</DialogContentText>}

      </DialogContent>

      <DialogActions>
        <Button onClick={() => {setIsOpen(false); setTextInputFieldState(defaultTextInputFieldState);}}>
                Cancel
        </Button>

        <Button onClick={handleAddAnotherItemClick} autoFocus>
                    Add Another Item
        </Button>

        <Button onClick={handleCloseClick}>Done</Button>
      </DialogActions>

    </Dialog>
  );
};

export default AddItemModal; 