import React from 'react';

import './Filter.css';

function Filter ({ value, onValueChange, title, options}) {
    const handleChange = event => {
        onValueChange({ value: event.target.value });
    }

    return (
        <div>
            <h4>{title}</h4>
            <select
            value={value}
            onChange={handleChange}
            >
                {options.map(option => (
                    <option key={option} >{option}</option>
                ))}
            </select>
        </div>
    );
}

export default Filter;