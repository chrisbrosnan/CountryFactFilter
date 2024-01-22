'use client'; 
import React, { useState } from 'react';
import useSWR from 'swr';

export default function FetchInfo({ countryCode = 'AFG' }) {
  
    type Country = {
      name: string;
      flag: {
        png: string;
      }; 
      code: string;
    };
    
    const fetcher = (...args) => fetch(...args).then((res) => res.json());
    
    const {
      data: countries,
      error,
      isValidating,
    } = useSWR('https://restcountries.com/v3.1/alpha/' + countryCode + '/', fetcher);
  
    // Handles error and loading state
    if (error) return <div className='failed'>failed to load</div>;
    if (isValidating) return <div className="Loading">Loading...</div>;

    console.log(countries[0]);
  
    return (
      <div>
        <table>
          <tr>
            <td>Name (Common):</td>
            <td>{ countries[0].name.common }</td>
          </tr>
          <tr>
            <td>Name (Official):</td>
            <td>{ countries[0].name.official }</td>
          </tr>
          <tr>
            <td>Capital:</td>
            <td>{ countries[0].capital }</td>
          </tr>
          <tr>
            <td>Region:</td>
            <td>{ countries[0].region }</td>
          </tr>
          <tr>
            <td>Subregion:</td>
            <td>{ countries[0].subregion }</td>
          </tr>
          <tr>
            <td>Capital:</td>
            <td>{ countries[0].capital }</td>
          </tr>
          <tr>
            <td>Population:</td>
            <td>{ countries[0].population }</td>
          </tr>
          <tr>
            <td>Area:</td>
            <td>{ countries[0].area }</td>
          </tr>
          <tr>
            <td>Landlocked:</td>
            <td>{ countries[0].landlocked }</td>
          </tr>
          <tr>
            <td>UN Member:</td>
            <td>{ countries[0].unMember }</td>
          </tr>
          <tr>
            <td>Timezones:</td>
            <td>{ countries[0].timezones }</td>
          </tr>
        </table>
      </div>
    );
  
}