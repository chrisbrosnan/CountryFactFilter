'use client'; 
import React, { useState } from 'react';
import useSWR from 'swr';

export default function FetchCountryInfo({ countryCode }) {

  type Country = {
    countryCode: string;
  };
  
  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  
  const {
    data: countryInfo,
    error,
    isValidating,
  } = useSWR('https://restcountries.com/v3.1/alpha/' + countryCode, fetcher);

  // Handles error and loading state
  if (error) return <div className='failed'>failed to load</div>;
  if (isValidating) return <div className="Loading">Loading...</div>;

  return (
    <div>
      { countryInfo }
    </div>
  );
  
}