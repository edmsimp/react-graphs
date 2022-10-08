import React, { useState, useEffect } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

import { data, incomeCount } from '../utils/counters';
import { genderFilter, ageFilter, locationFilter } from '../utils/filters';
import { genderOptions, ageOptions, locationOptions, incomeLabels } from '../utils/constants'

import Filter from './Filter';

import './MainChart.css'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
ChartJS.defaults.font.family = '"Open Sans", sans-serif';

function MainChart() {
  // Filters' states
  const [gender, setGender] = useState({ value: 'All' });
  const [age, setAge] = useState({ value: 'All' });
  const [location, setLocation] = useState({ value: 'All' });

  // Chart states
  const [graphData, setGraphData] = useState({ datasets: [] });
  const [graphOptions, setGraphOptions] = useState({});

  useEffect(() => {
    // Filter data
    const filteredData = 
      locationFilter(
        ageFilter(
          genderFilter(
            data,
            gender.value
          ),
          age.value
        ),
        location.value
      );

    // Data variables
    const income = incomeCount(filteredData);
    const maxIncome = Math.max(...income);
    const totalPopulation = filteredData.length;

    setGraphData({        
      labels: incomeLabels,
      datasets: [
        {
          type: 'bar',
          label: 'People',
          data: income,
          backgroundColor: ['rgb(66, 68, 179)']
        }
      ],
    });

    setGraphOptions({
      responsive: true,
      plugins: {
        legend: {
          display: false
        },
        title: {
          display: true,
          text: 'Income',
          color: 'black',
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
          suggestedMax: maxIncome
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
      <div id='main'>
        <div id='mainChart'> 
          <Bar options={graphOptions} data={graphData} />
        </div>
        <div id='filters'>
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
            title='Location' options={locationOptions(data)}
          />
        </div>
      </div>
    </div>
  );
}

export default MainChart;