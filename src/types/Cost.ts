import { Item } from ".";

// A Cost is a fragment of an item's total that was divided amongst multiple roomates 
export interface Cost { 
    amount: number; 
    roomate: string;
    item: Item; 
}