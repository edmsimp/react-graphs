import React, { useState, useEffect } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

import './AgeChart.css';

import parsedData from '../utils/parse_data';
import { ageLabels } from '../utils/constants';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function AgeChart () {

    const [graphData, setGraphData] = useState({ datasets: [] });
    const [graphOptions, setGraphOptions] = useState({});

    useEffect(() => {
        const ageCount = parsedData.ageCount(parsedData.data);
        const maxAgeCount = Math.max(...ageCount);

        setGraphData({
            labels: ageLabels,
            datasets: [
              {
                type: 'bar',
                label: 'People',
                data: ageCount,
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
                text: 'Age',
                color: 'black',
                font: {              
                  size: 15
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
                    if (Number.isInteger(tick)) { return Math.round(tick / parsedData.totalPopulation * 100) + '%'; }
                  },
                },
                min: 0,
                suggestedMax: maxAgeCount
              },
              x: {
                ticks: {
                  color: 'black',
                  autoSkip: false,
                  maxRotation: 0,
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
        <div className='age'>
            <Bar data={graphData} options={graphOptions} height={200}/>
        </div>
    );
}

export default AgeChart;