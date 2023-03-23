import { List, ListItemText, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import React from "react";
import Item from "../types/Item";
import Roomate from "../types/Roomate";

interface Props { 
    items: Item[];
    roomates: Roomate[];
    setItems: (items: Item[]) => void;
}

const ItemList = (props:Props) => { 
    return ( 
        <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Item</TableCell>
              <TableCell align="right">Roomates</TableCell>
              <TableCell align="right">Cost</TableCell>
              <TableCell align="right">Quantity</TableCell>
              <TableCell align="right">Total</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.items.map((item) => (
              <TableRow
                key={item.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {item.name}
                </TableCell>

                <TableCell align="right">{
                item.roomates.length === props.roomates.length ? "Everyone" : <List>{item.roomates.map((roomate) => <ListItemText>{roomate}</ListItemText>)}</List>
                }</TableCell>

                <TableCell align="right">{item.cost}</TableCell>

                <TableCell align="right">{item.quantity}</TableCell>
                
                <TableCell align="right">{item.cost * item.quantity}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    )

}

export default ItemList;