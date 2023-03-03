import Roomate from "../types/Roomate";

// Save given array of Roomates to localStorage for later retrieval by util.GetSavedRoomates
// Note: Does not save balances
const SaveRoomates = (roomates:Roomate[]) => {
    const nameList = roomates.map((roomate:Roomate) => {
        return roomate.name;
    });

    localStorage.setItem("roomates", JSON.stringify(nameList)); 
}

export default SaveRoomates;