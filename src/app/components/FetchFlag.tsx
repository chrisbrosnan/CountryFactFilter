'use client'; 
import { useState, useEffect } from 'react';
import useSWR from 'swr';

export default function FetchFlag({ countryFlag }) {
  
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
    } = useSWR('https://restcountries.com/v3.1/alpha/' + countryFlag + '/', fetcher);
  
    // Handles error and loading state
    if (error) return <div className='failed'>failed to load</div>;
    if (isValidating) return <div className="Loading">Loading...</div>;

    console.log(countries[0]);
  
    return (
      <div>
          <img src={ countries[0].flags.png } title={ countries[0].name.common } alt='flag' width={200} />
      </div>
    );

}