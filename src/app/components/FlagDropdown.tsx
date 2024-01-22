'use client'; 
import React, { useState } from 'react';
import useSWR from 'swr';
import FetchFlag from './FetchFlag';
import FetchInfo from './FetchInfo';

export default function FlagDropdown() {

  const [countryCode, setCountry] = useState('GBR');

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

  function changeCountry(e) {
    setCountry(e.target.value);
  }

  return (
    <div>
      <select name='flagSelect' value={ countryCode } onChange={changeCountry}>
        {countries &&
          countries.map((country, index) => (
          <option value={ country.alpha3Code }>
            { country.name }
          </option>
        ))}
      </select>
      <FetchFlag countryFlag={ countryCode } />
      <FetchInfo countryCode={ countryCode } />
    </div>
  );
  
}