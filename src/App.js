import React from 'react';

import Header from './components/Header';
import MainChart from './components/MainChart';
import GenderChart from './components/GenderChart';
import LocationChart from './components/LocationChart';
import AgeChart from './components/AgeChart';

import './App.css';

function App () {
    return (
        <div>
            <Header />
            <div className='body'>
                <MainChart />
                <div className='secondary'>
                    <AgeChart />
                    <GenderChart />
                    <LocationChart />
                </div>
            </div>
        </div>
    );
}

export default App;