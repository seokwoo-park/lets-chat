import React, { useState, useEffect } from 'react';

const useResolved = (...values) => {
  const [resolved, setResolved] = useState(false);

  useEffect(() => {
    setResolved(values.every(v => v !== undefined));
  }, [values]);

  return resolved;
};

export default useResolved;
