import React, { useState, useEffect } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

import './GenderChart.css';
import { genderLabels } from '../utils/constants';
import parsedData from '../utils/parse_data';

ChartJS.register(ArcElement, Tooltip, Legend);

function PieChart () {

    const [graphData, setGraphData] = useState({ datasets: [] });
    const [graphOptions, setGraphOptions] = useState({});

    useEffect(() => {
        setGraphData({        
            labels: genderLabels,
            datasets: [
              {
                type: 'pie',
                label: 'Population Income',
                data: parsedData.genderCount(parsedData.data),
                backgroundColor: ['rgba(112, 55, 237, 0.99)', 'rgba(66, 68, 179, 0.99)', 'rgba(45, 45, 107, 0.99)'],
              }
            ],
          });
    
          setGraphOptions({
            responsive: true,
            plugins: {
              tooltip: {
                callbacks: {
                  label: function (item) {
                    console.log(item)
                    return ' ' + item.label + ': ' + item.parsed +
                      ' (' + item.parsed / parsedData.totalPopulation * 100  + '%)';
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
        <div className='gender'>
            <Pie data={graphData} options={graphOptions} />
        </div>
    );

}

export default PieChart;