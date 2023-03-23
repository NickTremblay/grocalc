// Returns amount of decimal places in string representation of number 
// Example: getNDecimalPlaces("cat") === -1 
// Example: getNDecimalPlaces(1) === 0 
// Example: getNDecimalPlaces(3.14) === 2

const getNDecimalPlaces = (n: string) => {
    if(n === "") return 0;

    if(Number.isNaN(parseFloat(n))) return -1;

    if(!n.includes(".")) return 0; 

    return n.split(".")[1].length || 0; 
}

export default getNDecimalPlaces;