import React, { useState, useEffect } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

import { genderLabels } from '../utils/constants';
import { data, genderCount, totalPopulation } from '../utils/counters';

import './GenderChart.css';

ChartJS.register(ArcElement, Tooltip, Legend);
ChartJS.defaults.font.family = '"Open Sans", sans-serif';

function PieChart () {
    // Chart states
    const [graphData, setGraphData] = useState({ datasets: [] });
    const [graphOptions, setGraphOptions] = useState({});

    useEffect(() => {
        const genderData = genderCount(data);

        setGraphData({        
            labels: genderLabels,
            datasets: [
              {
                type: 'pie',
                label: 'Population Income',
                data: genderData,
                backgroundColor: ['rgb(112, 55, 237)', 'rgb(66, 68, 179)', 'rgb(45, 45, 107)']
              }
            ],
          });
    
          setGraphOptions({
            responsive: true,
            plugins: {
              tooltip: {
                callbacks: {
                  label: function (item) {
                    return ' ' + item.label + ': ' + item.parsed +
                      ' (' + Math.round(item.parsed / totalPopulation * 100)  + '%)';
                  }
                },
              },
              legend: {
                display: false
              },
              title: {
                display: true,
                text: 'Gender',
                color: 'black',
                font: {
                  size: 15
                }
              }
            }
          });
        }, []);

    return (
      <div id='genderChart'>
        <Pie data={graphData} options={graphOptions} height={200} />
      </div>
    );
}

export default PieChart;