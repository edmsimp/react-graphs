const genderFilter = (data, value) => {
    const filteredData = data.filter((item) => {
        switch (value) {
          case 'All':
            return true;
          case 'Known':
            return item.gender !== 'Unknown'
          default:
            return item.gender === value;
        }
    });

    return filteredData;
}

const ageFilter = (data, value) => {
    const filteredData = data.filter((item) => {
        switch (value) {
          case 'All':
            return true;
          case 'Known':
            return item.age !== 'Unknown'
          case 'Unknown':
            return item.age === 'Unknown'
          case '18-24':
            return item.age >= 18 && item.age < 25;
          case '25-34':
            return item.age >= 25 && item.age < 35;
          case '35-44':
            return item.age >= 35 && item.age < 45;
          case '45-54':
            return item.age >= 45 && item.age < 55;
          case '55-64':
            return item.age >= 55 && item.age < 65;
          case '65+':
            return item.age >= 65;
          default:
            return true;
        }
      });

    return filteredData;
}

const locationFilter = (data, value) => {
    const filteredData = data.filter((item) => {
        switch (value) {
          case 'All':
            return true;
          case 'Known':
            return item.location !== 'Unknown'
          default:
            return item.location === value;
        }
      });

      return filteredData;
}

module.exports = {
    genderFilter,
    ageFilter,
    locationFilter,
}