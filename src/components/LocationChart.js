import React, { useState, useEffect } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

import { data, locationCount, totalPopulation } from '../utils/counters';
import { locationLabels } from '../utils/constants';

import './LocationChart.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
ChartJS.defaults.font.family = '"Open Sans", sans-serif';

function LocationChart () {
    // Chart states
    const [graphData, setGraphData] = useState({ datasets: [] });
    const [graphOptions, setGraphOptions] = useState({});

    useEffect(() => {
      const locationData = locationCount(data)
      const maxLocationCount = Math.max(...locationData);

        setGraphData({
            labels: locationLabels(data),
            datasets: [
              {
                type: 'bar',
                label: 'People',
                data: locationData,
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
                text: 'Location',
                color: 'black',
                font: {
                  size: 15
                }
              }
            },
            scales: {
              y: {
                color: 'black',
                ticks: {
                  color: 'black',
                  font: {
                    size: 13
                  },
                  beginAtZero: true,
                  callback: (tick) => {
                    if (Number.isInteger(tick)) { return Math.round(tick / totalPopulation * 100) + '%'; }
                  },
                },
                min: 0,
                suggestedMax: maxLocationCount
              },
              x: {
                ticks: {
                  color: 'black',
                  font: {
                    size: 13
                  },
                },
                grid: {
                  display: false
                }
              },
            },
          });
        }, []);

    return (
      <div id='location'>
        <Bar data={graphData} options={graphOptions} height={200}/>
      </div>
    );
}

export default LocationChart;