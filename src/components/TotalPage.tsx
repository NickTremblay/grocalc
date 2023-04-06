import React, { useEffect, useState } from "react";
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, List, ListItemText, ListItem, Button } from "@mui/material";
import { Item, Roomate } from "../types";

interface Props {
    items: Item[];
    roomates: Roomate[];
    setIsTotalPageOpen: (isTotalPageOpen: boolean) => void;
}

export const TotalPage = (props: Props) => {
  const [roomates, setRoomates] = useState(props.roomates);

  useEffect(() => {
    setRoomates(props.roomates);
  }, [props.roomates]);


  return (
    <>
      <TableContainer>

        <Table sx={{ minWidth: 650 }} aria-label="simple table">

          <TableHead>
            <TableRow>
              <TableCell align="left"></TableCell>
              {
                roomates.map((roomate) => <TableCell align="left" key={roomate.name}>{roomate.name}</TableCell>)
              }
            </TableRow>
          </TableHead>

          <TableBody>
            <TableRow>
              <TableCell align="left"></TableCell>
              {
                roomates.map((roomate) => {
                  return (
                    <TableCell align="left" key={roomate.name}>

                      <List>
                        {roomate.costs.map((cost) => {
                          return (
                            <ListItem key={cost.item.id}>
                              <ListItemText>{`${cost.item.name} - ${cost.amount.toFixed(2)}`}</ListItemText>
                            </ListItem>
                          );
                        }
                        )}

                      </List>

                    </TableCell>
                  );
                })
              }
            </TableRow>

            <TableRow
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="right">Total: </TableCell>
              {
                roomates.map((roomate) => { 
                  return <TableCell align="left" key={roomate.name}>{roomate.balance.toFixed(2)}</TableCell>;
                })
              }
            </TableRow>
          </TableBody>

        </Table>

      </TableContainer>
      <Button onClick={() => props.setIsTotalPageOpen(false)}>Home</Button>
    </>
  );
};