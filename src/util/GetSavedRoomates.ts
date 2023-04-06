import { Roomate } from "../types";


// Get roomates from localStorage or return null if none
export const GetSavedRoomates = () => {
  // Return null if no saved
  if(!localStorage.getItem("roomates")) return null; 
  const savedRoomateNames =  JSON.parse(localStorage.getItem("roomates") as string) as string[];
  return savedRoomateNames.map((name) => { 
    const roomate: Roomate = {
      name,
      balance: 0,
      costs: []
    };
    return roomate;
  }) as Roomate[]; 
};