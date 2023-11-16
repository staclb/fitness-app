import React from 'react';
import { useNavigate } from 'react-router-dom';

const Search = () => {
  const navigate = useNavigate();

  const handleCancelSearch = () => {
    // what does navigate(-1) do
    navigate('/workouts');
  };
  return (
    <div className="text-white">
      <button onClick={handleCancelSearch}>Go back</button>
      Search
    </div>
  );
};

export default Search;
