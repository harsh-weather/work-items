import { mapping } from "./masterSchema";

//Functional Headers
let headers = Object.values(mapping);

// Utility Headers
headers.push("ACTIONS");

console.log(headers);

export { headers, mapping };
