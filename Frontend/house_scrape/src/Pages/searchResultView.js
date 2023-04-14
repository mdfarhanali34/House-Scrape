import { useParams } from 'react-router-dom';
import React from 'react';


function SearchResultView() {
  const { province, city, subCity } = useParams();

  return (
    <div>
      <h1>Search Results for {province}, {city}, {subCity}</h1>
      
   
    </div>
  );
}

export default SearchResultView;