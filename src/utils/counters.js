import jsonData from '../data.json';
import { incomeLabels, ageLabels, genderLabels, locationLabels, groupAge } from './constants';

// Export data
export const data = JSON.parse(JSON.stringify(jsonData));
export const totalPopulation = data.length;

// Count how many people fit in each income group
export const incomeCount = (data) => {
	const incomeArray = data.map((person) => person.income);

	let incomeCount = Array.apply(null, Array(incomeLabels.length)).map(() => { return 0; });
	incomeArray.forEach((income) => {
		incomeCount[incomeLabels.indexOf(income)]++;
	});

  	return incomeCount;
}

// Count how many people fit in each age group
export const ageCount = (data) => {   
	const ageArray = data.map((person) => person.age);

	let ageCount = Array.apply(null, Array(ageLabels.length)).map(() => { return 0; });	
	ageArray.forEach((value) => {
		ageCount[ageLabels.indexOf(groupAge(value))]++;
	});

	return ageCount;
}

// Count how many people fit in each gender
export const genderCount = (data) => {
	const genderArray = data.map((person) => person.gender);

	let genderCount = Array.apply(null, Array(genderLabels.length)).map(() => { return 0; });
	genderArray.forEach((value) => {
		genderCount[genderLabels.indexOf(value)]++;
  });

  	return genderCount;
}

// Count how many people fit in each location
export const locationCount = (data) => {
	const locations = locationLabels(data);
	
	const locationArray = data.map((person) => person.location);
	let locationCount = Array.apply(null, Array(locations.length)).map(() => { return 0; });
	locationArray.forEach((value) => {
		locationCount[locations.indexOf(value)]++;
	});

	return locationCount;
}