export enum AddItemTextFields { 
    Name,
    Cost,
    Quantity
}

export default interface AddItemTextInputField { 
    id: AddItemTextFields;
    value: string | number; 
    isValid: boolean; 
    label: string; 
    errorMessage: string; 
// eslint-disable-next-line semi
}

export const defaultTextInputFieldState: AddItemTextInputField[] = [
  {
    id: AddItemTextFields.Name,
    value: "",
    isValid: true,
    label: "Name", 
    errorMessage: ""
  },
  {
    id: AddItemTextFields.Cost,
    value: "",
    isValid: true,
    label: "Cost", 
    errorMessage: ""
  },
  {
    id: AddItemTextFields.Quantity,
    value: "1",
    isValid: true,
    label: "Quantity", 
    errorMessage: ""
  }
];