import jsonData from '../data.json';
import { incomeLabels, ageLabels, genderLabels, locationLabels, incomeMap, ageMap, genderMap } from "./constants";

const data = JSON.parse(JSON.stringify(jsonData));
const totalPopulation = data.length;

const incomeCount = (data) => {
  const incomeArray = data.map((person) => person.income);

  let incomeCount = Array.apply(null, Array(incomeLabels.length)).map(() => { return 0; });
  incomeArray.forEach((value) => {
    incomeCount[incomeMap[value]]++;
  });

  return incomeCount;
}

const ageCount = (data) => {
  const ageArray = data.map((person) => person.age);

  let ageCount = Array.apply(null, Array(ageLabels.length)).map(() => { return 0; });
  
  ageArray.forEach((value) => {
    ageCount[ageMap(value)]++;
  });
  console.log(ageCount)
  return ageCount;
}

const genderCount = (data) => {
  const genderArray = data.map((person) => person.gender);

  let genderCount = Array.apply(null, Array(genderLabels.length)).map(() => { return 0; });
  genderArray.forEach((value) => {
    genderCount[genderMap[value]]++;
  });

  return genderCount;
}

const locationCount = (data) => {
  const locations = locationLabels(data);
  
  const locationArray = data.map((person) => person.location);
  let locationCount = Array.apply(null, Array(locations.length)).map(() => { return 0; });
  locationArray.forEach((value) => {
    locationCount[locations.indexOf(value)]++
  })

  return locationCount;
}

const parsedData = {
  data,
  totalPopulation,
  incomeCount,
  ageCount,
  genderCount,
  locationCount,
};

export default parsedData;