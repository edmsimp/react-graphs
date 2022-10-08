import { groupAge } from "./constants";

// Data filters
export const genderFilter = (data, value) => {
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

export const ageFilter = (data, value) => {
    const filteredData = data.filter((item) => {
        switch (value) {
          case 'All':
            return true;
          case 'Known':
            return item.age !== 'Unknown';
          default:
            return groupAge(item.age) === value;
        }
    });

    return filteredData;
}

export const locationFilter = (data, value) => {
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