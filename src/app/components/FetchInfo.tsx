'use client'; 
import React, { useState } from 'react';
import useSWR from 'swr';

export default function FetchInfo({ countryCode }) {
    
    const fetcher = (...args) => fetch(...args).then((res) => res.json());
    
    const {
      data: countries,
      error,
      isValidating,
    } = useSWR('https://restcountries.com/v3.1/alpha/' + countryCode + '/', fetcher);
  
    // Handles error and loading state
    if (error) return <div className='failed'>failed to load</div>;
    if (isValidating) return <div className="Loading">Loading...</div>;

    function Capitalise(str){
      return str.charAt(0).toUpperCase() + str.slice(1);
    }
  
    return (
      <div>
        <table className='m-5'>
          <tr>
            <td className='pr-3'><strong>Name (Common):</strong></td>
            <td>{ countries[0].name.common }</td>
          </tr>
          <tr>
            <td className='pr-3'><strong>Name (Official):</strong></td>
            <td>{ countries[0].name.official }</td>
          </tr>
          <tr>
            <td className='pr-3'><strong>Capital:</strong></td>
            <td>{ countries[0].capital ?? 'None' }</td>
          </tr>
          <tr>
            <td className='pr-3'><strong>Region:</strong></td>
            <td>{ countries[0].region }</td>
          </tr>
          <tr>
            <td className='pr-3'><strong>Subregion:</strong></td>
            <td>{ countries[0].subregion ?? 'None' }</td>
          </tr>
          <tr>
            <td className='pr-3'><strong>Population:</strong></td>
            <td>{ countries[0].population }</td>
          </tr>
          <tr>
            <td className='pr-3'><strong>Area:</strong></td>
            <td>{ countries[0].area }km<sup>2</sup></td>
          </tr>
          <tr>
            <td className='pr-3'><strong>Borders:</strong></td>
            <td>{ countries[0].borders ?? 'None' }</td>
          </tr>
          <tr>
            <td className='pr-3'><strong>Independent:</strong></td>
            <td>{ Capitalise(String(countries[0].independent)) }</td>
          </tr>
          <tr>
            <td className='pr-3'><strong>Landlocked:</strong></td>
            <td>{ Capitalise(String(countries[0].landlocked)) }</td>
          </tr>
          <tr>
            <td className='pr-3'><strong>UN Member:</strong></td>
            <td>{ Capitalise(String(countries[0].unMember)) }</td>
          </tr>
          <tr>
            <td className='pr-3'><strong>Timezones:</strong></td>
            <td>{ countries[0].timezones }</td>
          </tr>
          <tr>
            <td className='pr-3'><strong>Driving Side:</strong></td>
            <td>{ Capitalise(countries[0].car.side) }</td>
          </tr>
          <tr>
            <td className='pr-3'><strong>FIFA Code:</strong></td>
            <td>{ countries[0].fifa ?? 'n/a' }</td>
          </tr>
        </table>
      </div>
    );
  
}