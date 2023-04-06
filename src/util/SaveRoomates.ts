import { Roomate } from "../types";

// Save given array of Roomates to localStorage for later retrieval by util.GetSavedRoomates
// Note: Does not save balances
export const SaveRoomates = (roomates:Roomate[]) => {
  const nameList = roomates.map((roomate:Roomate) => {
    return roomate.name;
  });

  localStorage.setItem("roomates", JSON.stringify(nameList)); 
};