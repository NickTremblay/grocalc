import { Dialog, DialogTitle, DialogContent, List, ListItem, TextField, DialogActions, Button, ListItemText, DialogContentText } from "@mui/material";
import React, { useEffect, useState } from "react";
import AddItemTextInputField, { AddItemTextFields, defaultTextInputFieldState } from "../types/AddItemTextField";
import Item from "../types/Item";
import Roomate from "../types/Roomate";
import getNDecimalPlaces from "../util/getNDecimalPlaces";
import RoomatePicker from "./RoomatePicker";

interface Props { 
    items: Item[]; 
    roomates: Roomate[];
    setItems: (items: Item[]) => void; 
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void; 
}

// Modal to add a new item 
const AddItemModal = (props: Props) => { 
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
    }

    const updateTextField = (id: AddItemTextFields, value: AddItemTextInputField) => { 
        setTextInputFieldState((oldTextInputFieldState) => { 
            const index = oldTextInputFieldState.findIndex((field) => field.id === id);
            if(index === -1) return oldTextInputFieldState;

            const newTextInputFieldState = [...oldTextInputFieldState]; 
            newTextInputFieldState[index] = value; 

            return newTextInputFieldState;
        })
    };

    // Updates error messages, returns true if all inputs are valid
    const validateAllInputFields = () => { 
        let allInputsValid = true; 

        for(let i = 0; i < textInputFieldState.length; i++) { 
            const oldFieldState = [...textInputFieldState][i]; 
            const field = textInputFieldState[i].id; 
            const text = textInputFieldState[i].value as string; 
            let isNumber: boolean; 

            switch(field) { 

                case AddItemTextFields.Name: 
                    // If name is not unique 
                    if(updatedItems.filter((item) => item.name === text).length > 0) { 
                        updateTextField(field, {
                            ...oldFieldState,
                            isValid: false, 
                            errorMessage: "Name taken",
                        });

                        allInputsValid = false; 

                    } else if(text.length > 32) { 
                        updateTextField(field, {
                            ...oldFieldState,
                            isValid: false, 
                            errorMessage: "Too long",
                        });

                        allInputsValid = false; 

                    } else if(text.length === 0) {
                        updateTextField(field, {
                            ...oldFieldState,
                            isValid: false, 
                            errorMessage: "Name cannot be blank",
                        });

                        allInputsValid = false; 
                    }
                break; 

                case AddItemTextFields.Cost: 
                    isNumber = !Number.isNaN(parseFloat(text));

                    if(!isNumber){ 
                        updateTextField(field, {
                            ...oldFieldState,
                            isValid: false, 
                            errorMessage: "Must be a number",
                        });

                        allInputsValid = false; 

                    } else if(!(getNDecimalPlaces(text) === 0 || getNDecimalPlaces(text) === 2)){
                        updateTextField(field, {
                            ...oldFieldState,
                            isValid: false, 
                            errorMessage: "Invalid format",
                        });

                        allInputsValid = false; 

                    }
                break;

                case AddItemTextFields.Quantity: 
                    isNumber = !Number.isNaN(parseInt(text))

                    if(!isNumber){ 
                        updateTextField(field, {
                            ...oldFieldState,
                            isValid: false, 
                            errorMessage: "Must be a number",
                        });

                        allInputsValid = false; 

                    } else if(getNDecimalPlaces(text) !== 0 || parseInt(text) < 0){
                        updateTextField(field, {
                            ...oldFieldState,
                            isValid: false, 
                            errorMessage: "Quantity must be a whole, positive number",
                        });

                        allInputsValid = false; 

                    }
                break;

            }
        }

        if(selectedRoomates.length < 1) allInputsValid = false; 

        return allInputsValid;
    }

    const getTextFieldById = (id: AddItemTextFields) => { 
        return [...textInputFieldState].find((field) => field.id === id) as AddItemTextInputField;
    }
    
    // Return input values as object 
    const getAllInputValues = () => { 
        let inputValues = {
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
    }

    const handleCloseClick = () => {
        if(validateAllInputFields()){ 
            const {name, cost, quantity, roomates} = getAllInputValues();
            setIsOpen(false);
            addItem(name, roomates, cost, quantity);
            setTextInputFieldState(defaultTextInputFieldState);
        }  
    }

    const handleAddAnotherItemClick = () => { 
        if(validateAllInputFields()){ 
            const {name, roomates, cost, quantity} = getAllInputValues();
            addItem(name, roomates, cost, quantity);
            setTextInputFieldState(defaultTextInputFieldState);
        }  
    }

    const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>, field: AddItemTextFields) => {
        const oldFieldState  = getTextFieldById(field);
        const text = event.target.value;
        let isNumber: boolean;

        // TODO: Abstract this out of event handler and overhaul validateAllInputFields()
        // validateFieldChange(text: string, field: AddItemTextFields) => boolean
        switch(field) { 

            case AddItemTextFields.Name: 
                // If name is not unique 
                if(updatedItems.filter((item) => item.name === text).length > 0) { 
                    updateTextField(field, {
                        ...oldFieldState,
                        isValid: false, 
                        errorMessage: "Name taken",
                        value: text,
                    });
                } else if(text.length > 32) { 
                    updateTextField(field, {
                        ...oldFieldState,
                        isValid: false, 
                        errorMessage: "Too long",
                        value: text,
                    });
                } else if(text.length === 0) {
                    updateTextField(field, {
                        ...oldFieldState,
                        isValid: false, 
                        errorMessage: "Name cannot be blank",
                        value: text,
                    });
                }else { 
                    updateTextField(field, {
                        ...oldFieldState,
                        value: text,
                        isValid: true,
                    });
                }
            break; 

            case AddItemTextFields.Cost: 
                isNumber = !Number.isNaN(parseFloat(text))

                if(!isNumber){ 
                    updateTextField(field, {
                        ...oldFieldState,
                        isValid: false, 
                        value: text,
                        errorMessage: "Must be a number",
                    });
                } else if(!(getNDecimalPlaces(text) === 0 || getNDecimalPlaces(text) === 2)){
                    updateTextField(field, {
                        ...oldFieldState,
                        isValid: false, 
                        value: text,
                        errorMessage: "Invalid format",
                    });
                } else { 
                    updateTextField(field, {
                        ...oldFieldState,
                        value: text,
                        isValid: true,
                    });
                }
            break;

            case AddItemTextFields.Quantity: 
                isNumber = !Number.isNaN(parseInt(text))

                if(!isNumber){ 
                    updateTextField(field, {
                        ...oldFieldState,
                        isValid: false, 
                        value: text,
                        errorMessage: "Must be a number",
                    });
                } else if(getNDecimalPlaces(text) !== 0 || parseInt(text) < 0){
                    updateTextField(field, {
                        ...oldFieldState,
                        isValid: false, 
                        value: text,
                        errorMessage: "Quantity must be a whole, positive number",
                    });
                } else { 
                    updateTextField(field, {
                        ...oldFieldState,
                        value: text,
                        isValid: true,
                    });
                }
            break;

        }
    }

    useEffect(() => { 
        setItems(updatedItems);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [updatedItems])

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

                {props.roomates.length > 0 && <List>
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
                            roomates={props.roomates} 
                            setSelectedRoomates={setSelectedRoomates}
                        />
                    </ListItem>

                </List>}

                {props.roomates.length === 0 && <DialogContentText>Add roomates to begin</DialogContentText>}

            </DialogContent>

            <DialogActions>
                <Button onClick={() => {setIsOpen(false); setTextInputFieldState(defaultTextInputFieldState)}}>
                Cancel
                </Button>

                <Button onClick={handleAddAnotherItemClick} autoFocus>
                    Add Another Item
                </Button>

                <Button onClick={handleCloseClick}>Done</Button>
            </DialogActions>

        </Dialog>
    );
}

export default AddItemModal; 