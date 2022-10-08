import React, { useState, useEffect } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

import { data, ageCount, totalPopulation } from '../utils/counters';
import { ageLabels } from '../utils/constants';

import './AgeChart.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
ChartJS.defaults.font.family = '"Open Sans", sans-serif';

function AgeChart () {
    // Chart states
    const [graphData, setGraphData] = useState({ datasets: [] });
    const [graphOptions, setGraphOptions] = useState({});

    useEffect(() => {
        const ageData = ageCount(data);
        const maxAgeCount = Math.max(...ageData);

        setGraphData({
            labels: ageLabels,
            datasets: [
              {
                type: 'bar',
                label: 'People',
                data: ageData,
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
                    if (Number.isInteger(tick)) { return Math.round(tick / totalPopulation * 100) + '%'; }
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
      <div id='ageChart'>
        <Bar data={graphData} options={graphOptions} height={200}/>
      </div>
    );
}

export default AgeChart;