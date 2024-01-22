'use client'; 
import { useState, useEffect } from 'react';
import useSWR from 'swr';

export default function FetchCOA({ countryFlag }) {
  
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
  
    return (
        <div className='my-3'>
            <p className='text-center mb-3'><strong>Coat of Arms:</strong></p>
            <img className='mx-auto' src={ countries[0].coatOfArms.png ?? 'https://placehold.co/100x100' } title={ countries[0].name.common } alt='flag' width={150} />
        </div>
    );

}