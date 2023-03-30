import Item from "./Item";

// A Cost is a fragment of an item's total that was divided amongst multiple roomates 
interface Cost { 
    amount: number; 
    roomate: string;
    item: Item; 
}

export default Cost; 