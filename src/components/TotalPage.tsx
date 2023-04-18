import React, { useEffect, useState } from "react";
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, List, ListItem, Button, Typography } from "@mui/material";
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
                roomates.map((roomate) => (
                  <TableCell align="left" key={roomate.name}>
                    <Typography variant="h6" sx={{color:"primary.main"}}>{roomate.name}</Typography>
                  </TableCell>)
                )
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
                              <Typography variant="body1">{`${cost.item.name} - ${cost.amount.toFixed(2)}`}</Typography>
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
              <TableCell align="right">
                <Typography variant="h6" sx={{color:"primary.main"}}>Total:</Typography>
              </TableCell>
              {
                roomates.map((roomate) => { 
                  return (
                    <TableCell align="left" key={roomate.name}>
                      <Typography variant="body1">{roomate.balance.toFixed(2)}</Typography>
                    </TableCell>
                  );
                })
              }
            </TableRow>
          </TableBody>

        </Table>

      </TableContainer>
      <Button onClick={() => props.setIsTotalPageOpen(false)} variant="contained"><Typography variant="button">Home</Typography></Button>
    </>
  );
};