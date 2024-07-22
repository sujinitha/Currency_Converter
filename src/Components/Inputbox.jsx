import React, { useId } from 'react';

function Inputbox({
  label,
  amount,
  onAmountChange,
  onCurrencyChange,
  currencyOptions = [],
  selectedCurrency = "usd",
  amountDisabled = false,
  currencyDisabled = false,
  className = ""
}) {
  const id = useId();
  return (
    <div className={`flex flex-col ${className}`}>
      <label htmlFor={id} className="text-orange-400 mb-2">{label}</label>
      <input
        id={id}
        type="number"
        className='mb-2 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-800 text-orange-400'
        placeholder='Amount'
        value={amount}
        onChange={(e) => onAmountChange && onAmountChange(Number(e.target.value))}
        disabled={amountDisabled}
      />
      <select
        className='p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-800 text-orange-400'
        value={selectedCurrency}
        onChange={(e) => onCurrencyChange && onCurrencyChange(e.target.value)}
        disabled={currencyDisabled}
      >
        {currencyOptions.map((currency) => (
          <option key={currency} value={currency}>
            {currency.toUpperCase()}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Inputbox;
