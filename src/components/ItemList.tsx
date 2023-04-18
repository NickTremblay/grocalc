import { Box, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import React, { useEffect, useState } from "react";
import {Item, Roomate} from "../types";

interface Props { 
    items: Item[];
    roomates: Roomate[];
    deleteItem: (id: number) => void;
}

export const ItemList = (props:Props) => { 
  const [items, setItems] = useState(props.items);

  useEffect(() => { 
    setItems(props.items);
  }, [props.items]);

  return ( 
    <TableContainer>
      <Table sx={{ minWidth: 650 }}>

        <TableHead>
          <TableRow>
            <TableCell align="left"></TableCell>
            <TableCell align="right"><Typography variant="h6" sx={{color:"primary.main"}}>Item</Typography></TableCell>
            <TableCell align="right"><Typography variant="h6" sx={{color:"primary.main"}}>Roomates</Typography></TableCell>
            <TableCell align="right"><Typography variant="h6" sx={{color:"primary.main"}}>Cost</Typography></TableCell>
            <TableCell align="right"><Typography variant="h6" sx={{color:"primary.main"}}>Quantity</Typography></TableCell>
            <TableCell align="right"><Typography variant="h6" sx={{color:"primary.main"}}>Total</Typography></TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {items.map((item) => (
            <TableRow
              key={item.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row" align="left">
                <IconButton aria-label="delete" onClick={() => props.deleteItem(item.id)}>
                  <DeleteIcon />
                </IconButton>
              </TableCell>

              <TableCell align="right">
                <Typography variant="body1">{item.name}</Typography>
              </TableCell>

              <TableCell align="right">
                {
                  item.roomates.length === props.roomates.length ? <Typography variant="body1">Everyone</Typography> 
                    : (<Box>{item.roomates.map((roomate) => <Typography key={roomate} variant="body1">{roomate}</Typography>)}</Box>)
                }
              </TableCell>

              <TableCell align="right"><Typography variant="body1">{item.cost}</Typography></TableCell>

              <TableCell align="right"><Typography variant="body1">{item.quantity}</Typography></TableCell>
                
              <TableCell align="right"><Typography variant="body1">{item.cost * item.quantity}</Typography></TableCell>
            </TableRow>
          ))}
        </TableBody>

      </Table>
    </TableContainer>
  );

};