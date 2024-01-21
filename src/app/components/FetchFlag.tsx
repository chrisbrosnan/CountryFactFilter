'use client'; 
import { useState, useEffect } from 'react';
import useSWR from 'swr';

export default function FetchFlag({ countryCode = 'AFG' }) {

    const [flag, setFlag] = useState('');
    const [country, setCountry] = useState('');
  
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
  
    return (
      <div>
          { countryCode }
      </div>
    );

}