'use client'; 
import React, { useState } from 'react';
import useSWR from 'swr';

export default function FlagDropdown() {

  const [flag, setFlag] = useState('');

  type Country = {
    name: string;
    flags: {
      png: string;
    };
    code: string;
  };
  
  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  
  const {
    data: countries,
    error,
    isValidating,
  } = useSWR('https://restcountries.com/v2/all', fetcher);

  // Handles error and loading state
  if (error) return <div className='failed'>failed to load</div>;
  if (isValidating) return <div className="Loading">Loading...</div>;

  function changeFlag(e) {
    setFlag(e.target.value);
  }

  return (
    <div>
      <select name='flagSelect' onChange={changeFlag}>
        {countries &&
          countries.map((country, index) => (
          <option value={ country.flags.png }>
            { country.name }
          </option>
        ))}
      </select>
      <img src={ flag } title={ flag } alt='flag' width={100} />
    </div>
  );
  
}