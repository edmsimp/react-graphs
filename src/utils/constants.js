// Charts labels
const incomeLabels = ['Unknown', 'Lower 50%', '41-50%', '31-40%', '21-30%', '11-20%', 'Top 10%'];
const ageLabels = ['18-24', '25-34', '35-44', '45-54', '55-64', '65+', 'Unknown'];
const genderLabels = ['Female', 'Male', 'Unknown'];
const locationLabels = (data) => {
    const locationArray = data.map((person) => person.location);
    let locationLabels = locationArray.filter((item, pos) => {
      return locationArray.indexOf(item) === pos;
    })
    locationLabels.sort();
    
    if (locationLabels.includes('Unknown')) {
        delete locationLabels[locationLabels.indexOf('Unknown')];
        locationLabels = locationLabels.filter(location => location)
        locationLabels.push('Unknown');
    }
    console.log(locationLabels);
    return locationLabels;
}

// Filter selection options
const ageOptions = ['All', 'Known', '18-24', '25-34', '35-44', '45-54', '55-64', '65+', 'Unknown'];
const genderOptions = ['All', 'Known', 'Female', 'Male', 'Unknown'];
const locationOptions = (data) => {
    let locationOptions = locationLabels(data);
    
    if (locationOptions.includes('Unknown')) {
        delete locationOptions[locationOptions.indexOf('Unknown')];
        locationOptions.unshift('Known');
        locationOptions.push('Unknown');
    }
    locationOptions.unshift('All');

    return locationOptions;
}

const incomeMap = {
    'Unknown': 0,
    'Lower 50%': 1,
    '41-50%': 2,
    '31-40%': 3,
    '21-30%': 4,
    '11-20%': 5,
    'Top 10%': 6
};

const ageMap = (age) => {
    if (age >= 18 && age < 25) {
        return 0;
    } else if (age >= 25 && age < 35) {
        return 1;
    } else if (age >= 35 && age < 45) {
        return 2;
    } else if (age >= 45 && age < 55) {
        return 3;
    } else if (age >= 55 && age < 65) {
        return 4;
    } else if (age >= 65) {
        return 5;
    } else if(age === 'Unknown') {
        return 6;
    } 
}

const genderMap = {
    'Female': 0,
    'Male': 1,
    'Unknown': 2
}

module.exports = {
    genderOptions,
    ageOptions,
    locationOptions, 
    incomeLabels,
    ageLabels,
    genderLabels,
    locationLabels,
    incomeMap,
    ageMap,
    genderMap,
}