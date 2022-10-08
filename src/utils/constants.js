// Charts labels
export const incomeLabels = ['Unknown', 'Lower 50%', '41-50%', '31-40%', '21-30%', '11-20%', 'Top 10%'];
export const ageLabels = ['18-24', '25-34', '35-44', '45-54', '55-64', '65+', 'Unknown'];
export const genderLabels = ['Female', 'Male', 'Unknown'];
// Get location labels from data
export const locationLabels = (data) => {
    const locationArray = data.map((person) => person.location);
    let locationLabels = locationArray.filter((location, pos) => {
      return locationArray.indexOf(location) === pos;
    });
    locationLabels.sort();
    
    // Put 'Unkown' as the last label, for better display
    if (locationLabels.includes('Unknown')) {
        locationLabels.splice(locationLabels.indexOf('Unknown'), 1);
        locationLabels.push('Unknown');
    }

    return locationLabels;
}

// Filter options
export const ageOptions = ['All', 'Known', '18-24', '25-34', '35-44', '45-54', '55-64', '65+', 'Unknown'];
export const genderOptions = ['All', 'Known', 'Female', 'Male', 'Unknown'];
// Get location filter options from data
export const locationOptions = (data) => {
    let locationOptions = locationLabels(data);
    
    // Put 'Unkown' as the last and 'Known' as second label, for better display
    if (locationOptions.includes('Unknown')) {
        locationOptions.splice(locationOptions.indexOf('Unknown'), 1);
        locationOptions.unshift('Known');
        locationOptions.push('Unknown');
    }
    locationOptions.unshift('All');

    return locationOptions;
}

// Group ages
export const groupAge = (age) => {
    switch (true) {
        case age >= 18 && age < 25: 
            return '18-24';
        case age < 35:
            return '25-34';
        case age < 45:
            return '35-44';
        case age < 55:
            return '45-54';
        case age < 65:
            return '55-64';
        case age >= 65:
            return '65+';
        default: // Unknown age
            return 'Unknown';
    }
}