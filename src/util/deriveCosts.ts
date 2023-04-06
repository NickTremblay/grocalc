import { Item, Cost } from "../types";

// Create Cost instances for each roomate listed on each item and return them
export const deriveCosts = (items: Item[]) => { 
  const costs = [] as Cost[];

  let itemTemp: Item; 
  let itemRoomatesTemp: string[];
  for(let i = 0; i < items.length; i++) { 
    itemTemp = items[i];
    itemRoomatesTemp = itemTemp.roomates; 
        
    for(let j = 0; j < itemRoomatesTemp.length; j++){ 
      costs.push({
        amount: (itemTemp.cost * itemTemp.quantity) / itemRoomatesTemp.length,
        roomate: itemRoomatesTemp[j], 
        item: itemTemp
      });
    }
  }

  return [...costs]; 
};