import React, { useCallback, useEffect, useState } from "react";
import compute from "./calculator";

const App = () => {
  const [rowCount, setRowCount] = useState(4);
  const [colCount, setColCount] = useState(4);
  const [maskList, setMaskList] = useState(Array.from(Array(rowCount * colCount), () => 1));
  const [polynomial, setPolynomial] = useState([]);

  const updateChessboardSize = useCallback((e) => {
    e.preventDefault();
    const rowCount = parseInt(e.target.rowCount.value);
    const colCount = parseInt(e.target.colCount.value);
    setRowCount(rowCount);
    setColCount(colCount);
  }, []);

  useEffect(() => {
    setMaskList(Array.from(Array(rowCount * colCount), () => 1));
  }, [rowCount, colCount]);

  useEffect(() => {
    const mask = [];
    for (let i = 0; i < rowCount; ++i) {
      mask.push(maskList.slice(i * colCount, (i + 1) * colCount));
    }
    setPolynomial(compute(mask));
  }, [maskList, rowCount, colCount]);

  return (
    <React.Fragment>
      <form onSubmit={updateChessboardSize}>
        <input type="text" name="rowCount" defaultValue={rowCount} />
        <input type="text" name="colCount" defaultValue={colCount} />
        <button type="submit">Set Size</button>
      </form>
      <div
        className="chessboard"
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${colCount}, 1fr)`
        }}>
        {maskList.map((mask, idx) => {
          // const row = Math.floor(idx / colCount);
          // const col = idx % colCount;
          return (
            <div
              className={"chessboard-cell" + (mask === 0 ? " disabled" : "")}
              key={idx}
              style={{ "--aspect-ratio": "1/1" }}
              onClick={() => {
                const newMaskList = [...maskList];
                newMaskList[idx] = maskList[idx] ^ 1;
                setMaskList(newMaskList);
              }}>
              <i className="fas fa-times"></i>
            </div>
          );
        })}
      </div>
      <div className="polynomial">
        {polynomial.map((a, idx) => {
          if (idx === 0) {
            return <span>{a}</span>;
          }
          if (idx === 1) {
            return <span>+ {a} x</span>;
          }
          return (
            <span>
              + {a} x<sup>{idx}</sup>
            </span>
          );
        })}
      </div>
    </React.Fragment>
  );
};

export default App;
