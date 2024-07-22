import { useEffect, useState } from "react";

function useCurrencyInfo() {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://api.exchangerate-api.com/v4/latest/USD')
      .then((res) => res.json())
      .then((res) => {
        setData(res.rates);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch currency info:", err);
        setLoading(false);
      });
  }, []);

  return { data, loading };
}

export default useCurrencyInfo;
