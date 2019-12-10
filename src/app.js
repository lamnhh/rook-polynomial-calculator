import React, { useEffect, useState, useCallback } from "react";
import MathJax from "react-mathjax2";

import compute from "./calculator";
import SizeSelector from "./size-selector";

const SIZE_LIMIT = 8;

const App = () => {
  const [rowCount, setRowCount] = useState(4);
  const [colCount, setColCount] = useState(5);
  const [maskList, setMaskList] = useState(Array.from(Array(rowCount * colCount), () => 1));
  const [polynomial, setPolynomial] = useState([]);

  useEffect(() => {
    if (rowCount > SIZE_LIMIT) {
      setRowCount(SIZE_LIMIT);
    }
    if (rowCount < 1) {
      setRowCount(1);
    }
  }, [rowCount]);

  useEffect(() => {
    if (colCount > SIZE_LIMIT) {
      setColCount(SIZE_LIMIT);
    }
    if (colCount < 1) {
      setColCount(1);
    }
  }, [colCount]);

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

  const flip = useCallback(() => {
    setMaskList((maskList) => maskList.map((x) => 1 - x));
  }, []);

  const clear = useCallback(() => {
    setMaskList((maskList) => maskList.map((x) => 1));
  }, []);

  return (
    <React.Fragment>
      <div className="chessboard-container">
        <div className="chessboard-size-form">
          <SizeSelector upperLimit={SIZE_LIMIT} value={rowCount} onSelect={setRowCount} />
          <img src="/times.svg" alt="" />
          <SizeSelector upperLimit={SIZE_LIMIT} value={colCount} onSelect={setColCount} />
        </div>
        <div
          className="chessboard"
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${colCount}, 1fr)`
          }}>
          {maskList.map((mask, idx) => {
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
                <img src="/times.svg" alt="Disabled cell" />
              </div>
            );
          })}
        </div>
        <div className="action-section">
          <button onClick={clear}>Clear</button>
          <button onClick={flip}>Flip</button>
        </div>
        <MathJax.Context input="ascii">
          <div className="polynomial">
            <MathJax.Node>
              {"R(x) = " +
                polynomial
                  .map((a, idx) => {
                    if (idx === 0) {
                      return a;
                    }
                    if (idx === 1) {
                      return (a !== 1 ? a : "") + "x";
                    }
                    return (a !== 1 ? a : "") + "x^" + idx;
                  })
                  .join(" + ")}
            </MathJax.Node>
          </div>
        </MathJax.Context>
      </div>
    </React.Fragment>
  );
};

export default App;
