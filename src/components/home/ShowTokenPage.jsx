import React, { useState, useEffect } from 'react';
import { getHeader } from "../utils/ApiFunctions" // Import function getHeader từ ApiFunctions

const ShowTokenPage = () => {
  const [token, setToken] = useState('');

  useEffect(() => {
    // Lấy token từ localStorage khi trang được load
    const currentToken = getHeader().Authorization;
    setToken(currentToken || 'No token available');
  }, []);

  return (
    <div>
      <h1>Current Token</h1>
      <p>{token}</p>
    </div>
  );
};

export default ShowTokenPage;
