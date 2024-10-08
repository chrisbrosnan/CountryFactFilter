'use client'; 
import React, { useState } from 'react';
import useSWR from 'swr';
import FetchFlag from './FetchFlag';
import FetchInfo from './FetchInfo';
import FetchCOA from './FetchCOA';

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
    <div className='m-5'>
      <select className='text-black mt-5 mb-3 px-3 py-4 border border-1 border-solid'name='flagSelect' value={ countryCode } onChange={changeCountry}>
        {countries &&
          countries.map((country, index) => (
          <option value={ country.alpha3Code }>
            { country.name }
          </option>
        ))}
      </select>
      <table className='text-black'>
        <tr>
          <td>
            <FetchFlag countryFlag={ countryCode } />
            <FetchCOA countryFlag={ countryCode } />
          </td>
          <td>
            <FetchInfo countryCode={ countryCode } />
          </td>
        </tr>
      </table>
    </div>
  );
  
}