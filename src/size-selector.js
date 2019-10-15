import React from "react";

const range = (l, r) => {
  const ans = [];
  for (let i = l; i <= r; ++i) {
    ans.push(i);
  }
  return ans;
};

const SizeSelector = ({ value, upperLimit, onSelect }) => {
  return (
    <select
      className="size-selector"
      value={value}
      onChange={(e) => {
        const value = e.target.value;
        onSelect(parseInt(value));
      }}>
      {range(2, upperLimit).map((value) => {
        return (
          <option key={value} value={value}>
            {value}
          </option>
        );
      })}
    </select>
  );
};

export default SizeSelector;
