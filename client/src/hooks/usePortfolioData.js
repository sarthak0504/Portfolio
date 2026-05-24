import { useState, useEffect } from 'react';
import { getPortfolioData } from '../utils/api.js';

export default function usePortfolioData() {
  const [data, setData]       = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);

  useEffect(() => {
    getPortfolioData()
      .then(res => setData(res.data))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return { data, loading, error };
}
