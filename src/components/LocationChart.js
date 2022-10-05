import React, { useState, useEffect } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

import './LocationChart.css';

import parsedData from '../utils/parse_data';
import { locationLabels } from '../utils/constants';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function LocationChart () {

    const [graphData, setGraphData] = useState({ datasets: [] });
    const [graphOptions, setGraphOptions] = useState({});

    useEffect(() => {
      const locationCount = parsedData.locationCount(parsedData.data)
      const maxLocationCount = Math.max(...locationCount);

        setGraphData({
            labels: locationLabels(parsedData.data),
            datasets: [
              {
                type: 'bar',
                label: 'People',
                data: locationCount,
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
                text: 'Location',
                color: 'rgba(0, 0, 0, 1)',
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
                    if (Number.isInteger(tick)) { return Math.round(tick / parsedData.totalPopulation * 100) + '%'; }
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
        <div className='location'>
            <Bar data={graphData} options={graphOptions} height={200}/>
        </div>
    );
}

export default LocationChart;