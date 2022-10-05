import React, { useState, useEffect } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

import './MainChart.css'

import parsedData from '../utils/parse_data';
import { genderFilter, ageFilter, locationFilter } from '../utils/filters';
import { genderOptions, ageOptions, locationOptions, incomeLabels } from '../utils/constants';

import Filter from './Filter';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function MainChart() {

    const [gender, setGender] = useState({ value: 'All' });
    const [age, setAge] = useState({ value: 'All' });
    const [location, setLocation] = useState({ value: 'All' });

    const [graphData, setGraphData] = useState({ datasets: [] });
    const [graphOptions, setGraphOptions] = useState({});

    useEffect(() => {
      const data = parsedData.data;
      
      const genderFilteredData = genderFilter(data, gender.value);
      const ageFilteredData = ageFilter(genderFilteredData, age.value);
      const locationFilteredData = locationFilter(ageFilteredData, location.value);

      const incomeCount = parsedData.incomeCount(locationFilteredData);
      const maxIncomeCount = Math.max(...incomeCount);
      const totalPopulation = locationFilteredData.length;

      setGraphData({        
        labels: incomeLabels,
        datasets: [
          {
            type: 'bar',
            label: 'People',
            data: incomeCount,
            backgroundColor: ['rgba(66, 68, 179, 0.99)'],
          }
        ],
      });

      setGraphOptions({
        maintainAspectRatio: false,
        responsive: true,
        plugins: {
          legend: {
            display: false
          },
          title: {
            display: true,
            text: 'Income',
            color: 'rgba(0, 0, 0, 1)',
            font: {              
              size: 21
            }
          }
        },
        scales: {
          y: {
            ticks: {
              color: 'black',
              font: {
                size: 13
              },
              beginAtZero: true,
              callback: (tick) => {
                if (Number.isInteger(tick)) {
                  if (totalPopulation !== 0) {
                    return Math.round(tick / totalPopulation * 100) + '%';
                  } else {
                    return Math.round(tick * 100) + '%';
                  }
                }
              },
            },
            min: 0,
            suggestedMax: maxIncomeCount
          },
          x: {
            ticks: {
              color: 'black',
              font: {
                size: 13
              },
            },
            grid: {
              display: false,
              drawBorder: true,
            },
          },
        },
      });
    }, [gender, age, location]);

  return (
  <div>
    <div className='main'>
      <div className='bar'> 
        <Bar options={graphOptions} data={graphData} />
      </div>
      <div className='filters'>
        <Filter 
          value={age.value} onValueChange={setAge}
          title='Age' options={ageOptions}
        />
        <Filter 
          value={gender.value} onValueChange={setGender} 
          title='Gender' options={genderOptions}
        />
        <Filter 
          value={location.value} onValueChange={setLocation}  
          title='Location' options={locationOptions(parsedData.data)}
        />
      </div>
    </div>
  </div>
  );
}

export default MainChart;