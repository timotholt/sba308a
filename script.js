import { getPetName } from "./petnames.js";
import { injectUsMap } from "./usmap.js";


const mapOfUsa = injectUsMap("mapOfUsa");

const petName = getPetName("abj248l");


console.log(petName);
