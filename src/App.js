import React from 'react';

import Header from './components/Header';
import MainChart from './components/MainChart';
import AgeChart from './components/AgeChart';
import GenderChart from './components/GenderChart';
import LocationChart from './components/LocationChart';

import './App.css';

function App () {
	return (
    <div id='app'>
      <Header />
      <div id='body'>
        <MainChart />
        <div id='charts'>
          <AgeChart />
          <GenderChart />
          <LocationChart />
        </div>
      </div>
    </div>
  );
}

export default App;