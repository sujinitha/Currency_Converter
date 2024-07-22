import { useState } from 'react';
import './App.css';
import useCurrencyInfo from './hooks/useCurrencyInfo';
import { Inputbox } from './Components';

function App() {
  const [amount, setAmount] = useState(0);
  const [from, setFrom] = useState('usd');
  const [to, setTo] = useState('inr');
  const [convertedAmount, setConvertedAmount] = useState(0);

  const { data: currencyInfo, loading } = useCurrencyInfo();

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-gray-800 text-orange-400">Loading...</div>;
  }

  const options = Object.keys(currencyInfo);

  const swap = () => {
    setFrom(to);
    setTo(from);
    setAmount(convertedAmount);
    setConvertedAmount(amount);
  };

  const convert = () => {
    setConvertedAmount(amount * currencyInfo[to]);
  };

  const reset = () => {
    setAmount(0);
    setFrom('usd');
    setTo('inr');
    setConvertedAmount(0);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-800 text-orange-500">
      <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-8 py-6 my-8 bg-gray-900 text-orange-400">
        <h1 className="text-3xl font-bold text-center mb-8">CURRENCY CONVERTER</h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            convert();
          }}
        >
          <div className="mb-6">
            <Inputbox
              label="From"
              amount={amount || 0}
              currencyOptions={options}
              onCurrencyChange={(currency) => setFrom(currency)}
              onAmountChange={(amount) => setAmount(Number(amount))}
              selectedCurrency={from}
            />
          </div>
          <div className="relative mb-6">
            <button
              type="button"
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-green-500 text-white rounded-full w-10 h-10 flex items-center justify-center"
              onClick={swap}
            >
              ⇅
            </button>
          </div>
          <div className="mb-6">
            <Inputbox
              label="To"
              amount={convertedAmount || 0}
              currencyOptions={options}
              onCurrencyChange={(currency) => setTo(currency)}
              selectedCurrency={to}
              amountDisabled
            />
          </div>
          <div className="flex justify-between">
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg mr-2 w-full"
            >
              Convert {from.toUpperCase()} to {to.toUpperCase()}
            </button>
            <button
              type="button"
              className="bg-red-600 text-white px-6 py-3 rounded-lg ml-2 w-full"
              onClick={reset}
            >
              Reset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default App;
