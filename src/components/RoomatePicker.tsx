import { Checkbox, FormControlLabel, FormGroup, List, ListItem } from "@mui/material";
import React, { useEffect, useState } from "react";
import Roomate from "../types/Roomate";
import RoomateCheckbox from "../types/RoomateCheckbox";

interface Props { 
    roomates: Roomate[]; 
    setSelectedRoomates: (selectedRoomates: string[]) => void; 
}

const RoomatePicker = (props:Props) => { 
    const {setSelectedRoomates} = props; 

    const defaultRoomateState = props.roomates.map((roomate) => {
        return {
            name: roomate.name,
            isSelected: true
        } as RoomateCheckbox;
    });

    const [roomateCheckboxes, setRoomateCheckboxes] = useState(defaultRoomateState)

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
        })
    }

    useEffect(() => { 
        const newSelectedRoomates = 
        roomateCheckboxes.filter((roomateCheckbox) => roomateCheckbox.isSelected)
        .map((roomateCheckbox) => roomateCheckbox.name);

        setSelectedRoomates(newSelectedRoomates);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [roomateCheckboxes])

    return (
        <FormGroup>
            <List>
                {
                    roomateCheckboxes.map((roomateCheckbox: RoomateCheckbox) => { 
                        return (
                        <ListItem key={roomateCheckbox.name}>

                            <FormControlLabel 
                            control={
                                <Checkbox 
                                    checked={roomateCheckbox.isSelected}
                                    onChange={() => toggleRoomate(roomateCheckbox.name)} 
                                />} 
                            label={roomateCheckbox.name} 
                            />

                        </ListItem>
                        )
                    })
                }
            </List> 
        </FormGroup>
    )
}

export default RoomatePicker;